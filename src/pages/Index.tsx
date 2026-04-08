import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Award, Users, Leaf, Heart, Sparkles, Home, Flame, Flower, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const highlights = [
  { icon: Award, label: "40+ Years of Experience" },
  { icon: Heart, label: "High Purity & Long Shelf Life" },
  { icon: Users, label: "Custom Aroma Solutions" },
  { icon: Leaf, label: "Environment Friendly Products" },
];

const productCategories = [
  { icon: Sparkles, title: "Perfume Fragrances", count: "33+ products" },
  { icon: Flame, title: "Attars & Incense", count: "10+ products" },
  { icon: Home, title: "Home & Cleaning", count: "5+ products" },
  { icon: Flower, title: "Specialty Aromas", count: "Custom blends" },
];

const reasons = [
  "40+ years of expertise",
  "High-quality raw materials",
  "Advanced manufacturing facility",
  "Customized solutions",
  "Reliable and timely delivery",
  "Customer-centric approach",
];

const Index = () => {
  const revealRef = useScrollReveal();

  return (
    <>
      <Navbar />
      <HeroSection />

      <div ref={revealRef}>
        {/* About Preview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gold font-body tracking-widest uppercase text-sm mb-3 reveal-item opacity-0 translate-y-8 transition-all duration-700">About Us</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary mb-6 reveal-item opacity-0 translate-y-8 transition-all duration-700">Crafting Excellence Since 1984</h2>
            <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full mb-8 reveal-item opacity-0 translate-y-8 transition-all duration-700" />
            <p className="font-body text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto mb-10 reveal-item opacity-0 translate-y-8 transition-all duration-700">
              M. M. Attarwala is one of the leading manufacturers and suppliers of Synthetic Perfumery Compounds and Aromatic Compounds, based in Vadodara, Gujarat. Led by founder Mr. Mohd. Rafiq Attarwala, we have been serving the fragrance industry for over 40 years.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {highlights.map((h, i) => (
                <div
                  key={h.label}
                  className="reveal-item opacity-0 translate-y-8 transition-all duration-700 bg-card rounded-xl p-6 text-center border border-border hover:border-gold/40 hover-scale group"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <h.icon className="text-gold" size={28} />
                  </div>
                  <p className="font-body font-medium text-secondary text-sm">{h.label}</p>
                </div>
              ))}
            </div>
            <Link to="/about" className="reveal-item opacity-0 translate-y-8 transition-all duration-700 inline-flex items-center gap-2 text-gold font-body font-semibold hover:underline">
              Learn More About Us <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Products Preview */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gold font-body tracking-widest uppercase text-sm mb-3 reveal-item opacity-0 translate-y-8 transition-all duration-700">Our Products</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary mb-6 reveal-item opacity-0 translate-y-8 transition-all duration-700">Our Product Range</h2>
            <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full mb-12 reveal-item opacity-0 translate-y-8 transition-all duration-700" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
              {productCategories.map((cat, i) => (
                <div
                  key={cat.title}
                  className="reveal-item opacity-0 translate-y-8 transition-all duration-700 bg-background rounded-2xl p-8 border border-border hover:border-gold/40 hover-scale group"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <cat.icon className="text-gold" size={24} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-secondary mb-1">{cat.title}</h3>
                  <p className="font-body text-muted-foreground text-sm">{cat.count}</p>
                </div>
              ))}
            </div>
            <Link to="/products" className="reveal-item opacity-0 translate-y-8 transition-all duration-700 inline-flex items-center gap-2 bg-gradient-gold text-secondary font-body font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
              View All Products <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Why Choose Us Preview */}
        <section className="py-20 bg-gradient-brown">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gold font-body tracking-widest uppercase text-sm mb-3 reveal-item opacity-0 translate-y-8 transition-all duration-700">Why Choose Us</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-cream mb-6 reveal-item opacity-0 translate-y-8 transition-all duration-700">The M M Attarwala Advantage</h2>
            <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full mb-12 reveal-item opacity-0 translate-y-8 transition-all duration-700" />

            <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4 mb-10">
              {reasons.map((r, i) => (
                <div
                  key={r}
                  className="reveal-item opacity-0 translate-y-8 transition-all duration-700 flex items-start gap-3 bg-cream/5 backdrop-blur-sm rounded-xl p-5 border border-gold/10"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <CheckCircle className="text-gold flex-shrink-0 mt-0.5" size={20} />
                  <span className="font-body text-cream/90">{r}</span>
                </div>
              ))}
            </div>
            <Link to="/why-choose-us" className="reveal-item opacity-0 translate-y-8 transition-all duration-700 inline-flex items-center gap-2 border-2 border-gold text-gold font-body font-semibold px-8 py-3 rounded-lg hover:bg-gold/10 transition-colors">
              Learn More <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Index;
