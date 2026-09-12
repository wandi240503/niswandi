export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tag: string;
  badge: string;
  year: string;
  description: string;
  image: string;
  featured?: boolean;
  liveUrl?: string;
  tags: string[];
  client?: string;
  role?: string;
  timeline?: string;
  services?: string[];
  overview?: string;
  challenge?: string;
  research?: {
    summary: string;
    points: string[];
  };
  finalDesignNotes?: string[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  isCurrent?: boolean;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

