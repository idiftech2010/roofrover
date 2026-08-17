import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import MediaSelectorModal from "@/components/MediaSelectorModal";
import { STORAGE_KEYS, load, save, uid, getDefaultPages } from "@/lib/localCMS";
import { ChevronDown, Plus, Trash2, Edit2, Copy, Eye, EyeOff } from "lucide-react";

type Section = { id: string; title: string; content: string; mediaId?: string; imageAlt?: string };
type PageItem = { id: string; slug: string; title: string; published: boolean; sections: Section[] };
type MediaItem = { id: string; name: string; type: string; size: number; dataUrl: string; createdAt: number };
type NavItem = { id: string; label: string; href?: string; visible: boolean; children?: NavItem[] };
type Slide = { id: string; title: string; tagline?: string; mediaId?: string; order: number; visible: boolean };
type Service = { id: string; title: string; desc: string; mediaId?: string; href?: string };
type TeamMember = { id: string; name: string; role: string; bio?: string; photoId?: string };
type TabName = "overview" | "portal" | "pages" | "navigation" | "media" | "carousel" | "services" | "team" | "careers" | "cases" | "programs" | "gallery" | "settings";
type Opportunity = { id: string; title: string; description: string };
type CaseStudy = { id: string; category: string; title: string; summary: string; image?: string; mediaId?: string };
type Program = { id: string; title: string; subtitle: string; duration: string };
type GalleryItem = { id: string; src: string; category: string; title: string; desc: string; mediaId?: string };

