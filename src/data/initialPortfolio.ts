import { ProfileData } from '../types';
import offCampusHubImage from '../Assets/offcampushub.ng_(iPhone 16 Pro Max).png';
import commitmentIssuesImage from '../Assets/commitment-issues-alpha.vercel.app_(iPhone 16 Pro Max).png';
import vendorStorefrontImage from '../Assets/vendor-storefront-roan.vercel.app_(iPhone 16 Pro Max).png';

export const defaultPortfolioData: ProfileData = {
  name: 'Noah Adeleye',
  title: 'Full-Stack Developer & Product Builder',
  headline: 'I build practical web products for Nigerian users: housing tools for FUTA students, WhatsApp-first storefronts for vendors, and playful developer utilities that still respect the stack.',
  email: 'noahadeleye17@gmail.com',
  location: 'Lagos, Nigeria',
  availability: 'Open to internships, freelance work, and collaborations',
  avatarUrl: 'https://github.com/noahadeleye17-coder.png',
  bioParagraphs: [
    "Hi, I'm Noah — a full-stack developer and Computer Information Systems student at the Federal University of Technology, Akure (FUTA).",
    "I like building things that solve problems people around me actually have. Off-Campus Hub started because finding off-campus housing and roommates near FUTA was a mess of WhatsApp groups and word of mouth, so I built a real listings and roommate-matching platform for it, end to end — backend, frontend, deployment, the works.",
    "Alongside that I'm working on a WhatsApp-order storefront builder for Nigerian vendors, completing a backend development internship with CodeAlpha, and shipping smaller solo projects for fun. I work mainly in Node.js/Express and MongoDB on the backend, with React/Next.js or focused vanilla JS on the frontend depending on what the product actually needs."
  ],
  stats: {
    yearsExperience: 2,
    completedProjects: 3,
    satisfiedClients: 0,
    codeContributions: '10+'
  },
  socialLinks: [
    {
      platform: 'github',
      label: 'GitHub',
      url: 'https://github.com/noahadeleye17-coder',
      username: 'noahadeleye17-coder'
    },
    {
      platform: 'email',
      label: 'Email',
      url: 'mailto:noahadeleye17@gmail.com',
      username: 'noahadeleye17@gmail.com'
    }
  ],
  skillCategories: [
    {
      title: 'Frontend',
      description: 'Core interface technologies.',
      iconName: 'Layout',
      skills: [
        { name: 'JavaScript', iconSlug: 'javascript', level: 85, experience: 'Active use', highlighted: true },
        { name: 'TypeScript', iconSlug: 'typescript', level: 75, experience: 'Active use' },
        { name: 'HTML5', iconSlug: 'html5', level: 88, experience: 'Active use', highlighted: true },
        { name: 'CSS3', iconSlug: 'css3', level: 88, experience: 'Active use', highlighted: true },
        { name: 'React', iconSlug: 'react', level: 75, experience: 'Active use' },
        { name: 'Next.js', iconSlug: 'nextjs', level: 75, experience: 'Active use' }
      ]
    },
    {
      title: 'Backend & Data',
      description: 'Application and data foundations.',
      iconName: 'Server',
      skills: [
        { name: 'Node.js', iconSlug: 'nodejs', level: 88, experience: 'Active use', highlighted: true },
        { name: 'Express', iconSlug: 'express', level: 88, experience: 'Active use', highlighted: true },
        { name: 'MongoDB', iconSlug: 'mongodb', level: 85, experience: 'Active use', highlighted: true },
        { name: 'PostgreSQL', iconSlug: 'postgresql', level: 70, experience: 'Active use' },
        { name: 'REST APIs', level: 82, experience: 'Active use' }
      ]
    },
    {
      title: 'Workflow',
      description: 'Versioning, delivery, and collaboration.',
      iconName: 'GitBranch',
      skills: [
        { name: 'Docker', iconSlug: 'docker', level: 70, experience: 'Active use' },
        { name: 'Git', iconSlug: 'git', level: 82, experience: 'Active use', highlighted: true },
        { name: 'GitHub', iconSlug: 'github', level: 82, experience: 'Active use', highlighted: true },
        { name: 'GitHub Actions', iconSlug: 'githubactions', level: 65, experience: 'Active use' }
      ]
    },
    {
      title: 'Languages & Platforms',
      description: 'Languages and platforms I build in beyond the web stack.',
      iconName: 'Code2',
      skills: [
        { name: 'Python', iconSlug: 'python', level: 72, experience: 'Active use' },
        { name: 'C', iconSlug: 'c', level: 62, experience: 'Fundamentals' },
        { name: 'Go', iconSlug: 'go', level: 55, experience: 'Learning' },
        { name: 'Rust', iconSlug: 'rust', level: 45, experience: 'Learning' },
        { name: 'Flutter', iconSlug: 'flutter', level: 50, experience: 'Learning' },
        { name: 'Dart', iconSlug: 'dart', level: 50, experience: 'Learning' }
      ]
    }
  ],
  projects: [
    {
      id: 'off-campus-hub',
      title: 'Off-Campus Hub',
      subtitle: 'Student housing and roommate-matching platform for FUTA students',
      description: 'A full-stack listings directory connecting FUTA students with off-campus housing and compatible roommates — built and shipped solo, live in production.',
      fullDescription: 'Off-Campus Hub replaces the scattered WhatsApp groups and word-of-mouth students relied on to find off-campus housing near FUTA. Students can browse verified listings with photos and video, filter by gate/location and price, and find roommates through a compatibility-based matching system with a mutual-connect privacy flow. Landlords get their own dashboard to manage listings, and admins get a full control panel to manage users, listings, and site content.',
      category: 'Full Stack',
      image: offCampusHubImage,
      tags: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Google OAuth', 'Cloudinary', 'Leaflet', 'Vanilla JS'],
      metrics: 'Live production platform for FUTA housing discovery',
      githubUrl: 'https://github.com/noahadeleye17-coder/campus-housing',
      liveUrl: 'https://offcampushub.ng',
      featured: true,
      highlights: [
        'Built roommate matching with compatibility scoring and a privacy-gated mutual connect flow',
        'Built a full admin dashboard for managing all listings, users, and site content',
        'Added server-side rendering for listing pages so shared links unfurl correctly with real metadata',
        'Shipped as an installable PWA, with logged-in students and landlords landing straight in their own dashboard',
        'WhatsApp deep-link contact flow so students can message landlords directly, pre-filled with listing context'
      ],
      architectureNotes: 'Node.js/Express backend with MongoDB Atlas via Mongoose, JWT and Google OAuth for auth, Cloudinary for media storage with a Sharp-based image pipeline, and a vanilla HTML/CSS/JS frontend with Leaflet for maps. Deployed on Render with a custom domain.'
    },
    {
      id: 'commitment-issues',
      title: 'Commitment Issues',
      subtitle: 'A shareable git-commit personality readout',
      description: 'A fun web app that turns your git commit history into a shareable personality readout — streaks, peak coding hours, messiest day, and a personality archetype.',
      fullDescription: 'Connect your GitHub account (or paste a git log) and Commitment Issues analyzes your commit history to generate a shareable personality readout: your commit streaks, peak coding hours, your messiest commit day, and an overall developer archetype, complete with a dynamic social share image.',
      category: 'Mobile & Web',
      image: commitmentIssuesImage,
      tags: ['Next.js', 'TypeScript', 'GitHub OAuth', 'Vercel'],
      metrics: 'Turns real commit history into a shareable developer profile',
      githubUrl: 'https://github.com/noahadeleye17-coder/Commitment-issues',
      liveUrl: 'https://commitment-issues-alpha.vercel.app',
      featured: true,
      highlights: [
        'Built GitHub OAuth flow to pull a user\'s real commit history',
        'Generated dynamic Open Graph share images per result using next/og',
        'Added scroll-reveal animations to the results page for a more polished reveal'
      ],
      architectureNotes: 'Next.js app deployed on Vercel, using GitHub OAuth for repo access and next/og for dynamic social share images.'
    },
    {
      id: 'codealpha-job-board',
      title: 'Job Board Platform',
      subtitle: 'Backend task for the CodeAlpha Backend Development internship',
      description: 'A backend-focused job board platform built as part of a CodeAlpha Backend Development internship task.',
      fullDescription: 'Built as one of the required tasks for a CodeAlpha Backend Development internship: a job board platform with the same backend stack used across my other projects, covering the core flows a job board needs end to end.',
      category: 'Full Stack',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200',
      tags: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
      githubUrl: '',
      liveUrl: '',
      featured: false,
      highlights: [
        'Completed as part of the CodeAlpha Backend Development internship',
        'Reused and reinforced the same Node/Express/MongoDB patterns from Off-Campus Hub'
      ],
      architectureNotes: 'Node.js/Express with MongoDB via Mongoose, following the same backend conventions as my other projects.'
    },
    {
      id: 'vendor-storefront',
      title: 'Vendor Storefront Platform',
      subtitle: 'WhatsApp-order storefront builder for Nigerian vendors (in development)',
      description: 'A multi-tenant platform where Nigerian vendors can build their own customizable storefront and take orders straight through WhatsApp — currently in development.',
      fullDescription: 'Vendors sign up, build a customizable storefront (products, colors, fonts, layout), and get a shareable personal link. Orders route through a pre-filled WhatsApp message rather than an in-app checkout, so vendors keep direct control of their buyer relationships and pricing — deliberately staying out of payment, unlike most competitors in this space.',
      category: 'Full Stack',
      image: vendorStorefrontImage,
      tags: ['Supabase', 'WhatsApp API', 'Mobile-first'],
      metrics: 'MVP in development for WhatsApp-native selling',
      githubUrl: '',
      liveUrl: '',
      featured: false,
      highlights: [
        'Designed a self-serve MVP: signup/login, product CRUD, theme picker, single-tap WhatsApp order button',
        'Deliberately excluded payment processing so vendors keep control of pricing and buyer relationships',
        'Building mobile-first for the target audience of local vendors'
      ],
      architectureNotes: 'Path-based storefront URLs (e.g. /store/vendorname), Supabase for auth, Postgres, and storage.'
    }
  ],
  experiences: [
    {
      id: 'exp-1',
      role: 'Backend Development Intern',
      company: 'CodeAlpha',
      period: '2026',
      location: 'Remote',
      description: [
        'Completing a Backend Development internship requiring 2-3 backend tasks built end to end and shared via GitHub and a video walkthrough.',
        'Built a Job Board Platform using Node.js, Express, and MongoDB, following production-style backend conventions.',
        'Currently building an Event Registration System supporting multiple event categories, capacity limits, and waitlists.'
      ],
      technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose']
    },
    {
      id: 'exp-2',
      role: 'Founder & Full-Stack Developer',
      company: 'Off-Campus Hub',
      period: '2026 — Present',
      location: 'Lagos, Nigeria',
      description: [
        'Designed, built, and deployed a full-stack student housing and roommate-matching platform solo, from database schema to production deployment.',
        'Built a full admin dashboard, PWA support, and a server-side rendering fix so shared listing links unfurl correctly.',
        'Handled the entire product lifecycle: auth, media pipeline, search and filtering, SEO, and ongoing post-launch polish.'
      ],
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Google OAuth', 'Cloudinary', 'Leaflet']
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Computer Information Systems',
      institution: 'Federal University of Technology, Akure (FUTA)',
      period: 'Ongoing — 3rd year',
      details: 'Coursework in software engineering fundamentals, databases, and systems design, alongside independently building and shipping production web applications.'
    }
  ]
};
