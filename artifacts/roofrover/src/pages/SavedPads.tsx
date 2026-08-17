import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SavedPads() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#2D3E4A]">
      <Navbar />

      <header className="pt-24 bg-[#2D3E4A]">
        <div className="container mx-auto px-6 md:px-12 py-20 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">Saved</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">Saved Pads</h1>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-8" />
            <p className="text-white/80 max-w-2xl mx-auto">Your bookmarked properties and saved searches in one place.</p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1,2,3].map((n) => (
            <article key={n} className="rounded-3xl overflow-hidden bg-white shadow-md">
              <img src={`${import.meta.env.BASE_URL}gallery-house-${n}.png`} alt={`Saved ${n}`} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <h3 className="font-serif font-bold text-xl text-[#2D3E4A]">Cozy Bungalow</h3>
                  <Heart className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <p className="text-[#6C7A89] text-sm mb-4">3 bed • Pool • Great neighborhood</p>
                <Link href="/browse-homes/1" className="text-sm text-[#D4AF37] font-semibold inline-flex items-center gap-2">View <ArrowRight className="w-4 h-4"/></Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
