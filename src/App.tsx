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
import { defaultPortfolioData } from './data/initialPortfolio';
import { ProfileData } from './types';

const STORAGE_KEY_PROFILE = 'portfolio_profile_data_v1';
const STORAGE_KEY_THEME = 'portfolio_theme_mode';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return defaultPortfolioData;
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Sync dark mode class to <html> tag
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY_THEME, isDark ? 'dark' : 'light');
  }, [isDark]);

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
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
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
