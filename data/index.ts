import type {
  Experience,
  SkillGroup,
  EducationItem,
  Award,
  Certification,
  Project,
  Testimonial,
  NavLink,
} from '@/types';

// ─── Navigation Links ─────────────────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'GitHub', href: '#github', id: 'github' },
  { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

// ─── Work Experience ──────────────────────────────────────────────────────────
export const EXPERIENCES: Experience[] = [
  {
    id: 'tt-swe',
    company: 'Trading Technologies International, Inc.',
    companyUrl: 'https://www.tradingtechnologies.com',
    title: 'Software Engineer',
    type: 'Full-time',
    startDate: 'Jul 2024',
    endDate: 'Nov 2025',
    location: 'Chicago, IL',
    highlight: true,
    bullets: [
      'Led the design and implementation of an S3 ingestion system with UI-driven configuration for 100K+ users, improving security by 50% and reducing costs by 70%.',
      'Enhanced Customer Portal UX for 80K+ users with new navigation and RBAC, boosting engagement 40% using JavaScript.',
      'Designed a centralized Risk API validation subsystem with 100+ unit tests, reducing support tickets by 80% through accurate error messaging.',
      'Integrated SQS/SNS into the ingestion workflow, improving reliability by 40% across async microservices.',
      'Delivered cross-region authentication routing using CloudFormation, enabling low-latency and fault-tolerant failover.',
      'Built multi-region AWS infrastructure and CI/CD for a containerized Rust service using Python & GitHub Actions, cutting production deployment times by 90%.',
      'Optimized SQL queries for highly available AWS Aurora RDS by 60% to support ad-hoc reporting.',
      'Mentored a software engineering intern through code reviews, Agile practices, and cloud deployment workflows on AWS.',
    ],
    techStack: [
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Python',
      'AWS S3',
      'SQS',
      'SNS',
      'Aurora RDS',
      'CloudFormation',
      'Docker',
      'GitHub Actions',
    ],
  },
  {
    id: 'tt-intern',
    company: 'Trading Technologies International, Inc.',
    companyUrl: 'https://www.tradingtechnologies.com',
    title: 'Software Engineer Intern',
    type: 'Internship',
    startDate: 'Jun 2023',
    endDate: 'Aug 2023',
    location: 'Chicago, IL',
    bullets: [
      'Spearheaded a secure Node.js library to integrate AWS Secrets Manager, eliminating static credentials and reducing config errors by 60%.',
      'Containerized and deployed messaging microservices with Docker and CI/CD, cutting deployment times by 75%.',
      'Diagnosed and stabilized real-time WebSocket stability issues using Postman and API tooling.',
      'Built Nginx load-balanced gateways with advanced caching, improving request throughput.',
    ],
    techStack: ['Node.js', 'AWS Secrets Manager', 'Docker', 'CI/CD', 'WebSockets', 'Nginx'],
  },
  {
    id: 'sbu-ta',
    company: 'Stony Brook University',
    companyUrl: 'https://www.stonybrook.edu',
    title: 'Graduate Teaching Assistant',
    type: 'Part-time',
    startDate: 'Jan 2023',
    endDate: 'May 2023',
    location: 'Stony Brook, NY',
    bullets: [
      'Facilitated instruction and evaluation of core data structures and algorithms (C++) for 120 undergraduate students in ESE 344.',
      'Conducted office hours, graded assignments and exams, and helped design coursework to evaluate problem-solving and algorithmic thinking.',
    ],
    techStack: ['C++', 'Data Structures', 'Algorithms'],
  },
  {
    id: 'accenture-senior',
    company: 'Accenture Solutions Pvt Ltd',
    companyUrl: 'https://www.accenture.com',
    title: 'Senior Software Engineer',
    type: 'Full-time',
    startDate: 'Nov 2020',
    endDate: 'Oct 2021',
    location: 'Mumbai, India',
    bullets: [
      'Optimized tax and invoice processing for 8.2M users using Java design patterns and SQL, improving performance by 40%.',
      'Designed, trained, and deployed a scalable conversational AI chatbot using Azure Cognitive Services (LUIS) and Microsoft Bot Framework — 25+ intents and entities for 28K+ users.',
      'Developed REST APIs in Spring Boot with TDD approach achieving 90%+ test coverage.',
      "Built an AI-driven FAQ chatbot prototype adopted as the foundation for Accenture's internal employee support automation bot.",
      'Recognized with the "Duke Marvels" award for exceptional Agile practices, code reviews, and leadership.',
    ],
    techStack: [
      'Java',
      'Spring Boot',
      'Azure Cognitive Services',
      'LUIS',
      'Bot Framework',
      'C#',
      'REST APIs',
      'SQL',
      'TDD',
    ],
  },
  {
    id: 'accenture-swe',
    company: 'Accenture Solutions Pvt Ltd',
    companyUrl: 'https://www.accenture.com',
    title: 'Software Engineer',
    type: 'Full-time',
    startDate: 'Jan 2019',
    endDate: 'Oct 2020',
    location: 'Mumbai, India',
    bullets: [
      'Optimized Java Spring Batch jobs via SQL query tuning and batching strategies, improving performance by 60% and saving 40 hours/week.',
      'Developed reusable Java modules for invoice validation and status tracking, improving maintainability across services.',
      'Improved application performance by 40% for 28K users by implementing Azure Bot Framework with LUIS NLP.',
      'Created technical documentation and data-flow diagrams, reducing recurring production issues and support tickets by 45%.',
    ],
    techStack: ['Java', 'Spring Boot', 'Spring Batch', 'Azure', 'SQL', 'LUIS', 'Bot Framework'],
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────
export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    skills: [
      'Node.js',
      'Express.js',
      'Java',
      'Spring Boot',
      'REST APIs',
      'GraphQL',
      'Apache Kafka',
      'PHP',
      'C#',
    ],
  },
  {
    category: 'Cloud — AWS',
    skills: [
      'S3',
      'SNS',
      'SQS',
      'EC2',
      'Elastic Beanstalk',
      'CloudFormation',
      'IAM',
      'Secrets Manager',
      'ECR',
      'Aurora RDS',
    ],
  },
  {
    category: 'Cloud — Azure',
    skills: ['Cognitive Services', 'LUIS', 'Bot Framework', 'Azure SQL'],
  },
  {
    category: 'DevOps',
    skills: [
      'Docker',
      'Kubernetes',
      'GitHub Actions',
      'Jenkins',
      'Maven',
      'CI/CD',
      'ELK Stack',
      'Nginx',
      'Linux',
    ],
  },
  {
    category: 'Databases',
    skills: ['MySQL', 'Aurora RDS', 'Redis', 'MongoDB'],
  },
  {
    category: 'AI / GenAI',
    skills: [
      'Claude API',
      'Azure Cognitive Services',
      'NLP / Chatbots',
      'GitHub Copilot',
      'Conversational AI',
    ],
  },
  {
    category: 'Practices',
    skills: [
      'TDD',
      'Microservices',
      'Design Patterns',
      'Agile / Scrum',
      'Code Review',
      'Unit Testing',
      'CI/CD',
    ],
  },
];

// ─── Education ────────────────────────────────────────────────────────────────
export const EDUCATION: EducationItem[] = [
  {
    id: 'sbu',
    institution: 'Stony Brook University (SUNY)',
    institutionShort: 'Stony Brook University',
    degree: 'Master of Science',
    major: 'Computer Engineering',
    location: 'Stony Brook, NY',
    startYear: 'Aug 2022',
    endYear: 'May 2024',
    gpa: '3.9',
    gpaScale: '4.0',
    highlights: [
      'Graduate Teaching Assistant — ESE 344: Data Structures & Algorithms (C++), 120 students',
    ],
  },
  {
    id: 'djsce',
    institution: 'Dwarkadas J. Sanghvi College of Engineering, University of Mumbai',
    institutionShort: 'DJ Sanghvi College of Engineering',
    degree: 'Bachelor of Engineering',
    major: 'Electronics Engineering',
    location: 'Mumbai, India',
    startYear: 'Aug 2014',
    endYear: 'Jun 2018',
    gpa: '7.82',
    gpaScale: '10.0',
    highlights: [],
  },
];

// ─── Awards ───────────────────────────────────────────────────────────────────
export const AWARDS: Award[] = [
  {
    id: 'duke-marvels',
    title: 'Duke Marvels Award',
    issuer: 'Accenture Solutions Pvt Ltd',
    year: '2021',
    description:
      "Recognized for exceptional Agile development practices, high-quality code review contributions, and stepping up to lead the team during senior members' absence.",
    icon: '🏆',
  },
];

// ─── Certifications ───────────────────────────────────────────────────────────
export const CERTIFICATIONS: Certification[] = [
  {
    id: 'ml-coursera',
    title: 'Machine Learning Specialization',
    issuer: 'Coursera (Stanford University)',
    year: '2024',
    description:
      'Completed Andrew Ng’s Machine Learning Specialization covering supervised learning, neural networks, and practical ML implementation.',
    icon: '🎓',
    certificateUrl: 'https://www.coursera.org/account/accomplishments/verify/YHS28T684DRX',
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    id: 'portfolio',
    title: 'Developer Portfolio + AI Bot',
    description:
      'Personal portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion, featuring a Claude API-powered assistant that answers recruiter questions in real time.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Claude API', 'Framer Motion'],
    githubUrl: 'https://github.com/ChinmayR07/chinmay-portfolio',
    liveUrl: 'https://chinmayraichur.me',
    featured: true,
    category: 'Full Stack',
    year: '2026',
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'greg-szeszko',
    name: 'Greg Szeszko',
    title: 'VP of Engineering',
    company: 'Trading Technologies',
    relationship: 'Vice President of Engineering at Trading Technologies',
    text: "I had the pleasure of seeing Chinmay grow from an intern into a full-time engineer at TT, and it was clear from the start that he brought a thoughtful, solutions-oriented mindset to every challenge. He consistently demonstrated a willingness to learn, a calm and focused approach to problem-solving, and a strong sense of ownership over his work. What stood out most was Chinmay's ability to engage with complex technical problems without losing sight of the bigger picture. He asked insightful questions, sought feedback, and always looked for ways to improve—not just his own skills, but the systems around him. Chinmay is the kind of engineer who makes teams better—not just through code, but through character.",
    linkedInUrl: 'https://www.linkedin.com/in/greg-szeszko-6b283150/',
  },
  {
    id: 'yatish-dhanu',
    name: 'Yatish Dhanu',
    title: 'Application Development Team Lead',
    company: 'Accenture',
    relationship: 'Application Development Team Lead at Accenture',
    text: `I had the pleasure of managing Chinmay during his time at Accenture, where he consistently demonstrated strong technical skills, ownership, and a proactive approach to problem-solving.

As part of my team, Chinmay contributed to building and improving enterprise-scale applications, helping enhance performance, reliability, and system efficiency for applications supporting large user bases. One of his standout contributions was designing and developing an AI-powered conversational chatbot using Azure Cognitive Services and modern NLP technologies. This solution automated key workflows and demonstrated the value of conversational AI in enterprise environments, receiving positive recognition from leadership.

Chinmay consistently showed strong analytical thinking, attention to detail, and a willingness to take ownership of challenging tasks. He collaborated effectively across teams and continuously invested in expanding his technical knowledge. Over time, I saw him grow into a dependable engineer capable of delivering high-quality solutions with minimal supervision.

I would confidently recommend Chinmay to any organization seeking a motivated software engineer with strong fundamentals, adaptability, and a growth mindset.`,
    linkedInUrl: 'https://www.linkedin.com/in/yatish-dhanu/',
  },
];

// ─── Social Links ─────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = {
  github: 'https://github.com/ChinmayR07',
  linkedin: 'https://linkedin.com/in/chinmay-raichur',
  email: 'chinmayrraichur95@gmail.com',
};

// ─── AI Bot Suggested Prompts ─────────────────────────────────────────────────
export const BOT_SUGGESTED_PROMPTS = [
  'What AWS services has Chinmay worked with?',
  'Tell me about his work at Trading Technologies',
  'What are his strongest backend skills?',
  "What's his educational background?",
  'Has he worked with AI or ML?',
  'What does his CI/CD experience look like?',
];
