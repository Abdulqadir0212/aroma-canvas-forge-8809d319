import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FlaskConical, Warehouse, Package, Truck, ShieldCheck, Ruler } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import labImg from "@/assets/lab.jpg";

const qualities = [
  { icon: FlaskConical, label: "Dedicated Laboratory Testing", description: "Every product undergoes stringent quality testing on predefined parameters." },
  { icon: Package, label: "Secure & Custom Packaging", description: "Products are packaged with care using customized packaging solutions." },
  { icon: Warehouse, label: "Spacious Warehousing", description: "600 sq ft permanent facility in an urban location in Vadodara." },
  { icon: Truck, label: "Timely Delivery", description: "Reliable and timely delivery across the Indian subcontinent." },
  { icon: ShieldCheck, label: "Quality Measures", description: "Good Financial Position & TQM with dedicated quality testing facilities." },
  { icon: Ruler, label: "Industry Standards", description: "Products manufactured in compliance with global standards of quality." },
];

const Infrastructure = () => {
  const revealRef = useScrollReveal();

  return (
    <>
      <Navbar />
      <PageHeader subtitle="Infrastructure & Quality" title="State-of-the-Art Facility" />

      <div ref={revealRef}>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto mb-20">
              <div className="reveal-item opacity-0 translate-y-8 transition-all duration-700 rounded-2xl overflow-hidden border border-border hover-scale">
                <img src={labImg} alt="Our laboratory facility" loading="lazy" width={1280} height={720} className="w-full h-auto" />
              </div>
              <div className="reveal-item opacity-0 translate-y-8 transition-all duration-700 delay-200">
                <p className="font-body text-muted-foreground leading-relaxed mb-6">
                  We have established a state-of-the-art infrastructure equipped with advanced tools and modern technology. Our permanent building facility, located in Vadodara, is designed for efficient manufacturing and quality control.
                </p>
                <p className="font-body text-muted-foreground leading-relaxed mb-6">
                  The unit is manned by our team of trained and experienced professionals. Our range of products is tested on pre-determined quality testing parameters at our laboratory. Our spacious warehousing and packaging personnel ensure safe and timely delivery.
                </p>
                <p className="font-body text-muted-foreground leading-relaxed">
                  We are backed by a top-of-the-line infrastructure comprising the latest machines, enabling us to offer a vast product range in bulk quantities.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {qualities.map((q, i) => (
                <div
                  key={q.label}
                  className="reveal-item opacity-0 translate-y-8 transition-all duration-700 flex items-start gap-4 p-6 rounded-xl bg-card border border-border hover:border-gold/40 hover-scale"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <q.icon className="text-gold" size={20} />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-secondary text-sm mb-1">{q.label}</p>
                    <p className="font-body text-muted-foreground text-xs leading-relaxed">{q.description}</p>
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

export default Infrastructure;
