import React, { useState } from 'react';
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
  Award
} from 'lucide-react';
import { ProfileData } from '../types';

interface HeroProps {
  profile: ProfileData;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

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
    <section id="hero" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      {/* Subtle Background Glows (Accessible & Anti-Slop) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-[#CC9A24]/10 dark:bg-[#CC9A24]/15 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Column: Bio / Pitch */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold tracking-wide mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{profile.availability}</span>
            </div>

            {/* Main Greeting & Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#3A2F26] dark:text-white tracking-tight leading-[1.15] mb-4">
              Hi, I'm <span className="text-[#B9861F] dark:text-[#D9A62E]">{profile.name}</span>
            </h1>

            {/* Professional Title */}
            <p className="text-xl sm:text-2xl font-semibold text-[#5C4B3A] dark:text-[#E4DBCB] mb-4 tracking-tight">
              {profile.title}
            </p>

            {/* Headline / Summary */}
            <p className="text-base sm:text-lg text-[#7A6B58] dark:text-[#D3C6AF] max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {profile.headline}
            </p>

            {/* Location & Quick Contact */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-[#7A6B58] dark:text-[#B9A98C] mb-8">
              <div className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#CC9A24]" />
                <span>{profile.location}</span>
              </div>
              <span className="hidden sm:inline text-[#D3C6AF] dark:text-[#5C4B3A]">•</span>
              <button
                id="hero-copy-email-btn"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EFE6D5] dark:bg-[#4A3C31] hover:bg-[#E4DBCB] dark:hover:bg-[#5C4B3A] text-[#5C4B3A] dark:text-[#D3C6AF] font-mono text-xs transition-colors border border-[#E4DBCB] dark:border-[#5C4B3A]"
                title="Click to copy email address"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Email Copied!' : profile.email}</span>
              </button>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10">
              <a
                id="hero-view-projects-btn"
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-[#B9861F] hover:bg-[#A2731A] active:bg-[#8A6015] shadow-xs hover:shadow-md transition-all group"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                id="hero-contact-btn"
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#4A3C31] dark:text-[#EFE6D5] bg-white dark:bg-[#4A3C31] hover:bg-[#F7F2E9] dark:hover:bg-[#5C4B3A] border border-[#D3C6AF] dark:border-[#5C4B3A] shadow-xs transition-all"
              >
                <Mail className="w-4 h-4 text-[#CC9A24]" />
                <span>Get in Touch</span>
              </a>

              <button
                id="hero-cv-btn"
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-[#7A6B58] dark:text-[#D3C6AF] hover:text-[#3A2F26] dark:hover:text-white hover:bg-[#EFE6D5] dark:hover:bg-[#4A3C31] transition-colors border border-transparent hover:border-[#E4DBCB] dark:hover:border-[#5C4B3A]"
              >
                <Download className="w-4 h-4" />
                <span>View CV</span>
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
                  className="p-2.5 rounded-xl text-[#7A6B58] dark:text-[#D3C6AF] bg-[#EFE6D5] hover:bg-[#E4DBCB]/80 dark:bg-[#4A3C31] dark:hover:bg-[#5C4B3A] border border-[#E4DBCB] dark:border-[#5C4B3A] transition-all hover:scale-105 hover:text-[#B9861F] dark:hover:text-[#D9A62E]"
                  title={`${social.label} (${social.username})`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Stats */}
          <div className="w-full max-w-md lg:max-w-lg">
            <div className="relative rounded-2xl bg-white dark:bg-[#3A2F26] p-6 sm:p-8 border border-[#E4DBCB] dark:border-[#4A3C31] shadow-md">
              {/* Profile Card Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-[#EFE6D5] dark:border-[#4A3C31]">
                <div className="relative">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-[#CC9A24]/30 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#3A2F26] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  </div>
                </div>
                <div>
                  <div className="text-base font-bold text-[#3A2F26] dark:text-white">
                    {profile.name}
                  </div>
                  <div className="text-xs text-[#B9861F] dark:text-[#D9A62E] font-medium">
                    {profile.title}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#9C8A6E] dark:text-[#B9A98C] mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>

              {/* Stats Matrix */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-6">
                <div className="p-3.5 rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/60 border border-[#EFE6D5] dark:border-[#4A3C31]">
                  <div className="flex items-center gap-2 text-[#B9861F] dark:text-[#D9A62E] mb-1">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-xs font-semibold text-[#9C8A6E] dark:text-[#B9A98C]">Experience</span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#3A2F26] dark:text-white">
                    {profile.stats.yearsExperience}+ <span className="text-xs font-normal text-[#9C8A6E] dark:text-[#B9A98C]">Years</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/60 border border-[#EFE6D5] dark:border-[#4A3C31]">
                  <div className="flex items-center gap-2 text-[#B9861F] dark:text-[#D9A62E] mb-1">
                    <Layers className="w-4 h-4" />
                    <span className="text-xs font-semibold text-[#9C8A6E] dark:text-[#B9A98C]">Projects</span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#3A2F26] dark:text-white">
                    {profile.stats.completedProjects}+ <span className="text-xs font-normal text-[#9C8A6E] dark:text-[#B9A98C]">Shipped</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/60 border border-[#EFE6D5] dark:border-[#4A3C31]">
                  <div className="flex items-center gap-2 text-[#B9861F] dark:text-[#D9A62E] mb-1">
                    <Code2 className="w-4 h-4" />
                    <span className="text-xs font-semibold text-[#9C8A6E] dark:text-[#B9A98C]">Stack</span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#3A2F26] dark:text-white">
                    {profile.stats.codeContributions} <span className="text-xs font-normal text-[#9C8A6E] dark:text-[#B9A98C]">Tools</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/60 border border-[#EFE6D5] dark:border-[#4A3C31]">
                  <div className="flex items-center gap-2 text-[#B9861F] dark:text-[#D9A62E] mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-xs font-semibold text-[#9C8A6E] dark:text-[#B9A98C]">Live sites</span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#3A2F26] dark:text-white">
                    2 <span className="text-xs font-normal text-[#9C8A6E] dark:text-[#B9A98C]">In Production</span>
                  </div>
                </div>
              </div>

              {/* Quick Tech Highlight Strip */}
              <div className="mt-5 pt-4 border-t border-[#EFE6D5] dark:border-[#4A3C31] flex items-center justify-between text-xs text-[#9C8A6E] dark:text-[#B9A98C]">
                <span className="font-medium">Core Stack:</span>
                <span className="font-mono text-[#5C4B3A] dark:text-[#D3C6AF] font-semibold">
                  Node.js • Express • MongoDB • React
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
