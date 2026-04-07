import { Award, Users, Leaf, Heart } from "lucide-react";

const highlights = [
  { icon: Award, label: "28+ Years of Experience" },
  { icon: Heart, label: "High Purity & Long Shelf Life" },
  { icon: Users, label: "Custom Aroma Solutions" },
  { icon: Leaf, label: "Environment Friendly Products" },
];

const AboutSection = () => (
  <section id="about" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-gold font-body tracking-widest uppercase text-sm mb-3">About Us</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary mb-6">
          Crafting Excellence Since 1996
        </h2>
        <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="font-body text-muted-foreground leading-relaxed text-lg mb-6">
          M M Attarwala is a well-established name in the field of synthetic perfumery compounds and aromatic solutions. With over 28 years of industry experience, we specialize in manufacturing and supplying premium-grade fragrance compounds tailored to various applications.
        </p>
        <p className="font-body text-muted-foreground leading-relaxed">
          We use high-quality raw materials sourced from reliable vendors to ensure consistency and excellence. Our products are widely appreciated for their purity, reliability, skin-friendliness, and long-lasting fragrance. Our strong financial position and customer-focused approach have helped us build a loyal clientele across industries.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {highlights.map((h) => (
          <div key={h.label} className="bg-card rounded-xl p-6 text-center border border-border hover:border-gold/40 transition-colors group">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
              <h.icon className="text-gold" size={28} />
            </div>
            <p className="font-body font-medium text-secondary text-sm">{h.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
