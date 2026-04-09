import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <img
      src={heroBg}
      alt="Premium perfumery compounds"
      className="absolute inset-0 w-full h-full object-cover"
      width={1920}
      height={1080}
      loading="eager"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />

    <div className="relative z-10 container mx-auto px-4 py-32">
      <div className="max-w-xl">
        <p className="animate-fade-in-up font-body tracking-[0.2em] uppercase text-sm text-gold font-medium mb-4">
          Established Since 1984
        </p>
        <h1 className="animate-fade-in-up-delay-1 font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-tight mb-6">
          Premium Fragrances
          <br />
          <span className="text-gradient-gold">Crafted with Trust</span>
        </h1>
        <p className="animate-fade-in-up-delay-2 font-body text-muted-foreground text-lg md:text-xl max-w-md mb-8 leading-relaxed">
          A curated collection of long-lasting perfumes & attars for the discerning customer.
        </p>
        <div className="animate-fade-in-up-delay-3 flex flex-wrap gap-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground font-body font-semibold px-8 py-3.5 rounded-lg hover:opacity-90 transition-opacity text-base"
          >
            <ShoppingBag size={18} />
            Shop Now
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 border-2 border-gold text-gold font-body font-semibold px-8 py-3.5 rounded-lg hover:bg-gold/5 transition-colors text-base"
          >
            Our Story <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
