import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { load, STORAGE_KEYS } from "@/lib/localCMS";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

type FormState = { name: string; email: string; company: string; subject: string; message: string };

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [cmsContact, setCmsContact] = useState<any | null>(null);

  useEffect(() => {
    try {
      const pages = load(STORAGE_KEYS.pages, []);
      const contactPage = (pages || []).find((p: any) => p.slug === "/contact" || p.slug === "contact");
      if (contactPage) setCmsContact(contactPage);
    } catch (e) {
      console.error(e);
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
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
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">Reach Out</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">Contact Us</h1>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-8" />
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              {cmsContact?.sections?.[0]?.content || "Whether you want to list a property, schedule a viewing, or speak with an agent — we're here to help you find your perfect pad."}
            </p>
          </motion.div>
        </div>
      </div>

      <main className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-8"
            >
              <div>
                  <h2 className="text-2xl font-serif font-bold text-[#2D3E4A] mb-6">Get In Touch</h2>
                <p className="text-[#282828]/70 leading-relaxed text-sm">
                  Our team of experts is ready to discuss your needs. Fill in the form or reach us directly via the contact details below.
                </p>
              </div>
              {[
                { icon: <MapPin className="w-5 h-5 text-[#D4AF37]" />, label: "Address", value: "123 Idris Ibraheem Drive, Lagos, Nigeria" },
                { icon: <Mail className="w-5 h-5 text-[#D4AF37]" />, label: "Email", value: "info@roofrover.com", href: "mailto:info@roofrover.com" },
                { icon: <Phone className="w-5 h-5 text-[#D4AF37]" />, label: "Phone", value: "+2348125191913", href: "tel:+2348125191913" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2D3E4A]/10 shrink-0 mt-0.5">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-0.5">{c.label}</p>
                      {c.href ? (
                      <a href={c.href} className="text-[#282828] hover:text-[#D4AF37] transition-colors text-sm">{c.value}</a>
                    ) : (
                      <p className="text-[#282828] text-sm">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <a
                href="https://wa.me/2348004365267"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 font-semibold text-sm hover:bg-[#1ebe5d] transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" /> Chat on WhatsApp
              </a>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="lg:col-span-2 bg-white p-10 shadow-sm"
            >
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-7 h-7 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#2D3E4A] mb-3">Message Received</h3>
                  <p className="text-[#282828]/70">Thank you for reaching out. A member of our team will respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-serif font-bold text-[#2D3E4A] mb-6">Send a Message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#282828]/60 uppercase tracking-widest mb-2">Full Name *</label>
                      <input
                        name="name" required value={form.name} onChange={handleChange}
                        className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors bg-[#FBF9F5]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#282828]/60 uppercase tracking-widest mb-2">Email Address *</label>
                      <input
                        type="email" name="email" required value={form.email} onChange={handleChange}
                        className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors bg-[#FBF9F5]"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#282828]/60 uppercase tracking-widest mb-2">Company / Institution</label>
                      <input
                        name="company" value={form.company} onChange={handleChange}
                        className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors bg-[#FBF9F5]"
                        placeholder="Organisation name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#282828]/60 uppercase tracking-widest mb-2">Subject *</label>
                      <select
                        name="subject" required value={form.subject} onChange={handleChange}
                        className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors bg-[#FBF9F5] text-[#282828]"
                      >
                        <option value="">Select a topic</option>
                        <option>General Inquiry</option>
                        <option>List a Property</option>
                        <option>Schedule a Viewing</option>
                        <option>Agent Inquiry</option>
                        <option>Report Listing</option>
                        <option>General Inquiry</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#282828]/60 uppercase tracking-widest mb-2">Message *</label>
                    <textarea
                      name="message" required value={form.message} onChange={handleChange}
                      rows={5}
                      className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] transition-colors bg-[#FBF9F5] resize-none"
                      placeholder="Describe your needs or inquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 bg-[#2D3E4A] text-white px-8 py-4 font-semibold hover:bg-[#D4AF37] transition-colors"
                  >
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-16 overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm"
          >
            <div className="p-8">
              <h2 className="text-2xl font-serif font-bold text-[#2D3E4A] mb-4">Our Location</h2>
              <p className="text-[#282828]/70 mb-6 text-sm">
                Visit us at our Lagos office or use the map below to find your way.
              </p>
            </div>
            <iframe
              title="RoofRover Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=3.3125%2C6.435%2C3.3925%2C6.495&layer=mapnik&marker=6.465%2C3.352"
              className="h-96 w-full border-t border-gray-200"
              loading="lazy"
            />
            <div className="p-6 border-t border-gray-200 bg-[#FBF9F5] text-sm text-[#6C7A89]">
              <a
                href="https://www.openstreetmap.org/?mlat=6.465&mlon=3.352#map=14/6.4650/3.3520"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#2D3E4A] hover:text-[#D4AF37]"
              >
                View larger map
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
