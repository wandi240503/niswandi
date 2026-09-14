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
    id: "recaffe-rekomendasi-cafe",
    number: "01",
    title: "Recaffe- rekomendasi caffe",
    category: "WEB PLATFORM",
    tag: "WEB // 2026",
    badge: "LIVE PRODUCTION",
    year: "2026",
    description: "Sebuah web yang berfungsi sebagai wadah rekomendasi yang teransparan untuk mempromosikan cafe yang ada di sekitar anda.",
    image: "/images/recaffe.png",
    featured: true,
    liveUrl: "https://caferekomendasi.com",
    tags: ["Web Platform", "React", "Next.js", "Tailwind CSS"],
    client: "Recaffe Network",
    role: "Fullstack Architect & UI/UX",
    timeline: "6 Weeks",
    services: ["Web Development", "UI/UX Design", "Search Algorithm", "Responsive Design"],
    overview: "Platform rekomendasi cafe modern berbasis web yang membantu para pecinta kopi menemukan tempat terbaik berdasarkan preferensi dan lokasi.",
    challenge: "Menyajikan algoritma rekomendasi transparan dengan visual yang cepat dan interaktif.",
    research: {
      summary: "Riset preferensi pengunjung cafe dan sistem kurasi rekomendasi terverifikasi.",
      points: [
        "Filter pencarian berdasarkan fasilitas, wifi, dan suasana",
        "Sistem kurasi rekomendasi transparan tanpa bias",
        "Tampilan visual responsif untuk pengguna mobile"
      ]
    },
    finalDesignNotes: [
      "Desain gelap dengan aksen hijau neon yang modern dan estetik",
      "Performa loading cepat dan optimasi SEO lokal",
      "Integrasi visual interaktif dengan katalog cafe terlengkap"
    ]
  },
  {
    id: "ismi-ikatan-sarjana-melayu",
    number: "02",
    title: "ISMI-Ikatan Sarjana Melayu Yogyakarta",
    category: "WEB DEVELOPMENT",
    tag: "WEB // 2026",
    badge: "LIVE PRODUCTION",
    year: "2026",
    description: "sebuah web organisasi untuk mengelola data, berita, mahasiswa melayu Yogyakarta. ISMY (Ikatan Sarjana Melayu Yogyakarta)",
    image: "/images/ismi.png",
    liveUrl: "https://ismy.org",
    tags: ["Organization Web", "CMS", "Database", "React"],
    client: "ISMI Yogyakarta",
    role: "Lead Developer & UI Designer",
    timeline: "5 Weeks",
    services: ["Organization Web", "CMS Portal", "Database Mahasiswa", "Portal Berita"],
    overview: "Portal web resmi untuk Ikatan Sarjana Melayu Yogyakarta guna menyatukan cendekiawan melayu, mempublikasikan berita organisasi, dan mengelola direktori mahasiswa.",
    challenge: "Membangun sistem informasi yang terintegrasi, mudah dikelola oleh pengurus, dan ramah pengguna.",
    research: {
      summary: "Pemetaan kebutuhan komunikasi dan data anggota organisasi Melayu di Yogyakarta.",
      points: [
        "Sistem pendaftaran dan pendataan anggota online",
        "Portal publikasi berita dan agenda kegiatan terupdate",
        "Tampilan profesional yang mencerminkan nilai intelektual Melayu"
      ]
    },
    finalDesignNotes: [
      "Navigasi bersih dengan tipografi yang elegan dan terbaca jelas",
      "Struktur data teroptimasi untuk arsip berita dan dokumentasi kegiatan",
      "Desain adaptif yang sempurna di ponsel cerdas maupun laptop"
    ]
  },
  {
    id: "mengenal-budaya-mahakam-ulu",
    number: "03",
    title: "Mengenal Budaya Mahakam Ulu",
    category: "WEB DEVELOPMENT",
    tag: "WEB // 2026",
    badge: "LIVE PRODUCTION",
    year: "2026",
    description: "Web yang bergerak di kebudayaan untuk melestarikan topeng hudoq dan budaya lainnya yang ada di desa Mahakam Ulu.",
    image: "/images/mahakam-ulu.jpg",
    liveUrl: "https://mahakamulu.go.id",
    tags: ["Culture Web", "Interactive Web", "React", "Tailwind CSS"],
    client: "Pemerintah Desa Mahakam Ulu",
    role: "Lead Frontend Developer",
    timeline: "4 Weeks",
    services: ["Web Development", "Cultural Archiving", "UI/UX", "SEO"],
    overview: "Inisiatif digital untuk melestarikan dan memperkenalkan kekayaan warisan budaya Dayak di Mahakam Ulu, Kalimantan Timur kepada dunia, dengan sorotan utama pada tradisi Topeng Hudoq.",
    challenge: "Mendokumentasikan narasi budaya yang kaya ke dalam desain modern bernuansa etnik yang interaktif.",
    research: {
      summary: "Dokumentasi etnografi dan kurasi visual artefak adat Mahakam Ulu.",
      points: [
        "Arsip digital sejarah tari dan ritual sakral topeng hudoq",
        "Galeri interaktif foto resolusi tinggi warisan seni lokal",
        "Aksesibilitas informasi untuk wisatawan budaya dan periset"
      ]
    },
    finalDesignNotes: [
      "Palet visual alam gelap dan aksen hijau hutan yang mistis dan menawan",
      "Tipografi etnik modern yang megah dan berkarakter kuat",
      "Optimalisasi kecepatan muat halaman di seluruh perangkat"
    ]
  },
  {
    id: "bkpm-balai-kajian-melayu",
    number: "04",
    title: "BKPM",
    category: "WEB DEVELOPMENT",
    tag: "WEB // 2026",
    badge: "LIVE PRODUCTION",
    year: "2026",
    description: "web ini menyimpan sejari melayu update dari blog melayu online",
    image: "/images/bkpm.png",
    liveUrl: "https://bkpm-melayu.com",
    tags: ["Organization Web", "CMS", "History & Culture", "React"],
    client: "Balai Kajian Melayu (BKPM)",
    role: "Lead Web Developer",
    timeline: "4 Weeks",
    services: ["Web Development", "Content Management System", "Cultural Archive", "UI/UX"],
    overview: "Platform digital resmi Balai Kajian Melayu untuk mendokumentasikan, memperbarui, dan merawat khazanah tamadun Melayu melalui portal berita dan blog online terpadu.",
    challenge: "Menyediakan arsip sejarah yang rapi dengan akses cepat bagi peneliti dan masyarakat luas.",
    research: {
      summary: "Penyusunan arsitektur informasi untuk blog sejarah dan kajian tamadun Melayu.",
      points: [
        "Integrasi blog berkala update tamadun Melayu",
        "Sistem kurasi artikel dan dokumentasi adat",
        "Tampilan visual responsif dan berwibawa"
      ]
    },
    finalDesignNotes: [
      "Warna khas hijau emas yang merefleksikan nilai luhur tamadun Melayu",
      "Performa loading cepat dan navigasi artikel yang mudah",
      "Arsip digital terstruktur dan mudah dicari"
    ]
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

export const CV_DATA = {
  fullName: "MUHAMMAD NISWANDI",
  title: "Full-Stack Web Developer & UI/UX Designer",
  tagline: "Bridging human-centric digital interfaces with robust, scalable web architecture.",
  email: "muhniswandii@gmail.com",
  linkedin: "https://www.linkedin.com/in/niswandii/",
  linkedinHandle: "linkedin.com/in/niswandii",
  github: "https://github.com/wandi240503",
  githubHandle: "github.com/wandi240503",
  website: "https://niswandi.vercel.app",
  websiteHandle: "niswandi.vercel.app",
  location: "Yogyakarta / Indonesia",
  photo: "/images/niswandi-portrait.png",
  summary:
    "Full-Stack Web Developer & UI/UX Designer dengan spesialisasi dalam perancangan produk digital modern, sistem antarmuka interaktif, dan arsitektur aplikasi web berkinerja tinggi. Berpengalaman dalam menerjemahkan kebutuhan pengguna dan bisnis ke dalam prototipe intuitif (Figma) hingga implementasi kode siap produksi (React, Next.js, TypeScript, Tailwind CSS, REST API). Berkomitmen kuat pada standar clean code, web accessibility, responsivitas multi-perangkat, dan pengalaman visual yang elegan.",
  skills: {
    frontend: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "HTML5 / Semantic Web",
      "CSS3 / Modern Layouts",
      "Vite",
      "Component Architecture",
      "Responsive Web Design",
      "Web Performance & SEO"
    ],
    backend: [
      "Node.js",
      "Express.js",
      "RESTful API Integration",
      "Firebase",
      "Supabase",
      "Database Modeling",
      "IndexedDB / Client Storage",
      "Authentication & Security Basics"
    ],
    uiux: [
      "Figma",
      "Wireframing & Flowcharts",
      "Interactive Prototyping",
      "Design Systems & Tokens",
      "User-Centered Design (UCD)",
      "Usability Testing",
      "Mobile-First Architecture",
      "Micro-Interactions"
    ],
    tools: [
      "Git & GitHub",
      "Vercel Deployment",
      "VS Code",
      "npm / yarn",
      "Postman",
      "Browser DevTools",
      "Canvas API",
      "CI / CD Pipelines"
    ],
    softSkills: [
      "Critical Problem Solving",
      "User Empathy",
      "Detail-Oriented Engineering",
      "Agile Mindset",
      "Cross-Functional Collaboration",
      "Adaptive Learning"
    ]
  },
  languages: [
    { name: "Bahasa Indonesia", level: "Native / Penutur Asli" },
    { name: "English", level: "Professional Working Proficiency" }
  ],
  education: [
    {
      period: "2022 — Sekarang",
      degree: "Sarjana Ilmu Komputer / Teknik Informatika",
      institution: "Universitas di Yogyakarta",
      description: "Fokus studi pada Rekayasa Perangkat Lunak, Interaksi Manusia dan Komputer (IMK), Pemrograman Web, dan Algoritma Struktur Data."
    }
  ],
  experiences: [
    {
      period: "2024 — Sekarang",
      role: "Freelance Full-Stack Developer & UI/UX Designer",
      company: "Independent Practice / Niswandi Studio",
      location: "Remote / Yogyakarta",
      description: "Merancang dan membangun aplikasi web interaktif, portal organisasi, dan platform digital kustom untuk berbagai klien, institusi, dan komunitas.",
      highlights: [
        "Membangun dan meluncurkan 4+ platform digital live production dengan arsitektur modern (React, Next.js, Tailwind CSS).",
        "Mengembangkan sistem antarmuka responsif penuh yang dioptimasi untuk perangkat mobile, tablet, dan desktop.",
        "Merancang sistem desain modular dari wireframe hingga prototipe interaktif di Figma sebelum diimplementasikan ke dalam kode."
      ]
    },
    {
      period: "2025 — 2026",
      role: "Lead Frontend Engineer & UI Designer",
      company: "Proyek Kolaboratif & Platform Budaya",
      location: "Indonesia",
      description: "Memimpin perancangan frontend dan user flow untuk inisiatif pelestarian budaya daerah dan platform portal berita.",
      highlights: [
        "Mengarsiteki struktur halaman dan optimasi gambar beresolusi tinggi tanpa degradasi performa.",
        "Mengintegrasikan sistem Content Management System (CMS) untuk pengelolaan arsip berita dan dokumentasi sejarah."
      ]
    },
    {
      period: "2024 — 2025",
      role: "Frontend Developer",
      company: "Digital Innovations Lab",
      location: "Yogyakarta",
      description: "Mengembangkan komponen antarmuka web, integrasi API, dan menguji kompatibilitas lintas peramban.",
      highlights: [
        "Meningkatkan skor performa Lighthouse dan optimasi aksesibilitas web.",
        "Mengimplementasikan micro-interactions yang halus dengan CSS modern."
      ]
    }
  ],
  featuredProjects: [
    {
      title: "Recaffe - Rekomendasi Cafe",
      category: "Web Platform // Recommendation Engine",
      role: "Fullstack Architect & UI/UX",
      year: "2026",
      liveUrl: "https://caferekomendasi.com",
      description: "Platform web pencarian dan rekomendasi cafe transparan berbasis preferensi pengguna, dilengkapi sistem kurasi dan layout responsif modern."
    },
    {
      title: "ISMI - Ikatan Sarjana Melayu Yogyakarta",
      category: "Web Organization & CMS",
      role: "Lead Developer & UI Designer",
      year: "2026",
      liveUrl: "https://ismy.org",
      description: "Portal resmi organisasi cendekiawan Melayu di Yogyakarta yang mengelola berita, agenda, dan pangkalan data mahasiswa secara terpadu."
    },
    {
      title: "Mengenal Budaya Mahakam Ulu",
      category: "Cultural Archiving & Tourism Web",
      role: "Lead Frontend Developer",
      year: "2026",
      liveUrl: "https://mahakamulu.go.id",
      description: "Inisiatif digital pelestarian dan edukasi budaya Dayak Mahakam Ulu (Kalimantan Timur) dengan fokus pada ritual sakral Topeng Hudoq."
    },
    {
      title: "BKPM - Balai Kajian Melayu",
      category: "News & Historical Archive Portal",
      role: "Lead Web Developer",
      year: "2026",
      liveUrl: "https://bkpm-melayu.com",
      description: "Platform digital terintegrasi untuk publikasi riset, berita berkala, dan dokumentasi tamadun Melayu dengan navigasi terstruktur."
    }
  ]
};


