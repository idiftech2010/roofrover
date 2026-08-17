import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { load, STORAGE_KEYS } from "@/lib/localCMS";

const defaultMenu = [
  { label: "Home", href: "/" },
  {
    label: "Properties",
    children: [
      { label: "Browse Homes", href: "/browse-homes" },
      { label: "Virtual Tours", href: "/virtual-tours" },
      { label: "Saved Pads", href: "/saved" },
    ],
  },
  { label: "Services", children: [{ label: "Sell", href: "/sell" }, { label: "Agents", href: "/agents" }] },
  { label: "Company", children: [{ label: "Gallery", href: "/gallery" }, { label: "About", href: "/about" }, { label: "Careers", href: "/careers" }] },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopOpenIndex, setDesktopOpenIndex] = useState<number | null>(null);
  const [location] = useLocation();
  const navRef = useRef<HTMLElement | null>(null);
  const [menu, setMenu] = useState<any[]>(defaultMenu);

  useEffect(() => {
    try {
      const stored = load(STORAGE_KEYS.navbar, null as any);
      if (stored && Array.isArray(stored) && stored.length > 0) {
        const mapped = stored
          .filter((it: any) => it.visible !== false)
          .map((it: any) => ({
            label: it.label,
            href: it.href,
            visible: it.visible !== false,
            children: Array.isArray(it.children)
              ? it.children
                  .filter((child: any) => child.visible !== false)
                  .map((child: any) => ({
                    label: child.label,
                    href: child.href,
                    visible: child.visible !== false,
                  }))
              : undefined,
          }));
        setMenu(mapped);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click or Escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!navRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!navRef.current.contains(e.target)) {
        setDesktopOpenIndex(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDesktopOpenIndex(null);
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const isHeaderDark = !isScrolled;

  return (
    <>
      {transparent && !isScrolled && (
        <div className="fixed top-0 left-0 right-0 h-24 z-40 pointer-events-none" />
      )}
        <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md py-3"
            : "bg-white py-4 shadow-sm"
        }`}
      >
        <div ref={(el) => (navRef.current = el)} className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 group">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="RoofRover Logo"
              className="h-10 sm:h-12 md:h-16 w-auto object-contain"
            />
            <span className="font-serif font-bold text-xl tracking-tight hidden sm:inline-flex items-center gap-0.5 -ml-0.5">
              <span className="leading-none text-[#2D3E4A]">Roof</span>
              <span className="leading-none text-[#D4AF37]">Rover</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main navigation">
            {menu.map((item, idx) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDesktopOpenIndex(idx)}
                onMouseLeave={() => setDesktopOpenIndex((cur) => (cur === idx ? null : cur))}
              >
                {!item.children ? (
                  <Link
                    href={item.href!}
                    className={`text-sm font-medium tracking-wide transition-colors ${
                      location === item.href
                        ? "text-[#D4AF37]"
                        : isHeaderDark
                        ? "text-[#2D3E4A] hover:text-[#D4AF37]"
                        : "text-[#2D3E4A] hover:text-[#D4AF37]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={desktopOpenIndex === idx}
                      onClick={() => setDesktopOpenIndex((cur) => (cur === idx ? null : idx))}
                      onKeyDown={(e) => {
                        if (e.key === "" || e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setDesktopOpenIndex((cur) => (cur === idx ? null : idx));
                        }
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          const panel = document.getElementById(`dropdown-panel-${idx}`);
                          const first = panel?.querySelector<HTMLAnchorElement>("a");
                          first?.focus();
                        }
                      }}
                      className={`text-sm font-medium tracking-wide transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                        isHeaderDark ? "text-[#2D3E4A] hover:text-[#D4AF37]" : "text-[#2D3E4A] hover:text-[#D4AF37]"
                      }`}
                    >
                      {item.label}
                      <svg className={`w-3 h-3 transition-transform ${desktopOpenIndex === idx ? "-rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                      </svg>
                    </button>

                    <div
                      id={`dropdown-panel-${idx}`}
                      role="menu"
                      aria-label={`${item.label} menu`}
                      className={`absolute left-0 mt-1 min-w-[16rem] rounded-lg z-40 p-2 transition-all duration-150 ${
                        desktopOpenIndex === idx ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                      } ${isHeaderDark ? "bg-white text-[#2D3E4A] shadow-xl" : "bg-white text-[#2D3E4A] shadow-xl"}`}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setDesktopOpenIndex(null);
                        }
                      }}
                      onMouseEnter={() => setDesktopOpenIndex(idx)}
                      onMouseLeave={() => setDesktopOpenIndex(null)}
                    >
                      <div className="py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            tabIndex={0}
                            className={`block px-4 py-2 text-sm rounded-md focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]/20 focus-visible:ring-offset-2 transition-colors hover:bg-[#D4AF37]/20 hover:shadow-md ${
                              location === child.href ? "font-semibold text-[#2D3E4A] bg-[#D4AF37]/20" : ""
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </nav>

          <Link
            href="/browse-homes"
            className={`hidden md:inline-flex items-center px-5 py-2.5 text-sm font-semibold tracking-wide border transition-all duration-200 ${
              isHeaderDark
                ? "bg-[#D4AF37] text-[#2D3E4A] border-[#D4AF37]/50 hover:brightness-95"
                : "bg-[#D4AF37] text-[#2D3E4A] border-[#D4AF37]/50 hover:brightness-95"
            }`}
          >
            Browse Listings
          </Link>

          <button
            className={`md:hidden p-2 ${isHeaderDark ? "text-[#2D3E4A]" : "text-[#2D3E4A]"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 bg-current mb-1.5" />
            <span className="block w-6 h-0.5 bg-current mb-1.5" />
            <span className="block w-6 h-0.5 bg-current" />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <nav className="container mx-auto px-6 flex flex-col gap-3">
              {menu.map((item) => (
                <div key={item.label}>
                  {!item.children ? (
                    <Link
                      href={item.href!}
                      onClick={() => setMenuOpen(false)}
                      className={`py-2 text-sm font-medium ${location === item.href ? "text-[#D4AF37]" : "text-[#2D3E4A]"}`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div>
                      <div className="py-2 text-sm font-medium text-[#2D3E4A]">{item.label}</div>
                      <div className="pl-4 flex flex-col gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMenuOpen(false)}
                            className={`py-2 text-sm px-2 rounded-md hover:bg-[#D4AF37]/20 hover:text-white ${location === child.href ? "text-[#D4AF37] font-semibold" : "text-[#2D3E4A]"}`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
