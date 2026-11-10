/**
 * English text for the whole website.
 * The Thai file (th.ts) must have exactly the same keys.
 */
const en = {
  meta: {
    title: "MAG CONSULTANT | Project Management & Construction Consultancy in Thailand",
    description:
      "MAG CONSULTANT CO., LTD. is a Thailand-based project management consultancy providing Project Management, Construction Management and Quantity Surveying for commercial developments and renovation projects.",
  },
  nav: {
    about: "About Us",
    services: "Services",
    projects: "Project References",
    quality: "Quality Policy",
    contact: "Contact Us",
    menu: "Menu",
    close: "Close menu",
    language: "Language",
    themeLight: "Switch to light mode",
    themeDark: "Switch to dark mode",
  },
  hero: {
    eyebrow: "Project Management Consultancy · Thailand",
    title: "Professional Project Management for Successful Developments",
    subtitle: "Delivering projects on time, within budget, and to the highest quality standards.",
    ctaPrimary: "Contact Us",
    ctaSecondary: "Explore Our Services",
    imageAlt: "Modern high-rise building under construction with tower crane",
  },
  about: {
    eyebrow: "Who We Are",
    title: "About MAG CONSULTANT",
    p1: "MAG CONSULTANT is a professional project management consultancy in Thailand, specialising in all kinds of commercial developments and renovation projects.",
    p2: "With more than 20 years of personal experience, our team has contributed to more than 100 projects.",
    p3: "We support our clients from the initial concept and planning stage through construction, coordination, and final project close-out.",
    stages: ["Concept & Planning", "Construction & Coordination", "Project Close-out"],
    cta: "Learn More About Us",
    imageAlt: "Project team reviewing progress on a construction site",
    badge: "Manage to Achieve Goal",
  },
  stats: {
    label: "MAG CONSULTANT in numbers",
    items: [
      { value: "20+", label: "Years of Experience" },
      { value: "100+", label: "Projects" },
      { value: "3", label: "Core Areas of Expertise" },
      { value: "Thailand", label: "Based Professional Team" },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "Our Expertise",
    intro: "Three core disciplines that keep your development under control — from the first sketch to final hand-over.",
    learnMore: "Learn More",
    items: [
      {
        title: "Project Management",
        desc: "Planning, coordinating, and managing projects from concept to completion.",
      },
      {
        title: "Construction Management",
        desc: "Monitoring construction progress, quality, coordination, and project delivery.",
      },
      {
        title: "Quantity Surveying",
        desc: "Managing project costs, quantities, budgets, and financial control.",
      },
    ],
  },
  projects: {
    eyebrow: "Project References",
    title: "Our Project Experience",
    intro: "Selected projects where MAG CONSULTANT provided project management, construction management and quantity surveying services.",
    viewAll: "View All Projects",
    labels: { category: "Category", location: "Location", service: "Service" },
    categories: {
      hotel: "Hotels",
      resort: "Resorts",
      residential: "Residential",
      condominium: "Condominiums",
      mixedUse: "Mixed-use Buildings",
      commercial: "Offices & Showrooms",
      industrial: "Factories and Warehouses",
      hospital: "Hospitals",
      education: "Educational Buildings",
      infrastructure: "Infrastructure",
    },
    all: "All",
  },
  why: {
    eyebrow: "Our Strengths",
    title: "Why Choose MAG CONSULTANT?",
    items: [
      { title: "Experienced Professional Team", desc: "More than 20 years of personal experience across over 100 projects." },
      { title: "On-Time Project Delivery", desc: "Structured planning and close progress monitoring to keep schedules on track." },
      { title: "Cost and Budget Control", desc: "Quantity surveying and financial control throughout the project lifecycle." },
      { title: "Quality-Focused Approach", desc: "Services based on international standards and continuous improvement." },
      { title: "Strong Client Collaboration", desc: "Clear communication and coordination between owners, designers and contractors." },
      { title: "End-to-End Project Support", desc: "From concept and planning through construction to final close-out." },
    ],
  },
  quality: {
    eyebrow: "Quality Policy",
    quote:
      "We aim to create quality, professional services based on international standards, continuous improvement, and customer satisfaction.",
    pillars: ["International Standards", "Continuous Improvement", "Customer Satisfaction"],
  },
  cta: {
    title: "Have a Project in Mind?",
    text: "Let MAG CONSULTANT help you achieve your project goals with professional project management and construction expertise.",
    button: "Contact MAG CONSULTANT",
  },
  contact: {
    eyebrow: "Contact Us",
    title: "Get in Touch",
    intro: "Tell us about your project. Our team will get back to you as soon as possible.",
    addressLabel: "Address",
    phoneLabel: "Telephone",
    emailLabel: "Email",
    hoursLabel: "Office Hours",
    hours: "Mon – Fri, 09:00 – 17:30",
    facebookLabel: "Facebook",
    mapLabel: "Open in Google Maps",
    mapTitle: "MAG CONSULTANT office location on Google Maps",
    form: {
      title: "Send us a message",
      name: "Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      message: "Message",
      required: "Required",
      submit: "Submit",
      sending: "Sending…",
      success: "Thank you! Your message has been sent. We will contact you shortly.",
      error: "Sorry, your message could not be sent. Please try again or call us directly.",
      invalid: "Please fill in your name, a valid email and a message.",
      privacy: "Your information is used only to respond to your enquiry.",
    },
  },
  footer: {
    description:
      "A Thailand-based project management consultancy specialising in commercial developments and renovation projects.",
    quickLinks: "Quick Links",
    services: "Services",
    contact: "Contact",
    rights: "© MAG CONSULTANT CO., LTD. All rights reserved.",
    backToTop: "Back to top",
  },
  company: {
    address: "55 Soi Charansanitwong 89/2, Charansanitwong Road, Bang O, Bang Phlat, Bangkok 10700, Thailand",
  },
};

export default en;
export type Dictionary = typeof en;
