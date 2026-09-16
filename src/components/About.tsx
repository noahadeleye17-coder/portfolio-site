import React from 'react';
import { 
  User, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Users, 
  BookOpen, 
  Compass, 
  FileText,
  CheckCircle2
} from 'lucide-react';
import { ProfileData } from '../types';

interface AboutProps {
  profile: ProfileData;
  onOpenResume: () => void;
}

export const About: React.FC<AboutProps> = ({ profile, onOpenResume }) => {
  const coreValues = [
    {
      title: 'Solve real problems first',
      description: 'Off-Campus Hub exists because finding housing near FUTA was genuinely painful \u2014 I build things people around me actually need.',
      icon: <Cpu className="w-5 h-5 text-[#CC9A24]" />
    },
    {
      title: 'Ship the whole thing',
      description: 'From database schema to production deployment, I handle the entire stack solo rather than stopping at a prototype.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />
    },
    {
      title: 'Keep it clean and fast',
      description: 'Straightforward, well-organized code and responsive interfaces that work well on the low-end devices most of my users actually have.',
      icon: <Zap className="w-5 h-5 text-amber-500" />
    },
    {
      title: 'Learn by building',
      description: 'Picking up Supabase, PWA packaging, and AI integrations as I need them for real projects, not in isolation.',
      icon: <Users className="w-5 h-5 text-purple-500" />
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#EFE6D5]/60 dark:bg-[#3A2F26]/40 border-y border-[#E4DBCB]/60 dark:border-[#4A3C31]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F6E9C4] dark:bg-[#3D2F12]/50 border border-[#E8C765] dark:border-[#8A6015]/50 text-[#B9861F] dark:text-[#D9A62E] text-xs font-semibold uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5" />
            <span>About</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2F26] dark:text-white tracking-tight">
            A builder, briefly.
          </h2>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl bg-white dark:bg-[#3A2F26] p-6 sm:p-8 border border-[#E4DBCB] dark:border-[#4A3C31] shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#3A2F26] dark:text-white pb-3 border-b border-[#EFE6D5] dark:border-[#4A3C31]">
                <Terminal className="w-4 h-4 text-[#B9861F] dark:text-[#D9A62E]" />
                <span>Current Focus</span>
              </div>

              {profile.bioParagraphs.slice(0, 1).map((paragraph, index) => (
                <p key={index} className="text-[#7A6B58] dark:text-[#D3C6AF] text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="pt-4 border-t border-[#EFE6D5] dark:border-[#4A3C31] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-medium text-[#9C8A6E] dark:text-[#B9A98C]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Open to useful work</span>
                </div>
                <button
                  id="about-resume-cta-btn"
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#B9861F] dark:text-[#D9A62E] hover:text-[#A2731A] dark:hover:text-[#DFB94A] transition-colors group"
                >
                  <FileText className="w-4 h-4" />
                  <span>Full CV</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>
            </div>

            {/* Quick Facts Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white dark:bg-[#3A2F26] border border-[#E4DBCB] dark:border-[#4A3C31]">
                <span className="text-xs text-[#B9A98C] dark:text-[#9C8A6E] uppercase tracking-wider font-semibold block">Based in</span>
                <span className="text-sm font-bold text-[#4A3C31] dark:text-[#E4DBCB] mt-1 block">Akure, Nigeria</span>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#3A2F26] border border-[#E4DBCB] dark:border-[#4A3C31]">
                <span className="text-xs text-[#B9A98C] dark:text-[#9C8A6E] uppercase tracking-wider font-semibold block">Education</span>
                <span className="text-sm font-bold text-[#4A3C31] dark:text-[#E4DBCB] mt-1 block">Computer Info. Systems, FUTA</span>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#3A2F26] border border-[#E4DBCB] dark:border-[#4A3C31] col-span-2 sm:col-span-1">
                <span className="text-xs text-[#B9A98C] dark:text-[#9C8A6E] uppercase tracking-wider font-semibold block">Focus Areas</span>
                <span className="text-sm font-bold text-[#4A3C31] dark:text-[#E4DBCB] mt-1 block">Full-stack products for real users</span>
              </div>
            </div>
          </div>

          {/* Values & Principles Column */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-[#3A2F26] dark:text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#CC9A24]" />
              <span>What matters</span>
            </h3>

            <div className="space-y-3">
              {coreValues.map((val, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-white dark:bg-[#3A2F26] p-5 border border-[#E4DBCB] dark:border-[#4A3C31] shadow-xs hover:border-[#DFB94A] dark:hover:border-[#A2731A]/60 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-[#EFE6D5] dark:bg-[#4A3C31] shrink-0 mt-0.5">
                      {val.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#3A2F26] dark:text-white mb-1">
                        {val.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
