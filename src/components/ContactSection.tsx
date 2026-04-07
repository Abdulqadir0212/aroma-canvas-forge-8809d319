import { Phone, Mail, MapPin, CreditCard } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="py-20 bg-card">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-gold font-body tracking-widest uppercase text-sm mb-3">Get In Touch</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary mb-6">
          Contact Us
        </h2>
        <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div className="space-y-6">
          <h3 className="font-heading text-2xl font-semibold text-secondary mb-4">M M Attarwala</h3>

          <div className="flex items-start gap-4">
            <Phone className="text-gold flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-body font-medium text-secondary">Phone</p>
              <p className="font-body text-muted-foreground">(Add your number)</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="text-gold flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-body font-medium text-secondary">Email</p>
              <p className="font-body text-muted-foreground">(Add email)</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="text-gold flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-body font-medium text-secondary">Address</p>
              <p className="font-body text-muted-foreground">(Add address)</p>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-2xl p-8 border border-border">
          <h3 className="font-heading text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
            <CreditCard className="text-gold" size={20} />
            Payment Modes
          </h3>
          <ul className="space-y-3 font-body text-muted-foreground">
            {["Cash", "Credit Card", "Cheque", "Demand Draft (DD)"].map((m) => (
              <li key={m} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-gold" />
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
