import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Star, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  { name: "Rajesh Mehta", company: "Mehta Cosmetics Pvt. Ltd.", rating: 5, review: "We've been sourcing our fragrance compounds from M M Attarwala for over 10 years. The quality and consistency of their products is unmatched. Highly recommended!" },
  { name: "Sunita Agarwal", company: "Divine Agarbatti Works", rating: 5, review: "Their incense fragrances are truly premium. Our customers love the long-lasting aroma. M M Attarwala has been an invaluable partner for our business growth." },
  { name: "Arjun Patel", company: "CleanWave Detergents", rating: 4, review: "Reliable delivery, excellent product quality, and always willing to create custom blends for our detergent line. A pleasure to work with every time." },
  { name: "Fatima Sheikh", company: "Luxe Spa & Wellness", rating: 5, review: "The spa-grade aromatic compounds we get from M M Attarwala are skin-friendly and long-lasting. Our clients always compliment the signature fragrance." },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={18} className={i < rating ? "text-gold fill-[hsl(var(--gold))]" : "text-muted-foreground/30"} />
    ))}
  </div>
);

const Testimonials = () => {
  const revealRef = useScrollReveal();

  return (
    <>
      <Navbar />
      <PageHeader subtitle="Testimonials" title="What Our Clients Say" />

      <div ref={revealRef}>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  className="reveal-item opacity-0 translate-y-8 transition-all duration-700 bg-card rounded-xl p-8 border border-border hover:border-gold/40 hover-scale relative"
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <Quote className="text-gold/20 absolute top-6 right-6" size={36} />
                  <StarRating rating={t.rating} />
                  <p className="font-body text-muted-foreground leading-relaxed mb-6 italic">"{t.review}"</p>
                  <div>
                    <p className="font-body font-semibold text-secondary">{t.name}</p>
                    <p className="font-body text-sm text-gold">{t.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Testimonials;
