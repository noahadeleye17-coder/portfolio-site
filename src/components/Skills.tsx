import React, { useState } from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Cloud, 
  Cpu, 
  CheckCircle, 
  Search, 
  Sparkles,
  Zap,
  Terminal
} from 'lucide-react';
import { SkillCategory } from '../types';

interface SkillsProps {
  categories: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ categories }) => {
  const [skillSearch, setSkillSearch] = useState('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-5 h-5 text-[#CC9A24]" />;
      case 'Server':
        return <Server className="w-5 h-5 text-emerald-500" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-sky-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-500" />;
      default:
        return <Code2 className="w-5 h-5 text-[#CC9A24]" />;
    }
  };

  const filteredCategories = categories.map((cat) => {
    const q = skillSearch.toLowerCase().trim();
    if (!q) return cat;

    const filteredSkills = cat.skills.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        cat.title.toLowerCase().includes(q) ||
        s.experience.toLowerCase().includes(q)
    );

    return {
      ...cat,
      skills: filteredSkills,
    };
  }).filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="py-20 sm:py-28 bg-[#EFE6D5]/60 dark:bg-[#3A2F26]/40 border-y border-[#E4DBCB]/60 dark:border-[#4A3C31]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F6E9C4] dark:bg-[#3D2F12]/50 border border-[#E8C765] dark:border-[#8A6015]/50 text-[#B9861F] dark:text-[#D9A62E] text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2F26] dark:text-white tracking-tight">
            Skills & Core Competencies
          </h2>
          <p className="mt-3 text-base text-[#7A6B58] dark:text-[#B9A98C] leading-relaxed">
            A comprehensive inventory of frameworks, cloud technologies, database systems, and methodologies I work with daily.
          </p>

          {/* Quick Skill Search */}
          <div className="mt-8 max-w-sm mx-auto relative">
            <Search className="w-4 h-4 text-[#B9A98C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="skills-search-input"
              type="text"
              placeholder="Search skill (e.g. React, Docker, Go)..."
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-[#4A3C31] border border-[#E4DBCB] dark:border-[#5C4B3A] text-[#3A2F26] dark:text-white placeholder:text-[#B9A98C] focus:outline-none focus:ring-2 focus:ring-[#CC9A24] shadow-2xs"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredCategories.map((category, catIdx) => (
            <div
              key={catIdx}
              id={`skill-category-${category.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className="rounded-2xl bg-white dark:bg-[#3A2F26] p-6 sm:p-7 border border-[#E4DBCB] dark:border-[#4A3C31] shadow-xs hover:border-[#D3C6AF] dark:hover:border-[#5C4B3A] transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-start gap-3.5 pb-5 border-b border-[#EFE6D5] dark:border-[#4A3C31]">
                  <div className="p-2.5 rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/80 border border-[#EFE6D5] dark:border-[#5C4B3A] shrink-0">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#3A2F26] dark:text-white">
                      {category.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9C8A6E] dark:text-[#B9A98C] mt-0.5">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skill Items List */}
                <div className="mt-5 space-y-4">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#4A3C31] dark:text-[#E4DBCB]">
                            {skill.name}
                          </span>
                          {skill.highlighted && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-medium bg-[#F6E9C4] text-[#A2731A] dark:bg-[#3D2F12]/60 dark:text-[#DFB94A] border border-[#E8C765] dark:border-[#8A6015]">
                              Core
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-[#9C8A6E] dark:text-[#B9A98C]">
                          <span>{skill.experience}</span>
                          <span className="font-semibold text-[#5C4B3A] dark:text-[#D3C6AF]">{skill.level}%</span>
                        </div>
                      </div>

                      {/* Level Progress Bar */}
                      <div className="w-full h-2 rounded-full bg-[#EFE6D5] dark:bg-[#4A3C31] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#B9861F] dark:bg-[#CC9A24] transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Chips for Category */}
              <div className="mt-6 pt-4 border-t border-[#EFE6D5] dark:border-[#4A3C31] flex items-center gap-1.5 text-xs text-[#9C8A6E] dark:text-[#B9A98C]">
                <Terminal className="w-3.5 h-3.5 text-[#B9A98C]" />
                <span className="font-mono text-[11px]">
                  {category.skills.length} verified proficiencies
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner on Craft & Standards */}
        <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-[#3A2F26] border border-[#E4DBCB] dark:border-[#4A3C31] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#3A2F26] dark:text-white">
                Continuous Learning & Best Practices
              </h4>
              <p className="text-xs text-[#9C8A6E] dark:text-[#B9A98C]">
                Active in open source, regular RFC authoring, code reviews, and staying on top of modern ECMAScript & cloud standards.
              </p>
            </div>
          </div>
          <a
            href="#projects"
            className="shrink-0 px-4 py-2 text-xs font-semibold rounded-xl bg-[#EFE6D5] hover:bg-[#E4DBCB] dark:bg-[#4A3C31] dark:hover:bg-[#5C4B3A] text-[#4A3C31] dark:text-[#E4DBCB] transition-colors"
          >
            See Skills in Action →
          </a>
        </div>

      </div>
    </section>
  );
};
