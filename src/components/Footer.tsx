import React from 'react';
import { 
  ArrowUp, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Heart, 
  Code2,
  Terminal
} from 'lucide-react';
import { ProfileData } from '../types';

interface FooterProps {
  profile: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-white dark:bg-[#2A211C] border-t border-[#E4DBCB] dark:border-[#4A3C31] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#EFE6D5] dark:border-[#4A3C31]/80">
          
          {/* Brand & Bio snippet */}
          <div className="text-center md:text-left space-y-2 max-w-sm">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#B9861F] dark:bg-[#CC9A24] text-white flex items-center justify-center font-mono font-bold text-xs">
                {profile.name.charAt(0)}
              </div>
              <span className="font-bold text-lg text-[#3A2F26] dark:text-white">
                {profile.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#9C8A6E] dark:text-[#B9A98C]">
              {profile.title} • Designing scalable architectures & modern web systems.
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
