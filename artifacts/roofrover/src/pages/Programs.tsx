import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, UserCheck, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { load, STORAGE_KEYS } from "@/lib/localCMS";

const defaultPrograms = [
  { title: "Cybersecurity Certification", subtitle: "Hands-on security training for professionals and teams.", duration: "8 weeks" },
  { title: "Full-Stack Development Bootcamp", subtitle: "Build robust web and mobile applications from concept to launch.", duration: "10 weeks" },
  { title: "AI & Data Analytics", subtitle: "Learn intelligent systems, predictive modelling, and business insights.", duration: "6 weeks" },
  { title: "Cloud Infrastructure & DevOps", subtitle: "Design secure cloud architecture and deploy reliable platforms.", duration: "7 weeks" },
  { title: "Leadership in Tech Innovation", subtitle: "Develop strategic thinking for digital transformation initiatives.", duration: "5 weeks" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

type FormState = { name: string; email: string; phone: string; selectedProgram: string; message: string };

export default function Programs() {
  const [programs, setPrograms] = useState(defaultPrograms);
  const [selected, setSelected] = useState(defaultPrograms[0]?.title ?? "");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    selectedProgram: defaultPrograms[0]?.title ?? "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const stored = load(STORAGE_KEYS.programs, [] as any[]);
      if (stored && Array.isArray(stored) && stored.length > 0) {
        const nextPrograms = stored.map((prog: any) => ({
          title: prog.title || "Program",
          subtitle: prog.subtitle || "",
          duration: prog.duration || "TBD",
        }));
        setPrograms(nextPrograms);
        setSelected(nextPrograms[0]?.title ?? "");
        setForm((prev) => ({ ...prev, selectedProgram: nextPrograms[0]?.title ?? prev.selectedProgram }));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "selectedProgram") setSelected(value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#282828]">
      <Navbar />

      <div className="pt-24 bg-[#2D3E4A]">
        <div className="container mx-auto px-6 md:px-12 py-20 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">Join the Programme</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">Courses & Training</h1>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-8" />
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Explore our learning pathways and submit your application for the course that matches your career goals.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.95fr] mb-16">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full bg-[#D4AF37]/10 px-4 py-2 text-[#2D3E4A] mb-6 text-sm font-semibold uppercase tracking-[0.2em]">
                <BookOpen className="w-4 h-4" /> Featured Courses
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D3E4A] mb-5">Training designed for working professionals.</h2>
              <p className="text-[#282828]/75 leading-relaxed text-lg mb-8">
                Our programmes combine practical labs, specialist mentoring, and real-world case studies so candidates leave ready to apply new skills immediately.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {programs.map((program) => (
                  <motion.div
                    key={program.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl transition"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-[#2D3E4A]">{program.title}</h3>
                        <p className="text-sm text-[#475569] mt-1">{program.duration}</p>
                      </div>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#D4AF37]/20 text-[#2D3E4A]">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                    <p className="text-[#282828]/75 text-sm leading-relaxed">{program.subtitle}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-gray-200 bg-white p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <UserCheck className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-sm uppercase tracking-[0.2em] font-semibold text-[#2D3E4A]">Application Form</span>
              </div>
              {submitted ? (
                <div className="text-center py-14">
                  <h3 className="text-2xl font-semibold text-[#2D3E4A] mb-4">Application submitted</h3>
                  <p className="text-[#475569]">Thank you for applying. We will review your submission and reach out within 48 hours.</p>
                  <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-[#D4AF37] font-semibold hover:text-[#2D3E4A]">
                    Contact admissions <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-[#282828]/70 uppercase tracking-widest mb-2">Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-3xl border border-gray-200 bg-[#FBF9F5] px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#282828]/70 uppercase tracking-widest mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-3xl border border-gray-200 bg-[#FBF9F5] px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#282828]/70 uppercase tracking-widest mb-2">Phone Number *</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full rounded-3xl border border-gray-200 bg-[#FBF9F5] px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
                      placeholder="+234 812 519 1913"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#282828]/70 uppercase tracking-widest mb-2">Select Course *</label>
                    <select
                      name="selectedProgram"
                      value={form.selectedProgram}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-gray-200 bg-[#FBF9F5] px-4 py-3 text-sm outline-none focus:border-[#D4AF37]"
                    >
                      {programs.map((program) => (
                        <option key={program.title} value={program.title}>
                          {program.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#282828]/70 uppercase tracking-widest mb-2">Why are you applying?</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full rounded-3xl border border-gray-200 bg-[#FBF9F5] px-4 py-3 text-sm outline-none focus:border-[#D4AF37] resize-none"
                      placeholder="Tell us about your interest and goals"
                    />
                  </div>
                  <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-[#2D3E4A] px-6 py-3 text-white font-semibold hover:bg-[#D4AF37] transition-colors">
                    Submit Application <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
