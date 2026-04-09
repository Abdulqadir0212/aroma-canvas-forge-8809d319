import { Link } from "react-router-dom";
import { Phone, MapPin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-secondary py-14">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-10 mb-10">
        {/* Brand */}
        <div>
          <p className="font-heading text-xl font-bold text-primary-foreground mb-3">
            M M <span className="text-gold-light">Attarwala</span>
          </p>
          <p className="font-body text-primary-foreground/60 text-sm leading-relaxed">
            A trusted fragrance house offering curated, high-quality, long-lasting perfumes and attars since 1984.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <p className="font-body font-semibold text-primary-foreground mb-4 text-sm uppercase tracking-wider">Quick Links</p>
          <ul className="space-y-2">
            {[
              { label: "Home", to: "/" },
              { label: "Shop", to: "/products" },
              { label: "About Us", to: "/about" },
              { label: "Reviews", to: "/testimonials" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="font-body text-sm text-primary-foreground/50 hover:text-gold-light transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="font-body font-semibold text-primary-foreground mb-4 text-sm uppercase tracking-wider">Contact</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Phone size={16} className="text-gold-light mt-0.5 flex-shrink-0" />
              <a href="tel:+919724586101" className="font-body text-sm text-primary-foreground/50 hover:text-gold-light transition-colors">
                +91 97245 86101
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="text-gold-light mt-0.5 flex-shrink-0" />
              <span className="font-body text-sm text-primary-foreground/50">
                info@mmattarwala.com
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-gold-light mt-0.5 flex-shrink-0" />
              <span className="font-body text-sm text-primary-foreground/50">
                Opp. Jamnabai Hospital, Near Nazarbaug, Mandvi, Vadodara – 390 017, Gujarat
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 pt-6 text-center">
        <p className="font-body text-primary-foreground/30 text-xs">
          © {new Date().getFullYear()} M M Attarwala. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
