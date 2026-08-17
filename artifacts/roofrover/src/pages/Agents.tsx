import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, Star } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Agents() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#2D3E4A]">
      <Navbar />

      <header className="pt-24 bg-[#2D3E4A]">
        <div className="container mx-auto px-6 md:px-12 py-20 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">Agents</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">Meet Our Agents</h1>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-8" />
            <p className="text-white/80 max-w-2xl mx-auto">A network of experienced, licensed agents dedicated to selling and sourcing beautiful homes.</p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3].map((n) => (
            <div key={n} className="bg-white rounded-3xl p-6 shadow-md text-center">
              <div className="h-28 w-28 mx-auto mb-4 rounded-full bg-gray-100" />
              <h4 className="font-semibold text-[#2D3E4A]">Agent Name</h4>
              <p className="text-[#6C7A89] text-sm mb-4">Top-rated agent</p>
              <div className="inline-flex items-center gap-2 text-sm text-[#D4AF37]"><Star className="w-4 h-4"/> 4.9</div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
