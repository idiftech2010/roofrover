import { motion } from "framer-motion";
import { Target, Eye, Heart, ArrowRight, Mail, Phone } from "lucide-react";
import { Link } from "wouter";
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { load, STORAGE_KEYS } from "@/lib/localCMS";

const BASE = import.meta.env.BASE_URL;

const defaultTeamMembers = [
  {
    name: "Idris Olanrewaju Ibraheem",
    position: "MD/CEO",
    email: "info@roofrover.com",
    phone: "+2348125191913",
    image: "/images/ceo_idris.png",
    id: "idris-olanrewaju",
    socials: [
      { label: "Twitter", icon: <FaXTwitter className="w-4 h-4" />, href: "https://x.com/roofrover" },
      { label: "Facebook", icon: <FaFacebookF className="w-4 h-4" />, href: "https://facebook.com/roofrover" },
      { label: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/roofrover" },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com/company/roofrover" },
    ],
  },
  {
    name: "Sumayyah Ibraheem",
    position: "Head of Property Verification",
    email: "sum.ibraheem@roofrover.com",
    phone: "+2348030000001",
    image: "/images/s_i.png",
    id: "sumayyah-ibraheem",
    socials: [
      { label: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/roofrover" },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com/company/roofrover" },
    ],
  },
  {
    name: "Layla Ahmed",
    position: "Head of Agent Training",
    email: "layla.ahmed@roofrover.com",
    phone: "+2348030000002",
    image: "/images/layla_training.png",
    id: "layla-ahmed",
    socials: [
      { label: "Twitter", icon: <FaXTwitter className="w-4 h-4" />, href: "https://x.com/roofrover" },
      { label: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/roofrover" },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com/company/roofrover" },
    ],
  },
  {
    name: "Yaasir Ibraheem",
    position: "Head of Market Insights",
    email: "yaasir.ibraheem@roofrover.com",
    phone: "+2348030000003",
    image: "/images/yaasir_ai.png",
    id: "yaasir-ibraheem",
    socials: [
      { label: "Twitter", icon: <FaXTwitter className="w-4 h-4" />, href: "https://x.com/roofrover" },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com/company/roofrover" },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  const [teamMembers, setTeamMembers] = useState(defaultTeamMembers);
  const [aboutPage, setAboutPage] = useState<any | null>(null);

  useEffect(() => {
    try {
      const pages = load(STORAGE_KEYS.pages, []);
      const about = (pages || []).find((p: any) => p.slug === "/about" || p.slug === "about");
      if (about) setAboutPage(about);

      const stored = load(STORAGE_KEYS.team, []);
      if (stored && Array.isArray(stored) && stored.length > 0) {
        setTeamMembers(
          stored.map((t: any) => ({
            name: t.name || t.title || "Team Member",
            position: t.role || t.position || "",
            email: t.email || "",
            phone: t.phone || "",
            image: t.photoId ? load(STORAGE_KEYS.media, []).find((m: any) => m.id === t.photoId)?.dataUrl : t.image || "",
            id: t.id || (t.name && t.name.toLowerCase().replace(/\s+/g, "-")) || Math.random().toString(36).slice(2, 8),
            socials: t.socials || [],
          }))
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#2D3E4A]">
      <Navbar />

      <div className="pt-24 bg-[#2D3E4A]">
        <div className="container mx-auto px-6 md:px-12 py-20 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">Who We Are</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              {aboutPage?.sections?.find((s: any) => s.title === "Heading")?.content || "About RoofRover"}
            </h1>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-8" />
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              {aboutPage?.sections?.find((s: any) => s.title === "Intro")?.content || "RoofRover is a modern real-estate platform that helps people discover, tour, and own contemporary properties. We connect curated listings, virtual tours, and trusted agents in one place."}
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Target className="w-8 h-8 text-[#D4AF37]" />, title: "Our Mission", text: aboutPage?.sections?.find((s: any) => s.title === "Mission")?.content || "Make property discovery effortless: accurate listings, immersive tours, and seamless bookings so users can find their perfect pad." },
              { icon: <Eye className="w-8 h-8 text-[#D4AF37]" />, title: "Our Vision", text: aboutPage?.sections?.find((s: any) => s.title === "Vision")?.content || "Be the leading modern real-estate platform for buyers, sellers and agents — trusted for transparency, service, and beautiful homes." },
              { icon: <Heart className="w-8 h-8 text-[#D4AF37]" />, title: "Our Values", text: aboutPage?.sections?.find((s: any) => s.title === "Values")?.content || "Integrity. Innovation. Inclusion. We believe diverse perspectives build better solutions — and that excellence has no boundaries." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 border border-gray-100 hover:border-[#D4AF37]/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-5">{item.icon}</div>
                <h3 className="font-serif font-bold text-xl text-[#2D3E4A] mb-3">{item.title}</h3>
                <p className="text-[#2D3E4A]/70 leading-relaxed text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FBF9F5]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">Our Team</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D3E4A] mb-4">Meet the people driving our mission</h2>
            <p className="mx-auto max-w-2xl text-[#2D3E4A]/70 text-lg leading-relaxed">
              Expert leadership and high-performing teams working across property listings, virtual tours, agent services, and customer experience.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teamMembers.map((member, idx) => (
              <Link key={`${member.name}-${idx}`} href={`/team/${member.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer h-full flex flex-col"
                >
                  <img src={member.image} alt={member.name} className="w-full h-48 object-contain bg-[#F8FAFB]" />
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] mb-1">{member.position}</p>
                    <h3 className="text-lg font-semibold text-[#2D3E4A] mb-3 line-clamp-2">{member.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <a
                        href={`mailto:${member.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-[#2D3E4A] transition hover:bg-[#D4AF37] hover:text-white"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <a
                        href={`tel:${member.phone?.replace(/[^+0-9]/g, "")}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-[#2D3E4A] transition hover:bg-[#D4AF37] hover:text-white"
                        aria-label={`Call ${member.name}`}
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="mt-auto flex flex-wrap items-center gap-2">
                      {member.socials?.map((social: any) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-[#2D3E4A] transition hover:bg-[#D4AF37] hover:text-white"
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#FBF9F5]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <div className="relative">
                <img src={`${BASE}mentorship.png`} alt="Agent Training" className="w-full h-auto shadow-2xl" />
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#2D3E4A] -z-10" />
                <div className="absolute -top-6 -left-6 w-28 h-28 border-2 border-[#D4AF37] -z-10" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">Empowering Real Estate Professionals</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D3E4A] mb-5 leading-tight">
                Agent Training & Market Excellence
              </h2>
              <div className="w-16 h-1 bg-[#D4AF37] mb-8" />
              <p className="text-lg text-[#282828]/75 mb-5 leading-relaxed">
                We believe in elevating the entire real estate industry. Our comprehensive agent training program equips real estate professionals with the latest market insights, technology, and best practices.
              </p>
              <p className="text-lg text-[#282828]/75 mb-8 leading-relaxed">
                From property verification to client communication strategies, we provide <strong className="text-[#2D3E4A]">continuous education and mentorship</strong> to help agents succeed in today's competitive market.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Market analysis and pricing strategy training",
                  "Virtual tour technology and digital marketing",
                  "Customer service excellence and deal closing",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[#282828]/80">
                    <Target className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 bg-[#2D3E4A] text-white px-8 py-4 font-semibold hover:bg-[#D4AF37] transition-colors"
              >
                Join Our Team <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#2D3E4A] text-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">Our Impact in Real Estate</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-5">Trusted by Thousands</h2>
            <p className="text-white/70 text-lg">From first-time homebuyers to seasoned investors, RoofRover is transforming how properties are discovered and sold.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            {[
              { value: "45K+", label: "Properties Listed" },
              { value: "120K+", label: "Successful Transactions" },
              { value: "98%", label: "Customer Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="py-8">
                <div className="text-5xl font-serif font-bold text-[#D4AF37] mb-2">{stat.value}</div>
                <div className="text-white/70 font-medium tracking-wide uppercase text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-white/10">
            <h3 className="text-2xl font-serif font-bold text-center mb-10">Why Choose RoofRover?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Advanced Technology", desc: "Virtual 3D tours, AI price estimators, and smart property matching" },
                { title: "Verified Listings", desc: "Every property is verified for accuracy, ownership, and legal compliance" },
                { title: "Expert Agents", desc: "Network of trained, professional agents committed to your success" },
                { title: "Transparent Pricing", desc: "No hidden fees, honest market valuations, and clear communication" },
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 transition">
                  <h4 className="text-lg font-semibold text-[#D4AF37] mb-2">{item.title}</h4>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
