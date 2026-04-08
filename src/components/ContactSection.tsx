import { useState } from "react";
import { Phone, Mail, MapPin, CreditCard, Send, Clock } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const productOptions = [
  "Perfumes & Colognes",
  "Attars & Fragrances",
  "Talcum Powder Fragrances",
  "Soap Fragrances",
  "Cream & Lotion Aroma",
  "Detergents & Fabric Softeners",
  "Industrial Cleaners",
  "Dhoop & Agarbatti (Incense Sticks)",
  "Candles",
  "Spa Products",
  "Pan Masala & Supari Aromas",
  "Crystal Glass Bottles",
  "Other",
];

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20, "Phone too long").regex(/^[+\d\s()-]+$/, "Invalid phone number"),
  product: z.string().min(1, "Please select a product"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message too long"),
});

type EnquiryForm = z.infer<typeof enquirySchema>;

const ContactSection = () => {
  const [form, setForm] = useState<EnquiryForm>({ name: "", email: "", phone: "", product: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof EnquiryForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = enquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof EnquiryForm, string>> = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof EnquiryForm;
        if (!fieldErrors[key]) fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Enquiry submitted! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", product: "", message: "" });
      setErrors({});
    }, 1000);
  };

  const inputClass = (field: keyof EnquiryForm) =>
    `w-full rounded-lg border px-4 py-3 font-body text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors ${
      errors[field] ? "border-destructive" : "border-border"
    }`;

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-gold font-body tracking-widest uppercase text-sm mb-3">Get In Touch</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary mb-6">Contact Us</h2>
          <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-heading text-2xl font-semibold text-secondary mb-4">M. M. Attarwala</h3>

            <div className="flex items-start gap-4">
              <Phone className="text-gold flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="font-body font-medium text-secondary">Contact Person</p>
                <p className="font-body text-muted-foreground">Mr. Mohd. Rafiq Attarwala</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="text-gold flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="font-body font-medium text-secondary">Address</p>
                <p className="font-body text-muted-foreground">
                  Opposite Jamnabai Hospital,<br />
                  Near Nazarbaug, Mandvi,<br />
                  Vadodara, Gujarat – 390 017, India
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="text-gold flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="font-body font-medium text-secondary">Business Hours</p>
                <p className="font-body text-muted-foreground">Mon – Sat: 9:00 AM – 7:00 PM</p>
              </div>
            </div>

            <div className="bg-background rounded-2xl p-6 border border-border mt-6">
              <h3 className="font-heading text-lg font-semibold text-secondary mb-3 flex items-center gap-2">
                <CreditCard className="text-gold" size={18} />
                Payment Modes
              </h3>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                {["Cash", "Credit Card", "Cheque", "Demand Draft (DD)"].map((m) => (
                  <li key={m} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden border border-border mt-4">
              <iframe
                title="M M Attarwala Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.169!2d73.2!3d22.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMandvi%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="lg:col-span-3">
            <div className="bg-background rounded-2xl p-8 border border-border">
              <h3 className="font-heading text-xl font-semibold text-secondary mb-6">Product Enquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name *" className={inputClass("name")} />
                    {errors.name && <p className="text-destructive text-xs mt-1 font-body">{errors.name}</p>}
                  </div>
                  <div>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address *" className={inputClass("email")} />
                    {errors.email && <p className="text-destructive text-xs mt-1 font-body">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone Number *" className={inputClass("phone")} />
                    {errors.phone && <p className="text-destructive text-xs mt-1 font-body">{errors.phone}</p>}
                  </div>
                  <div>
                    <select name="product" value={form.product} onChange={handleChange} className={inputClass("product")}>
                      <option value="">Select Product Interest *</option>
                      {productOptions.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    {errors.product && <p className="text-destructive text-xs mt-1 font-body">{errors.product}</p>}
                  </div>
                </div>

                <div>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message *" rows={4} className={inputClass("message")} />
                  {errors.message && <p className="text-destructive text-xs mt-1 font-body">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-gold text-secondary font-body font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                >
                  <Send size={16} />
                  {submitting ? "Sending..." : "Send Enquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
