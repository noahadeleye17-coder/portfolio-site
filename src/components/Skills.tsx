import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Project, SkillItem, SkillCategory } from '../types';
import { TechLogo } from './TechLogo';

interface SkillsProps {
  categories: SkillCategory[];
  projects?: Project[];
  onSelectProject?: (project: Project) => void;
}

type StackItem = SkillItem & { category: string };

export const Skills: React.FC<SkillsProps> = ({ categories, projects = [], onSelectProject }) => {
  const stacks = useMemo<StackItem[]>(
    () => categories.flatMap((category) => category.skills.map((skill) => ({ ...skill, category: category.title }))),
    [categories]
  );
  const [activeSkill, setActiveSkill] = useState<StackItem | null>(null);

  const relatedProject = activeSkill
    ? projects.find((project) => project.tags.some((tag) => tag.toLowerCase().includes(activeSkill.name.toLowerCase()) || activeSkill.name.toLowerCase().includes(tag.toLowerCase())))
    : null;

  return (
    <section id="skills" className="relative overflow-hidden border-y border-[#E4DBCB]/60 bg-[#EFE6D5]/60 py-16 dark:border-[#4A3C31]/60 dark:bg-[#3A2F26]/40 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(204,154,36,0.13),transparent_24rem),radial-gradient(circle_at_85%_90%,rgba(56,189,248,0.10),transparent_22rem)]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 flex flex-col items-start justify-between gap-3 sm:mb-11 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B9861F] dark:text-[#D9A62E]">
              <Sparkles className="h-3.5 w-3.5" />
              Tools I build with
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#3A2F26] dark:text-white sm:text-4xl">The stack, at a glance.</h2>
          </div>
          <p className="font-mono text-xs text-[#9C8A6E] dark:text-[#B9A98C]">tap a tile for context</p>
        </div>

        <div className="stack-constellation rounded-[2rem] border border-[#E4DBCB] bg-white/75 p-4 shadow-sm backdrop-blur-sm dark:border-[#4A3C31] dark:bg-[#3A2F26]/75 sm:p-6">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-6 lg:grid-cols-8">
            {stacks.map((skill, index) => {
              const selected = activeSkill?.name === skill.name;
              return (
                <button
                  key={`${skill.category}-${skill.name}`}
                  type="button"
                  onClick={() => setActiveSkill(selected ? null : skill)}
                  aria-pressed={selected}
                  className={`stack-tile group relative flex min-h-24 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border px-2 py-3 text-center transition-all duration-300 sm:min-h-28 ${
                    selected
                      ? 'border-[#CC9A24] bg-[#F6E9C4] shadow-md ring-2 ring-[#CC9A24]/15 dark:bg-[#3D2F12]/80'
                      : 'border-[#EFE6D5] bg-[#F7F2E9]/70 hover:-translate-y-1 hover:border-[#D3C6AF] hover:bg-white hover:shadow-md dark:border-[#4A3C31] dark:bg-[#4A3C31]/45 dark:hover:border-[#7A6B58] dark:hover:bg-[#4A3C31]'
                  }`}
                  style={{ animationDelay: `${Math.min(index * 35, 700)}ms` }}
                >
                  <span className="absolute -right-6 -top-6 h-14 w-14 rounded-full bg-[#CC9A24]/0 transition-colors duration-300 group-hover:bg-[#CC9A24]/10" />
                  <span className="relative flex h-11 w-11 items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 sm:h-12 sm:w-12">
                    <TechLogo name={skill.name} size={42} className="h-10 w-10 sm:h-11 sm:w-11" />
                  </span>
                  <span className="relative text-xs font-bold leading-tight text-[#5C4B3A] dark:text-[#E4DBCB]">{skill.name}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 min-h-11 border-t border-[#EFE6D5] pt-4 dark:border-[#4A3C31]">
            {activeSkill ? (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F7F2E9] px-3 py-2.5 text-sm dark:bg-[#2A211C]/55">
                <p className="text-[#5C4B3A] dark:text-[#E4DBCB]">
                  <span className="font-bold">{activeSkill.name}</span>
                  <span className="mx-2 text-[#B9A98C]">/</span>
                  <span className="text-[#7A6B58] dark:text-[#B9A98C]">{activeSkill.category}</span>
                </p>
                {relatedProject && (
                  <button type="button" onClick={() => onSelectProject?.(relatedProject)} className="inline-flex items-center gap-1 font-semibold text-[#B9861F] transition-colors hover:text-[#8A6015] dark:text-[#D9A62E]">
                    {relatedProject.title}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            ) : (
              <p className="px-1 text-sm text-[#9C8A6E] dark:text-[#B9A98C]">A compact view of the tools behind the work.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
