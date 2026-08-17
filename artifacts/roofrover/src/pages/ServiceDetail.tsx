import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const servicesData: Record<string, any> = {
  software: {
    title: "Software Development",
    description: "Custom web, mobile, and hybrid applications built for enterprise scale.",
    fullDescription:
      "We design and develop robust, secure software solutions tailored to your business needs. From concept through deployment, our agile process ensures transparency, quality, and rapid delivery.",
    highlights: [
      "Custom web applications with modern tech stacks",
      "Mobile-first and responsive designs",
      "Cloud-native architectures",
      "API-first development",
      "Scalable microservices",
      "Real-time data processing",
    ],
    process: [
      { step: "Discovery & Planning", desc: "Understand your business goals and define project scope." },
      { step: "Design & Architecture", desc: "Create intuitive UI/UX and robust system architecture." },
      { step: "Agile Development", desc: "Build incrementally with continuous feedback loops." },
      { step: "Quality Assurance", desc: "Rigorous testing across functionality, security, and performance." },
      { step: "Deployment & Support", desc: "Launch, monitor, and provide ongoing technical support." },
    ],
    cta: "Start your software project",
    items: [
      {
        id: "custom-web-applications",
        name: "Custom Web Applications",
        description: "Tailored web platforms with responsive design, strong performance, and secure architecture.",
        details:
          "Our custom web application service is ideal for businesses seeking a tailored online presence with bespoke features, integrations, and admin workflows.",
        requirements: [
          "Business goals and feature roadmap",
          "Design preferences and branding guidelines",
          "Expected user flows and data needs",
          "Integration requirements with existing systems",
        ],
      },
      {
        id: "mobile-hybrid-apps",
        name: "Mobile & Hybrid Apps",
        description: "Cross-platform mobile solutions for iOS and Android with polished UX and native-like performance.",
        details:
          "We build mobile products that work seamlessly across devices and provide a consistent experience for your users on mobile and tablet screens.",
        requirements: [
          "Target platforms and device requirements",
          "Core mobile features and offline behavior",
          "Design assets and brand visuals",
          "Backend or API expectations",
        ],
      },
      {
        id: "api-backend-engineering",
        name: "API & Backend Engineering",
        description: "Robust API design and backend development for scalable, secure operations.",
        details:
          "From RESTful services to GraphQL and microservices, we create backends that support your applications and grow with your business.",
        requirements: [
          "Data model and storage requirements",
          "Security and authentication needs",
          "Integration endpoints and third-party systems",
          "Expected traffic and performance goals",
        ],
      },
      {
        id: "ai-automation-integration",
        name: "AI & Automation Integration",
        description: "Smart automation and machine learning-powered systems that improve workflows and decision-making.",
        details:
          "We connect AI models, automation bots, and analytics to your business processes so you can scale smarter operations.",
        requirements: [
          "Use cases for AI / automation",
          "Available data and sources",
          "Success criteria and KPIs",
          "Integration points with existing systems",
        ],
      },
    ],
  },
  cybersecurity: {
    title: "Cybersecurity Solutions",
    description: "End-to-end security strategy, assessment, and incident response.",
    fullDescription:
      "Protect your organization from evolving threats with our comprehensive cybersecurity services. We combine proactive threat hunting, defensive infrastructure, and compliance frameworks to keep your data and systems secure.",
    highlights: [
      "Penetration testing & vulnerability assessments",
      "Red Team / Blue Team exercises",
      "Security architecture & design",
      "Incident response & threat analysis",
      "Governance, Risk & Compliance (GRC)",
      "Security awareness training",
    ],
    process: [
      { step: "Security Assessment", desc: "Evaluate your current posture against threats and regulations." },
      { step: "Strategy Development", desc: "Design a security roadmap aligned with business goals." },
      { step: "Implementation", desc: "Deploy controls, tools, and processes enterprise-wide." },
      { step: "Monitoring & Response", desc: "24/7 threat detection and incident response readiness." },
      { step: "Continuous Improvement", desc: "Regular audits, updates, and training programs." },
    ],
    cta: "Schedule a security assessment",
    items: [
      {
        id: "red-team-operations",
        name: "Red Team Operations",
        description: "Simulated offensive exercises to identify security gaps before attackers do.",
        details:
          "Our red team simulates real-world attack scenarios to expose weaknesses in your people, process, and technology defenses.",
        requirements: [
          "Scope of systems and applications",
          "Accepted testing windows and access levels",
          "Known risk tolerance and business priorities",
          "Incident response escalation points",
        ],
      },
      {
        id: "blue-team-defense",
        name: "Blue Team Defense",
        description: "Continuous monitoring, threat hunting, and active incident response support.",
        details:
          "We help you build a strong defensive posture with tools, processes, and response readiness for modern threats.",
        requirements: [
          "Monitoring tools and log sources",
          "Detection rules and alerting needs",
          "Incident response workflows",
          "Compliance and reporting expectations",
        ],
      },
      {
        id: "grc-compliance",
        name: "GRC & Compliance",
        description: "Governance, risk, and compliance support for industry standards and regulations.",
        details:
          "We help align your security controls with regulatory requirements and build governance programs that scale with your business.",
        requirements: [
          "Applicable regulatory frameworks",
          "Existing policies and control sets",
          "Risk inventory and assessment outputs",
          "Stakeholder governance structures",
        ],
      },
      {
        id: "cloud-security-architecture",
        name: "Cloud Security Architecture",
        description: "Secure cloud design, migration, and ongoing management.",
        details:
          "Our team designs cloud environments that are resilient, compliant, and optimized for both security and performance.",
        requirements: [
          "Current cloud provider and environment details",
          "Risk and compliance objectives",
          "Identity and access management requirements",
          "Data protection and encryption needs",
        ],
      },
    ],
  },
  consulting: {
    title: "IT Consultation & Training",
    description: "Strategic guidance and upskilling for your technology teams.",
    fullDescription:
      "Transform your organization's digital capabilities through expert consultation and tailored training programs. We guide strategic technology decisions and develop your team's expertise in emerging technologies.",
    highlights: [
      "Digital transformation roadmaps",
      "Technology stack evaluation",
      "Cloud migration strategies",
      "Professional training programs",
      "Hands-on workshops & labs",
      "Certification exam preparation",
    ],
    process: [
      { step: "Consultation & Discovery", desc: "Assess current state and define transformation goals." },
      { step: "Strategy & Planning", desc: "Develop detailed implementation roadmaps." },
      { step: "Training Program Design", desc: "Customize curricula for your team's skill levels." },
      { step: "Delivery & Mentorship", desc: "Hands-on training with ongoing technical support." },
      { step: "Validation & Certification", desc: "Assess competency and prepare for industry certifications." },
    ],
    cta: "Explore our training programs",
    items: [
      {
        id: "digital-transformation-strategy",
        name: "Digital Transformation Strategy",
        description: "Roadmaps to modernize legacy systems and accelerate digital growth.",
        details:
          "We work with leadership teams to create practical transformation plans that align people, processes, and technology.",
        requirements: [
          "Business goals and current IT maturity",
          "Key stakeholder priorities",
          "Existing technology stack information",
          "Change management readiness",
        ],
      },
      {
        id: "it-infrastructure-design",
        name: "IT Infrastructure Design",
        description: "End-to-end network and systems architecture planning.",
        details:
          "Our infrastructure design service creates resilient environments built for productivity, security, and scalability.",
        requirements: [
          "Current infrastructure inventory",
          "Performance and availability goals",
          "Security and compliance needs",
          "Growth projections",
        ],
      },
      {
        id: "professional-training-programs",
        name: "Professional Training Programs",
        description: "Workforce upskilling in cybersecurity and emerging tech.",
        details:
          "We deliver hands-on training programs that help teams gain practical skills and certification readiness.",
        requirements: [
          "Target audience and skill levels",
          "Training goals and timelines",
          "Preferred delivery format",
          "Certification or competency targets",
        ],
      },
      {
        id: "executive-tech-advisory",
        name: "Executive Tech Advisory",
        description: "CTO/CISO-level strategic advisory for leadership teams.",
        details:
          "Our advisory service supports executives with governance, technology strategy, and risk decisions.",
        requirements: [
          "Current strategic initiatives",
          "Organizational challenges",
          "Leadership priorities",
          "Desired advisory cadence",
        ],
      },
    ],
  },
  academic: {
    title: "Academic Mentorship",
    description: "Research guidance and academic supervision across all degree levels.",
    fullDescription:
      "We provide expert academic mentorship for undergraduate, master's, and doctoral research. Our team combines industry experience with academic rigor to ensure your research is both theoretically sound and practically valuable.",
    highlights: [
      "B.Sc., M.Sc., and Ph.D. supervision",
      "Research methodology guidance",
      "Literature review support",
      "Publication and conference submission preparation",
      "Industry-academic collaboration facilitation",
      "Career mentorship for academic researchers",
    ],
    process: [
      { step: "Research Problem Formulation", desc: "Define clear research questions and objectives with academic rigor." },
      { step: "Methodology Development", desc: "Design research approach aligned with your discipline's standards." },
      { step: "Execution & Monitoring", desc: "Regular check-ins, guidance, and feedback throughout the research phase." },
      { step: "Analysis & Interpretation", desc: "Support in data analysis, findings interpretation, and conclusions." },
      { step: "Publication & Defense", desc: "Guidance on thesis writing, journal submission, and presentation preparation." },
    ],
    cta: "Request academic mentorship",
    items: [
      {
        id: "bsc-supervision",
        name: "B.Sc. Supervision",
        description: "Undergraduate research guidance in technology disciplines.",
        details:
          "We support undergraduate students in completing capstone projects and final-year dissertations with structured guidance and feedback.",
        requirements: [
          "Research topic and objectives",
          "Academic institution and program",
          "Timeline and submission deadlines",
          "Specific areas where guidance is needed",
        ],
      },
      {
        id: "msc-supervision",
        name: "M.Sc. Supervision",
        description: "Master's thesis support with industry-grade tools and feedback.",
        details:
          "Our master's level mentorship focuses on developing rigorous research skills and producing publication-quality work.",
        requirements: [
          "Thesis topic and research questions",
          "University requirements and format guidelines",
          "Expected completion timeline",
          "Technical tools and methodologies involved",
        ],
      },
      {
        id: "phd-mentorship",
        name: "Ph.D. Mentorship",
        description: "Doctoral-level guidance from veteran researchers and practitioners.",
        details:
          "We provide strategic doctoral mentorship to help candidates navigate complex research landscapes and contribute to their field.",
        requirements: [
          "Doctoral research topic and scope",
          "Institution and program requirements",
          "Multi-year timeline and milestones",
          "Disciplinary context and literature landscape",
        ],
      },
      {
        id: "research-publication-support",
        name: "Research Publication Support",
        description: "Preparation and review for journal and conference submissions.",
        details:
          "We help researchers prepare manuscripts, select appropriate venues, and navigate the peer review and publication process.",
        requirements: [
          "Completed or near-complete research work",
          "Target journals or conference venues",
          "Publication guidelines and format preferences",
          "Timeline for manuscript preparation",
        ],
      },
    ],
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ServiceDetail({ serviceId, itemId }: { serviceId: string; itemId?: string }) {
  const service = servicesData[serviceId];
  const item = itemId ? service?.items?.find((entry: any) => entry.id === itemId) : undefined;

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#282828]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <h1 className="text-3xl font-serif font-bold text-[#2D3E4A] mb-4">Service not found</h1>
            <Link href="/services" className="text-[#D4AF37] hover:text-[#2D3E4A]">
              Back to services
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (itemId && !item) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#282828]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <h1 className="text-3xl font-serif font-bold text-[#2D3E4A] mb-4">Service detail not found</h1>
            <Link href={`/services/${serviceId}`} className="text-[#D4AF37] hover:text-[#2D3E4A]">
              Back to {service.title}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isItemPage = Boolean(item);
  const pageTitle = isItemPage ? item.name : service.title;
  const pageSubtitle = isItemPage ? service.title : "Our Services";
  const backHref = isItemPage ? `/services/${serviceId}` : "/services";
  const backLabel = isItemPage ? `Back to ${service.title}` : "Back to services";

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#282828]">
      <Navbar />

      <div className="pt-24 bg-[#2D3E4A]">
        <div className="container mx-auto px-6 md:px-12 py-16 text-center">
          <Link href={backHref} className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" /> {backLabel}
          </Link>
          <p className="text-[#D4AF37] text-xs font-bold tracking-[0.25em] uppercase mb-4">{pageSubtitle}</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">{pageTitle}</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            {isItemPage ? item.description : service.description}
          </p>
        </div>
      </div>

      <main className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          {isItemPage ? (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20">
              <div className="rounded-3xl border border-gray-200 bg-white p-12">
                <h2 className="text-3xl font-serif font-bold text-[#2D3E4A] mb-6">Overview</h2>
                <p className="text-[#282828]/80 leading-relaxed text-lg">{item.details}</p>
              </div>
            </motion.section>
          ) : (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20">
              <div className="rounded-3xl border border-gray-200 bg-white p-12">
                <h2 className="text-3xl font-serif font-bold text-[#2D3E4A] mb-6">Overview</h2>
                <p className="text-[#282828]/80 leading-relaxed text-lg">{service.fullDescription}</p>
              </div>
            </motion.section>
          )}

          {isItemPage ? (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20">
              <h2 className="text-3xl font-serif font-bold text-[#2D3E4A] mb-10">Requirements</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {item.requirements.map((req: string, idx: number) => (
                  <div key={idx} className="rounded-2xl border border-gray-200 bg-white p-6 text-[#282828]/80">
                    <span className="block font-semibold text-[#2D3E4A] mb-2">Requirement {idx + 1}</span>
                    <p>{req}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          ) : (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20">
              <h2 className="text-3xl font-serif font-bold text-[#2D3E4A] mb-10">Available Services</h2>
              <div className="grid gap-6 lg:grid-cols-2">
                {service.items.map((entry: any) => (
                  <Link key={entry.id} href={`/services/${serviceId}/${entry.id}`}>
                    <div className="rounded-3xl border border-gray-200 bg-white p-8 transition-shadow hover:shadow-xl cursor-pointer">
                      <h3 className="text-2xl font-semibold text-[#2D3E4A] mb-3">{entry.name}</h3>
                      <p className="text-[#282828]/70">{entry.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {!isItemPage && (
            <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20">
              <h2 className="text-3xl font-serif font-bold text-[#2D3E4A] mb-10">Our Process</h2>
              <div className="space-y-4">
                {service.process.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-6 rounded-2xl border border-gray-200 bg-white p-8">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2D3E4A] text-white font-bold">{idx + 1}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D3E4A]">{item.step}</h3>
                      <p className="text-[#282828]/70 mt-2">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center py-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-[#2D3E4A] px-10 py-5 text-white font-semibold hover:bg-[#D4AF37] transition-colors"
            >
              {service.cta}
            </Link>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
