import { motion } from "framer-motion";
import { ArrowRight, Shield, Code, BarChart3 } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { load, STORAGE_KEYS } from "@/lib/localCMS";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const defaultCases = [
  {
    icon: <Shield className="w-8 h-8 text-[#D4AF37]" />,
    category: "Sold",
    title: "Luxury Villa Sold Above Asking",
    summary: "A staged listing and targeted campaign resulted in multiple offers and a sale 12% above the listing price within 10 days.",
    stats: [
      { label: "Days on Market", value: "10" },
      { label: "Sale Price vs List", value: "+12%" },
      { label: "Offers Received", value: "7" },
    ],
    image: `${import.meta.env.BASE_URL}Hero-4.png`,
  },
  {
    icon: <Code className="w-8 h-8 text-[#D4AF37]" />,
    category: "Virtual Tour",
    title: "360° Virtual Tour Drove Remote Offers",
    summary: "A high-quality 3D tour increased remote viewings by 300% and converted online leads into serious buyers within 2 weeks.",
    stats: [
      { label: "Remote Views", value: "300%" },
      { label: "Leads Converted", value: "18" },
      { label: "Time to Offer", value: "2 weeks" },
    ],
    image: `${import.meta.env.BASE_URL}Hero-5.png`,
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-[#D4AF37]" />,
    category: "Market Insight",
    title: "Neighborhood Pricing Report",
    summary: "Our market analysis helped a seller price competitively and attracted the right buyer segment for a fast sale.",
    stats: [
      { label: "Area Covered", value: "5 neighborhoods" },
      { label: "Accuracy", value: "+95%" },
      { label: "Reduction in Days", value: "30%" },
    ],
    image: `${import.meta.env.BASE_URL}Hero-6.png`,
  },
];

export default function CaseStudies() {
  const [cases, setCases] = useState(defaultCases);
  const [media, setMedia] = useState<any[]>([]);

  useEffect(() => {
    try {
      // Load media library
      const storedMedia = load(STORAGE_KEYS.media, []);
      setMedia(storedMedia || []);

      // Load case studies
      const stored = load(STORAGE_KEYS.caseStudies, []);
      if (stored && Array.isArray(stored) && stored.length > 0) {
        setCases(stored.map((c: any) => ({
          ...c,
          icon: <BarChart3 className="w-8 h-8 text-[#D4AF37]" />,
          stats: c.stats || [],
        })));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#282828]">
      <Navbar />

      <div className="pt-24 bg-[#2D3E4A]">
        <div className="container mx-auto px-6 md:px-12 py-20 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">Proven Impact</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">Case Studies</h1>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-8" />
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Real results for sellers and agents. Explore how RoofRover helped properties sell faster and for better prices.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="py-24">
        <div className="container mx-auto px-6 md:px-12 space-y-16">
          {cases.map((c, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className={`flex flex-col ${idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 items-center bg-white shadow-sm overflow-hidden`}
            >
              <div className="w-full lg:w-5/12 relative">
                <img
                  src={c.mediaId ? media.find((m) => m.id === c.mediaId)?.dataUrl || c.image : c.image}
                  alt={c.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#2D3E4A] px-4 py-1.5">
                  <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">{c.category}</span>
                </div>
              </div>
              <div className="w-full lg:w-7/12 p-8 lg:p-12">
                <div className="mb-4">{c.icon}</div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2D3E4A] mb-5">{c.title}</h2>
                <p className="text-[#282828]/70 leading-relaxed mb-8">{c.summary}</p>
                <div className="grid grid-cols-3 gap-4 mb-8 border-t border-b border-gray-100 py-6">
                  {c.stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-2xl font-serif font-bold text-[#D4AF37]">{s.value}</div>
                      <div className="text-xs text-[#282828]/60 mt-1 uppercase tracking-wide">{s.label}</div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold hover:text-[#2D3E4A] transition-colors"
                >
                  Discuss a similar project <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <section className="bg-[#2D3E4A] py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5">Ready to write your success story?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">Let us understand your challenges and craft a solution tailored to your goals.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 font-semibold hover:bg-[#D4AF37] hover:text-[#2D3E4A] transition-all">
            Start a Conversation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