const defaultNavbar: NavItem[] = [
  { id: "nav_home", label: "Home", href: "/", visible: true },
  {
    id: "nav_properties",
    label: "Properties",
    visible: true,
    children: [
      { id: "nav_browse", label: "Browse Homes", href: "/browse-homes", visible: true },
      { id: "nav_virtual", label: "Virtual Tours", href: "/virtual-tours", visible: true },
      { id: "nav_saved", label: "Saved Pads", href: "/saved", visible: true },
    ],
  },
  {
    id: "nav_services",
    label: "Services",
    visible: true,
    children: [
      { id: "nav_sell", label: "Sell", href: "/sell", visible: true },
      { id: "nav_agents", label: "Agents", href: "/agents", visible: true },
    ],
  },
  {
    id: "nav_company",
    label: "Company",
    visible: true,
    children: [
      { id: "nav_gallery", label: "Gallery", href: "/gallery", visible: true },
      { id: "nav_about", label: "About", href: "/about", visible: true },
      { id: "nav_careers", label: "Careers", href: "/careers", visible: true },
    ],
  },
  { id: "nav_contact", label: "Contact", href: "/contact", visible: true },
];

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabName>("overview");
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [expandedPageId, setExpandedPageId] = useState<string | null>(null);

  const [pages, setPages] = useState<PageItem[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [navbar, setNavbar] = useState<NavItem[]>(defaultNavbar);
  const [carousel, setCarousel] = useState<Slide[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setLocation("/admin");
      return;
    }
    setAuthenticated(true);

    const seededPages = load(STORAGE_KEYS.pages, getDefaultPages());
    const seededNavbar = load(STORAGE_KEYS.navbar, defaultNavbar);

    setPages(seededPages);
    setMedia(load(STORAGE_KEYS.media, []));
    setNavbar(seededNavbar);
    setCarousel(load(STORAGE_KEYS.carousel, []));
    setServices(load(STORAGE_KEYS.services, []));
    setTeam(load(STORAGE_KEYS.team, []));
    setOpportunities(load(STORAGE_KEYS.opportunities, []));
    setCaseStudies(load(STORAGE_KEYS.caseStudies, []));
    setPrograms(load(STORAGE_KEYS.programs, []));
    setGallery(load(STORAGE_KEYS.gallery, []));

    if (seededPages.length > 0 && !selectedPageId) {
      setSelectedPageId(seededPages[0].id);
      setExpandedPageId(seededPages[0].id);
    }
  }, [setLocation]);

  useEffect(() => {
    if (pages.length > 0 && !selectedPageId) {
      setSelectedPageId(pages[0].id);
    }
  }, [pages, selectedPageId]);

  const selectedPage = useMemo(
    () => pages.find((p) => p.id === selectedPageId) || pages[0] || null,
    [pages, selectedPageId]
  );

  function normalizeRoute(value?: string) {
    return (value ?? "").trim().toLowerCase().replace(/\/+$/, "");
  }

  function findPageForNavItem(navItem: NavItem) {
    if (!navItem.href) {
      return pages.find((page) => page.title.toLowerCase() === navItem.label.toLowerCase()) || null;
    }

    const normalizedHref = normalizeRoute(navItem.href);
    return (
      pages.find((page) => normalizeRoute(page.slug) === normalizedHref) ||
      pages.find((page) => normalizeRoute(page.title) === normalizeRoute(navItem.label)) ||
      pages.find((page) => normalizeRoute(page.slug) === normalizeRoute(navItem.label)) ||
      null
    );
  }

  function persistAll() {
    save(STORAGE_KEYS.pages, pages);
    save(STORAGE_KEYS.media, media);
    save(STORAGE_KEYS.navbar, navbar);
    save(STORAGE_KEYS.carousel, carousel);
    save(STORAGE_KEYS.services, services);
    save(STORAGE_KEYS.team, team);
    save(STORAGE_KEYS.opportunities, opportunities);
    save(STORAGE_KEYS.caseStudies, caseStudies);
    save(STORAGE_KEYS.programs, programs);
    save(STORAGE_KEYS.gallery, gallery);
  }

  useEffect(() => {
    if (authenticated) {
      persistAll();
    }
  }, [authenticated, pages, media, navbar, carousel, services, team, opportunities, caseStudies, programs, gallery]);

  function logout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_auth_method");
    setLocation("/admin");
  }

  function changeUsernamePassword() {
    const newUsername = prompt("Enter new username (min 3 characters):") || "";
    if (!newUsername) return;
    if (newUsername.length < 3) {
      alert("Username must be at least 3 characters.");
      return;
    }

    const newPassword = prompt("Enter new password (min 6 characters):") || "";
    if (!newPassword) return;
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    const confirmPassword = prompt("Confirm the new password:") || "";
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    localStorage.setItem("admin_username", newUsername);
    localStorage.setItem("admin_password", newPassword);
    alert("Username and password updated successfully.");
  }

  function changePin() {
    const entered = prompt("Enter a new 4-8 digit PIN") || "";
    if (!entered) return;
    if (entered.length < 4) {
      alert("PIN must be at least 4 digits.");
      return;
    }
    const confirmPin = prompt("Confirm the new PIN") || "";
    if (entered !== confirmPin) {
      alert("PINs do not match.");
      return;
    }
    localStorage.setItem("admin_pin", entered);
    alert("PIN updated successfully.");
  }

  function getCurrentAuthMethod() {
    return localStorage.getItem("admin_auth_method") || "unknown";
  }

  function exportJSON() {
    const payload = { pages, media, navbar, carousel, services, team };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `roofrover-cms-${Date.now()}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function downloadSampleJSON() {
    const sample = {
      pages: [{ id: "page_example", slug: "/example", title: "Example Page", published: false, sections: [{ id: "s1", title: "Intro", content: "<p>Replace this with page content</p>" }] }],
      media: [{ id: "m_example", name: "hero.jpg", type: "image/jpeg", size: 0, dataUrl: "https://via.placeholder.com/1200x800" }],
      navbar: [{ id: "n_home", label: "Home", href: "/", visible: true }],
      carousel: [{ id: "c1", title: "Welcome", tagline: "Sample slide", mediaId: "m_example", order: 1, visible: true }],
      services: [{ id: "svc1", title: "Service Example", desc: "Description" }],
      team: [{ id: "tm1", name: "Jane Doe", role: "Founder", photoId: "m_example" }],
    };
    const blob = new Blob([JSON.stringify(sample, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "roofrover-cms-sample.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function handleImportFile(file: File | null) {
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const keys = ["pages", "media", "navbar", "carousel", "services", "team"];
      const hasCmsData = keys.some((key) => Array.isArray((json as Record<string, unknown>)[key]));

      if (!json || typeof json !== "object" || !hasCmsData) {
        alert("Invalid CMS JSON file.");
        return;
      }

      if (!confirm("Importing will overwrite the current content. Continue?")) return;

      setPages((json as any).pages || []);
      setMedia((json as any).media || []);
      setNavbar((json as any).navbar || defaultNavbar);
      setCarousel((json as any).carousel || []);
      setServices((json as any).services || []);
      setTeam((json as any).team || []);
      alert("CMS import completed.");
    } catch (error) {
      alert("Failed to import JSON: " + String(error));
    }
  }

  // Media
  function uploadMedia(files: FileList | null) {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = String(reader.result || "");
        const item: MediaItem = {
          id: uid("media"),
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl,
          createdAt: Date.now(),
        };
        setMedia((current) => [item, ...current]);
      };
      reader.readAsDataURL(file);
    });
  }

  function removeMedia(id: string) {
    if (!confirm("Delete this media item?")) return;
    setMedia((current) => current.filter((item) => item.id !== id));
  }

  function copyMediaUrl(id: string) {
    const item = media.find((entry) => entry.id === id);
    if (!item) return;
    navigator.clipboard?.writeText(item.dataUrl);
    alert("Media URL copied to clipboard.");
  }

  // Pages & Sections
  function addPage() {
    const title = prompt("Page title") || "New Page";
    const slug = prompt("Page slug, e.g. /about") || `/page-${Date.now()}`;
    const newPage: PageItem = {
      id: uid("page"),
      slug,
      title,
      published: true,
      sections: [{ id: uid("section"), title: "Intro", content: "Add your page content here." }],
    };
    setPages((current) => [newPage, ...current]);
    setSelectedPageId(newPage.id);
    setExpandedPageId(newPage.id);
  }

  function updatePageField(pageId: string, field: "title" | "slug" | "published", value: string | boolean) {
    setPages((current) =>
      current.map((page) => (page.id === pageId ? { ...page, [field]: value } : page))
    );
  }

  function addSection(pageId: string) {
    const title = prompt("Section title") || "New Section";
    const content = prompt("Section content") || "Add your content here.";
    const nextSection: Section = { id: uid("section"), title, content };

    setPages((current) =>
      current.map((page) =>
        page.id === pageId ? { ...page, sections: [nextSection, ...page.sections] } : page
      )
    );
  }

  function updateSection(pageId: string, sectionId: string, field: "title" | "content" | "imageAlt", value: string) {
    setPages((current) =>
      current.map((page) =>
        page.id === pageId
          ? {
              ...page,
              sections: page.sections.map((section) =>
                section.id === sectionId ? { ...section, [field]: value } : section
              ),
            }
          : page
      )
    );
  }

  function attachMediaToSection(pageId: string, sectionId: string) {
    setMediaSelectorTarget({ type: "pageSection", id: `${pageId}:${sectionId}` });
    setMediaSelectorOpen(true);
  }

  function removeSection(pageId: string, sectionId: string) {
    if (!confirm("Delete this section?")) return;
    setPages((current) =>
      current.map((page) =>
        page.id === pageId
          ? { ...page, sections: page.sections.filter((section) => section.id !== sectionId) }
          : page
      )
    );
  }

  function removePage(pageId: string) {
    if (!confirm("Delete this page?")) return;
    setPages((current) => current.filter((page) => page.id !== pageId));
    if (selectedPageId === pageId) {
      const remaining = pages.filter((page) => page.id !== pageId);
      setSelectedPageId(remaining[0]?.id ?? null);
    }
  }

  // Navigation
  function addNavigationItem() {
    const label = prompt("Navigation label") || "New Item";
    const href = prompt("Navigation link (e.g. /about)") || "/";
    const newItem: NavItem = { id: uid("nav"), label, href, visible: true };
    setNavbar((current) => [newItem, ...current]);
  }

  function addSubmenuItem(parentId: string) {
    const label = prompt("Submenu label") || "New Sub Item";
    const href = prompt("Submenu link (e.g. /gallery)") || "/";
    const newItem: NavItem = { id: uid("submenu"), label, href, visible: true };

    setNavbar((current) =>
      current.map((item) => {
        if (item.id !== parentId) return item;
        return { ...item, children: [newItem, ...(item.children ?? [])] };
      })
    );
  }

  function updateNavItem(itemId: string, key: keyof NavItem, value: string | boolean, parentId?: string) {
    setNavbar((current) =>
      current.map((item) => {
        if (item.id === itemId) {
          return { ...item, [key]: value };
        }
        if (parentId && item.id === parentId) {
          return {
            ...item,
            children: (item.children ?? []).map((child) =>
              child.id === itemId ? { ...child, [key]: value } : child
            ),
          };
        }
        if (item.children) {
          return {
            ...item,
            children: item.children.map((child) =>
              child.id === itemId ? { ...child, [key]: value } : child
            ),
          };
        }
        return item;
      })
    );
  }

  function removeNavItem(itemId: string, parentId?: string) {
    if (!confirm("Remove this navigation item?")) return;
    setNavbar((current) =>
      current
        .map((item) => {
          if (parentId && item.id === parentId) {
            return {
              ...item,
              children: (item.children ?? []).filter((child) => child.id !== itemId),
            };
          }

          if (item.id === itemId) {
            return null;
          }

          if (item.children) {
            return {
              ...item,
              children: item.children.filter((child) => child.id !== itemId),
            };
          }

          return item;
        })
        .filter(Boolean) as NavItem[]
    );
  }

  // Carousel
  function addSlide() {
    const title = prompt("Slide title") || "New Slide";
    const tagline = prompt("Slide tagline") || "";
    const slide: Slide = { id: uid("slide"), title, tagline, order: carousel.length + 1, visible: true };
    setCarousel((current) => [slide, ...current]);
  }

  function updateSlide(slideId: string, field: "title" | "tagline" | "visible", value: string | boolean) {
    setCarousel((current) =>
      current.map((slide) => (slide.id === slideId ? { ...slide, [field]: value } : slide))
    );
  }

  function attachMediaToSlide(slideId: string) {
    setMediaSelectorTarget({ type: "slide", id: slideId });
    setMediaSelectorOpen(true);
  }

  function removeSlide(slideId: string) {
    if (!confirm("Delete this slide?")) return;
    setCarousel((current) => current.filter((slide) => slide.id !== slideId));
  }

  // Services
  function addService() {
    const title = prompt("Service title") || "New Service";
    const desc = prompt("Service description") || "";
    const service: Service = { id: uid("svc"), title, desc };
    setServices((current) => [service, ...current]);
  }

  function updateService(serviceId: string, field: "title" | "desc", value: string) {
    setServices((current) =>
      current.map((service) => (service.id === serviceId ? { ...service, [field]: value } : service))
    );
  }

  function removeService(serviceId: string) {
    if (!confirm("Delete this service?")) return;
    setServices((current) => current.filter((service) => service.id !== serviceId));
  }

  function attachMediaToService(serviceId: string) {
    setMediaSelectorTarget({ type: "service", id: serviceId });
    setMediaSelectorOpen(true);
  }

  // Team
  function addMember() {
    const name = prompt("Member name") || "New Member";
    const role = prompt("Role or title") || "Team Member";
    const member: TeamMember = { id: uid("team"), name, role };
    setTeam((current) => [member, ...current]);
  }

  function updateMember(memberId: string, field: "name" | "role", value: string) {
    setTeam((current) => current.map((member) => (member.id === memberId ? { ...member, [field]: value } : member)));
  }

  function removeMember(memberId: string) {
    if (!confirm("Delete this team member?")) return;
    setTeam((current) => current.filter((member) => member.id !== memberId));
  }

  function attachMediaToMember(memberId: string) {
    setMediaSelectorTarget({ type: "team", id: memberId });
    setMediaSelectorOpen(true);
  }

  // Careers (Opportunities)
  function addOpportunity() {
    const title = prompt("Job title") || "New Position";
    const description = prompt("Job description") || "Describe the opportunity...";
    const newOpp: Opportunity = { id: uid("opp"), title, description };
    setOpportunities((current) => [newOpp, ...current]);
  }

  function updateOpportunity(id: string, field: "title" | "description", value: string) {
    setOpportunities((current) =>
      current.map((opp) => (opp.id === id ? { ...opp, [field]: value } : opp))
    );
  }

  function removeOpportunity(id: string) {
    if (!confirm("Delete this opportunity?")) return;
    setOpportunities((current) => current.filter((opp) => opp.id !== id));
  }

  // Case Studies
  function addCaseStudy() {
    const title = prompt("Case study title") || "New Case Study";
    const category = prompt("Category") || "General";
    const summary = prompt("Summary") || "Describe the case study...";
    const newCase: CaseStudy = { id: uid("case"), category, title, summary, image: "" };
    setCaseStudies((current) => [newCase, ...current]);
  }

  function updateCaseStudy(id: string, field: "category" | "title" | "summary", value: string) {
    setCaseStudies((current) =>
      current.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }

  function removeCaseStudy(id: string) {
    if (!confirm("Delete this case study?")) return;
    setCaseStudies((current) => current.filter((c) => c.id !== id));
  }

  // Programs
  function addProgram() {
    const title = prompt("Program title") || "New Program";
    const subtitle = prompt("Subtitle") || "Program subtitle...";
    const duration = prompt("Duration (e.g., 6 weeks)") || "TBD";
    const newProgram: Program = { id: uid("prog"), title, subtitle, duration };
    setPrograms((current) => [newProgram, ...current]);
  }

  function updateProgram(id: string, field: "title" | "subtitle" | "duration", value: string) {
    setPrograms((current) =>
      current.map((prog) => (prog.id === id ? { ...prog, [field]: value } : prog))
    );
  }

  function removeProgram(id: string) {
    if (!confirm("Delete this program?")) return;
    setPrograms((current) => current.filter((prog) => prog.id !== id));
  }

  // Gallery
  function addGalleryItem() {
    const title = prompt("Gallery item title") || "New Item";
    const category = prompt("Category") || "General";
    const desc = prompt("Description") || "";
    const src = prompt("Image URL") || "";
    const newItem: GalleryItem = { id: uid("gal"), src, category, title, desc };
    setGallery((current) => [newItem, ...current]);
  }

  function updateGalleryItem(id: string, field: "title" | "category" | "desc" | "src", value: string) {
    setGallery((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }

  function removeGalleryItem(id: string) {
    if (!confirm("Delete this gallery item?")) return;
    setGallery((current) => current.filter((item) => item.id !== id));
  }

  const [mediaSelectorOpen, setMediaSelectorOpen] = useState(false);
  const [mediaSelectorTarget, setMediaSelectorTarget] = useState<{ type: string; id: string } | null>(null);

  function handleMediaSelect(mediaId: string | string[] | null) {
    if (!mediaSelectorTarget) return;

    const selected = Array.isArray(mediaId) ? mediaId[0] ?? null : mediaId;

    if (mediaSelectorTarget.type === "slide") {
      setCarousel((current) =>
        current.map((slide) => (slide.id === mediaSelectorTarget.id ? { ...slide, mediaId: selected ?? undefined } : slide))
      );
    }

    if (mediaSelectorTarget.type === "service") {
      setServices((current) =>
        current.map((service) => (service.id === mediaSelectorTarget.id ? { ...service, mediaId: selected ?? undefined } : service))
      );
    }

    if (mediaSelectorTarget.type === "team") {
      setTeam((current) =>
        current.map((member) => (member.id === mediaSelectorTarget.id ? { ...member, photoId: selected ?? undefined } : member))
      );
    }

    if (mediaSelectorTarget.type === "pageSection") {
      const [pageId, sectionId] = mediaSelectorTarget.id.split(":");
      setPages((current) =>
        current.map((page) =>
          page.id === pageId
            ? {
                ...page,
                sections: page.sections.map((section) =>
                  section.id === sectionId ? { ...section, mediaId: selected ?? undefined } : section
                ),
              }
            : page
        )
      );
    }

    if (mediaSelectorTarget.type.startsWith("case:")) {
      const caseId = mediaSelectorTarget.id;
      setCaseStudies((current) =>
        current.map((c) =>
          c.id === caseId
            ? {
                ...c,
                mediaId: selected ?? undefined,
                image: selected ? media.find((m) => m.id === selected)?.dataUrl : c.image,
              }
            : c
        )
      );
    }

    if (mediaSelectorTarget.type.startsWith("gallery:")) {
      const itemId = mediaSelectorTarget.id;
      setGallery((current) =>
        current.map((item) =>
          item.id === itemId
            ? {
                ...item,
                mediaId: selected ?? undefined,
                src: selected ? media.find((m) => m.id === selected)?.dataUrl || item.src : item.src,
              }
            : item
        )
      );
    }

    setMediaSelectorTarget(null);
    setMediaSelectorOpen(false);
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-[#f5f1ea]">
      <Navbar />

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar Navigation */}
        <aside className="w-56 bg-white border-r border-[#e8dcc8] overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#a0967d] mb-4">Management</h2>
            <nav className="space-y-1">
              {[
                { id: "overview", label: "Overview", icon: "📊" },
                { id: "portal", label: "Portal Management", icon: "🧭" },
                { id: "pages", label: "Pages", icon: "📄" },
                { id: "navigation", label: "Navigation", icon: "🔗" },
                { id: "media", label: "Media Library", icon: "🖼️" },
                { id: "carousel", label: "Carousel", icon: "🎠" },
                { id: "services", label: "Services", icon: "⚙️" },
                { id: "team", label: "Team", icon: "👥" },
                { id: "careers", label: "Careers", icon: "💼" },
                { id: "cases", label: "Case Studies", icon: "📋" },
                { id: "programs", label: "Programs", icon: "🎓" },
                { id: "gallery", label: "Gallery", icon: "🎨" },
                { id: "settings", label: "Settings", icon: "⚡" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabName)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm transition ${
                    activeTab === item.id ? "bg-[#1f2e39] text-white" : "text-[#46596a] hover:bg-[#f5f1ea]"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-[#e8dcc8] px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-serif font-bold text-[#1f2e39]">Admin Portal</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  persistAll();
                  alert("All changes saved locally.");
                }}
                className="px-4 py-2 bg-[#d4af37] text-[#1f2e39] rounded-lg font-medium hover:opacity-90 transition"
              >
                Save
              </button>
              <button onClick={changePin} className="px-4 py-2 border border-[#d8d2c8] rounded-lg text-sm hover:bg-[#f5f1ea] transition">
                Change PIN
              </button>
              <button onClick={changeUsernamePassword} className="px-4 py-2 border border-[#d8d2c8] rounded-lg text-sm hover:bg-[#f5f1ea] transition">
                Change Credentials
              </button>
              <button
                onClick={exportJSON}
                className="px-4 py-2 border border-[#d8d2c8] rounded-lg text-sm"
              >
                Export
              </button>
              <label className="px-4 py-2 border border-[#d8d2c8] rounded-lg text-sm cursor-pointer">
                Import
                <input
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={(e) => handleImportFile(e.target.files?.[0] ?? null)}
                />
              </label>
              <button onClick={logout} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition">
                Logout
              </button>
            </div>
          </div>

          <div className="p-8 max-w-7xl">
            {/* Overview */}
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#1f2e39] mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Pages", value: pages.length },
                    { label: "Navigation", value: navbar.length },
                    { label: "Media", value: media.length },
                    { label: "Carousel", value: carousel.length },
                    { label: "Services", value: services.length },
                    { label: "Team", value: team.length },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-lg p-4 border border-[#e8dcc8]">
                      <div className="text-xs uppercase tracking-widest text-[#8a8a8a] mb-2">{stat.label}</div>
                      <div className="text-3xl font-bold text-[#1f2e39]">{stat.value}</div>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 border border-[#e8dcc8]">
                    <h3 className="font-semibold text-[#1f2e39] mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <button onClick={addPage} className="w-full text-left px-3 py-2 text-sm hover:bg-[#f5f1ea] rounded-lg transition">
                        + Add New Page
                      </button>
                      <button onClick={addNavigationItem} className="w-full text-left px-3 py-2 text-sm hover:bg-[#f5f1ea] rounded-lg transition">
                        + Add Navigation Item
                      </button>
                      <button onClick={addSlide} className="w-full text-left px-3 py-2 text-sm hover:bg-[#f5f1ea] rounded-lg transition">
                        + Add Carousel Slide
                      </button>
                      <button onClick={addService} className="w-full text-left px-3 py-2 text-sm hover:bg-[#f5f1ea] rounded-lg transition">
                        + Add Service
                      </button>
                      <button onClick={addMember} className="w-full text-left px-3 py-2 text-sm hover:bg-[#f5f1ea] rounded-lg transition">
                        + Add Team Member
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-[#e8dcc8]">
                    <h3 className="font-semibold text-[#1f2e39] mb-4">Data Management</h3>
                    <div className="space-y-2">
                      <button onClick={downloadSampleJSON} className="w-full text-left px-3 py-2 text-sm hover:bg-[#f5f1ea] rounded-lg transition">
                        📥 Download Sample JSON
                      </button>
                      <button onClick={exportJSON} className="w-full text-left px-3 py-2 text-sm hover:bg-[#f5f1ea] rounded-lg transition">
                        📤 Export All Data
                      </button>
                      <label className="w-full text-left px-3 py-2 text-sm hover:bg-[#f5f1ea] rounded-lg transition cursor-pointer block">
                        📮 Import from JSON
                        <input
                          type="file"
                          accept="application/json"
                          className="hidden"
                          onChange={(e) => handleImportFile(e.target.files?.[0] ?? null)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Portal Management */}
            {activeTab === "portal" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-[#1f2e39]">Portal Management</h2>
                  <div className="flex gap-2">
                    <button onClick={addNavigationItem} className="px-4 py-2 bg-[#d4af37] text-[#1f2e39] rounded-lg font-medium hover:opacity-90">
                      + Add Menu
                    </button>
                    <button onClick={addPage} className="px-4 py-2 border border-[#d8d2c8] rounded-lg text-sm hover:bg-[#f5f1ea]">
                      + Add Page
                    </button>
                  </div>
                </div>

                <div className="grid gap-6">
                  <div className="bg-white rounded-lg border border-[#e8dcc8] p-6">
                    <h3 className="text-lg font-semibold text-[#1f2e39] mb-4">Menu and Page Editor</h3>
                    <div className="space-y-5">
                      {navbar.map((item) => {
                        const parentPage = findPageForNavItem(item);

                        return (
                          <div key={item.id} className="border border-[#e8dcc8] rounded-lg bg-[#f9f5f0] p-4">
                            <div className="mb-4 flex items-center justify-between gap-3">
                              <div>
                                <h4 className="text-lg font-semibold text-[#1f2e39]">{item.label}</h4>
                                <p className="text-xs uppercase tracking-wider text-[#8a8a8a]">Top menu</p>
                              </div>
                              <button onClick={() => updateNavItem(item.id, "visible", !item.visible)} className={`px-3 py-2 rounded-lg text-sm font-medium ${item.visible ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"}`}>
                                {item.visible ? "Visible" : "Hidden"}
                              </button>
                            </div>

                            <div className="grid md:grid-cols-3 gap-3 items-center mb-4">
                              <input
                                type="text"
                                value={item.label}
                                onChange={(e) => updateNavItem(item.id, "label", e.target.value)}
                                className="px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                                placeholder="Menu label"
                              />
                              <input
                                type="text"
                                value={item.href ?? ""}
                                onChange={(e) => updateNavItem(item.id, "href", e.target.value)}
                                className="px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                                placeholder="/page-link"
                              />
                              <div className="flex justify-end gap-2">
                                <button onClick={() => addSubmenuItem(item.id)} className="px-3 py-2 bg-[#f5f1ea] rounded-lg text-sm hover:bg-[#e8dcc8]">
                                  + Submenu
                                </button>
                                <button onClick={() => removeNavItem(item.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {item.children && item.children.length > 0 && (
                              <div className="mt-4 ml-4 space-y-3 border-l-2 border-[#e8dcc8] pl-4">
                                {item.children.map((child) => {
                                  const childPage = findPageForNavItem(child);

                                  return (
                                    <div key={child.id} className="rounded-lg border border-[#e8dcc8] bg-white p-4">
                                      <div className="grid md:grid-cols-4 gap-3 items-center mb-4">
                                        <input
                                          type="text"
                                          value={child.label}
                                          onChange={(e) => updateNavItem(child.id, "label", e.target.value, item.id)}
                                          className="px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                                          placeholder="Submenu label"
                                        />
                                        <input
                                          type="text"
                                          value={child.href ?? ""}
                                          onChange={(e) => updateNavItem(child.id, "href", e.target.value, item.id)}
                                          className="px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                                          placeholder="/submenu-link"
                                        />
                                        <button
                                          onClick={() => updateNavItem(child.id, "visible", !child.visible, item.id)}
                                          className={`px-3 py-2 rounded-lg text-sm font-medium ${child.visible ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"}`}
                                        >
                                          {child.visible ? "Visible" : "Hidden"}
                                        </button>
                                        <div className="flex justify-end">
                                          <button onClick={() => removeNavItem(child.id, item.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100">
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>

                                      {childPage ? (
                                        <div className="space-y-4">
                                          <div>
                                            <label className="block text-xs font-medium text-[#8a8a8a] mb-1">Page Title</label>
                                            <input type="text" value={childPage.title} onChange={(e) => updatePageField(childPage.id, "title", e.target.value)} className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm" />
                                          </div>
                                          <div>
                                            <label className="block text-xs font-medium text-[#8a8a8a] mb-1">Page URL</label>
                                            <input type="text" value={childPage.slug} onChange={(e) => updatePageField(childPage.id, "slug", e.target.value)} className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm" />
                                          </div>
                                          <label className="flex items-center gap-2 text-sm text-[#1f2e39]">
                                            <input type="checkbox" checked={childPage.published} onChange={(e) => updatePageField(childPage.id, "published", e.target.checked)} />
                                            Published
                                          </label>

                                          <div className="space-y-3">
                                            {childPage.sections.map((section) => (
                                              <div key={section.id} className="rounded-lg border border-[#e8dcc8] bg-[#f9f5f0] p-3">
                                                <div className="mb-2 flex items-center justify-between gap-3">
                                                  <input type="text" value={section.title} onChange={(e) => updateSection(childPage.id, section.id, "title", e.target.value)} className="flex-1 px-2 py-1.5 border border-[#d8d2c8] rounded text-sm" />
                                                  <button onClick={() => removeSection(childPage.id, section.id)} className="text-red-600 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                                <textarea value={section.content} onChange={(e) => updateSection(childPage.id, section.id, "content", e.target.value)} rows={4} className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm" />
                                                <div className="mt-3 flex items-center justify-between gap-3">
                                                  <input type="text" value={section.imageAlt ?? ""} onChange={(e) => updateSection(childPage.id, section.id, "imageAlt", e.target.value)} className="flex-1 px-2 py-1.5 border border-[#d8d2c8] rounded text-sm" placeholder="Image alt text" />
                                                  <button onClick={() => attachMediaToSection(childPage.id, section.id)} className="px-3 py-2 bg-[#f5f1ea] rounded-lg text-sm hover:bg-[#e8dcc8]">Media</button>
                                                </div>
                                              </div>
                                            ))}
                                          </div>

                                          <button onClick={() => addSection(childPage.id)} className="px-3 py-2 bg-[#f5f1ea] rounded-lg text-sm hover:bg-[#e8dcc8]">
                                            + Add section
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="rounded-lg border border-dashed border-[#d8d2c8] bg-[#f5f1ea] p-4 text-sm text-[#8a8a8a]">
                                          No page exists for this submenu item yet. Create a page to edit content.
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {!item.children || item.children.length === 0 ? (
                              <div className="mt-4 rounded-lg border border-[#e8dcc8] bg-white p-4">
                                {parentPage ? (
                                  <div className="space-y-4">
                                    <div>
                                      <label className="block text-xs font-medium text-[#8a8a8a] mb-1">Page Title</label>
                                      <input type="text" value={parentPage.title} onChange={(e) => updatePageField(parentPage.id, "title", e.target.value)} className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm" />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-[#8a8a8a] mb-1">Page URL</label>
                                      <input type="text" value={parentPage.slug} onChange={(e) => updatePageField(parentPage.id, "slug", e.target.value)} className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm" />
                                    </div>
                                    <label className="flex items-center gap-2 text-sm text-[#1f2e39]">
                                      <input type="checkbox" checked={parentPage.published} onChange={(e) => updatePageField(parentPage.id, "published", e.target.checked)} />
                                      Published
                                    </label>
                                    <div className="space-y-3">
                                      {parentPage.sections.map((section) => (
                                        <div key={section.id} className="rounded-lg border border-[#e8dcc8] bg-[#f9f5f0] p-3">
                                          <div className="mb-2 flex items-center justify-between gap-3">
                                            <input type="text" value={section.title} onChange={(e) => updateSection(parentPage.id, section.id, "title", e.target.value)} className="flex-1 px-2 py-1.5 border border-[#d8d2c8] rounded text-sm" />
                                            <button onClick={() => removeSection(parentPage.id, section.id)} className="text-red-600 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                                          </div>
                                          <textarea value={section.content} onChange={(e) => updateSection(parentPage.id, section.id, "content", e.target.value)} rows={4} className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm" />
                                          <div className="mt-3 flex items-center justify-between gap-3">
                                            <input type="text" value={section.imageAlt ?? ""} onChange={(e) => updateSection(parentPage.id, section.id, "imageAlt", e.target.value)} className="flex-1 px-2 py-1.5 border border-[#d8d2c8] rounded text-sm" placeholder="Image alt text" />
                                            <button onClick={() => attachMediaToSection(parentPage.id, section.id)} className="px-3 py-2 bg-[#f5f1ea] rounded-lg text-sm hover:bg-[#e8dcc8]">Media</button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    <button onClick={() => addSection(parentPage.id)} className="px-3 py-2 bg-[#f5f1ea] rounded-lg text-sm hover:bg-[#e8dcc8]">
                                      + Add section
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-sm text-[#8a8a8a]">No page exists for this menu item yet. Create a page to edit content.</div>
                                )}
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-[#e8dcc8] p-6">
                    <h3 className="text-lg font-semibold text-[#1f2e39] mb-4">Services</h3>
                    <div className="space-y-4">
                      {services.map((service) => (
                        <div key={service.id} className="border border-[#e8dcc8] rounded-lg p-4 bg-[#f9f5f0]">
                          <div className="grid md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={service.title}
                              onChange={(e) => updateService(service.id, "title", e.target.value)}
                              className="px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                              placeholder="Service title"
                            />
                            <div className="flex gap-2 justify-end">
                              <button onClick={() => attachMediaToService(service.id)} className="px-3 py-2 bg-[#f5f1ea] rounded-lg text-sm hover:bg-[#e8dcc8]">Media</button>
                              <button onClick={() => removeService(service.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>
                          <textarea
                            value={service.desc}
                            onChange={(e) => updateService(service.id, "desc", e.target.value)}
                            rows={3}
                            className="mt-3 w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                            placeholder="Service description"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-[#e8dcc8] p-6">
                    <h3 className="text-lg font-semibold text-[#1f2e39] mb-4">Team</h3>
                    <div className="space-y-4">
                      {team.map((member) => (
                        <div key={member.id} className="border border-[#e8dcc8] rounded-lg p-4 bg-[#f9f5f0]">
                          <div className="grid md:grid-cols-2 gap-3">
                            <input type="text" value={member.name} onChange={(e) => updateMember(member.id, "name", e.target.value)} className="px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm" placeholder="Name" />
                            <div className="flex gap-2 justify-end">
                              <button onClick={() => attachMediaToMember(member.id)} className="px-3 py-2 bg-[#f5f1ea] rounded-lg text-sm hover:bg-[#e8dcc8]">Photo</button>
                              <button onClick={() => removeMember(member.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>
                          <input type="text" value={member.role} onChange={(e) => updateMember(member.id, "role", e.target.value)} className="mt-3 w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm" placeholder="Role" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-[#e8dcc8] p-6">
                    <h3 className="text-lg font-semibold text-[#1f2e39] mb-4">Careers</h3>
                    <div className="space-y-4">
                      {opportunities.map((opp) => (
                        <div key={opp.id} className="border border-[#e8dcc8] rounded-lg p-4 bg-[#f9f5f0]">
                          <div className="grid md:grid-cols-2 gap-3">
                            <input type="text" value={opp.title} onChange={(e) => updateOpportunity(opp.id, "title", e.target.value)} className="px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm" placeholder="Role title" />
                            <button onClick={() => removeOpportunity(opp.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 justify-self-end"><Trash2 className="w-4 h-4" /></button>
                          </div>
                          <textarea value={opp.description} onChange={(e) => updateOpportunity(opp.id, "description", e.target.value)} rows={3} className="mt-3 w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm" placeholder="Role description" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-[#e8dcc8] p-6">
                    <h3 className="text-lg font-semibold text-[#1f2e39] mb-4">Gallery</h3>
                    <div className="space-y-4">
                      {gallery.map((item) => (
                        <div key={item.id} className="border border-[#e8dcc8] rounded-lg p-4 bg-[#f9f5f0]">
                          <div className="grid md:grid-cols-2 gap-3">
                            <input type="text" value={item.title} onChange={(e) => updateGalleryItem(item.id, "title", e.target.value)} className="px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm" placeholder="Title" />
                            <div className="flex gap-2 justify-end">
                              <button onClick={() => { setMediaSelectorTarget({ type: "gallery:" + item.id, id: item.id }); setMediaSelectorOpen(true); }} className="px-3 py-2 bg-[#f5f1ea] rounded-lg text-sm hover:bg-[#e8dcc8]">Image</button>
                              <button onClick={() => removeGalleryItem(item.id)} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>
                          <input type="text" value={item.category} onChange={(e) => updateGalleryItem(item.id, "category", e.target.value)} className="mt-3 w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm" placeholder="Category" />
                          <textarea value={item.desc} onChange={(e) => updateGalleryItem(item.id, "desc", e.target.value)} rows={3} className="mt-3 w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm" placeholder="Description" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-[#e8dcc8] p-6">
                    <h3 className="text-lg font-semibold text-[#1f2e39] mb-4">Carousel Slides</h3>
                    <div className="space-y-4">
                      {carousel.map((slide) => (
                        <div key={slide.id} className="border border-[#e8dcc8] rounded-lg p-4 bg-[#f9f5f0]">
                          <div className="grid md:grid-cols-3 gap-3 items-center">
                            <input type="text" value={slide.title} onChange={(e) => updateSlide(slide.id, "title", e.target.value)} className="px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm" placeholder="Slide title" />
                            <input type="text" value={slide.tagline ?? ""} onChange={(e) => updateSlide(slide.id, "tagline", e.target.value)} className="px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm" placeholder="Tagline" />
                            <div className="flex gap-2 justify-end">
                              <button onClick={() => updateSlide(slide.id, "visible", !slide.visible)} className={`px-3 py-2 rounded-lg text-sm ${slide.visible ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"}`}>
                                {slide.visible ? "Visible" : "Hidden"}
                              </button>
                              <button onClick={() => attachMediaToSlide(slide.id)} className="px-3 py-2 bg-[#f5f1ea] rounded-lg text-sm hover:bg-[#e8dcc8]">Media</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pages */}
            {activeTab === "pages" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-[#1f2e39]">Pages Manager</h2>
                  <button
                    onClick={addPage}
                    className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#1f2e39] rounded-lg font-medium hover:opacity-90"
                  >
                    <Plus className="w-4 h-4" />
                    Add Page
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-1 bg-white rounded-lg border border-[#e8dcc8] p-4 max-h-96 overflow-y-auto">
                    <h3 className="text-sm font-semibold text-[#1f2e39] mb-3">All Pages</h3>
                    <div className="space-y-2">
                      {pages.map((page) => (
                        <button
                          key={page.id}
                          onClick={() => {
                            setSelectedPageId(page.id);
                            setExpandedPageId(page.id);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                            selectedPageId === page.id
                              ? "bg-[#1f2e39] text-white"
                              : "bg-[#f5f1ea] text-[#1f2e39] hover:bg-[#e8dcc8]"
                          }`}
                        >
                          <div className="font-medium truncate">{page.title}</div>
                          <div className="text-xs opacity-75 truncate">{page.slug}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedPage && (
                    <div className="col-span-2 bg-white rounded-lg border border-[#e8dcc8] p-6">
                      <h3 className="text-lg font-semibold text-[#1f2e39] mb-4">Edit Page</h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-[#1f2e39] mb-2">Title</label>
                          <input
                            type="text"
                            value={selectedPage.title}
                            onChange={(e) => updatePageField(selectedPage.id, "title", e.target.value)}
                            className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#1f2e39] mb-2">Slug</label>
                          <input
                            type="text"
                            value={selectedPage.slug}
                            onChange={(e) => updatePageField(selectedPage.id, "slug", e.target.value)}
                            className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedPage.published}
                            onChange={(e) => updatePageField(selectedPage.id, "published", e.target.checked)}
                            className="w-4 h-4"
                          />
                          <label className="text-sm font-medium text-[#1f2e39]">Published</label>
                        </div>

                        <div className="border-t border-[#e8dcc8] pt-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-[#1f2e39]">Sections</h4>
                            <button
                              onClick={() => addSection(selectedPage.id)}
                              className="text-xs px-2 py-1 bg-[#f5f1ea] rounded hover:bg-[#e8dcc8]"
                            >
                              + Add
                            </button>
                          </div>

                          <div className="space-y-3 max-h-96 overflow-y-auto">
                            {selectedPage.sections.map((section) => (
                              <div key={section.id} className="bg-[#f5f1ea] rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <input
                                    type="text"
                                    value={section.title}
                                    onChange={(e) => updateSection(selectedPage.id, section.id, "title", e.target.value)}
                                    className="flex-1 text-sm font-medium bg-white border border-[#d8d2c8] rounded px-2 py-1 mr-2"
                                  />
                                  <button
                                    onClick={() => removeSection(selectedPage.id, section.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>

                                <textarea
                                  value={section.content}
                                  onChange={(e) => updateSection(selectedPage.id, section.id, "content", e.target.value)}
                                  rows={3}
                                  className="w-full text-xs border border-[#d8d2c8] rounded px-2 py-1 mb-3"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                  <div>
                                    <label className="text-[10px] font-medium uppercase tracking-wider text-[#8a8a8a] block mb-1">Image alt text</label>
                                    <input
                                      type="text"
                                      value={section.imageAlt ?? ""}
                                      onChange={(e) => updateSection(selectedPage.id, section.id, "imageAlt", e.target.value)}
                                      className="w-full px-2 py-1.5 border border-[#d8d2c8] rounded text-xs"
                                      placeholder="Alt text for this image"
                                    />
                                  </div>
                                  <div className="flex items-end gap-2">
                                    <button
                                      onClick={() => attachMediaToSection(selectedPage.id, section.id)}
                                      className="flex-1 px-3 py-2 bg-white border border-[#d8d2c8] rounded-lg text-xs font-medium hover:bg-[#e8dcc8]"
                                    >
                                      Browse image
                                    </button>
                                  </div>
                                </div>

                                {section.mediaId && (
                                  <div className="rounded-lg border border-[#d8d2c8] bg-white p-2">
                                    <img
                                      src={media.find((m) => m.id === section.mediaId)?.dataUrl}
                                      alt={section.imageAlt || section.title}
                                      className="w-full h-28 object-cover rounded"
                                    />
                                    <div className="mt-2 text-[10px] uppercase tracking-wider text-[#8a8a8a]">
                                      Attached media: {media.find((m) => m.id === section.mediaId)?.name || "Selected image"}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            {activeTab === "navigation" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-[#1f2e39]">Navigation</h2>
                  <button
                    onClick={addNavigationItem}
                    className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#1f2e39] rounded-lg font-medium hover:opacity-90"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>

                <div className="space-y-3">
                  {navbar.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg border border-[#e8dcc8] p-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Label</label>
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) => updateNavItem(item.id, "label", e.target.value)}
                            className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Link</label>
                          <input
                            type="text"
                            value={item.href}
                            onChange={(e) => updateNavItem(item.id, "href", e.target.value)}
                            className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <button
                            onClick={() => updateNavItem(item.id, "visible", !item.visible)}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                              item.visible ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"
                            }`}
                          >
                            {item.visible ? <Eye className="w-4 h-4 mx-auto" /> : <EyeOff className="w-4 h-4 mx-auto" />}
                          </button>
                          <button
                            onClick={() => removeNavItem(item.id)}
                            className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Media */}
            {activeTab === "media" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-[#1f2e39]">Media Library</h2>
                  <label className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#1f2e39] rounded-lg font-medium hover:opacity-90 cursor-pointer">
                    <Plus className="w-4 h-4" />
                    Upload Media
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={(e) => uploadMedia(e.target.files)}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {media.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg border border-[#e8dcc8] overflow-hidden hover:shadow-md transition">
                      <div className="bg-[#f5f1ea] h-32 flex items-center justify-center">
                        {item.type.startsWith("image/") ? (
                          <img src={item.dataUrl} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <video src={item.dataUrl} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-medium text-[#1f2e39] truncate mb-2">{item.name}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => copyMediaUrl(item.id)}
                            className="flex-1 px-2 py-1 text-xs bg-[#f5f1ea] rounded hover:bg-[#e8dcc8]"
                          >
                            <Copy className="w-3 h-3 mx-auto" />
                          </button>
                          <button
                            onClick={() => removeMedia(item.id)}
                            className="flex-1 px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                          >
                            <Trash2 className="w-3 h-3 mx-auto" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {media.length === 0 && (
                  <div className="text-center py-12 text-[#8a8a8a]">
                    <p className="mb-4">No media uploaded yet.</p>
                    <label className="inline-block px-4 py-2 bg-[#f5f1ea] rounded-lg cursor-pointer hover:bg-[#e8dcc8]">
                      Upload your first media
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(e) => uploadMedia(e.target.files)}
                      />
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* Carousel */}
            {activeTab === "carousel" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-[#1f2e39]">Carousel Slides</h2>
                  <button
                    onClick={addSlide}
                    className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#1f2e39] rounded-lg font-medium hover:opacity-90"
                  >
                    <Plus className="w-4 h-4" />
                    Add Slide
                  </button>
                </div>

                <div className="space-y-4">
                  {carousel.map((slide) => (
                    <div key={slide.id} className="bg-white rounded-lg border border-[#e8dcc8] p-6">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Title</label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => updateSlide(slide.id, "title", e.target.value)}
                            className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Tagline</label>
                          <input
                            type="text"
                            value={slide.tagline ?? ""}
                            onChange={(e) => updateSlide(slide.id, "tagline", e.target.value)}
                            className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <button
                            onClick={() => updateSlide(slide.id, "visible", !slide.visible)}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                              slide.visible ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"
                            }`}
                          >
                            {slide.visible ? "Visible" : "Hidden"}
                          </button>
                          <button
                            onClick={() => attachMediaToSlide(slide.id)}
                            className="px-3 py-2 bg-[#f5f1ea] rounded-lg text-sm hover:bg-[#e8dcc8]"
                          >
                            Media
                          </button>
                          <button
                            onClick={() => removeSlide(slide.id)}
                            className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      {slide.mediaId && (
                        <div className="text-xs text-[#8a8a8a]">
                          📎 Media: {media.find((m) => m.id === slide.mediaId)?.name || "Unknown"}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {activeTab === "services" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-[#1f2e39]">Services</h2>
                  <button
                    onClick={addService}
                    className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#1f2e39] rounded-lg font-medium hover:opacity-90"
                  >
                    <Plus className="w-4 h-4" />
                    Add Service
                  </button>
                </div>

                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="bg-white rounded-lg border border-[#e8dcc8] p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Title</label>
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) => updateService(service.id, "title", e.target.value)}
                            className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Description</label>
                          <input
                            type="text"
                            value={service.desc}
                            onChange={(e) => updateService(service.id, "desc", e.target.value)}
                            className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => attachMediaToService(service.id)}
                          className="px-3 py-2 bg-[#f5f1ea] rounded-lg text-sm hover:bg-[#e8dcc8]"
                        >
                          📷 Attach Media
                        </button>
                        <button
                          onClick={() => removeService(service.id)}
                          className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {service.mediaId && (
                        <div className="text-xs text-[#8a8a8a] mt-2">
                          📎 Media: {media.find((m) => m.id === service.mediaId)?.name || "Unknown"}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team */}
            {activeTab === "team" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-[#1f2e39]">Team Members</h2>
                  <button
                    onClick={addMember}
                    className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-[#1f2e39] rounded-lg font-medium hover:opacity-90"
                  >
                    <Plus className="w-4 h-4" />
                    Add Member
                  </button>
                </div>

                <div className="space-y-4">
                  {team.map((member) => (
                    <div key={member.id} className="bg-white rounded-lg border border-[#e8dcc8] p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Name</label>
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => updateMember(member.id, "name", e.target.value)}
                            className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Role</label>
                          <input
                            type="text"
                            value={member.role}
                            onChange={(e) => updateMember(member.id, "role", e.target.value)}
                            className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => attachMediaToMember(member.id)}
                          className="px-3 py-2 bg-[#f5f1ea] rounded-lg text-sm hover:bg-[#e8dcc8]"
                        >
                          🖼️ Attach Photo
                        </button>
                        <button
                          onClick={() => removeMember(member.id)}
                          className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {member.photoId && (
                        <div className="text-xs text-[#8a8a8a] mt-2">
                          📎 Photo: {media.find((m) => m.id === member.photoId)?.name || "Unknown"}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Careers */}
            {activeTab === "careers" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-[#1f2e39]">Careers & Opportunities</h2>
                  <button onClick={addOpportunity} className="px-4 py-2 bg-[#d4af37] text-[#1f2e39] rounded-lg font-medium hover:opacity-90">
                    <Plus className="w-4 h-4 inline mr-2" /> Add Opportunity
                  </button>
                </div>
                <div className="space-y-4">
                  {opportunities.map((opp) => (
                    <div key={opp.id} className="bg-white rounded-lg border border-[#e8dcc8] p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Job Title</label>
                          <input
                            type="text"
                            value={opp.title}
                            onChange={(e) => updateOpportunity(opp.id, "title", e.target.value)}
                            className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Description</label>
                          <input
                            type="text"
                            value={opp.description}
                            onChange={(e) => updateOpportunity(opp.id, "description", e.target.value)}
                            className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => removeOpportunity(opp.id)}
                        className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Case Studies */}
            {activeTab === "cases" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-[#1f2e39]">Case Studies</h2>
                  <button onClick={addCaseStudy} className="px-4 py-2 bg-[#d4af37] text-[#1f2e39] rounded-lg font-medium hover:opacity-90">
                    <Plus className="w-4 h-4 inline mr-2" /> Add Case Study
                  </button>
                </div>
                <div className="space-y-4">
                  {caseStudies.map((caseItem) => (
                    <div key={caseItem.id} className="bg-white rounded-lg border border-[#e8dcc8] p-6">
                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div className="space-y-4">
                          <div>
                            <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Title</label>
                            <input
                              type="text"
                              value={caseItem.title}
                              onChange={(e) => updateCaseStudy(caseItem.id, "title", e.target.value)}
                              className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Category</label>
                            <input
                              type="text"
                              value={caseItem.category}
                              onChange={(e) => updateCaseStudy(caseItem.id, "category", e.target.value)}
                              className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Summary</label>
                            <textarea
                              value={caseItem.summary}
                              onChange={(e) => updateCaseStudy(caseItem.id, "summary", e.target.value)}
                              className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                              rows={3}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#8a8a8a] mb-2 block">Case Image</label>
                          {caseItem.image || caseItem.mediaId ? (
                            <div className="rounded-lg border border-[#d8d2c8] overflow-hidden mb-3">
                              <img
                                src={caseItem.image || media.find((m) => m.id === caseItem.mediaId)?.dataUrl}
                                alt={caseItem.title}
                                className="w-full h-48 object-cover"
                              />
                              <div className="p-2 bg-[#f5f1ea] text-[10px] uppercase tracking-wider text-[#8a8a8a]">
                                Current image
                              </div>
                            </div>
                          ) : (
                            <div className="rounded-lg border border-dashed border-[#d8d2c8] h-48 flex items-center justify-center bg-[#f5f1ea] text-[#8a8a8a] text-sm mb-3">
                              No image
                            </div>
                          )}
                          <button
                            onClick={() => {
                              setMediaSelectorTarget({ type: "case:" + caseItem.id, id: caseItem.id });
                              setMediaSelectorOpen(true);
                            }}
                            className="w-full px-3 py-2 bg-white border border-[#d8d2c8] rounded-lg text-sm font-medium hover:bg-[#f5f1ea]"
                          >
                            Browse image
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeCaseStudy(caseItem.id)}
                        className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Programs */}
            {activeTab === "programs" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-[#1f2e39]">Training Programs</h2>
                  <button onClick={addProgram} className="px-4 py-2 bg-[#d4af37] text-[#1f2e39] rounded-lg font-medium hover:opacity-90">
                    <Plus className="w-4 h-4 inline mr-2" /> Add Program
                  </button>
                </div>
                <div className="space-y-4">
                  {programs.map((prog) => (
                    <div key={prog.id} className="bg-white rounded-lg border border-[#e8dcc8] p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Program Title</label>
                          <input
                            type="text"
                            value={prog.title}
                            onChange={(e) => updateProgram(prog.id, "title", e.target.value)}
                            className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Subtitle</label>
                          <input
                            type="text"
                            value={prog.subtitle}
                            onChange={(e) => updateProgram(prog.id, "subtitle", e.target.value)}
                            className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Duration</label>
                        <input
                          type="text"
                          value={prog.duration}
                          onChange={(e) => updateProgram(prog.id, "duration", e.target.value)}
                          className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                        />
                      </div>
                      <button
                        onClick={() => removeProgram(prog.id)}
                        className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {activeTab === "gallery" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-[#1f2e39]">Gallery</h2>
                  <button onClick={addGalleryItem} className="px-4 py-2 bg-[#d4af37] text-[#1f2e39] rounded-lg font-medium hover:opacity-90">
                    <Plus className="w-4 h-4 inline mr-2" /> Add Gallery Item
                  </button>
                </div>
                <div className="grid gap-6">
                  {gallery.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg border border-[#e8dcc8] p-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                          <div>
                            <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Title</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => updateGalleryItem(item.id, "title", e.target.value)}
                              className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Category</label>
                            <input
                              type="text"
                              value={item.category}
                              onChange={(e) => updateGalleryItem(item.id, "category", e.target.value)}
                              className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-[#8a8a8a] mb-1 block">Description</label>
                            <textarea
                              value={item.desc}
                              onChange={(e) => updateGalleryItem(item.id, "desc", e.target.value)}
                              className="w-full px-3 py-2 border border-[#d8d2c8] rounded-lg text-sm"
                              rows={3}
                            />
                          </div>
                          <button
                            onClick={() => removeGalleryItem(item.id)}
                            className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 font-medium"
                          >
                            <Trash2 className="w-4 h-4 inline mr-2" /> Delete Item
                          </button>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#8a8a8a] mb-2 block">Gallery Image</label>
                          {item.src || item.mediaId ? (
                            <div className="rounded-lg border border-[#d8d2c8] overflow-hidden mb-3">
                              <img
                                src={item.src || media.find((m) => m.id === item.mediaId)?.dataUrl}
                                alt={item.title}
                                className="w-full h-40 object-cover"
                              />
                              <div className="p-2 bg-[#f5f1ea] text-[10px] uppercase tracking-wider text-[#8a8a8a]">
                                Preview
                              </div>
                            </div>
                          ) : (
                            <div className="rounded-lg border border-dashed border-[#d8d2c8] h-40 flex items-center justify-center bg-[#f5f1ea] text-[#8a8a8a] text-xs mb-3">
                              No image
                            </div>
                          )}
                          <button
                            onClick={() => {
                              setMediaSelectorTarget({ type: "gallery:" + item.id, id: item.id });
                              setMediaSelectorOpen(true);
                            }}
                            className="w-full px-3 py-2 bg-white border border-[#d8d2c8] rounded-lg text-sm font-medium hover:bg-[#f5f1ea]"
                          >
                            Select image
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#1f2e39] mb-6">Settings</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg border border-[#e8dcc8] p-6">
                    <h3 className="font-semibold text-[#1f2e39] mb-4">Data Management</h3>
                    <div className="space-y-2">
                      <button
                        onClick={downloadSampleJSON}
                        className="w-full text-left px-4 py-3 bg-[#f5f1ea] rounded-lg hover:bg-[#e8dcc8] transition text-sm"
                      >
                        📥 Download Sample JSON
                      </button>
                      <button
                        onClick={exportJSON}
                        className="w-full text-left px-4 py-3 bg-[#f5f1ea] rounded-lg hover:bg-[#e8dcc8] transition text-sm"
                      >
                        📤 Export All Data
                      </button>
                      <label className="w-full text-left px-4 py-3 bg-[#f5f1ea] rounded-lg hover:bg-[#e8dcc8] transition text-sm cursor-pointer block">
                        📮 Import from JSON
                        <input
                          type="file"
                          accept="application/json"
                          className="hidden"
                          onChange={(e) => handleImportFile(e.target.files?.[0] ?? null)}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-[#e8dcc8] p-6">
                    <h3 className="font-semibold text-[#1f2e39] mb-4">Security & Authentication</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                        <strong>Current Method:</strong> {getCurrentAuthMethod() === "username" ? "Username & Password" : "PIN"}
                      </div>
                      <button
                        onClick={changeUsernamePassword}
                        className="w-full text-left px-4 py-3 bg-[#f5f1ea] rounded-lg hover:bg-[#e8dcc8] transition text-sm"
                      >
                        👤 Change Username & Password
                      </button>
                      <button
                        onClick={changePin}
                        className="w-full text-left px-4 py-3 bg-[#f5f1ea] rounded-lg hover:bg-[#e8dcc8] transition text-sm"
                      >
                        🔐 Change Login PIN
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <MediaSelectorModal
        open={mediaSelectorOpen}
        onClose={() => {
          setMediaSelectorOpen(false);
          setMediaSelectorTarget(null);
        }}
        media={media}
        onSelect={handleMediaSelect}
      />
    </div>
  );
}
