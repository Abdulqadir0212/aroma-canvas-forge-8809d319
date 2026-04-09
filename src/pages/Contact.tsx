import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Contact = () => {
  const revealRef = useScrollReveal();
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Hi, I'm ${formData.name}. ${formData.message} (Phone: ${formData.phone})`);
    window.open(`https://wa.me/919724586101?text=${msg}`, "_blank");
  };

  return (
    <>
      <Navbar />
      <PageHeader subtitle="Contact Us" title="Get in Touch" />
      <div ref={revealRef}>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
              <div className="reveal-item opacity-0 translate-y-8 transition-all duration-700">
                <h3 className="font-heading text-2xl font-bold text-secondary mb-6">We'd Love to Hear From You</h3>
                <p className="font-body text-muted-foreground mb-8 leading-relaxed">Whether you're looking for a specific fragrance or need a recommendation, our team is here to help.</p>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0"><Phone className="text-gold" size={18} /></div>
                    <div>
                      <p className="font-body font-semibold text-secondary text-sm">Phone</p>
                      <a href="tel:+919724586101" className="font-body text-muted-foreground text-sm hover:text-gold transition-colors">+91 97245 86101</a>
                      <p className="font-body text-xs text-muted-foreground mt-0.5">Mr. Mohd. Rafiq Attarwala</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0"><MessageCircle className="text-gold" size={18} /></div>
                    <div>
                      <p className="font-body font-semibold text-secondary text-sm">WhatsApp</p>
                      <a href="https://wa.me/919724586101" target="_blank" rel="noopener noreferrer" className="font-body text-muted-foreground text-sm hover:text-gold transition-colors">Chat with us on WhatsApp</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0"><MapPin className="text-gold" size={18} /></div>
                    <div>
                      <p className="font-body font-semibold text-secondary text-sm">Address</p>
                      <p className="font-body text-muted-foreground text-sm">Opp. Jamnabai Hospital, Near Nazarbaug, Mandvi, Vadodara – 390 017, Gujarat, India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0"><Clock className="text-gold" size={18} /></div>
                    <div>
                      <p className="font-body font-semibold text-secondary text-sm">Business Hours</p>
                      <p className="font-body text-muted-foreground text-sm">Mon – Sat: 10:00 AM – 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="reveal-item opacity-0 translate-y-8 transition-all duration-700">
                <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 border border-border">
                  <h3 className="font-heading text-xl font-bold text-secondary mb-6">Send Us a Message</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="font-body text-sm font-medium text-secondary mb-1.5 block">Your Name</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:border-gold transition-colors" placeholder="Enter your name" />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-secondary mb-1.5 block">Phone Number</label>
                      <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:border-gold transition-colors" placeholder="Enter your phone number" />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-secondary mb-1.5 block">Message</label>
                      <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Tell us what you're looking for..." />
                    </div>
                    <button type="submit" className="w-full bg-gradient-gold text-primary-foreground font-body font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      <MessageCircle size={18} />
                      Send via WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Contact;
