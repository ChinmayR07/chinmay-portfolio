import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://chinmayraichur.me'),
  title: {
    default: 'Chinmay Raichur — Full Stack Software Engineer',
    template: '%s | Chinmay Raichur',
  },
  description:
    'Software engineer with 4.5+ years building scalable systems for 100K+ users. ' +
    'Expert in React, Next.js, Node.js, AWS, Docker, and AI integrations. ' +
    'Currently based in San Francisco, California. Open to senior engineer roles.',
  keywords: [
    'Chinmay Raichur',
    'software engineer',
    'full stack developer',
    'React developer',
    'Node.js engineer',
    'AWS cloud engineer',
    'Next.js',
    'TypeScript',
    'San Francisco',
    'California',
    'Trading Technologies',
    'Stony Brook University',
  ],
  authors: [{ name: 'Chinmay Raichur', url: 'https://chinmayraichur.me' }],
  creator: 'Chinmay Raichur',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chinmayraichur.me',
    siteName: 'Chinmay Raichur',
    title: 'Chinmay Raichur — Full Stack Software Engineer',
    description:
      'Building scalable systems for 100K+ users. React, Node.js, AWS, Docker, AI/ML. ' +
      'MS Computer Engineering, Stony Brook (GPA 3.9). Open to senior roles.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Chinmay Raichur — Full Stack Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chinmay Raichur — Full Stack Software Engineer',
    description: 'Building scalable systems for 100K+ users. React, Node.js, AWS, Docker, AI/ML.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

// ─── Structured Data (JSON-LD) ─────────────────────────────────────────────────
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Chinmay Raichur',
  jobTitle: 'Full Stack Software Engineer',
  url: 'https://chinmayraichur.me',
  email: 'chinmayraichur@gmail.com',
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Stony Brook University',
      sameAs: 'https://www.stonybrook.edu',
    },
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Java',
    'Spring Boot',
    'AWS',
    'Docker',
    'Kubernetes',
    'CI/CD',
    'GraphQL',
    'REST APIs',
  ],
  sameAs: ['https://github.com/ChinmayR07', 'https://linkedin.com/in/chinmay-raichur'],
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // suppressHydrationWarning is required by next-themes to prevent
      // the "class mismatch" warning during SSR hydration
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {/*
          ThemeProvider from next-themes:
          - attribute="class" → adds/removes .dark on <html>
          - defaultTheme="dark" → dark mode by default
          - enableSystem={false} → don't follow OS preference (you chose explicit dark default)
          - disableTransitionOnChange={false} → allow CSS transitions on theme change
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
