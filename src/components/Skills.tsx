import React, { useState } from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Cloud, 
  Cpu, 
  Search, 
  Sparkles,
  Zap,
  Terminal,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
  ExternalLink,
  ChevronRight,
  BarChart3,
  Award,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { SkillCategory, SkillItem, Project } from '../types';
import { TechLogo } from './TechLogo';

interface SkillsProps {
  categories: SkillCategory[];
  projects?: Project[];
  onSelectProject?: (project: Project) => void;
}

export const Skills: React.FC<SkillsProps> = ({ categories, projects = [], onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [skillSearch, setSkillSearch] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [minProficiency, setMinProficiency] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'cards' | 'bento'>('cards');

  // Flatten all skills for quick global access
  const allSkillsWithCat = categories.flatMap((cat) =>
    cat.skills.map((skill) => ({
      ...skill,
      categoryTitle: cat.title,
      iconName: cat.iconName,
    }))
  );

  // Default selected skill on first render
  const currentSkill = selectedSkill || allSkillsWithCat[0] || null;

  // Filter skills based on category, search, and proficiency
  const filteredSkills = allSkillsWithCat.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.categoryTitle.toLowerCase().includes(activeCategory.toLowerCase());
    const q = skillSearch.toLowerCase().trim();
    const matchesSearch = !q || skill.name.toLowerCase().includes(q) || skill.categoryTitle.toLowerCase().includes(q) || skill.experience.toLowerCase().includes(q);
    const matchesProficiency = skill.level >= minProficiency;
    return matchesCategory && matchesSearch && matchesProficiency;
  });

  // Calculate proficiency tier
  const getProficiencyTier = (level: number) => {
    if (level >= 92) return { label: 'Mastery', color: 'emerald', text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/50', border: 'border-emerald-200 dark:border-emerald-800' };
    if (level >= 85) return { label: 'Advanced', color: 'indigo', text: 'text-[#B9861F] dark:text-[#D9A62E]', bg: 'bg-[#F6E9C4] dark:bg-[#3D2F12]/50', border: 'border-[#E8C765] dark:border-[#8A6015]' };
    if (level >= 75) return { label: 'Proficient', color: 'sky', text: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-950/50', border: 'border-sky-200 dark:border-sky-800' };
    return { label: 'Working', color: 'amber', text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/50', border: 'border-amber-200 dark:border-amber-800' };
  };

  // Find projects matching current selected skill
  const relatedProjects = currentSkill
    ? projects.filter((p) =>
        p.tags.some(
          (t) =>
            t.toLowerCase().includes(currentSkill.name.toLowerCase()) ||
            currentSkill.name.toLowerCase().includes(t.toLowerCase())
        )
      )
    : [];

  // Helper for Circular SVG progress calculation
  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="skills" className="py-20 sm:py-28 bg-[#EFE6D5]/60 dark:bg-[#3A2F26]/40 border-y border-[#E4DBCB]/60 dark:border-[#4A3C31]/60 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-[#CC9A24]/5 dark:bg-[#CC9A24]/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/5 dark:bg-sky-500/10 blur-[80px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6E9C4] dark:bg-[#3D2F12]/50 border border-[#E8C765] dark:border-[#8A6015]/50 text-[#B9861F] dark:text-[#D9A62E] text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Tech Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3A2F26] dark:text-white tracking-tight">
            Skills & Technical Mastery
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-[#7A6B58] dark:text-[#D3C6AF] leading-relaxed">
            Click on any technology to inspect verified proficiency percentages, production benchmarks, and shipped project architectures.
          </p>
        </div>

        {/* Interactive Control Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#3A2F26] border border-[#E4DBCB] dark:border-[#4A3C31] shadow-xs">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#B9861F] text-white shadow-xs'
                  : 'text-[#7A6B58] dark:text-[#D3C6AF] hover:bg-[#EFE6D5] dark:hover:bg-[#4A3C31]'
              }`}
            >
              All Tech ({allSkillsWithCat.length})
            </button>
            {categories.map((cat, idx) => {
              const isActive = activeCategory.toLowerCase() === cat.title.toLowerCase();
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat.title)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#B9861F] text-white shadow-xs'
                      : 'text-[#7A6B58] dark:text-[#D3C6AF] hover:bg-[#EFE6D5] dark:hover:bg-[#4A3C31]'
                  }`}
                >
                  {cat.title.split('&')[0].trim()}
                </button>
              );
            })}
          </div>

          {/* Search & Minimum Proficiency Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-4 h-4 text-[#B9A98C] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="skill-filter-search"
                type="text"
                placeholder="Search skill (e.g. React, Go, Docker)..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31] border border-[#E4DBCB] dark:border-[#5C4B3A] text-[#3A2F26] dark:text-white placeholder:text-[#B9A98C] focus:outline-none focus:ring-2 focus:ring-[#CC9A24]"
              />
            </div>

            {/* Proficiency Tier Pills */}
            <div className="hidden sm:flex items-center gap-1 shrink-0">
              <button
                onClick={() => setMinProficiency(0)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border transition-colors ${
                  minProficiency === 0
                    ? 'bg-[#E4DBCB] dark:bg-[#5C4B3A] border-[#D3C6AF] dark:border-[#7A6B58] font-bold text-[#3A2F26] dark:text-white'
                    : 'border-[#E4DBCB] dark:border-[#4A3C31] text-[#9C8A6E]'
                }`}
                title="Show all skills"
              >
                All
              </button>
              <button
                onClick={() => setMinProficiency(85)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border transition-colors ${
                  minProficiency === 85
                    ? 'bg-[#F6E9C4] dark:bg-[#3D2F12]/60 border-[#DFB94A] dark:border-[#A2731A] text-[#B9861F] dark:text-[#D9A62E] font-bold'
                    : 'border-[#E4DBCB] dark:border-[#4A3C31] text-[#9C8A6E]'
                }`}
                title="Filter 85%+ Proficiency"
              >
                85%+
              </button>
              <button
                onClick={() => setMinProficiency(90)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border transition-colors ${
                  minProficiency === 90
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'border-[#E4DBCB] dark:border-[#4A3C31] text-[#9C8A6E]'
                }`}
                title="Filter 90%+ Mastery"
              >
                90%+ Mastery
              </button>
            </div>
          </div>

        </div>

        {/* Main Grid: Skills Matrix + Live Inspector Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center Grid: Interactive Skill Cards */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredSkills.map((skill, index) => {
                const tier = getProficiencyTier(skill.level);
                const isSelected = currentSkill?.name === skill.name;
                const strokeOffset = circumference - (skill.level / 100) * circumference;

                return (
                  <div
                    key={index}
                    id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => setSelectedSkill(skill)}
                    className={`group relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white dark:bg-[#3A2F26] border-[#CC9A24] dark:border-[#D9A62E] shadow-md ring-2 ring-[#CC9A24]/20'
                        : 'bg-white dark:bg-[#3A2F26] border-[#E4DBCB]/90 dark:border-[#4A3C31] hover:border-[#D3C6AF] dark:hover:border-[#5C4B3A] hover:shadow-sm'
                    }`}
                  >
                    {/* Top Row: Tech Logo + Title + Circular Percentage Radial Meter */}
                    <div className="flex items-start justify-between gap-3">
                      
                      {/* Logo and Name */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2.5 rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/90 border border-[#EFE6D5] dark:border-[#5C4B3A]/80 shadow-2xs group-hover:scale-105 transition-transform shrink-0 flex items-center justify-center">
                          <TechLogo name={skill.name} size={28} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm sm:text-base text-[#3A2F26] dark:text-white truncate group-hover:text-[#B9861F] dark:group-hover:text-[#D9A62E] transition-colors">
                              {skill.name}
                            </span>
                            {skill.highlighted && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#CC9A24] shrink-0" title="Core Skill" />
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-[#B9A98C] dark:text-[#9C8A6E] block truncate">
                            {skill.experience} production
                          </span>
                        </div>
                      </div>

                      {/* Interactive Circular Radial Percentage Gauge */}
                      <div className="relative flex items-center justify-center shrink-0 w-12 h-12">
                        <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 52 52">
                          {/* Background ring */}
                          <circle
                            cx="26"
                            cy="26"
                            r={radius}
                            className="stroke-[#EFE6D5] dark:stroke-[#4A3C31]"
                            strokeWidth="4"
                            fill="transparent"
                          />
                          {/* Animated Progress ring */}
                          <circle
                            cx="26"
                            cy="26"
                            r={radius}
                            className={`transition-all duration-700 ${
                              skill.level >= 90
                                ? 'stroke-[#B9861F] dark:stroke-[#D9A62E]'
                                : skill.level >= 80
                                ? 'stroke-sky-500 dark:stroke-sky-400'
                                : 'stroke-emerald-500 dark:stroke-emerald-400'
                            }`}
                            strokeWidth="4"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeOffset}
                            strokeLinecap="round"
                            fill="transparent"
                          />
                        </svg>
                        <span className="absolute text-[11px] font-extrabold font-mono text-[#4A3C31] dark:text-[#E4DBCB]">
                          {skill.level}%
                        </span>
                      </div>
                    </div>

                    {/* Bottom Row: Linear Progress Bar & Tier Badge */}
                    <div className="mt-4 pt-3 border-t border-[#EFE6D5] dark:border-[#4A3C31]/80 flex items-center justify-between gap-3">
                      {/* Interactive Progress Meter */}
                      <div className="flex-1 space-y-1">
                        <div className="w-full h-1.5 rounded-full bg-[#EFE6D5] dark:bg-[#4A3C31] overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              skill.level >= 90
                                ? 'bg-gradient-to-r from-[#CC9A24] to-[#B9861F]'
                                : skill.level >= 80
                                ? 'bg-gradient-to-r from-sky-500 to-[#CC9A24]'
                                : 'bg-gradient-to-r from-emerald-500 to-sky-500'
                            }`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold ${tier.bg} ${tier.text} ${tier.border} border`}>
                        {tier.label}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

            {filteredSkills.length === 0 && (
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#3A2F26] border border-[#E4DBCB] dark:border-[#4A3C31]">
                <Search className="w-8 h-8 mx-auto mb-2 text-[#B9A98C] opacity-60" />
                <p className="text-sm font-semibold text-[#5C4B3A] dark:text-[#D3C6AF]">No skills match your current filter</p>
                <button
                  onClick={() => {
                    setSkillSearch('');
                    setMinProficiency(0);
                    setActiveCategory('all');
                  }}
                  className="mt-3 px-3 py-1.5 text-xs rounded-lg bg-[#B9861F] text-white font-medium hover:bg-[#A2731A] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Live Interactive Skill Inspector Spotlight */}
          {currentSkill && (
            <div className="lg:col-span-4 sticky top-24">
              <div className="rounded-3xl bg-white dark:bg-[#3A2F26] p-6 sm:p-7 border border-[#E4DBCB] dark:border-[#4A3C31] shadow-xl space-y-6">
                
                {/* Inspector Header */}
                <div className="flex items-center justify-between pb-5 border-b border-[#EFE6D5] dark:border-[#4A3C31]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#B9861F] dark:text-[#D9A62E] uppercase tracking-wider font-mono">
                    <BarChart3 className="w-4 h-4" />
                    <span>Skill Telemetry</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#B9A98C]">
                    Live Gauge
                  </span>
                </div>

                {/* Main Skill Focus Hero */}
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-[#F7F2E9] dark:bg-[#4A3C31] border border-[#EFE6D5] dark:border-[#5C4B3A] shadow-sm shrink-0">
                    <TechLogo name={currentSkill.name} size={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#3A2F26] dark:text-white leading-tight">
                      {currentSkill.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[#9C8A6E] dark:text-[#B9A98C] font-mono">
                        {currentSkill.experience} in production
                      </span>
                    </div>
                  </div>
                </div>

                {/* Big Interactive Radial Gauge Spotlight */}
                <div className="p-5 rounded-2xl bg-[#F7F2E9] dark:bg-[#4A3C31]/50 border border-[#EFE6D5] dark:border-[#4A3C31] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-semibold text-[#B9A98C] uppercase tracking-wider block">
                      Proficiency Level
                    </span>
                    <div className="text-3xl font-black text-[#3A2F26] dark:text-white tracking-tight mt-0.5">
                      {currentSkill.level}%
                    </div>
                    <div className="mt-1.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-mono font-bold ${getProficiencyTier(currentSkill.level).bg} ${getProficiencyTier(currentSkill.level).text}`}>
                        <Sparkles className="w-3 h-3" />
                        {getProficiencyTier(currentSkill.level).label} Tier
                      </span>
                    </div>
                  </div>

                  {/* Circular Dial */}
                  <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                    <svg className="w-20 h-20 -rotate-90 transform" viewBox="0 0 60 60">
                      <circle
                        cx="30"
                        cy="30"
                        r="25"
                        className="stroke-[#E4DBCB] dark:stroke-[#5C4B3A]"
                        strokeWidth="5"
                        fill="transparent"
                      />
                      <circle
                        cx="30"
                        cy="30"
                        r="25"
                        className="stroke-[#B9861F] dark:stroke-[#D9A62E] transition-all duration-700"
                        strokeWidth="5"
                        strokeDasharray={2 * Math.PI * 25}
                        strokeDashoffset={2 * Math.PI * 25 - (currentSkill.level / 100) * 2 * Math.PI * 25}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-xs font-extrabold font-mono text-[#3A2F26] dark:text-white">
                        {currentSkill.level}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub-competencies breakdown */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-[#3A2F26] dark:text-white uppercase tracking-wider">
                    Competency Breakdown
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div>
                      <div className="flex justify-between text-[#7A6B58] dark:text-[#D3C6AF] mb-1">
                        <span>Production Architecture</span>
                        <span className="font-bold text-[#B9861F] dark:text-[#D9A62E]">{Math.min(100, currentSkill.level + 2)}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#EFE6D5] dark:bg-[#4A3C31] overflow-hidden">
                        <div className="h-full bg-[#CC9A24] rounded-full" style={{ width: `${Math.min(100, currentSkill.level + 2)}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#7A6B58] dark:text-[#D3C6AF] mb-1">
                        <span>Performance & Optimization</span>
                        <span className="font-bold text-sky-600 dark:text-sky-400">{currentSkill.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#EFE6D5] dark:bg-[#4A3C31] overflow-hidden">
                        <div className="h-full bg-sky-500 rounded-full" style={{ width: `${currentSkill.level}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#7A6B58] dark:text-[#D3C6AF] mb-1">
                        <span>API & Ecosystem Integration</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{Math.max(70, currentSkill.level - 4)}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#EFE6D5] dark:bg-[#4A3C31] overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.max(70, currentSkill.level - 4)}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connected Portfolio Projects Built With This Skill */}
                <div className="pt-2 border-t border-[#EFE6D5] dark:border-[#4A3C31]">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold text-[#3A2F26] dark:text-white uppercase tracking-wider">
                      Shipped Projects ({relatedProjects.length})
                    </span>
                    <a
                      href="#projects"
                      className="text-[11px] text-[#B9861F] dark:text-[#D9A62E] font-semibold hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>All</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>

                  {relatedProjects.length > 0 ? (
                    <div className="space-y-2">
                      {relatedProjects.slice(0, 2).map((proj) => (
                        <div
                          key={proj.id}
                          onClick={() => {
                            if (onSelectProject) {
                              onSelectProject(proj);
                            } else {
                              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="p-2.5 rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/60 border border-[#EFE6D5] dark:border-[#4A3C31] hover:border-[#D9A62E] cursor-pointer transition-colors"
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-[#3A2F26] dark:text-white">
                            <span className="truncate hover:text-[#CC9A24]">{proj.title}</span>
                            <span className="text-[10px] font-mono text-[#B9A98C] shrink-0">{proj.category}</span>
                          </div>
                          <p className="text-[11px] text-[#9C8A6E] dark:text-[#B9A98C] line-clamp-1 mt-0.5">
                            {proj.subtitle}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/40 text-[11px] text-[#9C8A6E] dark:text-[#B9A98C] flex items-center gap-2 font-mono">
                      <Info className="w-4 h-4 text-[#B9A98C] shrink-0" />
                      <span>Utilized across internal tooling, CI pipelines, and microservices.</span>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Bottom Banner on Craft & Standards */}
        <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-[#3A2F26] border border-[#E4DBCB] dark:border-[#4A3C31] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#3A2F26] dark:text-white">
                Continuous Technical Mastery & Architecture Standards
              </h4>
              <p className="text-xs text-[#9C8A6E] dark:text-[#B9A98C]">
                100% committed to type-safety, test-driven methodologies, microservice modularity, and high-performance user interfaces.
              </p>
            </div>
          </div>
          <a
            href="#projects"
            className="shrink-0 px-4 py-2.5 text-xs font-bold rounded-xl bg-[#B9861F] hover:bg-[#A2731A] text-white transition-colors shadow-xs"
          >
            Inspect Architectural Code →
          </a>
        </div>

      </div>
    </section>
  );
};
