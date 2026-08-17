import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Tag, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { load, STORAGE_KEYS } from "@/lib/localCMS";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Sell() {
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    try {
      const pages = load(STORAGE_KEYS.pages, []);
      const sellPage = (pages || []).find((p: any) => p.slug === "/sell");
      if (sellPage) setPage(sellPage);
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
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">Sell</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">{getSection("sell_heading", "Sell Your Property")}</h1>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-8" />
            <p className="text-white/80 max-w-2xl mx-auto">{getSection("sell_subtitle", "Get market-leading exposure and a dedicated agent to help you close quickly.")}</p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-md">
            <h3 className="font-serif font-bold text-2xl text-[#2D3E4A] mb-4">{getSection("sell_list_title", "List with RoofRover")}</h3>
            <p className="text-[#6C7A89] mb-6">{getSection("sell_list_desc", "Fill out a quick form and one of our agents will reach out to schedule a valuation and photoshoot.")}</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#2D3E4A] px-6 py-3 rounded-full font-semibold">{getSection("sell_list_cta", "Get Started")} <ArrowRight className="w-4 h-4"/></Link>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-md">
            <h4 className="font-semibold text-[#2D3E4A] mb-3">{getSection("sell_resources_heading", "Seller Resources")}</h4>
            <ul className="text-[#6C7A89] space-y-3 text-sm">
              <li>{getSection("sell_resource_1", "Free valuation")}</li>
              <li>{getSection("sell_resource_2", "Professional photography")}</li>
              <li>{getSection("sell_resource_3", "Agent matching")}</li>
              <li>{getSection("sell_resource_4", "Fast listings syndication")}</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
