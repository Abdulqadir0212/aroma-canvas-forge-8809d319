import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Link } from "react-router-dom";
import galleryAttar from "@/assets/gallery/attar-collection.jpg";
import galleryPerfume from "@/assets/gallery/perfume-sprays.jpg";
import galleryBottles from "@/assets/gallery/crystal-bottles.jpg";
import galleryIncense from "@/assets/gallery/incense-products.jpg";
import galleryOils from "@/assets/gallery/essential-oils.jpg";
import galleryRose from "@/assets/gallery/rose-ingredients.jpg";
import galleryGift from "@/assets/gallery/gift-packaging.jpg";
import galleryShop from "@/assets/gallery/shop-interior.jpg";
import galleryManufacturing from "@/assets/gallery/manufacturing.jpg";

const products = [
  { name: "Royal Oudh Attar", price: "₹1,299", image: galleryAttar, category: "Attar", longevity: "12+ Hours" },
  { name: "Rose Premium Perfume", price: "₹899", image: galleryRose, category: "Perfume", longevity: "8+ Hours" },
  { name: "Sandalwood Classic", price: "₹1,099", image: galleryPerfume, category: "Perfume", longevity: "10+ Hours" },
  { name: "Crystal Attar Gift Set", price: "₹2,499", image: galleryBottles, category: "Gift Set", longevity: "12+ Hours" },
  { name: "Firdous Premium Attar", price: "₹1,599", image: galleryOils, category: "Attar", longevity: "12+ Hours" },
  { name: "Dehnul Oudh Blend", price: "₹1,899", image: galleryManufacturing, category: "Attar", longevity: "14+ Hours" },
  { name: "Jannatul Firdous", price: "₹1,199", image: galleryShop, category: "Attar", longevity: "10+ Hours" },
  { name: "Classic Incense Collection", price: "₹499", image: galleryIncense, category: "Incense", longevity: "4+ Hours" },
  { name: "Premium Gift Box", price: "₹3,499", image: galleryGift, category: "Gift Set", longevity: "12+ Hours" },
  { name: "Green Musk Attar", price: "₹999", image: galleryOils, category: "Attar", longevity: "8+ Hours" },
  { name: "Black Cobra Attar", price: "₹1,399", image: galleryAttar, category: "Attar", longevity: "12+ Hours" },
  { name: "Chocolate Perfume", price: "₹799", image: galleryPerfume, category: "Perfume", longevity: "6+ Hours" },
];

const filters = ["All", "Attar", "Perfume", "Gift Set", "Incense"];

const Products = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === "All" ? products : products.filter((p) => p.category === activeFilter);

  // Re-run reveal observer whenever filter changes
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

    // Small delay to let DOM update
    const timer = setTimeout(() => {
      const items = el.querySelectorAll(".reveal-item");
      items.forEach((item) => observer.observe(item));
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [activeFilter]);

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

          {/* Filters */}
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

          {/* Product Grid */}
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {filtered.map((item, i) => (
              <div
                key={`${activeFilter}-${item.name}`}
                className="reveal-item opacity-0 translate-y-8 transition-all duration-500 group bg-card rounded-xl overflow-hidden border border-border hover:border-gold/30 hover-scale"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-background/90 text-foreground font-body text-xs font-medium px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-sm font-semibold text-secondary mb-1 line-clamp-1">{item.name}</h3>
                  <p className="font-body text-muted-foreground text-xs mb-2">Lasts {item.longevity}</p>
                  <p className="font-body text-gold font-bold text-lg">{item.price}</p>
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
