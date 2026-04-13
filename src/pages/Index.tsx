import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Award, Users, Leaf, Heart, CheckCircle, ArrowRight, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useBestsellers, useTestimonials, useSiteContent, useWhyChooseUs } from "@/hooks/useDynamicContent";
import { Skeleton } from "@/components/ui/skeleton";

const highlights = [
  { icon: Award, label: "40+ Years Legacy" },
  { icon: Heart, label: "Long-lasting Quality" },
  { icon: Users, label: "Trusted by Thousands" },
  { icon: Leaf, label: "Pure Ingredients" },
];

const Index = () => {
  const revealRef = useScrollReveal();
  const { data: bestsellers, isLoading: loadingProducts } = useBestsellers();
  const { data: reviews, isLoading: loadingReviews } = useTestimonials(3);
  const { data: brandStory, isLoading: loadingStory } = useSiteContent("brand_story");
  const { data: reasons, isLoading: loadingReasons } = useWhyChooseUs();

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
              {loadingProducts
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-card rounded-xl overflow-hidden border border-border">
                      <Skeleton className="aspect-square w-full" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-5 w-1/3" />
                      </div>
                    </div>
                  ))
                : bestsellers?.map((item, i) => (
                    <div
                      key={item.id}
                      className="reveal-item opacity-0 translate-y-8 transition-all duration-600 group bg-card rounded-xl overflow-hidden border border-border hover:border-gold/30 hover-scale"
                      style={{ transitionDelay: `${i * 80}ms` }}
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
                       {!item.image_url && (
                         <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/40">
                           <ShoppingBag size={32} />
                           <span className="text-xs mt-2 font-body">{item.category}</span>
                         </div>
                       )}
                        {item.tag && (
                          <span className="absolute top-3 left-3 bg-gold/90 text-primary-foreground font-body text-xs font-semibold px-3 py-1 rounded-full">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-heading text-sm md:text-base font-semibold text-secondary mb-1">{item.name}</h3>
                        <p className="font-body text-gold font-bold text-lg">₹{item.price.toLocaleString("en-IN")}</p>
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
              <h2 className="reveal-item opacity-0 translate-y-8 transition-all duration-600 font-heading text-3xl md:text-4xl font-bold text-secondary mb-6">
                {loadingStory ? <Skeleton className="h-10 w-64 mx-auto" /> : brandStory?.title ?? "A Trusted Fragrance House"}
              </h2>
              {loadingStory ? (
                <div className="space-y-3">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/4 mx-auto" />
                </div>
              ) : (
                <>
                  <p className="reveal-item opacity-0 translate-y-8 transition-all duration-600 font-body text-muted-foreground text-lg leading-relaxed mb-6">
                    {brandStory?.paragraph1}
                  </p>
                  <p className="reveal-item opacity-0 translate-y-8 transition-all duration-600 font-body text-muted-foreground leading-relaxed mb-8">
                    {brandStory?.paragraph2}
                  </p>
                </>
              )}
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
              {loadingReasons
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-3 bg-card rounded-xl p-5 border border-border">
                      <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))
                : reasons?.map((r, i) => (
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
              {loadingReviews
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-background rounded-xl p-6 border border-border">
                      <Skeleton className="h-4 w-20 mb-3" />
                      <Skeleton className="h-12 w-full mb-4" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))
                : reviews?.map((r, i) => (
                    <div
                      key={r.id}
                      className="reveal-item opacity-0 translate-y-8 transition-all duration-600 bg-background rounded-xl p-6 border border-border"
                      style={{ transitionDelay: `${i * 80}ms` }}
                    >
                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <Star key={j} size={14} className="text-gold fill-gold" />
                        ))}
                      </div>
                      <p className="font-body text-muted-foreground text-sm mb-4 leading-relaxed italic">"{r.review}"</p>
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
