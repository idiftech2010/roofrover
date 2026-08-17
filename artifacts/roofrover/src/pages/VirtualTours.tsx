import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { MonitorSmartphone, Play, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { load, STORAGE_KEYS } from "@/lib/localCMS";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function VirtualTours() {
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    try {
      const pages = load(STORAGE_KEYS.pages, []);
      const vtPage = (pages || []).find((p: any) => p.slug === "/virtual-tours");
      if (vtPage) setPage(vtPage);
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
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">Tours</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">{getSection("vt_heading", "Virtual Tours")}</h1>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-8" />
            <p className="text-white/80 max-w-2xl mx-auto">{getSection("vt_subtitle", "Take immersive 3D walkthroughs and cinematic tours from anywhere.")}</p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3].map((n) => (
            <article key={n} className="rounded-3xl overflow-hidden bg-white shadow-md">
              <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                <img src={`${import.meta.env.BASE_URL}gallery-house-${n}.png`} alt={`Tour ${n}`} className="w-full h-full object-cover absolute inset-0" />
                <div className="relative z-10">
                  <button className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#2D3E4A] px-4 py-2 rounded-full font-semibold">
                    <Play className="w-4 h-4"/> Watch Tour
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-xl text-[#2D3E4A] mb-2">Downtown Apartment Tour</h3>
                <p className="text-[#6C7A89] text-sm mb-4">Experience a full virtual walkthrough with hotspots and floor plans.</p>
                <Link href="/virtual-tours/1" className="text-sm text-[#D4AF37] font-semibold inline-flex items-center gap-2">Explore <ArrowRight className="w-4 h-4"/></Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
