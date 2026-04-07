// ─── Navigation ───────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  id: string; // matches section id= in page.tsx
}

// ─── Experience ───────────────────────────────────────────────────────────────
export type EmploymentType = 'Full-time' | 'Internship' | 'Part-time' | 'Contract';

export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  logo?: string;
  title: string;
  type: EmploymentType;
  startDate: string;
  endDate: string | 'Present';
  location: string;
  remote?: boolean;
  bullets: string[];
  techStack: string[];
  highlight?: boolean; // marks current/featured role
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: ProjectCategory;
  year: string;
}

export type ProjectCategory = 'Full Stack' | 'Backend' | 'Cloud / DevOps' | 'AI / ML' | 'Frontend';

// ─── Skills ───────────────────────────────────────────────────────────────────
export type SkillCategory =
  | 'Frontend'
  | 'Backend'
  | 'Cloud — AWS'
  | 'Cloud — Azure'
  | 'DevOps'
  | 'Databases'
  | 'AI / GenAI'
  | 'Practices';

export interface SkillGroup {
  category: SkillCategory;
  icon?: string;
  skills: string[];
}

// ─── Education ────────────────────────────────────────────────────────────────
export interface EducationItem {
  id: string;
  institution: string;
  institutionShort: string;
  degree: string;
  major: string;
  location: string;
  startYear: string;
  endYear: string;
  gpa?: string;
  gpaScale?: string;
  highlights?: string[];
  logo?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  icon?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description?: string;
  icon?: string;
  certificateUrl?: string;
  credlyUrl?: string;
  badgeImage?: string;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  relationship: string; // e.g. "Former Engineering Manager at Accenture"
  text: string;
  linkedInUrl?: string;
  avatar?: string;
}

// ─── GitHub ───────────────────────────────────────────────────────────────────
export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage?: string;
  stars: number;
  language: string;
  topics: string[];
}

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  html_url: string;
}

// ─── AI Chat Bot ──────────────────────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';
