import React, { useState } from 'react';
import { 
  X, 
  RotateCcw, 
  Save, 
  Sparkles, 
  User, 
  Check, 
  Briefcase, 
  Sliders, 
  Code, 
  Plus, 
  Trash2,
  Cpu,
  Layers
} from 'lucide-react';
import { ProfileData, Project, SkillCategory } from '../types';
import { defaultPortfolioData } from '../data/initialPortfolio';
import { TechLogo } from './TechLogo';

interface PortfolioCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (updated: ProfileData) => void;
  onReset: () => void;
}

export const PortfolioCustomizer: React.FC<PortfolioCustomizerProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<ProfileData>(profile);
  const [savedToast, setSavedToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills'>('profile');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 1200);
  };

  const handleApplyPreset = (type: 'fullstack' | 'aiml' | 'frontend') => {
    if (type === 'fullstack') {
      setFormData(defaultPortfolioData);
    } else if (type === 'aiml') {
      setFormData({
        ...defaultPortfolioData,
        title: 'Senior AI Engineer & LLM Systems Architect',
        headline: 'Building enterprise agents, vector retrieval pipelines, and production multimodal intelligence systems.',
        availability: 'Available for AI Advisory & Engineering Leadership',
      });
    } else if (type === 'frontend') {
      setFormData({
        ...defaultPortfolioData,
        title: 'Principal Frontend Engineer & Design Technologist',
        headline: 'Obsessed with fluid interactions, design systems, WebGL rendering, and zero-layout-shift web performance.',
        availability: 'Open for Design Engineering & Principal roles',
      });
    }
  };

  return (
    <div
      id="portfolio-customizer-drawer"
      className="fixed inset-0 z-50 flex justify-end bg-[#2A211C]/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-[#3A2F26] h-full shadow-2xl flex flex-col border-l border-[#E4DBCB] dark:border-[#4A3C31]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4DBCB] dark:border-[#4A3C31] bg-[#F7F2E9] dark:bg-[#4A3C31]/80">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#B9861F] dark:text-[#D9A62E]" />
            <div>
              <h3 className="font-bold text-base text-[#3A2F26] dark:text-white">
                Customize Portfolio
              </h3>
              <p className="text-xs text-[#9C8A6E]">
                Live update your portfolio bio, titles, and links
              </p>
            </div>
          </div>

          <button
            id="close-customizer-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9C8A6E] hover:text-[#4A3C31] dark:hover:text-[#E4DBCB] hover:bg-[#E4DBCB]/60 dark:hover:bg-[#5C4B3A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Selector Banner */}
        <div className="px-6 py-3 bg-[#F6E9C4]/70 dark:bg-[#3D2F12]/30 border-b border-[#F0DDA0] dark:border-[#6E4C11]/40 flex items-center justify-between gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-[#6E4C11] dark:text-[#DFB94A] uppercase tracking-wider shrink-0">
            Presets:
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => handleApplyPreset('fullstack')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-[#4A3C31] text-[#5C4B3A] dark:text-[#E4DBCB] border border-[#E4DBCB] dark:border-[#5C4B3A] hover:bg-[#F6E9C4]"
            >
              Full-Stack
            </button>
            <button
              onClick={() => handleApplyPreset('aiml')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-[#4A3C31] text-[#5C4B3A] dark:text-[#E4DBCB] border border-[#E4DBCB] dark:border-[#5C4B3A] hover:bg-[#F6E9C4]"
            >
              AI & LLM
            </button>
            <button
              onClick={() => handleApplyPreset('frontend')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-[#4A3C31] text-[#5C4B3A] dark:text-[#E4DBCB] border border-[#E4DBCB] dark:border-[#5C4B3A] hover:bg-[#F6E9C4]"
            >
              Design Tech
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E4DBCB] dark:border-[#4A3C31] px-6 pt-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-[#B9861F] text-[#B9861F] dark:text-[#D9A62E]'
                : 'border-transparent text-[#9C8A6E] hover:text-[#3A2F26] dark:hover:text-white'
            }`}
          >
            Profile & Socials
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'projects'
                ? 'border-[#B9861F] text-[#B9861F] dark:text-[#D9A62E]'
                : 'border-transparent text-[#9C8A6E] hover:text-[#3A2F26] dark:hover:text-white'
            }`}
          >
            Projects ({formData.projects.length})
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'skills'
                ? 'border-[#B9861F] text-[#B9861F] dark:text-[#D9A62E]'
                : 'border-transparent text-[#9C8A6E] hover:text-[#3A2F26] dark:hover:text-white'
            }`}
          >
            Skills & Percentages
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5">
          {activeTab === 'profile' && (
            <>
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6B58] dark:text-[#D3C6AF] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#F7F2E9] dark:bg-[#4A3C31] border border-[#E4DBCB] dark:border-[#5C4B3A] text-[#3A2F26] dark:text-white focus:ring-2 focus:ring-[#CC9A24]"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6B58] dark:text-[#D3C6AF] mb-1">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#F7F2E9] dark:bg-[#4A3C31] border border-[#E4DBCB] dark:border-[#5C4B3A] text-[#3A2F26] dark:text-white focus:ring-2 focus:ring-[#CC9A24]"
                />
              </div>

              {/* Headline */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6B58] dark:text-[#D3C6AF] mb-1">
                  Hero Headline / Elevator Pitch
                </label>
                <textarea
                  rows={2}
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#F7F2E9] dark:bg-[#4A3C31] border border-[#E4DBCB] dark:border-[#5C4B3A] text-[#3A2F26] dark:text-white focus:ring-2 focus:ring-[#CC9A24]"
                />
              </div>

              {/* Email & Location */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6B58] dark:text-[#D3C6AF] mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-[#F7F2E9] dark:bg-[#4A3C31] border border-[#E4DBCB] dark:border-[#5C4B3A] text-[#3A2F26] dark:text-white focus:ring-2 focus:ring-[#CC9A24]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6B58] dark:text-[#D3C6AF] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-[#F7F2E9] dark:bg-[#4A3C31] border border-[#E4DBCB] dark:border-[#5C4B3A] text-[#3A2F26] dark:text-white focus:ring-2 focus:ring-[#CC9A24]"
                  />
                </div>
              </div>

              {/* Availability Status */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6B58] dark:text-[#D3C6AF] mb-1">
                  Availability Status Tag
                </label>
                <input
                  type="text"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#F7F2E9] dark:bg-[#4A3C31] border border-[#E4DBCB] dark:border-[#5C4B3A] text-[#3A2F26] dark:text-white focus:ring-2 focus:ring-[#CC9A24]"
                />
              </div>

              {/* Biography paragraph 1 */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6B58] dark:text-[#D3C6AF] mb-1">
                  Biography Summary (Paragraph 1)
                </label>
                <textarea
                  rows={3}
                  value={formData.bioParagraphs[0] || ''}
                  onChange={(e) => {
                    const newBio = [...formData.bioParagraphs];
                    newBio[0] = e.target.value;
                    setFormData({ ...formData, bioParagraphs: newBio });
                  }}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#F7F2E9] dark:bg-[#4A3C31] border border-[#E4DBCB] dark:border-[#5C4B3A] text-[#3A2F26] dark:text-white focus:ring-2 focus:ring-[#CC9A24]"
                />
              </div>

              {/* Social Links Editing */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6B58] dark:text-[#D3C6AF] mb-2">
                  Social Links & Usernames
                </label>
                <div className="space-y-2">
                  {formData.socialLinks.map((social, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-20 text-xs font-semibold text-[#5C4B3A] dark:text-[#D3C6AF] capitalize">
                        {social.platform}:
                      </span>
                      <input
                        type="text"
                        placeholder="URL"
                        value={social.url}
                        onChange={(e) => {
                          const updated = [...formData.socialLinks];
                          updated[idx].url = e.target.value;
                          setFormData({ ...formData, socialLinks: updated });
                        }}
                        className="flex-1 px-2.5 py-1.5 text-xs rounded-lg bg-[#F7F2E9] dark:bg-[#4A3C31] border border-[#E4DBCB] dark:border-[#5C4B3A] text-[#3A2F26] dark:text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <p className="text-xs text-[#9C8A6E]">
                You can inspect or quick-edit project titles and categories:
              </p>
              {formData.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/60 border border-[#E4DBCB] dark:border-[#5C4B3A] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => {
                        const updated = [...formData.projects];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, projects: updated });
                      }}
                      className="font-bold text-sm bg-transparent border-b border-dashed border-[#D3C6AF] dark:border-[#7A6B58] text-[#3A2F26] dark:text-white focus:outline-none"
                    />
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F6E9C4] dark:bg-[#3D2F12] text-[#B9861F] dark:text-[#D9A62E]">
                      {proj.category}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={proj.subtitle}
                    onChange={(e) => {
                      const updated = [...formData.projects];
                      updated[idx].subtitle = e.target.value;
                      setFormData({ ...formData, projects: updated });
                    }}
                    className="w-full text-xs text-[#7A6B58] dark:text-[#D3C6AF] bg-transparent border-b border-dashed border-[#E4DBCB] dark:border-[#5C4B3A] focus:outline-none"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              <p className="text-xs text-[#9C8A6E]">
                Adjust proficiency percentage and experience for any technology:
              </p>
              {formData.skillCategories.map((cat, catIdx) => (
                <div key={catIdx} className="space-y-3">
                  <div className="text-xs font-bold text-[#4A3C31] dark:text-[#E4DBCB] uppercase tracking-wider border-b border-[#E4DBCB] dark:border-[#4A3C31] pb-1">
                    {cat.title}
                  </div>
                  <div className="space-y-3">
                    {cat.skills.map((skill, skillIdx) => (
                      <div
                        key={skillIdx}
                        className="p-3 rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/60 border border-[#E4DBCB] dark:border-[#5C4B3A]/80 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <TechLogo name={skill.name} size={20} />
                            <span className="font-semibold text-xs text-[#3A2F26] dark:text-white">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#B9861F] dark:text-[#D9A62E]">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Interactive Slider */}
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min={50}
                            max={100}
                            value={skill.level}
                            onChange={(e) => {
                              const newCategories = [...formData.skillCategories];
                              newCategories[catIdx].skills[skillIdx].level = parseInt(e.target.value, 10);
                              setFormData({ ...formData, skillCategories: newCategories });
                            }}
                            className="flex-1 accent-indigo-600 h-1.5 bg-[#E4DBCB] dark:bg-[#5C4B3A] rounded-lg cursor-pointer"
                          />
                          <input
                            type="text"
                            value={skill.experience}
                            onChange={(e) => {
                              const newCategories = [...formData.skillCategories];
                              newCategories[catIdx].skills[skillIdx].experience = e.target.value;
                              setFormData({ ...formData, skillCategories: newCategories });
                            }}
                            className="w-16 px-1.5 py-0.5 text-[11px] font-mono text-center rounded bg-white dark:bg-[#3A2F26] border border-[#E4DBCB] dark:border-[#5C4B3A]"
                            title="Years of experience"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-[#E4DBCB] dark:border-[#4A3C31] bg-[#F7F2E9] dark:bg-[#4A3C31]/80 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onReset();
              setFormData(defaultPortfolioData);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-[#7A6B58] dark:text-[#B9A98C] hover:text-[#3A2F26] dark:hover:text-white hover:bg-[#E4DBCB]/60 dark:hover:bg-[#5C4B3A]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-[#7A6B58] dark:text-[#B9A98C] hover:text-[#3A2F26] dark:hover:text-white"
            >
              Cancel
            </button>

            <button
              id="customizer-save-btn"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-xl bg-[#B9861F] hover:bg-[#A2731A] text-white transition-colors shadow-xs"
            >
              {savedToast ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Apply Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
