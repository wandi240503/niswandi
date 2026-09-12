import { Project, Service, Testimonial, ExperienceItem, StatItem } from '../types/portfolio';

export const HERO_DATA = {
  greeting: "Hello, I'm Niswandi.",
  headlineLine1: "I DESIGN & BUILD",
  headlineLine2: "DIGITAL",
  headlineLine3: "EXPERIENCES.",
  tagline: "Creating thoughtful digital products, interfaces and websites that combine design, usability and technology.",
  availability: "AVAILABLE FOR FREELANCE",
  location: "Based in Indonesia",
  roles: ["Designer", "Developer", "Problem Solver"],
  experienceTag: "PORTFOLIO // 2026",
};

export const MARQUEE_ITEMS = [
  "UI DESIGN",
  "WEB DEVELOPMENT",
  "PRODUCT DESIGN",
  "BRANDING",
  "CREATIVE DEVELOPMENT",
  "DESIGN SYSTEMS",
  "FULL-STACK WEB",
  "MOBILE APPS"
];

export const PROJECTS: Project[] = [
  {
    id: "fintech-mobile-app",
    number: "01",
    title: "Fintech Mobile App",
    category: "UI/UX - PRODUCT DESIGN",
    tag: "01/01 - PRODUCT DESIGN",
    badge: "FINTECH CORE OS",
    year: "2026",
    description: "Next generation wealth management platform and mobile app for smart investors. Features real-time portfolio rebalancing, crypto & stock aggregation, and predictive spend alerts.",
    image: "/images/fintech-app.png",
    featured: true,
    tags: ["Design System", "Prototypes", "iOS & Android"],
    client: "Fintech Company",
    role: "Product Designer & Lead Frontend",
    timeline: "8 Weeks",
    services: ["Research", "UX Design", "UI Design", "Prototype"],
    overview: "A modern financial app designed for everyone. This project focuses on redesigning the mobile banking experience to make it simpler, faster, and more intuitive for everyday users.",
    challenge: "Users needed a faster and clearer way to manage their finances. The previous interface was cluttered and confusing, leading to high drop-off rates during critical portfolio rebalancing.",
    research: {
      summary: "Understanding users and their financial workflows through rapid discovery sprints.",
      points: [
        "Conducted deep usability testing with 24 active retail investors",
        "Identified 3 major points of friction in multi-asset asset allocation",
        "Architected modular micro-widgets for custom dashboard layouts"
      ]
    },
    finalDesignNotes: [
      "Zero-latency real-time chart visualization with smooth canvas rendering",
      "High-contrast dark mode design with neon lime signifiers for instant asset recognition",
      "Biometric rapid approval flow cutting transaction latency by 64%"
    ]
  },
  {
    id: "ecommerce-dashboard",
    number: "02",
    title: "E-Commerce Dashboard",
    category: "WEB PLATFORM - FRONT-END",
    tag: "WEB / 2025",
    badge: "REAL-TIME TELEMETRY",
    year: "2025",
    description: "Real-time multi-tenant analytics console handling millions of monthly transaction events.",
    image: "/images/ecommerce-dashboard.png",
    tags: ["Next.js", "Tailwind CSS", "Telemetry Engine", "TypeScript"],
    client: "Global Retail Co.",
    role: "UI/UX & Frontend Architect",
    timeline: "12 Weeks",
    services: ["Frontend Dev", "Data Visualization", "API Integration", "Design System"],
    overview: "A comprehensive analytics suite built for enterprise merchants to monitor revenues, user sessions, and inventory turnarounds in real-time.",
    challenge: "Handling dense metric representations without overwhelming merchants during peak shopping traffic spikes.",
    research: {
      summary: "Evaluated 15 high-volume merchant workflows across 4 global regions.",
      points: [
        "Need for sub-second query latency display",
        "Configurable threshold alert banners",
        "Cross-timezone order clustering visualization"
      ]
    }
  },
  {
    id: "company-profile-website",
    number: "03",
    title: "Company Profile Website",
    category: "ARCHITECTURE DESIGN - 3D INTERACTIVE",
    tag: "WEB & ARCHITECTURE / 2024",
    badge: "THREE.JS & NEXT GENERATION",
    year: "2024",
    description: "Interactive WebGL narrative engine built for an international architectural studio.",
    image: "/images/company-profile.png",
    tags: ["Three.js", "Interactive WebGL", "Tailwind", "Performance"],
    client: "Studio Omnis Architectural Lab",
    role: "Creative Developer",
    timeline: "6 Weeks",
    services: ["WebGL 3D", "Art Direction", "Web Development", "CMS"],
    overview: "Studio Omnis wanted an avant-garde digital presence showcasing their global architectural blueprints with interactive spatial explorations.",
    challenge: "Maintaining smooth 60fps 3D rendering on both desktop and mobile devices without taxing battery consumption.",
    research: {
      summary: "Analyzed spatial storytelling in contemporary architectural web archives.",
      points: [
        "Progressive shader level of detail based on GPU power",
        "Intuitive scroll-driven camera movements through architectural models"
      ]
    }
  },
  {
    id: "travel-mobile-app",
    number: "04",
    title: "Travel Mobile App",
    category: "APP DESIGN - MOBILE",
    tag: "MOBILE / 2025",
    badge: "CROSS-PLATFORM APP",
    year: "2025",
    description: "Frictionless flight and boutique stay booking flow with integrated offline transit tickets.",
    image: "/images/travel-app.png",
    tags: ["Mobile UX", "Design System", "Offline First", "React Native"],
    client: "Wanderlust Travel Group",
    role: "Mobile Product Designer",
    timeline: "10 Weeks",
    services: ["Mobile UI/UX", "Prototyping", "Design System", "User Research"],
    overview: "A curated mobile experience catering to modern remote workers and wanderers seeking seamless flight, rail, and stay arrangements.",
    challenge: "Ensuring booking confirmation passes remain accessible deep underground without cellular reception.",
    research: {
      summary: "Researched flight itinerary retention in low-connectivity travel environments.",
      points: [
        "Instant local storage sync for boarding passes",
        "Streamlined 3-tap hotel checkout flow"
      ]
    }
  },
  {
    id: "brand-identity-guidelines",
    number: "05",
    title: "Brand Identity & Guidelines",
    category: "BRANDING - ART DIRECTION",
    tag: "BRANDING / 2024",
    badge: "IDENTITY SUITE",
    year: "2024",
    description: "Holistic visual identity, typography system, and physical packaging for a hardware lab.",
    image: "/images/brand-identity.png",
    tags: ["Visual Identity", "Typography System", "Art Direction", "Packaging"],
    client: "Kinetic Hardware Systems",
    role: "Brand Designer & Art Director",
    timeline: "5 Weeks",
    services: ["Branding", "Typography", "Packaging Design", "Brand Guidelines"],
    overview: "A sharp, modernist corporate identity representing precision engineering, industrial durability, and understated elegance.",
    challenge: "Balancing sterile technical accuracy with approachable human craftsmanship across both digital and physical mediums.",
    research: {
      summary: "Explored international typographic styles and tactile physical sample materials.",
      points: [
        "Geometric grid system rooted in industrial Swiss design",
        "Matte carbon foil stamping and recycled packaging standards"
      ]
    }
  },
  {
    id: "task-management-app",
    number: "06",
    title: "Task Management App",
    category: "PRODUCT DESIGN - SAAS",
    tag: "PRODUCT DESIGN / 2025",
    badge: "DESKTOP & CLOUD",
    year: "2025",
    description: "Minimalist asynchronous project tracker tailored for distributed product teams.",
    image: "/images/task-app.png",
    tags: ["SaaS Interface", "Productivity", "Kanban Board", "Cloud Sync"],
    client: "SyncFlow Software",
    role: "Principal Product Designer",
    timeline: "7 Weeks",
    services: ["SaaS Design", "Design System", "Keyboard UX", "Interaction Design"],
    overview: "A fast, distraction-free task tracker engineered for high-velocity software squads needing rapid keyboard-driven navigation.",
    challenge: "Eliminating mouse dependence and reducing cognitive load through thoughtful visual hierarchy.",
    research: {
      summary: "Interviewed 40 remote software engineers and technical product managers.",
      points: [
        "Command palette first UI navigation",
        "Instant optimistic task status transitions"
      ]
    }
  }
];

