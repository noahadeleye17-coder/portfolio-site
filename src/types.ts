export type ProjectCategory = 'All' | 'Full Stack' | 'AI & ML' | 'Mobile & Web' | 'Cloud & Systems';

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email' | 'website';
  label: string;
  url: string;
  username: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  experience: string;
  highlighted?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  category: Exclude<ProjectCategory, 'All'>;
  image: string;
  tags: string[];
  metrics?: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  highlights: string[];
  architectureNotes?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string;
  honors?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  headline: string;
  email: string;
  phone?: string;
  location: string;
  availability: string;
  avatarUrl: string;
  bioParagraphs: string[];
  stats: {
    yearsExperience: number;
    completedProjects: number;
    satisfiedClients: number;
    codeContributions: string;
  };
  socialLinks: SocialLink[];
  skillCategories: SkillCategory[];
  projects: Project[];
  experiences: ExperienceItem[];
  education: EducationItem[];
}
