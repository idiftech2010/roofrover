export const STORAGE_KEYS = {
  pages: "rr_pages",
  navbar: "rr_navbar",
  carousel: "rr_carousel",
  services: "rr_services",
  team: "rr_team",
  media: "rr_media",
  opportunities: "rr_opportunities",
  caseStudies: "rr_case_studies",
  programs: "rr_programs",
  gallery: "rr_gallery",
};

export function getDefaultOpportunities() {
  return [
    { id: "opp_listing_agent", title: "Listing Agent", description: "Represent sellers and manage property listings, photos, and market positioning to attract buyers." },
    { id: "opp_property_photographer", title: "Property Photographer", description: "Capture high-quality images and staging photos that showcase each property's best features." },
    { id: "opp_virtual_tour_specialist", title: "Virtual Tour Specialist", description: "Create immersive 3D and video tours to help buyers explore homes remotely." },
    { id: "opp_sales_agent", title: "Sales Agent", description: "Guide buyers through viewings, offers, and closings with exceptional service and market knowledge." },
  ];
}

export function getDefaultCaseStudies() {
  return [
    {
      id: "case_luxury_villa",
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
  ];
}

export function getDefaultPrograms() {
  return [
    { id: "prog_cybersecurity", title: "Cybersecurity Certification", subtitle: "Hands-on security training for professionals and teams.", duration: "8 weeks" },
    { id: "prog_fullstack", title: "Full-Stack Development Bootcamp", subtitle: "Build robust web and mobile applications from concept to launch.", duration: "10 weeks" },
    { id: "prog_ai_analytics", title: "AI & Data Analytics", subtitle: "Learn intelligent systems, predictive modelling, and business insights.", duration: "6 weeks" },
  ];
}

export function getDefaultGallery() {
  return [
    { id: "gallery_1", src: `${import.meta.env.BASE_URL}gallery-house-1.png`, category: "Estates", title: "Modern Waterfront Villa", desc: "Spacious villa with panoramic water views." },
    { id: "gallery_2", src: `${import.meta.env.BASE_URL}gallery-house-2.png`, category: "Estates", title: "Contemporary City Penthouse", desc: "Luxury penthouse in the heart of the city." },
    { id: "gallery_3", src: `${import.meta.env.BASE_URL}gallery-house-3.png`, category: "Interiors", title: "Designer Interiors", desc: "High-end finishes and open-plan living." },
  ];
}

export function getDefaultPages() {
  return [
    {
      id: "page_home",
      slug: "/",
      title: "Home",
      published: true,
      sections: [
        { id: "home_hero_title", title: "Hero Title", content: "Modern Family Homes" },
        { id: "home_hero_tagline", title: "Hero Tagline", content: "Find Your Perfect Pad — Search, Tour, and Own Modern Properties" },
        { id: "home_cta", title: "Hero CTA", content: "Browse Listings" },
        { id: "home_intro", title: "Intro", content: "RoofRover brings curated listings, trusted agents, and immersive tours together to help you find your perfect pad." },
        { id: "home_cta_heading", title: "CTA Heading", content: "Ready to find your perfect property?" },
        { id: "home_cta_text", title: "CTA Text", content: "Join 40+ clients who trust RoofRover to showcase and manage premium properties." },
      ],
    },
    {
      id: "page_about",
      slug: "/about",
      title: "About",
      published: true,
      sections: [
        { id: "about_heading", title: "Heading", content: "About RoofRover" },
        { id: "about_intro", title: "Intro", content: "RoofRover is a modern real-estate platform that helps people discover, tour, and own contemporary properties." },
        { id: "about_mission", title: "Mission", content: "Make property discovery effortless: accurate listings, immersive tours, and seamless bookings so users can find their perfect pad." },
        { id: "about_vision", title: "Vision", content: "Be the leading modern real-estate platform for buyers, sellers and agents — trusted for transparency, service, and beautiful homes." },
        { id: "about_values", title: "Values", content: "Integrity. Innovation. Inclusion. We believe diverse perspectives build better solutions — and that excellence has no boundaries." },
        { id: "about_team_intro", title: "Team Intro", content: "Meet the team behind RoofRover—innovators, strategists, and property experts dedicated to transforming how people find homes." },
      ],
    },
    {
      id: "page_services",
      slug: "/services",
      title: "Services",
      published: true,
      sections: [
        { id: "services_heading", title: "Heading", content: "Our Services" },
        { id: "services_intro", title: "Intro", content: "From cutting-edge software engineering to elite cybersecurity and transformative IT strategy, we deliver solutions that matter." },
      ],
    },
    {
      id: "page_contact",
      slug: "/contact",
      title: "Contact",
      published: true,
      sections: [
        { id: "contact_heading", title: "Heading", content: "Contact Us" },
        { id: "contact_intro", title: "Intro", content: "Whether you want to list a property, schedule a viewing, or speak with an agent — we're here to help you find your perfect pad." },
      ],
    },
    {
      id: "page_footer",
      slug: "/footer",
      title: "Footer",
      published: true,
      sections: [
        { id: "footer_description", title: "Description", content: "Find. Tour. Own. RoofRover brings curated listings, trusted agents, and immersive tours together to help you find your perfect pad." },
      ],
    },
    {
      id: "page_sell",
      slug: "/sell",
      title: "Sell",
      published: true,
      sections: [
        { id: "sell_heading", title: "Heading", content: "Sell Your Property" },
        { id: "sell_subtitle", title: "Subtitle", content: "Get market-leading exposure and a dedicated agent to help you close quickly." },
        { id: "sell_list_title", title: "List Title", content: "List with RoofRover" },
        { id: "sell_list_desc", title: "List Description", content: "Fill out a quick form and one of our agents will reach out to schedule a valuation and photoshoot." },
        { id: "sell_list_cta", title: "List CTA", content: "Get Started" },
        { id: "sell_resources_heading", title: "Resources Heading", content: "Seller Resources" },
        { id: "sell_resource_1", title: "Resource 1", content: "Free valuation" },
        { id: "sell_resource_2", title: "Resource 2", content: "Professional photography" },
        { id: "sell_resource_3", title: "Resource 3", content: "Agent matching" },
        { id: "sell_resource_4", title: "Resource 4", content: "Fast listings syndication" },
      ],
    },
    {
      id: "page_browse",
      slug: "/browse",
      title: "Browse Homes",
      published: true,
      sections: [
        { id: "browse_heading", title: "Heading", content: "Browse Homes" },
        { id: "browse_subtitle", title: "Subtitle", content: "Explore curated listings across cities, neighborhoods and price ranges." },
        { id: "browse_intro", title: "Intro", content: "Discover properties that match your lifestyle and budget." },
      ],
    },
    {
      id: "page_virtual_tours",
      slug: "/virtual-tours",
      title: "Virtual Tours",
      published: true,
      sections: [
        { id: "vt_heading", title: "Heading", content: "Virtual Tours" },
        { id: "vt_subtitle", title: "Subtitle", content: "Take immersive 3D walkthroughs and cinematic tours from anywhere." },
        { id: "vt_intro", title: "Intro", content: "Experience properties like never before with our interactive virtual tour technology." },
      ],
    },
  ];
}

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.error("localCMS load error", e);
    return fallback;
  }
}

export function save(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("localCMS save error", e);
  }
}

export function uid(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
}
