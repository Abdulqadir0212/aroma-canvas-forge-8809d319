import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Reviews", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="font-heading text-xl md:text-2xl font-bold text-secondary">
          M M <span className="text-gold">Attarwala</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                to={l.href}
                className={`text-sm font-body font-medium transition-colors ${
                  location.pathname === l.href
                    ? "text-gold"
                    : "text-foreground/70 hover:text-gold"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/products"
            className="hidden md:inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground font-body font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            <ShoppingBag size={16} />
            Shop Now
          </Link>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-border pb-4 animate-fade-in-up">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setOpen(false)}
              className={`block w-full text-left px-6 py-3 font-body text-sm transition-colors ${
                location.pathname === l.href
                  ? "text-gold font-semibold bg-muted/50"
                  : "text-foreground/70 hover:text-gold hover:bg-muted/30"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="px-6 pt-3">
            <Link
              to="/products"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-gradient-gold text-primary-foreground font-body font-semibold text-sm px-5 py-2.5 rounded-lg"
            >
              <ShoppingBag size={16} />
              Shop Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
