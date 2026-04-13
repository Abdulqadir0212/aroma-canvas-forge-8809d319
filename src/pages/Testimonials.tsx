import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Star, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTestimonials } from "@/hooks/useDynamicContent";
import { Skeleton } from "@/components/ui/skeleton";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={14} className={i < rating ? "text-gold fill-gold" : "text-muted-foreground/20"} />
    ))}
  </div>
);

const Testimonials = () => {
  const revealRef = useScrollReveal();
  const { data: testimonials, isLoading } = useTestimonials();

  return (
    <>
      <Navbar />
      <PageHeader subtitle="Reviews" title="What Our Customers Say" />
      <div ref={revealRef}>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-card rounded-xl p-6 border border-border">
                      <Skeleton className="h-4 w-24 mb-3" />
                      <Skeleton className="h-16 w-full mb-4" />
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  ))
                : testimonials?.map((t, i) => (
                    <div
                      key={t.id}
                      className="reveal-item opacity-0 translate-y-8 transition-all duration-700 bg-card rounded-xl p-6 border border-border relative"
                      style={{ transitionDelay: `${i * 80}ms` }}
                    >
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
