import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Mehta",
    company: "Mehta Cosmetics Pvt. Ltd.",
    rating: 5,
    review:
      "We've been sourcing our fragrance compounds from M M Attarwala for over 10 years. The quality and consistency of their products is unmatched. Highly recommended!",
  },
  {
    name: "Sunita Agarwal",
    company: "Divine Agarbatti Works",
    rating: 5,
    review:
      "Their incense fragrances are truly premium. Our customers love the long-lasting aroma. M M Attarwala has been an invaluable partner for our business growth.",
  },
  {
    name: "Arjun Patel",
    company: "CleanWave Detergents",
    rating: 4,
    review:
      "Reliable delivery, excellent product quality, and always willing to create custom blends for our detergent line. A pleasure to work with every time.",
  },
  {
    name: "Fatima Sheikh",
    company: "Luxe Spa & Wellness",
    rating: 5,
    review:
      "The spa-grade aromatic compounds we get from M M Attarwala are skin-friendly and long-lasting. Our clients always compliment the signature fragrance.",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={i < rating ? "text-gold fill-[hsl(var(--gold))]" : "text-muted-foreground/30"}
      />
    ))}
  </div>
);

const TestimonialsSection = () => (
  <section id="testimonials" className="py-20 bg-card">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-gold font-body tracking-widest uppercase text-sm mb-3">
          Testimonials
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary mb-6">
          What Our Clients Say
        </h2>
        <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-background rounded-xl p-8 border border-border hover:border-gold/40 transition-colors relative"
          >
            <Quote className="text-gold/20 absolute top-6 right-6" size={36} />
            <StarRating rating={t.rating} />
            <p className="font-body text-muted-foreground leading-relaxed mb-6 italic">
              "{t.review}"
            </p>
            <div>
              <p className="font-body font-semibold text-secondary">{t.name}</p>
              <p className="font-body text-sm text-gold">{t.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