export const PHILOSOPHY_DATA = {
  sectionTag: "02 / ABOUT",
  headline: "I don't just make things look good. I design digital experiences that are functional, simple, and meaningful.",
  quote: "Niswandi is a multidisciplinary designer and creative developer based in Indonesia. Focused on crafting holistic digital products - transactional and architectural, and agnostic cloud solutions with uncompromising attention to detail.",
  stats: [
    {
      value: "03+",
      label: "YEARS EXPERIENCE",
      description: "Helping early-stage startups to global enterprises"
    },
    {
      value: "20+",
      label: "COMPLETED PROJECTS",
      description: "Finished and shipped to production with high impact"
    },
    {
      value: "10+",
      label: "HAPPY CLIENTS",
      description: "Across 4 different continents with stellar reviews"
    }
  ]
};

export const SERVICES: Service[] = [
  {
    id: "ui-ux-design",
    number: "01",
    title: "UI / UX Design",
    description: "Designing intuitive interfaces and meaningful experiences that users adore.",
    tags: ["Wireframing", "Design System", "User Interface", "Prototyping", "Mobile App", "Interaction Design"]
  },
  {
    id: "web-design",
    number: "02",
    title: "Web Design",
    description: "Modern, responsive website design tailored to your brand's architecture and identity.",
    tags: ["Landing Pages", "Portfolio", "Corporate Sites", "Dashboards", "Responsive Design", "Creative Layouts"]
  },
  {
    id: "web-development",
    number: "03",
    title: "Web Development",
    description: "Flying web velocity front-end code that runs responsive, fast, modern, and cross-platforms.",
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript", "CMS Integration", "Web Performance", "API Integration"]
  },
  {
    id: "branding-visual",
    number: "04",
    title: "Branding & Visual",
    description: "Defining cohesive visual baselines that are scalable, expressive and endure evolving thresholds.",
    tags: ["Visual Identity", "Logo Design", "Brand Guide", "Typography", "Social Media", "Art Direction"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Working with Niswandi was a tremendous experience. He understood the project agility and transformed our ideas into a sleek and intuitive digital interface that raised our conversion market.",
    author: "John Doe",
    role: "Founder",
    company: "NextGen Labs",
    rating: 5
  },
  {
    quote: "Niswandi possesses that rare combination of sharp design intuition and rock-solid engineering execution. The design system he established scaled effortlessly across our entire engineering suite.",
    author: "Sarah Jenkins",
    role: "Head of Product",
    company: "OmniTech Global",
    rating: 5
  }
];

export const ABOUT_DATA = {
  title: "Hi, I'm Niswandi.",
  tagline: "I create digital experiences where design meets technology.",
  bio: [
    "I'm Niswandi, a designer and developer focused on creating modern digital products, web experiences, and visual systems.",
    "I enjoy transforming complex ideas into interfaces that feel simple, useful and enjoyable. With a strong footing in both design aesthetics and front-end engineering, I bridge the gap between imagination and execution."
  ],
  details: {
    location: "Indonesia",
    focus: "UI/UX & Web Development",
    languages: "Indonesian, English",
    status: "Available for Freelance"
  },
  approach: [
    {
      number: "01",
      title: "Understand",
      description: "Understanding the problem before jumping to solutions. Deep dive into user needs and business goals."
    },
    {
      number: "02",
      title: "Explore",
      description: "Researching different ideas and possibilities through sketching, wireframes, and prototypes."
    },
    {
      number: "03",
      title: "Design",
      description: "Creating clear and modern digital UI with high attention to typography, spacing, and micro-interactions."
    },
    {
      number: "04",
      title: "Improve",
      description: "Testing, learning and refining with actual users and telemetry to guarantee continuous excellence."
    }
  ],
  quote: "Good design is not just how it looks, but how it works and makes a difference.",
  interests: ["Design", "Technology", "Photography", "Travel"]
};

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    period: "2026 — Present",
    role: "Freelance Designer & Developer",
    company: "Independent Practice",
    description: "Creating digital products and web experiences for global clients, startups, and innovative ventures.",
    isCurrent: true
  },
  {
    period: "2025 — 2026",
    role: "UI/UX Designer",
    company: "Tech Agency / Product Studio",
    description: "Designed high-conversion user interfaces, end-to-end user flows, and comprehensive multi-platform design systems."
  },
  {
    period: "2024 — 2025",
    role: "Frontend Developer",
    company: "Digital Innovations Lab",
    description: "Developed responsive web applications, interactive WebGL components, and integrated third-party REST/GraphQL APIs."
  },
  {
    period: "2023 — 2024",
    role: "Student / Self Learning",
    company: "Design & Computer Science Foundations",
    description: "Intensive deep dive into human-computer interaction, modern web architecture, and building production-ready personal projects."
  }
];

export const WORK_STATS: StatItem[] = [
  {
    value: "48+",
    label: "TOTAL DELIVERED",
    description: "Global Web & Mobile Releases"
  },
  {
    value: "99.4%",
    label: "CLIENT SATISFACTION",
    description: "Direct Founders Feedback"
  },
  {
    value: "2.4k",
    label: "DESIGN SYSTEM TOKENS",
    description: "Strict Component Fidelity"
  },
  {
    value: "07+",
    label: "YEARS OF CRAFT",
    description: "Design & Code Synthesis"
  }
];

export const SOCIAL_LINKS = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/niswandii/", handle: "linkedin.com/in/niswandii" },
  { name: "GitHub", url: "https://github.com/wandi240503", handle: "github.com/wandi240503" },
  { name: "Instagram", url: "https://instagram.com/niswandi", handle: "instagram.com/niswandi" },
  { name: "Email", url: "mailto:muhniswandii@gmail.com", handle: "muhniswandii@gmail.com" }
];

