import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  MapPin, 
  Check, 
  Copy, 
  Sparkles, 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink,
  Code2,
  Briefcase,
  Layers,
  Award,
  Terminal,
  Clock,
  Command,
  Activity,
  Cpu
} from 'lucide-react';
import { ProfileData } from '../types';

interface HeroProps {
  profile: ProfileData;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  onOpenResume,
  onOpenTerminal,
  onOpenCommandPalette,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [activeCodeTab, setActiveCodeTab] = useState<'stack' | 'architecture' | 'mission'>('stack');

  // Clock effect for live local time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-GB', {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-grid-pattern">
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-emerald-500 via-[#CC9A24] to-sky-500" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Column: Introduction & Call to Actions */}
          <div className="flex-1 text-center lg:text-left">
            
            {/* Status & Availability Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold tracking-wide shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{profile.availability}</span>
              </div>

              <button
                onClick={onOpenCommandPalette}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFE6D5] dark:bg-[#4A3C31]/80 border border-[#E4DBCB] dark:border-[#5C4B3A] text-[#7A6B58] dark:text-[#D3C6AF] text-xs font-mono hover:bg-[#E4DBCB] dark:hover:bg-[#5C4B3A] transition-colors"
                title="Quick command palette"
              >
                <Command className="w-3 h-3 text-[#CC9A24]" />
                <span>Cmd+K / Ctrl+K</span>
              </button>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#3A2F26] dark:text-white tracking-tight leading-[1.12] mb-4">
              Building useful products from{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#B9861F] via-[#CC9A24] to-sky-500 dark:from-[#D9A62E] dark:via-[#DFB94A] dark:to-sky-400">
                local problems.
              </span>
            </h1>

            {/* Professional Subheading */}
            <p className="text-lg sm:text-xl font-medium text-[#5C4B3A] dark:text-[#E4DBCB] mb-4 tracking-tight">
              {profile.name} — <span className="text-[#B9861F] dark:text-[#D9A62E] font-semibold">{profile.title}</span>
            </p>

            {/* Location, Local Time & Copy Email */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-[#7A6B58] dark:text-[#B9A98C] mb-8">
              <div className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#CC9A24]" />
                <span>{profile.location}</span>
              </div>
              
              {currentTime && (
                <>
                  <span className="text-[#D3C6AF] dark:text-[#5C4B3A]">•</span>
                  <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#9C8A6E] dark:text-[#B9A98C]">
                    <Clock className="w-3.5 h-3.5 text-sky-500" />
                    <span>{currentTime} WAT</span>
                  </div>
                </>
              )}

              <span className="hidden sm:inline text-[#D3C6AF] dark:text-[#5C4B3A]">•</span>

              <button
                id="hero-copy-email-btn"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EFE6D5] dark:bg-[#4A3C31] hover:bg-[#E4DBCB] dark:hover:bg-[#5C4B3A] text-[#5C4B3A] dark:text-[#D3C6AF] font-mono text-xs transition-colors border border-[#E4DBCB] dark:border-[#5C4B3A]"
                title="Click to copy email address"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Email Copied!' : profile.email}</span>
              </button>
            </div>

            {/* Primary Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10">
              <a
                id="hero-view-projects-btn"
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-[#B9861F] hover:bg-[#A2731A] active:bg-[#8A6015] shadow-sm hover:shadow-md transition-all group"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                id="hero-contact-btn"
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#4A3C31] dark:text-[#EFE6D5] bg-white dark:bg-[#4A3C31] hover:bg-[#F7F2E9] dark:hover:bg-[#5C4B3A] border border-[#D3C6AF] dark:border-[#5C4B3A] shadow-2xs transition-all"
              >
                <Mail className="w-4 h-4 text-[#CC9A24]" />
                <span>Get in Touch</span>
              </a>

              <button
                id="hero-terminal-launch-btn"
                onClick={onOpenTerminal}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/60 transition-all font-mono"
                title="Launch interactive developer CLI"
              >
                <Terminal className="w-4 h-4" />
                <span>Launch CLI</span>
              </button>

              <button
                id="hero-cv-btn"
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-[#7A6B58] dark:text-[#D3C6AF] hover:text-[#3A2F26] dark:hover:text-white hover:bg-[#EFE6D5] dark:hover:bg-[#4A3C31] transition-colors"
                title="View clean resume PDF"
              >
                <Download className="w-4 h-4" />
                <span>CV</span>
              </button>
            </div>

            {/* Social Links List */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="text-xs font-semibold text-[#B9A98C] dark:text-[#9C8A6E] uppercase tracking-wider mr-1">
                Profiles:
              </span>
              {profile.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  id={`hero-social-${social.platform}`}
                  href={social.url}
                  target={social.platform === 'email' ? '_self' : '_blank'}
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="p-2.5 rounded-xl text-[#7A6B58] dark:text-[#D3C6AF] bg-white dark:bg-[#3A2F26] hover:bg-[#EFE6D5] dark:hover:bg-[#4A3C31] border border-[#E4DBCB] dark:border-[#4A3C31] shadow-2xs transition-all hover:scale-105 hover:text-[#B9861F] dark:hover:text-[#D9A62E]"
                  title={`${social.label} (${social.username})`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Modern Bento Card with Live Code / Architecture Preview */}
          <div className="w-full max-w-md lg:max-w-lg">
            <div className="relative rounded-3xl bg-white/90 dark:bg-[#3A2F26]/90 backdrop-blur-xl p-6 sm:p-7 border border-[#E4DBCB]/90 dark:border-[#4A3C31] shadow-xl space-y-6">
              
              {/* Profile Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#EFE6D5] dark:border-[#4A3C31]">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-[#CC9A24]/30 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#3A2F26] flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#3A2F26] dark:text-white flex items-center gap-1.5">
                      <span>{profile.name}</span>
                    </div>
                    <div className="text-xs text-[#B9861F] dark:text-[#D9A62E] font-medium">
                      {profile.title}
                    </div>
                    <div className="text-[11px] text-[#B9A98C] font-mono mt-0.5">
                      Akure, Nigeria • WAT
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenTerminal}
                  className="p-2.5 rounded-xl bg-[#EFE6D5] dark:bg-[#4A3C31] hover:bg-[#F6E9C4] dark:hover:bg-[#3D2F12]/60 hover:text-[#B9861F] dark:hover:text-[#D9A62E] text-[#7A6B58] dark:text-[#D3C6AF] transition-colors"
                  title="Open terminal window"
                >
                  <Terminal className="w-4 h-4" />
                </button>
              </div>

              {/* Code Snippet / Architecture Widget */}
              <div className="rounded-2xl bg-[#2A211C] text-[#E4DBCB] border border-[#4A3C31]/90 overflow-hidden text-xs font-mono shadow-inner">
                {/* Tab selector */}
                <div className="flex items-center justify-between px-3 py-2 bg-[#3A2F26] border-b border-[#4A3C31]">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setActiveCodeTab('stack')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeCodeTab === 'stack'
                          ? 'bg-[#4A3C31] text-[#DFB94A] font-bold'
                          : 'text-[#B9A98C] hover:text-white'
                      }`}
                    >
                      stack.ts
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('architecture')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeCodeTab === 'architecture'
                          ? 'bg-[#4A3C31] text-[#DFB94A] font-bold'
                          : 'text-[#B9A98C] hover:text-white'
                      }`}
                    >
                      architecture.json
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('mission')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeCodeTab === 'mission'
                          ? 'bg-[#4A3C31] text-[#DFB94A] font-bold'
                          : 'text-[#B9A98C] hover:text-white'
                      }`}
                    >
                      craft.md
                    </button>
                  </div>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    live
                  </span>
                </div>

                {/* Tab content */}
                <div className="p-4 leading-relaxed overflow-x-auto scrollbar-none">
                  {activeCodeTab === 'stack' && (
                    <div className="space-y-1">
                      <p className="text-[#9C8A6E]">// Core technical stack</p>
                      <p><span className="text-purple-400">const</span> <span className="text-sky-300">coreStack</span> = {'{'}</p>
                      <p className="pl-4">frontend: <span className="text-emerald-300">['React', 'Next.js', 'Vanilla JS', 'Tailwind']</span>,</p>
                      <p className="pl-4">backend: <span className="text-emerald-300">['Node.js', 'Express', 'MongoDB', 'Mongoose']</span>,</p>
                      <p className="pl-4">auth_media: <span className="text-emerald-300">['JWT', 'Google OAuth', 'Cloudinary']</span>,</p>
                      <p className="pl-4">deploy: <span className="text-emerald-300">['Render', 'Vercel', 'MongoDB Atlas']</span>,</p>
                      <p>{'}'};</p>
                    </div>
                  )}

                  {activeCodeTab === 'architecture' && (
                    <div className="space-y-1">
                      <p className="text-[#9C8A6E]">// Where things stand</p>
                      <p><span className="text-purple-400">export const</span> <span className="text-sky-300">status</span> = {'{'}</p>
                      <p className="pl-4">liveSites: <span className="text-amber-300">2</span>,</p>
                      <p className="pl-4">soloBuilt: <span className="text-amber-300">true</span>,</p>
                      <p className="pl-4">currentlyLearning: <span className="text-amber-300">"Supabase, AI integrations"</span>,</p>
                      <p className="pl-4">availability: <span className="text-amber-300">"Open to work"</span>,</p>
                      <p>{'}'};</p>
                    </div>
                  )}

                  {activeCodeTab === 'mission' && (
                    <div className="space-y-1">
                      <p className="text-[#9C8A6E]">## How I work</p>
                      <p className="text-[#D3C6AF]">- Solve real problems people around me actually have</p>
                      <p className="text-[#D3C6AF]">- Ship the whole stack solo, end to end</p>
                      <p className="text-[#D3C6AF]">- Learn new tools by building with them, not in isolation</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#9C8A6E] dark:text-[#B9A98C]">
                  <span>recent ship log</span>
                  <span>{profile.projects.filter((project) => project.featured).length} featured</span>
                </div>
                <div className="space-y-2">
                  {profile.projects.slice(0, 3).map((project) => (
                    <a
                      key={project.id}
                      href="#projects"
                      className="group flex items-center gap-3 rounded-2xl bg-[#F7F2E9] dark:bg-[#4A3C31]/50 border border-[#EFE6D5] dark:border-[#4A3C31] p-2.5 hover:border-[#CC9A24] transition-all"
                    >
                      <img
                        src={project.image}
                        alt=""
                        className="h-14 w-12 rounded-xl object-cover object-top bg-[#2A211C]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-bold text-[#3A2F26] dark:text-white group-hover:text-[#B9861F] dark:group-hover:text-[#D9A62E]">
                            {project.title}
                          </span>
                          {project.liveUrl && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                        </div>
                        <p className="truncate text-[11px] text-[#7A6B58] dark:text-[#B9A98C]">
                          {project.subtitle}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#B9A98C] group-hover:text-[#CC9A24] group-hover:translate-x-0.5 transition-all" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Stats Matrix */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-[#F7F2E9] dark:bg-[#4A3C31]/50 border border-[#EFE6D5] dark:border-[#4A3C31]">
                  <div className="flex items-center gap-1.5 text-[#B9861F] dark:text-[#D9A62E] mb-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold text-[#9C8A6E] dark:text-[#B9A98C] uppercase tracking-wider">Experience</span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#3A2F26] dark:text-white">
                    {profile.stats.yearsExperience}+ <span className="text-xs font-normal text-[#9C8A6E] dark:text-[#B9A98C]">Years</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F7F2E9] dark:bg-[#4A3C31]/50 border border-[#EFE6D5] dark:border-[#4A3C31]">
                  <div className="flex items-center gap-1.5 text-[#B9861F] dark:text-[#D9A62E] mb-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold text-[#9C8A6E] dark:text-[#B9A98C] uppercase tracking-wider">Projects</span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#3A2F26] dark:text-white">
                    {profile.stats.completedProjects}+ <span className="text-xs font-normal text-[#9C8A6E] dark:text-[#B9A98C]">Shipped</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F7F2E9] dark:bg-[#4A3C31]/50 border border-[#EFE6D5] dark:border-[#4A3C31]">
                  <div className="flex items-center gap-1.5 text-[#B9861F] dark:text-[#D9A62E] mb-1">
                    <Code2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold text-[#9C8A6E] dark:text-[#B9A98C] uppercase tracking-wider">Stack</span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#3A2F26] dark:text-white">
                    {profile.stats.codeContributions} <span className="text-xs font-normal text-[#9C8A6E] dark:text-[#B9A98C]">Tools</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F7F2E9] dark:bg-[#4A3C31]/50 border border-[#EFE6D5] dark:border-[#4A3C31]">
                  <div className="flex items-center gap-1.5 text-[#B9861F] dark:text-[#D9A62E] mb-1">
                    <Activity className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[11px] font-semibold text-[#9C8A6E] dark:text-[#B9A98C] uppercase tracking-wider">Live sites</span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#3A2F26] dark:text-white">
                    2 <span className="text-xs font-normal text-[#9C8A6E] dark:text-[#B9A98C]">In Production</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
