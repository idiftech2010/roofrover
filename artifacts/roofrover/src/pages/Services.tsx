import { motion } from "framer-motion";
import { MonitorSmartphone, Lock, Globe, GraduationCap, Code, ShieldCheck, Cpu, BarChart3, Cloud, Network, Database, Layers } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { load, STORAGE_KEYS } from "@/lib/localCMS";
import { useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const serviceGroups = [
  {
    id: "software",
    icon: <MonitorSmartphone className="w-10 h-10 text-[#D4AF37]" />,
    title: "Software Development",
    tagline: "Building the digital infrastructure of tomorrow.",
    items: [
      { id: "custom-web-applications", icon: <Code className="w-5 h-5" />, name: "Custom Web Applications", desc: "Responsive, scalable web platforms built with modern frameworks." },
      { id: "mobile-hybrid-apps", icon: <Layers className="w-5 h-5" />, name: "Mobile & Hybrid Apps", desc: "Cross-platform mobile solutions for iOS and Android." },
      { id: "api-backend-engineering", icon: <Database className="w-5 h-5" />, name: "API & Backend Engineering", desc: "Robust, secure APIs and microservices architecture." },
      { id: "ai-automation-integration", icon: <Cpu className="w-5 h-5" />, name: "AI & Automation Integration", desc: "Smart automation and machine learning-powered systems." },
    ],
  },
  {
    id: "cybersecurity",
    icon: <Lock className="w-10 h-10 text-[#D4AF37]" />,
    title: "Cybersecurity Solutions",
    tagline: "Full-spectrum protection for your critical assets.",
    items: [
      { id: "red-team-operations", icon: <ShieldCheck className="w-5 h-5" />, name: "Red Team Operations", desc: "Simulated attacks and ethical hacking to expose vulnerabilities." },
      { id: "blue-team-defense", icon: <Network className="w-5 h-5" />, name: "Blue Team Defense", desc: "Continuous monitoring, threat hunting, and incident response." },
      { id: "grc-compliance", icon: <Lock className="w-5 h-5" />, name: "GRC & Compliance", desc: "Governance, Risk, and Compliance frameworks for your industry." },
      { id: "cloud-security-architecture", icon: <Cloud className="w-5 h-5" />, name: "Cloud Security Architecture", desc: "Secure cloud design, migration, and ongoing management." },
    ],
  },
  {
    id: "consulting",
    icon: <Globe className="w-10 h-10 text-[#D4AF37]" />,
    title: "IT Consultation & Training",
    tagline: "Strategic guidance and capability building.",
    items: [
      { id: "digital-transformation-strategy", icon: <BarChart3 className="w-5 h-5" />, name: "Digital Transformation Strategy", desc: "Roadmaps for modernizing legacy systems and processes." },
      { id: "it-infrastructure-design", icon: <Network className="w-5 h-5" />, name: "IT Infrastructure Design", desc: "End-to-end network and systems architecture planning." },
      { id: "professional-training-programs", icon: <Cpu className="w-5 h-5" />, name: "Professional Training Programs", desc: "Workforce upskilling in cybersecurity and emerging tech." },
      { id: "executive-tech-advisory", icon: <Globe className="w-5 h-5" />, name: "Executive Tech Advisory", desc: "CTO/CISO-level strategic advisory for leadership teams." },
    ],
  },
  {
    id: "academic",
    icon: <GraduationCap className="w-10 h-10 text-[#D4AF37]" />,
    title: "Academic Mentorship",
    tagline: "Shaping the next generation of tech leaders.",
    items: [
      { id: "bsc-supervision", icon: <GraduationCap className="w-5 h-5" />, name: "B.Sc. Supervision", desc: "Undergraduate research guidance in technology disciplines." },
      { id: "msc-supervision", icon: <GraduationCap className="w-5 h-5" />, name: "M.Sc. Supervision", desc: "Master's thesis support with industry-grade tools and feedback." },
      { id: "phd-mentorship", icon: <GraduationCap className="w-5 h-5" />, name: "Ph.D. Mentorship", desc: "Doctoral-level guidance from veteran researchers and practitioners." },
      { id: "research-publication-support", icon: <Code className="w-5 h-5" />, name: "Research Publication Support", desc: "Preparation and review for journal and conference submissions." },
    ],
  },
];

export default function Services() {
  const [localServices, setLocalServices] = useState<any[] | null>(null);

  useEffect(() => {
    try {
      const stored = load(STORAGE_KEYS.services, []);
      if (stored && Array.isArray(stored) && stored.length > 0) setLocalServices(stored as any[]);
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
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">What We Do</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">Our Services</h1>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-8" />
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              From cutting-edge software engineering to elite cybersecurity and transformative IT strategy, we deliver solutions that matter.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="py-24">
          <div className="container mx-auto px-6 md:px-12 space-y-24">
          {localServices ? (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {localServices.map((item) => (
                  <div key={item.id} className="bg-white p-7 border border-transparent hover:border-[#D4AF37]/40 hover:shadow-lg transition-all duration-300">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2D3E4A]/10 text-[#2D3E4A] mb-5">
                      <MonitorSmartphone className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif font-bold text-[#2D3E4A] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#282828]/70 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            serviceGroups.map((group, gi) => (
              <motion.div
                key={gi}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
              >
                <Link href={`/services/${group.id}`}>
                  <div className="flex items-center gap-4 mb-4 cursor-pointer group">
                    {group.icon}
                    <div className="group-hover:text-[#D4AF37] transition-colors">
                      <h2 className="text-3xl font-serif font-bold text-[#2D3E4A] group-hover:text-[#D4AF37]">{group.title}</h2>
                      <p className="text-[#6C7A89] font-medium">{group.tagline}</p>
                    </div>
                  </div>
                </Link>
                <div className="w-full h-px bg-[#D4AF37]/30 mb-10" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {group.items.map((item, ii) => (
                    <Link
                      key={item.id}
                      href={`/services/${group.id}/${item.id}`}
                      className="group"
                    >
                      <div className="bg-white p-7 border border-transparent hover:border-[#D4AF37]/40 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2D3E4A]/10 text-[#2D3E4A] mb-5 group-hover:bg-[#D4AF37] group-hover:text-white transition-colors duration-300">
                          {item.icon}
                        </div>
                        <h3 className="font-serif font-bold text-[#2D3E4A] mb-2">{item.name}</h3>
                        <p className="text-sm text-[#282828]/70 leading-relaxed">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>

      <section className="bg-[#2D3E4A] py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5">Not sure where to start?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">Schedule a free 30-minute consultation with one of our experts to identify the best path forward for your organisation.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 font-semibold hover:bg-[#D4AF37] hover:text-[#2D3E4A] transition-all">
            Book Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
