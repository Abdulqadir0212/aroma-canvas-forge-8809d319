import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <img
      src={heroBg}
      alt="Premium perfumery compounds"
      className="absolute inset-0 w-full h-full object-cover"
      width={1920}
      height={1080}
    />
    <div className="absolute inset-0 bg-gradient-brown opacity-70" />
    <div className="relative z-10 container mx-auto text-center px-4 py-32">
      <p className="animate-fade-in-up text-gold font-body tracking-[0.3em] uppercase text-sm mb-6">
        Established Since 1984
      </p>
      <h1 className="animate-fade-in-up-delay-1 font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-6">
        Premium Synthetic Perfumery
        <br />
        <span className="text-gradient-gold">&amp; Aromatic Compounds</span>
      </h1>
      <p className="animate-fade-in-up-delay-2 font-body text-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
        Delivering Quality Fragrance Solutions for Over 28 Years
      </p>
      <div className="animate-fade-in-up-delay-3 flex flex-wrap justify-center gap-4">
        <a
          href="#products"
          onClick={(e) => { e.preventDefault(); document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" }); }}
          className="bg-gradient-gold text-secondary font-body font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Explore Products
        </a>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
          className="border-2 border-gold text-gold font-body font-semibold px-8 py-3 rounded-lg hover:bg-gold/10 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;
