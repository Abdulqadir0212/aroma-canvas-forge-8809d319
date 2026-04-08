import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { X } from "lucide-react";

import shopInterior from "@/assets/gallery/shop-interior.jpg";
import attarCollection from "@/assets/gallery/attar-collection.jpg";
import manufacturing from "@/assets/gallery/manufacturing.jpg";
import roseIngredients from "@/assets/gallery/rose-ingredients.jpg";
import crystalBottles from "@/assets/gallery/crystal-bottles.jpg";
import incenseProducts from "@/assets/gallery/incense-products.jpg";
import essentialOils from "@/assets/gallery/essential-oils.jpg";
import giftPackaging from "@/assets/gallery/gift-packaging.jpg";
import storefront from "@/assets/gallery/storefront.jpg";
import qualityTesting from "@/assets/gallery/quality-testing.jpg";
import warehouse from "@/assets/gallery/warehouse.jpg";

const categories = ["All", "Products", "Shop", "Manufacturing", "Packaging"] as const;

type Category = (typeof categories)[number];

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  category: Category;
}

const galleryImages: GalleryImage[] = [
  { src: shopInterior, alt: "M M Attarwala shop interior with perfume bottles", title: "Our Showroom", category: "Shop" },
  { src: attarCollection, alt: "Traditional attar collection in crystal bottles", title: "Premium Attar Collection", category: "Products" },
  { src: storefront, alt: "M M Attarwala storefront in Mandvi, Vadodara", title: "Our Store – Mandvi, Vadodara", category: "Shop" },
  { src: crystalBottles, alt: "Ornate crystal glass bottles for attars", title: "Crystal Glass Bottles", category: "Products" },
  { src: manufacturing, alt: "Copper distillation units for perfume manufacturing", title: "Distillation Unit", category: "Manufacturing" },
  { src: roseIngredients, alt: "Rose petals and essential oils for perfumery", title: "Natural Rose Ingredients", category: "Products" },
  { src: essentialOils, alt: "Essential oils in amber bottles", title: "Essential Oils Range", category: "Products" },
  { src: incenseProducts, alt: "Incense sticks and dhoop cones", title: "Agarbatti & Dhoop", category: "Products" },
  { src: giftPackaging, alt: "Premium perfume gift packaging", title: "Gift Packaging", category: "Packaging" },
  { src: qualityTesting, alt: "Quality testing in laboratory", title: "Quality Control Lab", category: "Manufacturing" },
  { src: warehouse, alt: "Perfume compound storage warehouse", title: "Storage & Warehouse", category: "Manufacturing" },
  { src: perfumeSprays, alt: "Luxury perfume bottles on display shelf", title: "Perfume Spray Collection", category: "Products" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <PageHeader subtitle="Our Gallery" title="A Visual Journey" />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-body transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gold text-secondary font-semibold shadow-lg"
                    : "bg-brown-light/30 text-cream/70 hover:bg-gold/20 hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, idx) => (
              <div
                key={img.title}
                className="break-inside-avoid group cursor-pointer overflow-hidden rounded-xl border border-gold/10 hover:border-gold/30 transition-all duration-500"
                onClick={() => setLightbox(idx)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <div>
                      <p className="text-gold font-heading text-lg font-semibold">{img.title}</p>
                      <span className="text-cream/60 text-xs font-body">{img.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-secondary/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-cream/80 hover:text-gold transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-4xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
            />
            <p className="text-center text-gold font-heading text-xl mt-4">
              {filtered[lightbox].title}
            </p>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Gallery;
