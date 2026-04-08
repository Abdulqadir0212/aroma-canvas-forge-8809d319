import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CheckCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

const reasons = [
  { title: "40+ Years of Expertise", description: "Established in 1984, we bring over four decades of experience in the synthetic perfumery industry." },
  { title: "High-Quality Raw Materials", description: "We source only from reliable vendors with a remarkable position in the market." },
  { title: "Advanced Manufacturing Facility", description: "State-of-the-art infrastructure equipped with modern tools and technology in Vadodara." },
  { title: "Experienced Workforce", description: "Our team of trained professionals ensures smooth production and strict quality control." },
  { title: "Reliable & Timely Delivery", description: "Spacious warehousing and dedicated logistics ensure your orders arrive on time." },
  { title: "Customized Solutions", description: "We create bespoke aromatic compounds tailored to your specific requirements." },
  { title: "Multiple Payment Options", description: "Flexible payments via Cash, Credit Card, Cheque, and Demand Draft." },
  { title: "Customer-Centric Approach", description: "We maintain cordial relations with clients and prioritize their satisfaction above all." },
];

const WhyChooseUs = () => {
  const revealRef = useScrollReveal();

  return (
    <>
      <Navbar />
      <PageHeader subtitle="Why Choose Us" title="The M M Attarwala Advantage" />

      <div ref={revealRef}>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <p className="text-center font-body text-muted-foreground max-w-2xl mx-auto mb-16 reveal-item opacity-0 translate-y-8 transition-all duration-700">
              We are counted amongst the prominent manufacturers and suppliers of a comprehensive range of Synthetic Perfumery Compounds and Aromatic Compounds, manufactured using premium grade raw material in compliance with global standards.
            </p>

            <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
              {reasons.map((r, i) => (
                <div
                  key={r.title}
                  className="reveal-item opacity-0 translate-y-8 transition-all duration-700 flex items-start gap-4 bg-card rounded-xl p-6 border border-border hover:border-gold/40 hover-scale"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <CheckCircle className="text-gold flex-shrink-0 mt-0.5" size={22} />
                  <div>
                    <p className="font-body font-semibold text-secondary mb-1">{r.title}</p>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">{r.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16 reveal-item opacity-0 translate-y-8 transition-all duration-700">
              <Link
                to="/contact"
                className="inline-block bg-gradient-gold text-secondary font-body font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default WhyChooseUs;
