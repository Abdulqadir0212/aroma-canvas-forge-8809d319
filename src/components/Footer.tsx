const Footer = () => (
  <footer className="bg-secondary py-10 border-t border-gold/20">
    <div className="container mx-auto px-4 text-center">
      <p className="font-heading text-xl font-bold text-gold mb-2">M M Attarwala</p>
      <p className="font-body text-cream/60 text-sm">
        Premium Synthetic Perfumery & Aromatic Compounds
      </p>
      <div className="w-16 h-px bg-gold/30 mx-auto my-6" />
      <p className="font-body text-cream/40 text-xs">
        © {new Date().getFullYear()} M M Attarwala. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
