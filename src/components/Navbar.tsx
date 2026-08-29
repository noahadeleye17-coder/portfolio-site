import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  FileText, 
  Sliders, 
  Sparkles,
  Command,
  Terminal,
  ArrowUpRight
} from 'lucide-react';
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
  onOpenCustomizer,
  onOpenCommandPalette,
  onOpenTerminal,
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-[#2A211C]/80 backdrop-blur-md border-b border-[#E4DBCB]/80 dark:border-[#4A3C31]/80 shadow-xs py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand */}
          <a
            href="#hero"
            id="nav-brand-logo"
            className="flex items-center gap-2.5 text-[#3A2F26] dark:text-white font-bold text-lg sm:text-xl tracking-tight group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#B9861F] dark:bg-[#CC9A24] text-white flex items-center justify-center font-mono font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
              {profile.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[#3A2F26] dark:text-white group-hover:text-[#B9861F] dark:group-hover:text-[#D9A62E] transition-colors leading-none">
                {profile.name}
              </span>
              <span className="text-[10px] font-mono text-[#B9A98C] dark:text-[#9C8A6E] mt-0.5">
                senior engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#EFE6D5]/80 dark:bg-[#3A2F26]/80 p-1.5 rounded-full border border-[#E4DBCB]/70 dark:border-[#4A3C31]/70 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-150 ${
                    isActive
                      ? 'bg-white dark:bg-[#4A3C31] text-[#B9861F] dark:text-[#D9A62E] shadow-2xs font-semibold'
                      : 'text-[#7A6B58] dark:text-[#D3C6AF] hover:text-[#3A2F26] dark:hover:text-white hover:bg-[#E4DBCB]/50 dark:hover:bg-[#4A3C31]/50'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Command Palette, Terminal, Theme & Resume */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Quick Command Palette Button */}
            <button
              id="navbar-cmd-palette-btn"
              onClick={onOpenCommandPalette}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EFE6D5]/90 dark:bg-[#3A2F26]/90 hover:bg-[#E4DBCB] dark:hover:bg-[#4A3C31] border border-[#E4DBCB] dark:border-[#4A3C31] text-[#7A6B58] dark:text-[#D3C6AF] text-xs font-mono transition-colors"
              title="Open Command Palette (Cmd+K)"
            >
              <Command className="w-3.5 h-3.5 text-[#CC9A24]" />
              <span>Search</span>
              <kbd className="text-[10px] px-1 py-0.2 rounded bg-[#E4DBCB]/70 dark:bg-[#4A3C31] text-[#B9A98C] font-sans">
                ⌘K
              </kbd>
            </button>

            {/* Interactive Terminal Trigger */}
            <button
              id="navbar-terminal-btn"
              onClick={onOpenTerminal}
              aria-label="Open CLI Terminal"
              className="p-2 rounded-xl text-[#7A6B58] dark:text-[#D3C6AF] hover:text-[#3A2F26] dark:hover:text-white bg-[#EFE6D5]/90 dark:bg-[#3A2F26]/90 hover:bg-[#E4DBCB] dark:hover:bg-[#4A3C31] border border-[#E4DBCB] dark:border-[#4A3C31] transition-colors"
              title="Open interactive terminal CLI"
            >
              <Terminal className="w-4 h-4 text-emerald-500" />
            </button>

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl text-[#7A6B58] dark:text-[#D3C6AF] hover:text-[#3A2F26] dark:hover:text-white bg-[#EFE6D5]/90 dark:bg-[#3A2F26]/90 hover:bg-[#E4DBCB] dark:hover:bg-[#4A3C31] border border-[#E4DBCB] dark:border-[#4A3C31] transition-colors"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#5C4B3A]" />}
            </button>

            {/* Customizer */}
            <button
              id="customize-portfolio-btn"
              onClick={onOpenCustomizer}
              aria-label="Customize Portfolio"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl text-[#5C4B3A] dark:text-[#E4DBCB] bg-[#EFE6D5]/90 dark:bg-[#3A2F26]/90 hover:bg-[#E4DBCB] dark:hover:bg-[#4A3C31] border border-[#E4DBCB] dark:border-[#4A3C31] transition-colors"
              title="Customize portfolio content in real-time"
            >
              <Sliders className="w-3.5 h-3.5 text-[#CC9A24]" />
              <span>Edit</span>
            </button>

            {/* Resume Button */}
            <button
              id="view-resume-nav-btn"
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-xl text-white bg-[#B9861F] hover:bg-[#A2731A] active:bg-[#8A6015] dark:bg-[#B9861F] dark:hover:bg-[#CC9A24] shadow-2xs transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CV</span>
            </button>
          </div>

          {/* Mobile menu toggle & search */}
          <div className="flex items-center gap-1.5 sm:hidden">
            <button
              id="mobile-cmd-btn"
              onClick={onOpenCommandPalette}
              className="p-2 rounded-xl bg-[#EFE6D5] dark:bg-[#4A3C31] text-[#5C4B3A] dark:text-[#D3C6AF]"
              title="Search"
            >
              <Command className="w-4 h-4" />
            </button>

            <button
              id="mobile-theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl bg-[#EFE6D5] dark:bg-[#4A3C31] text-[#5C4B3A] dark:text-[#D3C6AF]"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#5C4B3A]" />}
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
              className="p-2 rounded-xl bg-[#EFE6D5] dark:bg-[#4A3C31] text-[#5C4B3A] dark:text-[#D3C6AF]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-dropdown-menu"
          className="sm:hidden bg-white/95 dark:bg-[#2A211C]/95 border-b border-[#E4DBCB] dark:border-[#4A3C31] px-4 pt-3 pb-6 backdrop-blur-xl shadow-xl mt-2"
        >
          <div className="flex flex-col gap-1.5 mb-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => handleNavClick(link.href)}
                className={`text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#F6E9C4] dark:bg-[#3D2F12]/50 text-[#B9861F] dark:text-[#D9A62E] font-semibold'
                    : 'text-[#5C4B3A] dark:text-[#E4DBCB] hover:bg-[#EFE6D5] dark:hover:bg-[#3A2F26]'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E4DBCB] dark:border-[#4A3C31] flex flex-col gap-2">
            <button
              id="mobile-terminal-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold rounded-xl text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Interactive CLI</span>
            </button>

            <button
              id="mobile-resume-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl text-white bg-[#B9861F] hover:bg-[#A2731A] transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>View & Download Resume PDF</span>
            </button>

            <button
              id="mobile-customize-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomizer();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl text-[#5C4B3A] dark:text-[#E4DBCB] bg-[#EFE6D5] dark:bg-[#3A2F26] hover:bg-[#E4DBCB] dark:hover:bg-[#4A3C31] transition-colors"
            >
              <Sliders className="w-4 h-4 text-[#CC9A24]" />
              <span>Customize Profile Data</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
