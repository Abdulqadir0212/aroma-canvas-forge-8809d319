import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Award, Users, Leaf, Heart, CheckCircle, ArrowRight, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import galleryAttar from "@/assets/gallery/attar-collection.jpg";
import galleryPerfume from "@/assets/gallery/perfume-sprays.jpg";
import galleryBottles from "@/assets/gallery/crystal-bottles.jpg";
import galleryIncense from "@/assets/gallery/incense-products.jpg";
import galleryOils from "@/assets/gallery/essential-oils.jpg";
import galleryRose from "@/assets/gallery/rose-ingredients.jpg";

const bestsellers = [
  { name: "Royal Oudh Attar", price: "₹1,299", image: galleryAttar, tag: "Bestseller" },
  { name: "Rose Premium Perfume", price: "₹899", image: galleryRose, tag: "New" },
  { name: "Sandalwood Classic", price: "₹1,099", image: galleryPerfume, tag: "Popular" },
  { name: "Crystal Attar Set", price: "₹2,499", image: galleryBottles, tag: "Gift Set" },
  { name: "Firdous Incense", price: "₹499", image: galleryIncense, tag: "Bestseller" },
  { name: "Essential Oil Blend", price: "₹749", image: galleryOils, tag: "New" },
];

const highlights = [
  { icon: Award, label: "40+ Years Legacy" },
  { icon: Heart, label: "Long-lasting Quality" },
  { icon: Users, label: "Trusted by Thousands" },
  { icon: Leaf, label: "Pure Ingredients" },
];

const reasons = [
  "40+ years of expertise in fragrance crafting",
  "High-quality, skin-friendly raw materials",
  "Curated collection of premium attars & perfumes",
  "Trusted by customers across Gujarat & Maharashtra",
  "Reliable delivery & dedicated WhatsApp support",
  "Competitive pricing with no compromise on quality",
];

const reviews = [
  { name: "Rajesh M.", rating: 5, text: "The attars are absolutely premium. Long-lasting fragrance that stays all day." },
  { name: "Sunita A.", rating: 5, text: "Best quality perfumes I've found online. The packaging is also beautiful." },
  { name: "Arjun P.", rating: 5, text: "Reliable and consistent quality. My family has been buying from them for years." },
];

const Index = () => {
  const revealRef = useScrollReveal();

  return (
    <>
      <Navbar />
      <HeroSection />

      <div ref={revealRef}>
        {/* Highlights Strip */}
        <section className="py-10 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {highlights.map((h, i) => (
                <div
                  key={h.label}
                  className="reveal-item opacity-0 translate-y-8 transition-all duration-600 flex items-center gap-3 justify-center"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <h.icon className="text-gold" size={20} />
                  </div>
                  <p className="font-body font-medium text-secondary text-sm">{h.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bestsellers */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="reveal-item opacity-0 translate-y-8 transition-all duration-600 text-gold font-body tracking-widest uppercase text-xs mb-3 font-medium">Featured</p>
              <h2 className="reveal-item opacity-0 translate-y-8 transition-all duration-600 font-heading text-3xl md:text-4xl font-bold text-secondary mb-4">Our Bestsellers</h2>
              <p className="reveal-item opacity-0 translate-y-8 transition-all duration-600 font-body text-muted-foreground max-w-lg mx-auto">
                Hand-picked fragrances loved by our customers. Each crafted for purity and lasting impression.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-10">
              {bestsellers.map((item, i) => (
                <div
                  key={item.name}
                  className="reveal-item opacity-0 translate-y-8 transition-all duration-600 group bg-card rounded-xl overflow-hidden border border-border hover:border-gold/30 hover-scale"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-gold/90 text-primary-foreground font-body text-xs font-semibold px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-sm md:text-base font-semibold text-secondary mb-1">{item.name}</h3>
                    <p className="font-body text-gold font-bold text-lg">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center reveal-item opacity-0 translate-y-8 transition-all duration-600">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground font-body font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                <ShoppingBag size={18} />
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="reveal-item opacity-0 translate-y-8 transition-all duration-600 text-gold font-body tracking-widest uppercase text-xs mb-3 font-medium">Our Legacy</p>
              <h2 className="reveal-item opacity-0 translate-y-8 transition-all duration-600 font-heading text-3xl md:text-4xl font-bold text-secondary mb-6">A Trusted Fragrance House</h2>
              <p className="reveal-item opacity-0 translate-y-8 transition-all duration-600 font-body text-muted-foreground text-lg leading-relaxed mb-6">
                Founded in 1984 by Mr. Mohd. Rafiq Attarwala, M M Attarwala has been crafting premium fragrances for over 40 years. Based in Vadodara, Gujarat, we are known for our commitment to quality, purity, and trust.
              </p>
              <p className="reveal-item opacity-0 translate-y-8 transition-all duration-600 font-body text-muted-foreground leading-relaxed mb-8">
                Our curated collection of attars and perfumes is designed for the mature, quality-conscious customer who values authenticity and long-lasting fragrance.
              </p>
              <Link
                to="/about"
                className="reveal-item opacity-0 translate-y-8 transition-all duration-600 inline-flex items-center gap-2 text-gold font-body font-semibold hover:underline"
              >
                Read Our Full Story <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="reveal-item opacity-0 translate-y-8 transition-all duration-600 text-gold font-body tracking-widest uppercase text-xs mb-3 font-medium">Why Us</p>
              <h2 className="reveal-item opacity-0 translate-y-8 transition-all duration-600 font-heading text-3xl md:text-4xl font-bold text-secondary">The M M Attarwala Advantage</h2>
            </div>

            <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
              {reasons.map((r, i) => (
                <div
                  key={r}
                  className="reveal-item opacity-0 translate-y-8 transition-all duration-600 flex items-start gap-3 bg-card rounded-xl p-5 border border-border"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <CheckCircle className="text-gold flex-shrink-0 mt-0.5" size={18} />
                  <span className="font-body text-muted-foreground text-sm">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="reveal-item opacity-0 translate-y-8 transition-all duration-600 text-gold font-body tracking-widest uppercase text-xs mb-3 font-medium">Reviews</p>
              <h2 className="reveal-item opacity-0 translate-y-8 transition-all duration-600 font-heading text-3xl md:text-4xl font-bold text-secondary">What Our Customers Say</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
              {reviews.map((r, i) => (
                <div
                  key={r.name}
                  className="reveal-item opacity-0 translate-y-8 transition-all duration-600 bg-background rounded-xl p-6 border border-border"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} size={14} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="font-body text-muted-foreground text-sm mb-4 leading-relaxed italic">"{r.text}"</p>
                  <p className="font-body font-semibold text-secondary text-sm">{r.name}</p>
                </div>
              ))}
            </div>

            <div className="text-center reveal-item opacity-0 translate-y-8 transition-all duration-600">
              <Link to="/testimonials" className="inline-flex items-center gap-2 text-gold font-body font-semibold hover:underline">
                See All Reviews <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="reveal-item opacity-0 translate-y-8 transition-all duration-600 font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Experience Premium Fragrances
            </h2>
            <p className="reveal-item opacity-0 translate-y-8 transition-all duration-600 font-body text-primary-foreground/60 max-w-md mx-auto mb-8">
              Explore our curated collection of attars, perfumes, and aromatic compounds.
            </p>
            <Link
              to="/products"
              className="reveal-item opacity-0 translate-y-8 transition-all duration-600 inline-flex items-center gap-2 bg-gold text-primary-foreground font-body font-semibold px-8 py-3.5 rounded-lg hover:opacity-90 transition-opacity text-base"
            >
              <ShoppingBag size={18} />
              Shop Now
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
