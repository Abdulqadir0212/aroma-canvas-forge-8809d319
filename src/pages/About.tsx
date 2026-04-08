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
                    Established in the year 1984, <strong className="text-secondary">M. M. Attarwala</strong> is one of the leading manufacturers and suppliers of an extensive array of Synthetic Perfumery Compounds and Aromatic Compounds. Based in Vadodara, Gujarat, we have been serving the fragrance industry for over 40 years with unwavering commitment to quality.
                  </p>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    We use high-quality raw materials sourced from reliable vendors to ensure consistency and excellence. Our products are widely appreciated for their purity, reliability, skin-friendliness, and long-lasting fragrance. Our strong financial position and customer-focused approach have helped us build a loyal clientele across the Indian subcontinent.
                  </p>
                </div>

                <div className="space-y-6 reveal-item opacity-0 translate-y-8 transition-all duration-700 delay-200">
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
                      Under the visionary leadership of Mr. Mohd. Rafiq Attarwala, M. M. Attarwala has grown from a small workshop to a trusted name in the synthetic perfumery industry, serving clients across the Indian subcontinent.
                    </p>
                  </div>

                  <div className="bg-card rounded-xl p-6 border border-border hover-scale">
                    <div className="flex items-center gap-3 mb-4">
                      <Building2 className="text-gold" size={22} />
                      <h3 className="font-heading font-semibold text-secondary">Company Facts</h3>
                    </div>
                    <ul className="space-y-2 font-body text-sm text-muted-foreground">
                      <li className="flex justify-between"><span>Established</span><span className="text-secondary font-medium">1984</span></li>
                      <li className="flex justify-between"><span>Nature of Business</span><span className="text-secondary font-medium">Manufacturer & Supplier</span></li>
                      <li className="flex justify-between"><span>Legal Status</span><span className="text-secondary font-medium">Proprietorship</span></li>
                      <li className="flex justify-between"><span>Location</span><span className="text-secondary font-medium">Vadodara, Gujarat</span></li>
                      <li className="flex justify-between"><span>Major Markets</span><span className="text-secondary font-medium">Indian Subcontinent</span></li>
                      <li className="flex justify-between"><span>GST No.</span><span className="text-secondary font-medium">24ABJPA6641D2Z4</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto text-center mb-16 reveal-item opacity-0 translate-y-8 transition-all duration-700">
              <h3 className="font-heading text-2xl font-semibold text-secondary mb-4">Our Team</h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                Our team is the backbone of our organization. We have employed diligent professionals after strict examination of their skills and experience. These employees work in close coordination to achieve organizational goals, maintain cordial relations with clients, and manufacture a supreme quality range. Regular training keeps our team updated with the latest industry standards.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {highlights.map((h, i) => (
                <div
                  key={h.label}
                  className={`reveal-item opacity-0 translate-y-8 transition-all duration-700 bg-card rounded-xl p-6 text-center border border-border hover:border-gold/40 hover-scale group`}
                  style={{ transitionDelay: `${i * 100}ms` }}
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
