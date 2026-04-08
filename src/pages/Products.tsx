import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Sparkles, Home, Flame, Flower, Droplets, Package, Wind, Palette } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: Sparkles,
    title: "Perfume Fragrances",
    description: "33+ premium fragrances including Sandalwood, Chocolate, Passport, and designer-inspired scents.",
    items: ["Sandalwood Perfume", "Chocolate Fragrance", "Perfume Passport", "Designer-Inspired Blends"],
  },
  {
    icon: Droplets,
    title: "Attars & Traditional Fragrances",
    description: "Authentic attars crafted using traditional methods — Firdous, Dehnul, Jannatul, and more.",
    items: ["Attar Full", "Attar T Rose", "Flower Oil Attar", "Fabric Attar", "Dehnul & Jannatul"],
  },
  {
    icon: Palette,
    title: "Beauty & Personal Care Aroma",
    description: "Fragrances for creams, lotions, talcum powder, and soaps.",
    items: ["Cream & Lotion Aroma", "Talcum Powder Fragrance", "Soap Fragrance"],
  },
  {
    icon: Home,
    title: "Home & Cleaning Products",
    description: "Industrial-grade aromatic compounds for detergents, cleaners, and household items.",
    items: ["Detergents & Fabric Softeners", "Industrial Cleaners", "Household Products"],
  },
  {
    icon: Flame,
    title: "Religious & Lifestyle",
    description: "Premium fragrances for incense sticks, dhoop, oudh, and candles.",
    items: ["Dhoop & Agarbatti", "Incense Sticks", "Oudh", "Candles"],
  },
  {
    icon: Flower,
    title: "Specialty Applications",
    description: "Unique aromatic solutions for spa products and specialty industries.",
    items: ["Spa Products", "Pan Masala & Supari Aromas"],
  },
  {
    icon: Wind,
    title: "Attar Fragrance Collection",
    description: "Exclusive attar blends — Black Cobra, Green Musk, Bacool, Char Les, and more.",
    items: ["Attar Black Cobra", "Attar Green Musk", "Attar G Sandal", "Attar Bacool", "Attar Pons"],
  },
  {
    icon: Package,
    title: "Crystal Glass Bottles",
    description: "Premium crystal glass packaging for attars and perfumes.",
    items: ["Cristal Bottles", "Attar Bottles", "Custom Packaging"],
  },
];

const Products = () => {
  const revealRef = useScrollReveal();

  return (
    <>
      <Navbar />
      <PageHeader subtitle="Our Products" title="Our Product Range" />

      <div ref={revealRef}>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <p className="text-center font-body text-muted-foreground max-w-2xl mx-auto mb-16 reveal-item opacity-0 translate-y-8 transition-all duration-700">
              We manufacture and supply a comprehensive range of synthetic perfumery compounds and aromatic solutions for diverse industries. All products are crafted with high-quality raw materials for purity and long-lasting performance.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {categories.map((cat, i) => (
                <div
                  key={cat.title}
                  className="reveal-item opacity-0 translate-y-8 transition-all duration-700 bg-card rounded-2xl p-8 border border-border hover:border-gold/40 hover:shadow-lg hover-scale group"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <cat.icon className="text-gold" size={24} />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-secondary">{cat.title}</h3>
                  </div>
                  <p className="font-body text-muted-foreground text-sm mb-4 leading-relaxed">{cat.description}</p>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center mt-16 reveal-item opacity-0 translate-y-8 transition-all duration-700">
              <p className="font-body text-muted-foreground mb-6">
                Looking for a custom fragrance solution? We specialize in creating bespoke aromatic compounds tailored to your needs.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-gradient-gold text-secondary font-body font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Products;
