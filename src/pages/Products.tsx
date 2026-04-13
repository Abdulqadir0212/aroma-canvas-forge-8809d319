import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useDynamicContent";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";

const filters = ["All", "Attar", "Perfume", "Gift Set", "Incense"];

const Products = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const { data: products, isLoading } = useProducts(activeFilter);
  const { addItem } = useCart();

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    const timer = setTimeout(() => {
      const items = el.querySelectorAll(".reveal-item");
      items.forEach((item) => observer.observe(item));
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [activeFilter, products]);

  const handleFilter = useCallback((f: string) => {
    setActiveFilter(f);
  }, []);

  return (
    <>
      <Navbar />
      <PageHeader subtitle="Our Collection" title="Shop Premium Fragrances" />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-center font-body text-muted-foreground max-w-xl mx-auto mb-10">
            A curated selection of our finest attars, perfumes, and aromatic products. Each crafted for purity and lasting impression.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className={`font-body text-sm px-5 py-2 rounded-full transition-all ${
                  activeFilter === f
                    ? "bg-gradient-gold text-primary-foreground font-semibold"
                    : "bg-card border border-border text-muted-foreground hover:border-gold/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-xl overflow-hidden border border-border">
                    <Skeleton className="aspect-square w-full" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-5 w-1/3" />
                    </div>
                  </div>
                ))
              : products?.map((item, i) => (
                  <div
                    key={`${activeFilter}-${item.id}`}
                    className="reveal-item opacity-0 translate-y-8 transition-all duration-500 group bg-card rounded-xl overflow-hidden border border-border hover:border-gold/30 hover-scale"
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      )}
                      <span className="absolute top-3 left-3 bg-background/90 text-foreground font-body text-xs font-medium px-2.5 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading text-sm font-semibold text-secondary mb-1 line-clamp-1">{item.name}</h3>
                      {item.description && (
                        <p className="font-body text-muted-foreground text-xs mb-2 line-clamp-1">{item.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <p className="font-body text-gold font-bold text-lg">₹{item.price.toLocaleString("en-IN")}</p>
                        <button
                          onClick={() => addItem({ id: item.id, name: item.name, price: item.price, original_price: item.original_price, image_url: item.image_url })}
                          className="w-8 h-8 rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-primary-foreground transition-colors flex items-center justify-center"
                          aria-label={`Add ${item.name} to cart`}
                        >
                          <ShoppingCart size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          <div className="text-center mt-16">
            <p className="font-body text-muted-foreground mb-6">
              Looking for a specific fragrance? Reach out to us on WhatsApp for personalized recommendations.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-gold text-gold font-body font-semibold px-8 py-3 rounded-lg hover:bg-gold/5 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Products;
