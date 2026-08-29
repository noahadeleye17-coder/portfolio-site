import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  FileText, 
  Sliders, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { ProfileData } from '../types';

interface NavbarProps {
  profile: ProfileData;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  isDark,
  onToggleTheme,
  onOpenResume,
  onOpenCustomizer
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/85 dark:bg-[#3A2F26]/85 backdrop-blur-md border-b border-[#E4DBCB]/80 dark:border-[#4A3C31]/80 shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Name */}
          <a
            href="#hero"
            id="nav-brand-logo"
            className="flex items-center gap-2.5 text-[#3A2F26] dark:text-white font-bold text-lg sm:text-xl tracking-tight group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#B9861F] dark:bg-[#CC9A24] text-white flex items-center justify-center font-mono font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
              {profile.name.charAt(0)}
            </div>
            <span className="font-semibold text-[#3A2F26] dark:text-white group-hover:text-[#B9861F] dark:group-hover:text-[#D9A62E] transition-colors">
              {profile.name}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#EFE6D5]/70 dark:bg-[#4A3C31]/60 p-1.5 rounded-full border border-[#E4DBCB]/60 dark:border-[#5C4B3A]/60 backdrop-blur-xs">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-150 ${
                    isActive
                      ? 'bg-white dark:bg-[#3A2F26] text-[#B9861F] dark:text-[#D9A62E] shadow-xs font-semibold'
                      : 'text-[#7A6B58] dark:text-[#D3C6AF] hover:text-[#3A2F26] dark:hover:text-white hover:bg-[#E4DBCB]/40 dark:hover:bg-[#5C4B3A]/40'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle, Resume & Customizer */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-xl text-[#7A6B58] dark:text-[#D3C6AF] hover:text-[#3A2F26] dark:hover:text-white hover:bg-[#EFE6D5] dark:hover:bg-[#4A3C31] transition-colors border border-transparent hover:border-[#E4DBCB] dark:hover:border-[#5C4B3A]"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#5C4B3A]" />}
            </button>

            <button
              id="customize-portfolio-btn"
              onClick={onOpenCustomizer}
              aria-label="Customize Portfolio"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl text-[#5C4B3A] dark:text-[#E4DBCB] bg-[#EFE6D5] hover:bg-[#E4DBCB]/70 dark:bg-[#4A3C31] dark:hover:bg-[#5C4B3A]/80 border border-[#E4DBCB] dark:border-[#5C4B3A] transition-colors"
              title="Customize portfolio content"
            >
              <Sliders className="w-3.5 h-3.5 text-[#B9861F] dark:text-[#D9A62E]" />
              <span>Customize</span>
            </button>

            <button
              id="view-resume-nav-btn"
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-white bg-[#B9861F] hover:bg-[#A2731A] active:bg-[#8A6015] dark:bg-[#B9861F] dark:hover:bg-[#CC9A24] shadow-xs hover:shadow-sm transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              id="mobile-theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-[#7A6B58] dark:text-[#D3C6AF] hover:bg-[#EFE6D5] dark:hover:bg-[#4A3C31]"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#5C4B3A]" />}
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
              className="p-2 rounded-lg text-[#5C4B3A] dark:text-[#E4DBCB] hover:bg-[#EFE6D5] dark:hover:bg-[#4A3C31]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-dropdown-menu"
          className="sm:hidden bg-white/95 dark:bg-[#3A2F26]/95 border-b border-[#E4DBCB] dark:border-[#4A3C31] px-4 pt-2 pb-6 backdrop-blur-md shadow-lg"
        >
          <div className="flex flex-col gap-1.5 mb-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => handleNavClick(link.href)}
                className={`text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#F6E9C4] dark:bg-[#3D2F12]/50 text-[#B9861F] dark:text-[#D9A62E] font-semibold'
                    : 'text-[#5C4B3A] dark:text-[#E4DBCB] hover:bg-[#EFE6D5] dark:hover:bg-[#4A3C31]'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E4DBCB] dark:border-[#4A3C31] flex flex-col gap-2">
            <button
              id="mobile-resume-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl text-white bg-[#B9861F] hover:bg-[#A2731A] transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>View & Download Resume</span>
            </button>

            <button
              id="mobile-customize-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomizer();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl text-[#5C4B3A] dark:text-[#E4DBCB] bg-[#EFE6D5] dark:bg-[#4A3C31] hover:bg-[#E4DBCB] dark:hover:bg-[#5C4B3A] transition-colors"
            >
              <Sliders className="w-4 h-4 text-[#CC9A24]" />
              <span>Customize Profile Content</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
