import { CheckCircle } from "lucide-react";

const reasons = [
  "28+ years of expertise",
  "High-quality raw materials",
  "Advanced manufacturing facility",
  "Experienced workforce",
  "Reliable and timely delivery",
  "Multiple payment options (Cash, Credit Card, Cheque, DD)",
  "Customer-centric approach",
];

const WhyChooseUsSection = () => (
  <section id="why-us" className="py-20 bg-gradient-brown">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-gold font-body tracking-widest uppercase text-sm mb-3">Why Choose Us</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-cream mb-6">
          The M M Attarwala Advantage
        </h2>
        <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
        {reasons.map((r) => (
          <div key={r} className="flex items-start gap-3 bg-cream/5 backdrop-blur-sm rounded-xl p-5 border border-gold/10">
            <CheckCircle className="text-gold flex-shrink-0 mt-0.5" size={20} />
            <span className="font-body text-cream/90">{r}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUsSection;
