import { Link } from "wouter";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaXTwitter, FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaLinkedinIn } from "react-icons/fa6";
import { Shield } from "lucide-react";
import { load, STORAGE_KEYS } from "@/lib/localCMS";

const defaultQuickLinks = ["Home", "Browse Homes", "Virtual Tours", "Saved Pads", "Sell", "Agents", "Gallery", "About", "Careers", "Contact"];

const defaultSocialLinks = [
  { icon: <FaXTwitter className="w-4 h-4" />, href: "#", label: "X (Twitter)" },
  { icon: <FaFacebookF className="w-4 h-4" />, href: "#", label: "Facebook" },
  { icon: <FaInstagram className="w-4 h-4" />, href: "#", label: "Instagram" },
  { icon: <FaTiktok className="w-4 h-4" />, href: "#", label: "TikTok" },
  { icon: <FaWhatsapp className="w-4 h-4" />, href: "https://wa.me/2348004365267", label: "WhatsApp" },
  { icon: <FaLinkedinIn className="w-4 h-4" />, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  const navbar = load(STORAGE_KEYS.navbar, null);
  const pages = load(STORAGE_KEYS.pages, []);
  const footerPage = (pages || []).find((p: any) => p.slug === "/footer" || p.slug === "footer");

  const quickLinks = (navbar && Array.isArray(navbar) && navbar.length > 0)
    ? navbar.filter((n: any) => n.visible !== false).map((n: any) => n.label)
    : defaultQuickLinks;
  const socialLinks = defaultSocialLinks;
  const description = footerPage?.sections?.[0]?.content || "Find. Tour. Own. RoofRover brings curated listings, trusted agents, and immersive tours together to help you find your perfect pad.";

  return (
    <footer className="bg-[#2D3E4A] text-white pt-16 pb-8 border-t-4 border-[#D4AF37]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="RoofRover"
                className="h-16 sm:h-20 w-auto object-contain"
              />
              <span className="font-serif font-bold text-lg text-white">RoofRover</span>
            </Link>
            <p className="text-white leading-relaxed mb-6 text-sm max-w-xs">
              {description}
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-base font-serif font-bold mb-6 text-[#D4AF37]">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              {quickLinks.map((link: any) => (
                <li key={link} className="list-none">
                  <Link
                      href={`/${String(link).toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-white hover:text-[#D4AF37] transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-base font-serif font-bold mb-6 text-[#D4AF37]">Contact Us</h4>
            <ul className="space-y-4 text-white text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>123 Idris Ibraheem Drive,<br />Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="mailto:info@roofrover.com" className="text-white hover:text-[#D4AF37] transition-colors">
                  info@roofrover.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="tel:+2348125191913" className="text-white hover:text-[#D4AF37] transition-colors">
                  +234 812 5191 913
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white text-xs">
          <p>&copy; {new Date().getFullYear()} RoofRover Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
            <a href="#" className="text-white hover:text-[#D4AF37] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
