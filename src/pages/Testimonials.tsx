import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Star, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  { name: "Rajesh Mehta", location: "Ahmedabad, Gujarat", rating: 5, review: "We've been sourcing fragrances from M M Attarwala for over 10 years. The quality and consistency is unmatched." },
  { name: "Sunita Agarwal", location: "Mumbai, Maharashtra", rating: 5, review: "Their attars are truly premium. The long-lasting aroma is something my customers always compliment." },
  { name: "Arjun Patel", location: "Surat, Gujarat", rating: 5, review: "Reliable delivery, excellent product quality, and always helpful with recommendations." },
  { name: "Fatima Sheikh", location: "Vadodara, Gujarat", rating: 5, review: "The perfumes are skin-friendly and long-lasting. I've been a loyal customer for years." },
  { name: "Vikram Desai", location: "Pune, Maharashtra", rating: 4, review: "Great value for money. The Sandalwood and Oudh attars are exceptional." },
  { name: "Meera Joshi", location: "Rajkot, Gujarat", rating: 5, review: "Bought the Crystal Gift Set for Diwali — everyone loved it. Will buy again!" },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={14} className={i < rating ? "text-gold fill-gold" : "text-muted-foreground/20"} />
    ))}
  </div>
);

const Testimonials = () => {
  const revealRef = useScrollReveal();
  return (
    <>
      <Navbar />
      <PageHeader subtitle="Reviews" title="What Our Customers Say" />
      <div ref={revealRef}>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <div key={t.name} className="reveal-item opacity-0 translate-y-8 transition-all duration-700 bg-card rounded-xl p-6 border border-border relative" style={{ transitionDelay: `${i * 80}ms` }}>
                  <Quote className="text-gold/10 absolute top-4 right-4" size={28} />
                  <StarRating rating={t.rating} />
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4 italic">"{t.review}"</p>
                  <p className="font-body font-semibold text-secondary text-sm">{t.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{t.location}</p>
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
