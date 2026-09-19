import React, { useState } from 'react';
import { 
  ArrowUp, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Sparkles
} from 'lucide-react';
import { ProfileData } from '../types';

interface FooterProps {
  profile: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const [avatarFailed, setAvatarFailed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative overflow-hidden border-t border-[#E4DBCB] bg-gradient-to-br from-[#FFFDF8] via-[#F8EED9] to-[#F3D9A0] dark:border-[#4A3C31] dark:from-[#2A211C] dark:via-[#33271F] dark:to-[#4A351B] transition-colors">
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#D9A62E]/20 blur-3xl dark:bg-[#D9A62E]/10" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#B9861F]/15 blur-3xl dark:bg-[#B9861F]/10" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10 grid gap-8 overflow-hidden rounded-[2rem] border border-[#E8C765]/60 bg-[#FFF9EE]/65 p-5 shadow-sm backdrop-blur-sm dark:border-[#8A6015]/50 dark:bg-[#2A211C]/55 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E8C765]/70 bg-[#F6E9C4]/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8A6015] dark:border-[#8A6015]/60 dark:bg-[#3D2F12]/60 dark:text-[#D9A62E]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Still building</span>
            </div>
            <h2 className="max-w-lg text-2xl font-extrabold tracking-tight text-[#3A2F26] dark:text-white sm:text-3xl">
              Good products start with a useful idea.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#7A6B58] dark:text-[#B9A98C]">
              Thanks for making it all the way down here. I’m always up for turning a rough idea into something people can actually use.
            </p>
          </div>

          <div className="relative mx-auto w-44 rotate-2 rounded-2xl border-4 border-white bg-[#B9861F] p-1.5 shadow-xl transition-transform duration-300 hover:rotate-0 dark:border-[#E4DBCB]/20 sm:mr-4">
            <div className="absolute -right-3 -top-4 rounded-full bg-[#3A2F26] px-2.5 py-1 font-mono text-[10px] font-bold text-[#F6E9C4] shadow-md dark:bg-[#D9A62E] dark:text-[#2A211C]">
              ship it
            </div>
            <div className="aspect-square overflow-hidden rounded-xl bg-[#F6E9C4] dark:bg-[#4A3C31]">
              {avatarFailed ? (
                <div className="flex h-full items-center justify-center font-mono text-5xl font-bold text-[#B9861F] dark:text-[#D9A62E]">
                  {profile.name.charAt(0)}
                </div>
              ) : (
                <img
                  src={profile.avatarUrl}
                  alt={`${profile.name} portrait`}
                  onError={() => setAvatarFailed(true)}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
            <div className="px-1 pb-0.5 pt-2 text-center font-mono text-[10px] font-bold uppercase tracking-wider text-white">
              fullstack developer
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#EFE6D5] dark:border-[#4A3C31]/80">
          
          {/* Brand & Bio snippet */}
          <div className="text-center md:text-left space-y-2 max-w-sm">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#B9861F] dark:bg-[#CC9A24] text-white flex items-center justify-center font-mono font-bold text-xs">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 6 L13 12 L7 18" />
                  <rect x="15" y="15" width="6.5" height="2" rx="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <span className="font-bold text-lg text-[#3A2F26] dark:text-white">
                {profile.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#9C8A6E] dark:text-[#B9A98C]">
              {profile.title} • Designing scalable architectures & modern web and mobile systems.
            </p>
          </div>

          {/* Quick Section Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-[#7A6B58] dark:text-[#B9A98C]">
            <a href="#about" className="hover:text-[#B9861F] dark:hover:text-[#D9A62E] transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-[#B9861F] dark:hover:text-[#D9A62E] transition-colors">
              Projects
            </a>
            <a href="#skills" className="hover:text-[#B9861F] dark:hover:text-[#D9A62E] transition-colors">
              Skills
            </a>
            <a href="#experience" className="hover:text-[#B9861F] dark:hover:text-[#D9A62E] transition-colors">
              Experience
            </a>
            <a href="#contact" className="hover:text-[#B9861F] dark:hover:text-[#D9A62E] transition-colors">
              Contact
            </a>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-3">
            {profile.socialLinks.map((social) => (
              <a
                key={social.platform}
                id={`footer-social-${social.platform}`}
                href={social.url}
                target={social.platform === 'email' ? '_self' : '_blank'}
                rel="noreferrer noopener"
                aria-label={social.label}
                className="p-2.5 rounded-xl bg-[#EFE6D5] hover:bg-[#E4DBCB] dark:bg-[#4A3C31] dark:hover:bg-[#5C4B3A] text-[#7A6B58] dark:text-[#D3C6AF] hover:text-[#B9861F] dark:hover:text-[#D9A62E] transition-all hover:scale-105"
                title={social.label}
              >
                {social.platform === 'github' && <Github className="w-4 h-4" />}
                {social.platform === 'linkedin' && <Linkedin className="w-4 h-4" />}
                {social.platform === 'twitter' && <Twitter className="w-4 h-4" />}
                {social.platform === 'email' && <Mail className="w-4 h-4" />}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9C8A6E] dark:text-[#B9A98C]">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              id="back-to-top-btn"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A6B58] dark:text-[#B9A98C] hover:text-[#B9861F] dark:hover:text-[#D9A62E] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
