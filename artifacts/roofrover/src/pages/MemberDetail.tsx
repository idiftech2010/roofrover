import { motion, view } from "framer-motion";
import { Link } from "wouter";
import { Mail, Phone, ArrowLeft, ExternalLink } from "lucide-react";
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const teamData: Record<string, any> = {
  "idris-olanrewaju": {
    name: "Idris Olanrewaju Ibraheem",
    position: "Founder & CEO",
    email: "info@roofrover.com",
    phone: "+2348125191913",
    image: "/images/ceo_idris.png",
    bio: "Founder and CEO of RoofRover, Idris blends corporate leadership with fashion sensibility, industrial insight, and academic mentorship. With more than 13 years of industry and university teaching experience, he leads the company’s growth strategy and innovation agenda.",
    details: [
      "Idris is a passionate leader who bridges creative business strategy with customer-focused product delivery.",
      "He mentors teams while scaling commercial products and services for the property market.",
    ],
    experience: [
      "Industry and Academic experience with Universities, Government, Non-Government Organizations, and Private Sector clients",
      "Vast experience in property advisory and market strategy",
      "Delivered transformation programs for property portfolios",
      "Built partnerships between agencies and developers",
      "Delivered executive workshops on market strategy and leadership",
      "Scaled RoofRover from startup to trusted real-estate advisory platform",
    ],
    education: [
      { degree: "Ph.D.", field: "Business Strategy", institution: "Al-Hikmah University - Ilorin, Nigeria", year: "In view" },
      { degree: "M.Sc.", field: "Property Studies", institution: "Al-Hikmah University - Ilorin, Nigeria", year: 2022 },
      { degree: "B.Sc.", field: "Business", institution: "Al-Hikmah University - Ilorin, Nigeria", year: 2019 },
    ],
    socials: [
      { label: "Twitter", icon: <FaXTwitter className="w-4 h-4" />, href: "#" },
      { label: "Facebook", icon: <FaFacebookF className="w-4 h-4" />, href: "#" },
      { label: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "#" },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "#" },
    ],
  },
  "sumayyah-ibraheem": {
    name: "Sumayyah Ibraheem",
    position: "Head of Property Verification",
    email: "sum.ibraheem@roofrover.com",
    phone: "+2348030000001",
    image: "/images/s_i.png",
    bio: "Sumayyah leads RoofRover’s property verification practice, delivering trust and resilience across listings and transactions. She is passionate about mentoring teams and building compliance programs that scale.",
    details: [
      "She has delivered verification programs for property portfolios, focusing on ownership and amenity accuracy.",
      "Sumayyah supports agent training and compliance readiness.",
    ],
    experience: [
      "Designed verification frameworks for property listings",
      "Led inspection and validation exercises",
      "Built governance and quality frameworks for listings",
      "Delivered training for in-house verification teams",
    ],
    education: [
      { degree: "M.Sc.", field: "Property Studies", institution: "University of Lagos", year: 2016 },
      { degree: "B.Sc.", field: "Building & Surveying", institution: "University of Ibadan", year: 2014 },
    ],
    socials: [
      { label: "Twitter", icon: <FaXTwitter className="w-4 h-4" />, href: "https://x.com/roofrover" },
      { label: "Facebook", icon: <FaFacebookF className="w-4 h-4" />, href: "https://facebook.com/roofrover" },
      { label: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/roofrover" },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com/company/roofrover" },
    ],
  },
  "layla-ahmed": {
    name: "Layla Ahmed",
    position: "Head of Agent Training",
    email: "layla.ahmed@roofrover.com",
    phone: "+2348030000002",
    image: "/images/layla_training.png",
    bio: "Layla builds learning journeys for property professionals. Her programs focus on practical skills, staging, photography, and client service.",
    details: [
      "She creates bespoke training pathways that help agents move from concept to high-performing practice.",
      "Layla works with partners to align curriculum with market best-practices.",
    ],
    experience: [
      "Designed training curriculum for agent teams",
      "Managed professional development bootcamps",
      "Created mentorship programs for early-career agents",
      "Delivered workshops on staging and client service",
    ],
    education: [
      { degree: "M.A.", field: "Education & Training", institution: "University of London", year: 2015 },
      { degree: "B.Sc.", field: "Information Systems", institution: "American University in Cairo", year: 2013 },
    ],
    socials: [
      { label: "Twitter", icon: <FaXTwitter className="w-4 h-4" />, href: "https://x.com/roofrover" },
      { label: "Facebook", icon: <FaFacebookF className="w-4 h-4" />, href: "https://facebook.com/roofrover" },
      { label: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/roofrover" },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com/company/roofrover" },
    ],
  },
  "yaasir-ibraheem": {
    name: "Yaasir Ibraheem",
    position: "Head of Market Insights",
    email: "yaasir.ibraheem@roofrover.com",
    phone: "+2348030000003",
    image: "/images/yaasir_ai.png",
    bio: "Yaasir leads market insights and analytics for RoofRover, delivering actionable data and forecasting for agents and sellers.",
    details: [
      "His market-led approach ensures insights are both accurate and actionable.",
      "Yaasir supports teams with pricing strategy and trend analysis.",
    ],
    experience: [
      "Built market analysis platforms",
      "Designed valuation and pricing solutions",
      "Managed analytics pipelines and reporting",
      "Partnered with teams to translate data into insights",
    ],
    education: [
      { degree: "Ph.D.", field: "Market Analytics", institution: "King Fahd University", year: 2017 },
      { degree: "M.Sc.", field: "Data Science", institution: "Qatar University", year: 2014 },
    ],
    socials: [
      { label: "Twitter", icon: <FaXTwitter className="w-4 h-4" />, href: "https://x.com/roofrover" },
      { label: "Facebook", icon: <FaFacebookF className="w-4 h-4" />, href: "https://facebook.com/roofrover" },
      { label: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/roofrover" },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com/company/roofrover" },
    ],
  },
  "modupe-johnson": {
    name: "Modupe Johnson",
    position: "Client Experience Manager",
    email: "modupe.johnson@roofrover.com",
    phone: "+2348030000004",
    image: "/images/m_j.png",
    bio: "Modupe ensures every client engagement delivers measurable value, smooth delivery, and exceptional service. She builds lasting relationships and helps clients define success for every project.",
    details: [
      "She focuses on the entire customer journey, from initial onboarding to long-term support.",
      "Modupe keeps stakeholders aligned and ensures delivery stays on schedule and on budget.",
    ],
    experience: [
      "Managed onboarding and delivery for clients",
      "Coordinated cross-functional teams",
      "Defined customer success metrics and satisfaction programs",
      "Led post-launch support and continuous improvement reviews",
    ],
    education: [
      { degree: "M.B.A.", field: "Business Administration", institution: "University of London", year: 2016 },
      { degree: "B.Sc.", field: "Business Studies", institution: "University of Bristol", year: 2014 },
    ],
    socials: [
      { label: "Twitter", icon: <FaXTwitter className="w-4 h-4" />, href: "https://x.com/roofrover" },
      { label: "Facebook", icon: <FaFacebookF className="w-4 h-4" />, href: "https://facebook.com/roofrover" },
      { label: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/roofrover" },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com/company/roofrover" },
    ],
  },
  "chen-wei": {
    name: "Chen Wei",
    position: "Head of Platform",
    email: "chen.wei@roofrover.com",
    phone: "+2348030000005",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    bio: "Chen designs resilient platforms that support RoofRover’s growth and reliability needs.",
    details: [
      "He translates business requirements into practical, scalable system designs.",
      "Chen champions reusable architectures that accelerate future development and reduce operational risk.",
    ],
    experience: [
      "Created platforms for digital property experiences",
      "Designed scalable systems for high-traffic environments",
      "Built performance and observability practices",
      "Collaborated with engineering teams on deployment and reliability",
    ],
    education: [
      { degree: "M.Eng.", field: "Software Engineering", institution: "National Taiwan University", year: 2015 },
      { degree: "B.Sc.", field: "Computer Science", institution: "Tsinghua University", year: 2013 },
    ],
    socials: [
      { label: "Twitter", icon: <FaXTwitter className="w-4 h-4" />, href: "https://x.com/roofrover" },
      { label: "Facebook", icon: <FaFacebookF className="w-4 h-4" />, href: "https://facebook.com/roofrover" },
      { label: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/roofrover" },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com/company/roofrover" },
    ],
  },
  "nkiru-obi": {
    name: "Nkiru Obi",
    position: "Listings Analyst",
    email: "nkiru.obi@roofrover.com",
    phone: "+2348030000006",
    image: "/images/n_o.png",
    bio: "Nkiru bridges business goals and listing quality, ensuring accurate property data and smooth publication.",
    details: [
      "She specializes in turning complex requirements into clear publication plans.",
      "Nkiru ensures listings meet quality and compliance standards.",
    ],
    experience: [
      "Generated listing specifications and validation checks",
      "Guided process improvement for publishing teams",
      "Validated solutions through testing and stakeholder review",
      "Supported listing rollouts and client adoption activities",
    ],
    education: [
      { degree: "B.Sc.", field: "Computer Science", institution: "University of Nigeria", year: 2014 },
      { degree: "Certification", field: "ITIL, PMP", institution: "Axelos & PMI", year: 2016 },
    ],
    socials: [
      { label: "Twitter", icon: <FaXTwitter className="w-4 h-4" />, href: "https://x.com/roofrover" },
      { label: "Facebook", icon: <FaFacebookF className="w-4 h-4" />, href: "https://facebook.com/roofrover" },
      { label: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/roofrover" },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com/company/roofrover" },
    ],
  },
  "emily-ross": {
    name: "Emily Ross",
    position: "Product & Market Research",
    email: "emily.ross@roofrover.com",
    phone: "+2348030000007",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop",
    bio: "Emily combines market research with product thinking to shape services customers love.",
    details: [
      "She helps teams discover product-market fit and design solutions with customer outcomes in mind.",
      "Emily uses data and qualitative research to shape product experiences.",
    ],
    experience: [
      "Led market research and customer discovery initiatives",
      "Designed customer journeys and product prototypes",
      "Analyzed user behavior and market trends",
      "Created go-to-market strategies",
    ],
    education: [
      { degree: "M.Sc.", field: "Technology & Innovation", institution: "Stanford University", year: 2017 },
      { degree: "B.Sc.", field: "Physics & Computer Science", institution: "MIT", year: 2015 },
    ],
    socials: [
      { label: "Twitter", icon: <FaXTwitter className="w-4 h-4" />, href: "https://x.com/roofrover" },
      { label: "Facebook", icon: <FaFacebookF className="w-4 h-4" />, href: "https://facebook.com/roofrover" },
      { label: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/roofrover" },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com/company/roofrover" },
    ],
  },
  "ali-khan": {
    name: "Ali Khan",
    position: "Head of Operations",
    email: "ali.khan@roofrover.com",
    phone: "+2348030000008",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop",
    bio: "Ali leads operations and ensures the platform stays reliable and scalable.",
    details: [
      "He focuses on operational reliability and automation.",
      "Ali guides teams on best practices for efficiency and cost control.",
    ],
    experience: [
      "Designed operational practices and reliability standards",
      "Implemented automation and deployment workflows",
      "Built monitoring and incident response processes",
    ],
    education: [
      { degree: "M.Sc.", field: "Cloud Computing", institution: "University of Dubai", year: 2016 },
      { degree: "B.Sc.", field: "Computer Engineering", institution: "NED University", year: 2014 },
    ],
    socials: [
      { label: "Twitter", icon: <FaXTwitter className="w-4 h-4" />, href: "https://x.com/roofrover" },
      { label: "Facebook", icon: <FaFacebookF className="w-4 h-4" />, href: "https://facebook.com/roofrover" },
      { label: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/roofrover" },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com/company/roofrover" },
    ],
  },
  "fatima-noor": {
    name: "Ameenah Ibraheem",
    position: "Customer Education Specialist",
    email: "doyin.ibraheem@roofrover.com",
    phone: "+2348030000009",
    image: "images/a_i.png",
    bio: "Ameenah designs customer education and onboarding programs for agents and sellers.",
    details: [
      "She creates mentorship programs that help agents build careers.",
      "Ameenah works closely with partners to align education programs with industry demands.",
    ],
    experience: [
      "Developed mentorship and onboarding programs",
      "Built partnerships with training providers",
      "Managed community outreach and education events",
    ],
    education: [
      { degree: "M.Ed.", field: "Higher Education", institution: "University of Riyadh", year: 2015 },
      { degree: "B.Sc.", field: "Education & IT", institution: "King Saud University", year: 2013 },
    ],
    socials: [
      { label: "Twitter", icon: <FaXTwitter className="w-4 h-4" />, href: "https://x.com/roofrover" },
      { label: "Facebook", icon: <FaFacebookF className="w-4 h-4" />, href: "https://facebook.com/roofrover" },
      { label: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/roofrover" },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com/company/roofrover" },
    ],
  },
  "jason-patel": {
    name: "Jason Patel",
    position: "Operations Engineer",
    email: "jason.patel@roofrover.com",
    phone: "+2348030000010",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    bio: "Jason delivers automation and reliability practices to keep the platform running smoothly.",
    details: [
      "He specializes in automation, CI/CD, and reliability.",
      "Jason helps teams ship faster without sacrificing stability.",
    ],
    experience: [
      "Built deployment pipelines and automation",
      "Managed container orchestration and release automation",
      "Defined configuration standards",
      "Implemented monitoring and alerting",
    ],
    education: [
      { degree: "B.Tech", field: "Information Technology", institution: "IIT Mumbai", year: 2015 },
      { degree: "Certification", field: "AWS, Kubernetes, Docker", institution: "AWS & Linux Foundation", year: 2017 },
    ],
    socials: [
      { label: "Twitter", icon: <FaXTwitter className="w-4 h-4" />, href: "https://x.com/roofrover" },
      { label: "Facebook", icon: <FaFacebookF className="w-4 h-4" />, href: "https://facebook.com/roofrover" },
      { label: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/roofrover" },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com/company/roofrover" },
    ],
  },
  "hannah-lee": {
    name: "Hannah Lee",
    position: "Business Operations",
    email: "hannah.lee@roofrover.com",
    phone: "+2348030000011",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop",
    bio: "Hannah drives operational excellence across RoofRover, improving process efficiency and team performance.",
    details: [
      "She coordinates operations across teams and keeps key workflows efficient.",
      "Hannah also supports strategic planning and resource allocation for growth.",
    ],
    experience: [
      "Managed business operations and resource planning",
      "Optimized process workflows and internal systems",
      "Coordinated cross-department planning",
      "Tracked performance and improved productivity",
    ],
    education: [
      { degree: "M.B.A.", field: "Operations Management", institution: "Singapore Management University", year: 2016 },
      { degree: "B.Sc.", field: "Business Administration", institution: "National University of Singapore", year: 2014 },
    ],
    socials: [
      { label: "Twitter", icon: <FaXTwitter className="w-4 h-4" />, href: "https://x.com/roofrover" },
      { label: "Facebook", icon: <FaFacebookF className="w-4 h-4" />, href: "https://facebook.com/roofrover" },
      { label: "Instagram", icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com/roofrover" },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com/company/roofrover" },
    ],
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function MemberDetail({ memberId }: { memberId: string }) {
  const member = teamData[memberId];

    if (!member) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#282828]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <h1 className="text-3xl font-serif font-bold text-[#2D3E4A] mb-4">Member not found</h1>
            <Link href="/about" className="text-[#D4AF37] hover:text-[#2D3E4A]">
              Back to team
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#282828]">
      <Navbar />

      <div className="pt-24 bg-[#2D3E4A]">
        <div className="container mx-auto px-6 md:px-12 py-12 text-center">
          <Link href="/about" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Team
          </Link>
          <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">Team Member</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">{member.name}</h1>
          <p className="text-white/70 text-xl mt-4">{member.position}</p>
        </div>
      </div>

      <main className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <img src={member.image} alt={member.name} className="rounded-3xl shadow-2xl w-full object-cover aspect-square" />
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <p className="text-sm font-semibold text-[#D4AF37] uppercase mb-2">Contact</p>
                  <div className="space-y-3">
                    <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-[#282828] hover:text-[#D4AF37]">
                      <Mail className="w-5 h-5 text-[#D4AF37]" />
                      {member.email}
                    </a>
                      <a href={`tel:${member.phone.replace(/[^+0-9]/g, "")}`} className="flex items-center gap-3 text-[#282828] hover:text-[#D4AF37]">
                      <Phone className="w-5 h-5 text-[#D4AF37]" />
                      {member.phone}
                    </a>
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <p className="text-sm font-semibold text-[#D4AF37] uppercase mb-4">Connect</p>
                  <div className="flex flex-wrap gap-3">
                    {member.socials.map((social: any) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-[#2D3E4A] transition hover:bg-[#D4AF37] hover:text-white"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-8">
              <div className="rounded-3xl border border-gray-200 bg-white p-8">
                <h2 className="text-2xl font-serif font-bold text-[#2D3E4A] mb-4">About</h2>
                <p className="text-[#282828]/80 leading-relaxed">{member.bio}</p>
                {member.details?.map((detail: string, idx: number) => (
                  <p key={idx} className="text-[#282828]/80 leading-relaxed mt-4">
                    {detail}
                  </p>
                ))}
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-8">
                <h2 className="text-2xl font-serif font-bold text-[#2D3E4A] mb-6">Experience</h2>
                <ul className="space-y-3">
                  {member.experience.map((exp: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="inline-block h-2 w-2 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                      <span className="text-[#282828]/80">{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-8">
                <h2 className="text-2xl font-serif font-bold text-[#2D3E4A] mb-6">Education</h2>
                <div className="space-y-6">
                  {member.education.map((edu: any, idx: number) => (
                    <div key={idx}>
                      <p className="font-semibold text-[#2D3E4A]">{edu.degree} in {edu.field}</p>
                      <p className="text-[#282828]/70 text-sm">{edu.institution}</p>
                      <p className="text-[#D4AF37] text-xs font-semibold">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
