import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { House, MapPin, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { load, STORAGE_KEYS } from "@/lib/localCMS";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function BrowseHomes() {
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    try {
      const pages = load(STORAGE_KEYS.pages, []);
      const browsePage = (pages || []).find((p: any) => p.slug === "/browse");
      if (browsePage) setPage(browsePage);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const getSection = (id: string, fallback: string) => {
    return page?.sections?.find((s: any) => s.id === id)?.content || fallback;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#2D3E4A]">
      <Navbar />

      <header className="pt-24 bg-[#2D3E4A]">
        <div className="container mx-auto px-6 md:px-12 py-20 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">Properties</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">{getSection("browse_heading", "Browse Homes")}</h1>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-8" />
            <p className="text-white/80 max-w-2xl mx-auto">{getSection("browse_subtitle", "Explore curated listings across cities, neighborhoods and price ranges.")}</p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map((n) => (
            <article key={n} className="rounded-3xl overflow-hidden bg-white shadow-md">
              <img src={`${import.meta.env.BASE_URL}gallery-house-${n}.png`} alt={`Property ${n}`} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-serif font-bold text-xl text-[#2D3E4A] mb-2">Modern Family Home</h3>
                <p className="text-[#6C7A89] text-sm mb-4">3 bed • 2 bath • 1,800 sqft • Lagos</p>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-[#2D3E4A]">$420,000</div>
                  <Link href="/service-detail" className="text-sm text-[#D4AF37] font-semibold inline-flex items-center gap-2">View <ArrowRight className="w-4 h-4"/></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
