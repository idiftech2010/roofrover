import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { load, STORAGE_KEYS } from "@/lib/localCMS";

const BASE = import.meta.env.BASE_URL;

const defaultGallery = [
  { src: `${BASE}gallery-house-1.png`, category: "Estates", title: "Modern Waterfront Villa", desc: "Spacious villa with panoramic water views." },
  { src: `${BASE}gallery-house-2.png`, category: "Estates", title: "Contemporary City Penthouse", desc: "Luxury penthouse in the heart of the city." },
  { src: `${BASE}gallery-house-3.png`, category: "Interiors", title: "Designer Interiors", desc: "High-end finishes and open-plan living." },
  { src: `${BASE}gallery-house-4.png`, category: "Exteriors", title: "Landscaped Grounds", desc: "Private gardens and outdoor entertainment areas." },
  { src: `${BASE}gallery-house-5.png`, category: "Estates", title: "Secluded Country Estate", desc: "Privacy and luxury on sprawling grounds." },
  { src: `${BASE}Hero-4.png`, category: "Interiors", title: "Luxury Living Room", desc: "Opulent living spaces designed for comfort." },
  { src: `${BASE}Hero-5.png`, category: "Interiors", title: "Contemporary Kitchen", desc: "State-of-the-art kitchen amenities." },
  { src: `${BASE}Hero-6.png`, category: "Exteriors", title: "Modern Facade", desc: "Clean architectural lines and premium materials." },
  { src: `${BASE}Hero-3.png`, category: "Estates", title: "Premium Residence", desc: "Thoughtfully designed layouts and finishes." },
];

export default function Gallery() {
  const [mediaItems, setMediaItems] = useState<any[] | null>(null);
  const [mediaLibrary, setMediaLibrary] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    try {
      // Load media library first
      const storedMedia = load(STORAGE_KEYS.media, []);
      setMediaLibrary(storedMedia || []);

      // Load gallery items
      const storedGallery = load(STORAGE_KEYS.gallery, [] as any[]);
      if (storedGallery && Array.isArray(storedGallery) && storedGallery.length > 0) {
        setMediaItems(storedGallery.map((g: any) => ({
          ...g,
          src: g.mediaId ? storedMedia.find((m: any) => m.id === g.mediaId)?.dataUrl || g.src : g.src,
          category: g.category || "General",
          title: g.title || "Gallery Item",
          desc: g.desc || "",
        })));
        return;
      }

      const stored = load(STORAGE_KEYS.media, []);
      if (stored && Array.isArray(stored) && stored.length > 0) {
        setMediaItems(stored.filter((m: any) => m.type.startsWith("image/")).map((m: any) => ({ src: m.dataUrl, category: "Media", title: m.name, desc: "" })));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const items = mediaItems && mediaItems.length > 0 ? mediaItems : defaultGallery;

  const categories = ["All", ...Array.from(new Set(items.map((g) => g.category)))];

  const filtered = activeCategory === "All" ? items : items.filter((g) => g.category === activeCategory);

  function prev() {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }
  function next() {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#282828]">
      <Navbar />

      <div className="pt-24 bg-[#2D3E4A]">
        <div className="container mx-auto px-6 md:px-12 py-20 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">Our Work & Community</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">Gallery</h1>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-8" />
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              A visual showcase of our projects, training programs, and the diverse global community we serve.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-sm font-semibold transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-[#2D3E4A] text-white border-[#2D3E4A]"
                    : "bg-white text-[#282828] border-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((item, idx) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
                onClick={() => setLightboxIndex(idx)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D3E4A]/90 via-[#2D3E4A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-1">{item.category}</span>
                  <h3 className="text-white font-serif font-bold text-lg leading-tight">{item.title}</h3>
                  <p className="text-white/70 text-sm mt-1 leading-snug">{item.desc}</p>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-[#2D3E4A] text-[#D4AF37] text-xs font-bold px-3 py-1 tracking-wide uppercase">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-5 right-5 text-white/70 hover:text-white p-2"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="w-7 h-7" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <div
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].title}
                className="w-full max-h-[75vh] object-contain"
              />
              <div className="mt-4 text-center">
                <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">{filtered[lightboxIndex].category}</span>
                <h3 className="text-white font-serif font-bold text-xl mt-1">{filtered[lightboxIndex].title}</h3>
                <p className="text-white/60 text-sm mt-1">{filtered[lightboxIndex].desc}</p>
              </div>
            </div>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
