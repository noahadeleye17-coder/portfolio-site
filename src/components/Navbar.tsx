import React, { useEffect, useState } from 'react';
import { Command, FileText, Menu, Moon, Sun, Terminal, X } from 'lucide-react';
import { ProfileData } from '../types';

interface NavbarProps {
  profile: ProfileData;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
  onOpenCustomizer: () => void;
  onOpenCommandPalette: () => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  isDark,
  onToggleTheme,
  onOpenResume,
  onOpenCommandPalette,
  onOpenTerminal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Stack', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of ['hero', 'about', 'projects', 'skills', 'experience', 'contact']) {
        const element = document.getElementById(sectionId);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header id="main-navbar" className={`fixed left-3 right-3 top-3 z-40 mx-auto max-w-7xl rounded-2xl border transition-all duration-300 sm:left-5 sm:right-5 lg:left-8 lg:right-8 ${isScrolled ? 'border-[#E4DBCB]/80 bg-white/90 py-2.5 shadow-lg backdrop-blur-md dark:border-[#4A3C31]/80 dark:bg-[#2A211C]/90' : 'border-[#E4DBCB]/70 bg-white/80 py-3 shadow-md backdrop-blur-md dark:border-[#4A3C31]/70 dark:bg-[#2A211C]/80'}`}>
      <div className="mx-auto px-3 sm:px-4 lg:px-5">
        <div className="flex items-center justify-between">
          <a href="#hero" onClick={() => handleNavClick('#hero')} className="group flex items-center gap-2.5 text-lg font-bold tracking-tight sm:text-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#B9861F] shadow-xs transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="white" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 6 L13 12 L7 18" />
                <rect x="15" y="15" width="6.5" height="2" rx="1" fill="white" stroke="none" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="leading-none text-[#3A2F26] transition-colors group-hover:text-[#B9861F] dark:text-white dark:group-hover:text-[#D9A62E]">{profile.name}</span>
              <span className="mt-0.5 font-mono text-[10px] text-[#B9A98C] dark:text-[#9C8A6E]">product builder</span>
            </div>
          </a>

          <nav className="hidden items-center gap-1 rounded-full border border-[#E4DBCB]/70 bg-[#EFE6D5]/80 p-1.5 backdrop-blur-md dark:border-[#4A3C31]/70 dark:bg-[#3A2F26]/80 lg:flex">
            {navLinks.map((link) => (
              <button key={link.id} type="button" onClick={() => handleNavClick(link.href)} className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${activeSection === link.id ? 'bg-white font-semibold text-[#B9861F] shadow-2xs dark:bg-[#4A3C31] dark:text-[#D9A62E]' : 'text-[#7A6B58] hover:bg-[#E4DBCB]/50 hover:text-[#3A2F26] dark:text-[#D3C6AF] dark:hover:bg-[#4A3C31]/50 dark:hover:text-white'}`}>
                {link.name}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button type="button" onClick={onOpenCommandPalette} aria-label="Search portfolio" className="icon-control" title="Search"><Command className="h-4 w-4" /></button>
            <button type="button" onClick={onOpenTerminal} aria-label="Open terminal" className="icon-control" title="Open terminal"><Terminal className="h-4 w-4 text-emerald-500" /></button>
            <button type="button" onClick={onToggleTheme} aria-label="Toggle theme" className="icon-control" title={isDark ? 'Light mode' : 'Dark mode'}>{isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}</button>
            <button type="button" onClick={onOpenResume} className="inline-flex items-center gap-1.5 rounded-xl bg-[#B9861F] px-3.5 py-2 text-sm font-semibold text-white shadow-2xs transition-colors hover:bg-[#A2731A]"><FileText className="h-3.5 w-3.5" />CV</button>
          </div>

          <button id="mobile-menu-toggle-btn" type="button" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu" className="menu-trigger lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      </header>

      <div className={`fixed inset-0 z-50 transition-[visibility] duration-300 lg:hidden ${mobileMenuOpen ? 'visible' : 'invisible'}`} aria-hidden={!mobileMenuOpen}>
        <button type="button" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)} className={`absolute inset-0 bg-[#2A211C]/25 backdrop-blur-[2px] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} />
        <aside className={`absolute right-0 top-0 flex h-full w-[min(21rem,88vw)] flex-col border-l border-[#E4DBCB] bg-[#FFF9EE] p-5 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] dark:border-[#4A3C31] dark:bg-[#2A211C] ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between border-b border-[#E4DBCB] pb-5 dark:border-[#4A3C31]">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#B9861F] dark:text-[#D9A62E]">Navigate</span>
            <button type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" className="menu-trigger"><X className="h-5 w-5" /></button>
          </div>
          <nav className="mt-6 flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <button key={link.id} type="button" onClick={() => handleNavClick(link.href)} style={{ transitionDelay: mobileMenuOpen ? `${80 + index * 45}ms` : '0ms' }} className={`translate-x-0 rounded-xl px-3 py-3 text-left text-lg font-semibold transition-all duration-300 ${mobileMenuOpen ? 'opacity-100' : 'translate-x-4 opacity-0'} ${activeSection === link.id ? 'bg-[#F6E9C4] text-[#B9861F] dark:bg-[#3D2F12]/70 dark:text-[#D9A62E]' : 'text-[#4A3C31] hover:bg-[#EFE6D5] dark:text-[#E4DBCB] dark:hover:bg-[#3A2F26]'}`}>{link.name}</button>
            ))}
          </nav>
          <div className="mt-auto space-y-3 border-t border-[#E4DBCB] pt-5 dark:border-[#4A3C31]">
            <div className="flex gap-2">
              <button type="button" onClick={() => { setMobileMenuOpen(false); onOpenCommandPalette(); }} className="icon-control flex-1 justify-center"><Command className="h-4 w-4" /><span className="text-xs">Search</span></button>
              <button type="button" onClick={onToggleTheme} aria-label="Toggle theme" className="icon-control"><>{isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}</></button>
            </div>
            <button type="button" onClick={() => { setMobileMenuOpen(false); onOpenResume(); }} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#B9861F] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#A2731A]"><FileText className="h-4 w-4" />View CV</button>
          </div>
        </aside>
      </div>
    </>
  );
};
