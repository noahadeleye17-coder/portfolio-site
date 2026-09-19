/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { PortfolioCustomizer } from './components/PortfolioCustomizer';
import { CommandPalette } from './components/CommandPalette';
import { TerminalModal } from './components/TerminalModal';
import { ProjectModal } from './components/ProjectModal';
import { defaultPortfolioData } from './data/initialPortfolio';
import { ProfileData, Project } from './types';
import { Command, Terminal } from 'lucide-react';

const STORAGE_KEY_PROFILE = 'portfolio_profile_data_v2';
const STORAGE_KEY_THEME = 'portfolio_theme_mode';

export default function App() {
  // The first client render must match the prerendered HTML, so state starts from the
  // defaults and the visitor's saved profile/theme are applied right after hydration.
  const [profile, setProfile] = useState<ProfileData>(defaultPortfolioData);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) {
        const parsedProfile: ProfileData = JSON.parse(saved);
        const hasLinkedIn = parsedProfile.socialLinks.some((social) => social.platform === 'linkedin');
        const linkedIn = defaultPortfolioData.socialLinks.find((social) => social.platform === 'linkedin');
        setProfile(
          !hasLinkedIn && linkedIn
            ? { ...parsedProfile, socialLinks: [...parsedProfile.socialLinks, linkedIn] }
            : parsedProfile,
        );
      }
    } catch {
      // Fallback
    }

    let dark = false;
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
      dark = savedTheme
        ? savedTheme === 'dark'
        : Boolean(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch {
      dark = false;
    }
    setIsDark(dark);
    setIsHydrated(true);
  }, []);

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Sync dark mode class to <html> tag (index.html applies it before first paint;
  // this waits for the saved theme to load so it never overrides it with the default)
  useEffect(() => {
    if (!isHydrated) return;
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY_THEME, isDark ? 'dark' : 'light');
    } catch {
      // Ignore
    }
  }, [isDark, isHydrated]);

  useEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>('main > section, #main-footer');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px' },
    );

    revealTargets.forEach((element) => {
      // The prerendered page is already visible. Only sections still below the fold get the
      // reveal treatment, so on-screen content doesn't vanish and fade back in on hydration.
      if (element.getBoundingClientRect().top < window.innerHeight) return;
      element.classList.add('scroll-reveal');
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleResetProfile = () => {
    setProfile(defaultPortfolioData);
    try {
      localStorage.removeItem(STORAGE_KEY_PROFILE);
    } catch {
      // Ignore
    }
  };

  return (
    <div id="portfolio-app-root" className="min-h-screen bg-[#F7F2E9] dark:bg-[#2A211C] text-[#3A2F26] dark:text-[#EFE6D5] flex flex-col transition-colors duration-200">
      {/* Sticky Navigation Header */}
      <Navbar
        profile={profile}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="grow">
        {/* Hero Section */}
        <Hero
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        {/* Biography & Background */}
        <About
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Projects Showcase */}
        <Projects
          projects={profile.projects}
        />

        {/* Skills & Competencies */}
        <Skills
          categories={profile.skillCategories}
          projects={profile.projects}
          onSelectProject={(project) => setActiveModalProject(project)}
        />

        {/* Career Experience & Education */}
        <Experience
          experiences={profile.experiences}
          education={profile.education}
        />

        {/* Contact & Profiles */}
        <Contact
          profile={profile}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
      />

      {/* Floating Quick Action Widget for quick Command Palette & Terminal access */}
      <div className="fixed bottom-6 right-6 z-30 hidden sm:flex items-center gap-2 p-1.5 rounded-2xl bg-white/90 dark:bg-[#3A2F26]/90 backdrop-blur-md border border-[#E4DBCB]/80 dark:border-[#4A3C31]/80 shadow-lg">
        <button
          id="floating-cmd-palette-btn"
          onClick={() => setIsCommandPaletteOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EFE6D5] dark:bg-[#4A3C31] hover:bg-[#E4DBCB] dark:hover:bg-[#5C4B3A] text-[#5C4B3A] dark:text-[#D3C6AF] text-xs font-mono transition-colors"
          title="Open Command Palette (Cmd+K)"
        >
          <Command className="w-3.5 h-3.5 text-[#CC9A24]" />
          <span>Cmd+K</span>
        </button>

        <button
          id="floating-terminal-btn"
          onClick={() => setIsTerminalOpen(true)}
          className="p-2 rounded-xl text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 transition-colors"
          title="Open CLI Terminal"
        >
          <Terminal className="w-4 h-4" />
        </button>
      </div>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        profile={profile}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onSelectProject={(project) => setActiveModalProject(project)}
      />

      {/* Interactive Developer Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        profile={profile}
        onOpenResume={() => setIsResumeOpen(true)}
        onToggleTheme={handleToggleTheme}
        onSelectProject={(project) => setActiveModalProject(project)}
      />

      {/* Direct Project Deep Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />

      {/* Full Resume View & Print Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
      />

      {/* Interactive Profile Customizer Drawer */}
      <PortfolioCustomizer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
      />
    </div>
  );
}
