import { Sparkles, Home, Flame, Flower } from "lucide-react";

const categories = [
  {
    icon: Sparkles,
    title: "Personal Care & Cosmetics",
    items: ["Perfumes & Colognes", "Talcum Powder Fragrances", "Soap Fragrances"],
  },
  {
    icon: Home,
    title: "Home & Cleaning Products",
    items: ["Detergents & Fabric Softeners", "Industrial Cleaners", "Household Products"],
  },
  {
    icon: Flame,
    title: "Religious & Lifestyle",
    items: ["Dhoop & Agarbatti (Incense Sticks)", "Candles"],
  },
  {
    icon: Flower,
    title: "Specialty Applications",
    items: ["Spa Products", "Pan Masala & Supari Aromas"],
  },
];

const ProductsSection = () => (
  <section id="products" className="py-20 bg-card">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <p className="text-gold font-body tracking-widest uppercase text-sm mb-3">Our Products</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-secondary mb-6">
          Our Product Range
        </h2>
        <div className="w-20 h-1 bg-gradient-gold mx-auto rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="bg-background rounded-2xl p-8 border border-border hover:border-gold/40 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <cat.icon className="text-gold" size={24} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-secondary">{cat.title}</h3>
            </div>
            <ul className="space-y-3">
              {cat.items.map((item) => (
                <li key={item} className="flex items-center gap-3 font-body text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductsSection;
