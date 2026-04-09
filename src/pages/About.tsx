import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Award, Users, Leaf, Heart, Building2, User } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const highlights = [
  { icon: Award, label: "40+ Years of Experience" },
  { icon: Heart, label: "High Purity & Long Shelf Life" },
  { icon: Users, label: "Custom Aroma Solutions" },
  { icon: Leaf, label: "Environment Friendly Products" },
];

const About = () => {
  const revealRef = useScrollReveal();

  return (
    <>
      <Navbar />
      <PageHeader subtitle="About Us" title="Crafting Excellence Since 1984" />

      <div ref={revealRef}>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16">
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div className="reveal-item opacity-0 translate-y-8 transition-all duration-700">
                  <p className="font-body text-muted-foreground leading-relaxed text-lg mb-6">
                    Established in 1984, <strong className="text-secondary">M. M. Attarwala</strong> is a trusted fragrance house and one of the leading manufacturers of premium perfumery compounds, attars, and aromatic solutions. Based in Vadodara, Gujarat, we serve customers across Gujarat and Maharashtra.
                  </p>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    We are not a trendy brand — we are a mature, trust-driven fragrance house focused on quality, clarity, and long-term customer relationships. Every product is crafted using high-quality raw materials for purity and lasting performance.
                  </p>
                </div>

                <div className="space-y-6 reveal-item opacity-0 translate-y-8 transition-all duration-700">
                  <div className="bg-card rounded-xl p-6 border border-border hover-scale">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                        <User className="text-gold" size={28} />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-secondary text-lg">Mr. Mohd. Rafiq Attarwala</h3>
                        <p className="font-body text-gold text-sm">Founder & Proprietor</p>
                      </div>
                    </div>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">
                      Under the visionary leadership of Mr. Mohd. Rafiq Attarwala, M M Attarwala has grown from a small workshop to a trusted name in the fragrance industry, serving thousands of loyal customers.
                    </p>
                  </div>

                  <div className="bg-card rounded-xl p-6 border border-border hover-scale">
                    <div className="flex items-center gap-3 mb-4">
                      <Building2 className="text-gold" size={22} />
                      <h3 className="font-heading font-semibold text-secondary">Company Facts</h3>
                    </div>
                    <ul className="space-y-2 font-body text-sm text-muted-foreground">
                      <li className="flex justify-between"><span>Established</span><span className="text-secondary font-medium">1984</span></li>
                      <li className="flex justify-between"><span>Nature of Business</span><span className="text-secondary font-medium">Manufacturer & Retailer</span></li>
                      <li className="flex justify-between"><span>Target Market</span><span className="text-secondary font-medium">Gujarat & Maharashtra</span></li>
                      <li className="flex justify-between"><span>Location</span><span className="text-secondary font-medium">Vadodara, Gujarat</span></li>
                      <li className="flex justify-between"><span>GST No.</span><span className="text-secondary font-medium">24ABJPA6641D2Z4</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {highlights.map((h, i) => (
                <div
                  key={h.label}
                  className="reveal-item opacity-0 translate-y-8 transition-all duration-700 bg-card rounded-xl p-6 text-center border border-border hover:border-gold/30 hover-scale group"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <h.icon className="text-gold" size={28} />
                  </div>
                  <p className="font-body font-medium text-secondary text-sm">{h.label}</p>
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

export default About;
