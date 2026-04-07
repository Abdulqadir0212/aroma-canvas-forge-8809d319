import { FlaskConical, Warehouse, Package, Truck } from "lucide-react";
import labImg from "@/assets/lab.jpg";

const qualities = [
  { icon: FlaskConical, label: "Dedicated Laboratory Testing" },
  { icon: Package, label: "Secure Packaging" },
  { icon: Warehouse, label: "Spacious Warehousing" },
  { icon: Truck, label: "Timely Delivery" },
];

const InfrastructureSection = () => (
  <section id="infrastructure" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-gold font-body tracking-widest uppercase text-sm mb-3">Infrastructure & Quality</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary mb-6">
          State-of-the-Art Facility
        </h2>
        <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        <div className="rounded-2xl overflow-hidden border border-border">
          <img src={labImg} alt="Our laboratory facility" loading="lazy" width={1280} height={720} className="w-full h-auto" />
        </div>
        <div>
          <p className="font-body text-muted-foreground leading-relaxed mb-6">
            We have developed a state-of-the-art infrastructure equipped with advanced tools and modern technology. Our team of skilled professionals ensures smooth production and strict quality control.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            Every product is tested on predefined parameters to maintain consistent standards and ensure customer satisfaction.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {qualities.map((q) => (
              <div key={q.label} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                <q.icon className="text-gold flex-shrink-0" size={20} />
                <span className="font-body text-sm text-secondary font-medium">{q.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default InfrastructureSection;
