import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Shield, Globe, MonitorSmartphone, ChevronRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { load, STORAGE_KEYS } from "@/lib/localCMS";

const BASE = import.meta.env.BASE_URL;

const defaultSlides = [
  { id: 1, title: "Modern Family Homes", tagline: "Find Your Perfect Pad — Search, Tour, and Own Modern Properties", image: `${BASE}Hero-1.png`, cta: "Browse Listings" },
  { id: 2, title: "Urban Apartments", tagline: "Smart living in the heart of the city — tour virtually or in-person", image: `${BASE}Hero-2.png`, cta: "Browse Listings" },
  { id: 3, title: "Coastal Retreats", tagline: "Exclusive seaside properties for serene living and investment", image: `${BASE}Hero-3.png`, cta: "Browse Listings" },
  { id: 4, title: "Luxury Estates", tagline: "High-end properties with premium amenities and elegant design", image: `${BASE}Hero-4.png`, cta: "Browse Listings" },
  { id: 5, title: "Suburban Charm", tagline: "Quiet neighbourhoods with great schools and family-friendly parks", image: `${BASE}Hero-5.png`, cta: "Browse Listings" },
  { id: 6, title: "Investment Opportunities", tagline: "Curated properties with strong rental and resale potential", image: `${BASE}Hero-6.png`, cta: "Browse Listings" },
];

const defaultServices = [
  {
    icon: <MonitorSmartphone className="w-9 h-9 text-[#D4AF37]" />,
    title: "Virtual 3D Tours",
    desc: "Immersive property walkthroughs so buyers can feel at home from anywhere.",
    href: "/virtual-tours",
  },
  {
    icon: <Globe className="w-9 h-9 text-[#D4AF37]" />,
    title: "Instant Booking",
    desc: "Schedule viewings and tours with real-time availability and confirmations.",
    href: "/browse-homes",
  },
  {
    icon: <Shield className="w-9 h-9 text-[#D4AF37]" />,
    title: "Verified Properties",
    desc: "All listings are verified for accuracy, ownership, and amenities.",
    href: "/browse-homes",
  },
  {
    icon: <ChevronRight className="w-9 h-9 text-[#D4AF37]" />,
    title: "Smart Price Estimator",
    desc: "Get instant market estimates using our proprietary valuation engine.",
    href: "/browse-homes",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slides, setSlides] = useState(defaultSlides as any[]);
  const [homeServices, setHomeServices] = useState(defaultServices as any[]);
  const [homePage, setHomePage] = useState<any | null>(null);

  useEffect(() => {
    try {
      const pages = load(STORAGE_KEYS.pages, []);
      const home = (pages || []).find((p: any) => p.slug === "/" || p.slug === "home");
      if (home) setHomePage(home);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    try {
      const stored = load(STORAGE_KEYS.carousel, null as any);
      if (stored && Array.isArray(stored) && stored.length > 0) {
        setSlides(
          stored.filter((s: any) => s.visible !== false).map((s: any, idx: number) => ({
            id: s.id || idx,
            title: s.title || "",
            tagline: s.tagline || "",
            image: s.mediaId ? (load(STORAGE_KEYS.media, []) as any[]).find((m: any) => m.id === s.mediaId)?.dataUrl : s.image || `${BASE}Hero-${(idx % 6) + 1}.png`,
            cta: "Browse Listings",
          }))
        );
      }

      const storedServices = load(STORAGE_KEYS.services, [] as any[]);
      if (storedServices && Array.isArray(storedServices) && storedServices.length > 0) {
        setHomeServices(
          storedServices.map((item: any) => ({
            ...item,
            icon: item.title?.includes("Tour") ? <MonitorSmartphone className="w-9 h-9 text-[#D4AF37]" /> :
              item.title?.includes("Booking") ? <Globe className="w-9 h-9 text-[#D4AF37]" /> :
              item.title?.includes("Verified") ? <Shield className="w-9 h-9 text-[#D4AF37]" /> :
              <ChevronRight className="w-9 h-9 text-[#D4AF37]" />,
          }))
        );
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const autoScroll = setInterval(() => emblaApi.scrollNext(), 5000);
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      clearInterval(autoScroll);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#282828]">
      <Navbar transparent />

      {/* Hero Carousel */}
      <section className="relative h-[calc(100dvh-1rem)] pt-24 w-full bg-black">
        <div className="overflow-hidden h-full w-full" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div key={slide.id} className="relative flex-[0_0_100%] h-full min-w-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D3E4A]/85 via-[#2D3E4A]/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{
                      opacity: selectedIndex === index ? 1 : 0,
                      y: selectedIndex === index ? 0 : 24,
                    }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-4xl"
                  >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-5 drop-shadow-lg leading-tight">
                      {homePage?.sections?.find((s: any) => s.title === "Hero Title")?.content || slide.title}
                    </h1>
                    <p className="text-xl md:text-3xl text-white font-semibold tracking-wide mb-10 max-w-3xl mx-auto">
                      {homePage?.sections?.find((s: any) => s.title === "Hero Tagline")?.content || slide.tagline}
                    </p>
                    <Link
                      href="/browse-homes"
                      className="inline-flex items-center gap-2 border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 text-base font-semibold hover:bg-[#D4AF37] hover:text-[#2D3E4A] transition-all duration-300"
                    >
                      {homePage?.sections?.find((s: any) => s.title === "Hero CTA")?.content || "Browse Listings"} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === selectedIndex ? "bg-[#D4AF37] w-8 shadow-md" : "bg-white/40 hover:bg-white/70 w-2.5"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Services overview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-3">Our Excellence</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D3E4A] mb-5">
              Elite Property Experiences
            </h2>
            <div className="w-20 h-1 bg-[#D4AF37] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeServices.map((srv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-[#FBF9F5] p-8 hover:shadow-xl hover:-translate-y-1 hover:border-[#D4AF37]/40 border border-transparent transition-all duration-300"
              >
                <div className="mb-5">{srv.icon}</div>
                <h3 className="font-serif font-bold text-lg text-[#2D3E4A] mb-3">{srv.title}</h3>
                <p className="text-[#282828]/70 text-sm leading-relaxed mb-6">{srv.desc}</p>
                <Link
                  href={srv.href}
                  className="inline-flex items-center text-sm text-[#D4AF37] font-semibold group-hover:text-[#2D3E4A] transition-colors"
                >
                  Learn more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-[#2D3E4A] py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            {[
              { value: "98%", label: "Client Retention" },
              { value: "40+", label: "Enterprise Clients" },
              { value: "150+", label: "Projects Delivered" },
            ].map((stat) => (
              <div key={stat.label} className="py-4">
                <div className="text-5xl font-serif font-bold text-[#D4AF37] mb-2">{stat.value}</div>
                <div className="text-white/70 font-medium tracking-wide uppercase text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#FBF9F5]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Shield className="w-10 h-10 text-[#D4AF37] mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D3E4A] mb-5 max-w-2xl mx-auto">
              {homePage?.sections?.find((s: any) => s.title === "CTA Heading")?.content || "Ready to find your perfect property?"}
            </h2>
              <p className="text-[#282828]/70 text-lg max-w-xl mx-auto mb-10">
              {homePage?.sections?.find((s: any) => s.title === "CTA Text")?.content || "Join 40+ clients who trust RoofRover to showcase and manage premium properties."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#2D3E4A] text-white px-10 py-4 text-base font-semibold hover:bg-[#D4AF37] transition-colors border border-[#D4AF37]/30"
            >
              Get a Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
