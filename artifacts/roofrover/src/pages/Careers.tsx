import { motion } from "framer-motion";
import { Briefcase, Sparkles, Users, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { load, STORAGE_KEYS } from "@/lib/localCMS";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const defaultOpportunities = [
  { title: "Listing Agent", description: "Represent sellers and manage property listings, photos, and market positioning to attract buyers." },
  { title: "Property Photographer", description: "Capture high-quality images and staging photos that showcase each property's best features." },
  { title: "Virtual Tour Specialist", description: "Create immersive 3D and video tours to help buyers explore homes remotely." },
  { title: "Sales Agent", description: "Guide buyers through viewings, offers, and closings with exceptional service and market knowledge." },
  { title: "Customer Success Coordinator", description: "Support users and agents to ensure smooth bookings, inquiries, and post-sale follow-ups." },
  { title: "Marketing Manager", description: "Drive property marketing, paid campaigns, and partnerships to increase listing visibility." },
  { title: "Operations Manager", description: "Coordinate cross-functional teams, operations, and vendor relationships for seamless listings." },
  { title: "Market Analyst", description: "Track local market trends and provide insights to help buyers and sellers make informed decisions." },
  { title: "Content Specialist", description: "Create engaging property descriptions, neighborhood guides, and promotional materials." },
  { title: "Administrative Assistant", description: "Support the team with scheduling, documentation, and client communications." },
];

export default function Careers() {
  const [opportunities, setOpportunities] = useState(defaultOpportunities);

  useEffect(() => {
    try {
      const stored = load(STORAGE_KEYS.opportunities, []);
      if (stored && Array.isArray(stored) && stored.length > 0) {
        setOpportunities(stored);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#2D3E4A]">
      <Navbar />

      <div className="pt-24 bg-[#2D3E4A]">
        <div className="container mx-auto px-6 md:px-12 py-20 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">Join Our Team</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">Careers at RoofRover</h1>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-8" />
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              We are growing fast and looking for talented professionals in property services, listings, operations, and customer success.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] mb-16"
          >
            <div>
              <div className="inline-flex items-center gap-3 rounded-full bg-[#D4AF37]/10 px-4 py-2 text-[#2D3E4A] mb-6 text-sm font-semibold uppercase tracking-[0.2em]">
                <Sparkles className="w-4 h-4" /> Growth Roles
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D3E4A] mb-5">Work with a purpose-driven property team.</h2>
              <p className="text-[#282828]/75 leading-relaxed text-lg mb-6">
                RoofRover hires people passionate about homes, service, and local markets. If you love helping people find their perfect pad, we'd love to meet you.
              </p>
              <p className="text-[#282828]/75 leading-relaxed text-lg">
                Send your CV and introductory note to <a href="mailto:info@roofrover.com" className="text-[#2D3E4A] underline">info@roofrover.com</a> and reference "Careers" in the subject line.
              </p>
            </div>
              <div className="rounded-3xl bg-[#2D3E4A] p-8 text-white shadow-2xl">
              <div className="inline-flex items-center gap-3 mb-6">
                <Briefcase className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-sm uppercase tracking-[0.2em] font-semibold">Why work with us</span>
              </div>
              <ul className="space-y-4 text-sm leading-relaxed">
                <li>Collaborative, learner-first culture</li>
                <li>Real projects with enterprise and academic partners</li>
                <li>Professional development, mentorship and research support</li>
                <li>Flexible approach to remote and hybrid work</li>
              </ul>
            </div>
          </motion.section>

          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {opportunities.map((job) => (
              <motion.article
                key={job.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl transition"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-[#D4AF37]/10 text-[#2D3E4A] mb-6">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-[#2D3E4A] mb-3">{job.title}</h3>
                <p className="text-[#282828]/75 leading-relaxed mb-6 text-sm">{job.description}</p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-[#2D3E4A] font-semibold hover:text-[#D4AF37]">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.article>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
