import React from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  Building2,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { ExperienceItem, EducationItem } from '../types';

interface ExperienceProps {
  experiences: ExperienceItem[];
  education: EducationItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences, education }) => {
  return (
    <section id="experience" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F6E9C4] dark:bg-[#3D2F12]/50 border border-[#E8C765] dark:border-[#8A6015]/50 text-[#B9861F] dark:text-[#D9A62E] text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2F26] dark:text-white tracking-tight">
            Experience & Education
          </h2>
          <p className="mt-3 text-base text-[#7A6B58] dark:text-[#B9A98C] leading-relaxed">
            My professional background leading engineering initiatives, delivering enterprise products, and academic credentials.
          </p>
        </div>

        {/* 2-Column Grid: Work Experience (Left) & Education/Certifications (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Work Experience Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2 rounded-lg bg-[#F6E9C4] dark:bg-[#3D2F12]/50 text-[#B9861F] dark:text-[#D9A62E]">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#3A2F26] dark:text-white">
                Work Experience
              </h3>
            </div>

            <div className="relative border-l-2 border-[#E4DBCB] dark:border-[#4A3C31] ml-3 sm:ml-4 space-y-8 pl-6 sm:pl-8">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-[#2A211C] border-2 border-[#B9861F] dark:border-[#D9A62E] group-hover:scale-125 transition-transform" />

                  {/* Card Content */}
                  <div className="rounded-2xl bg-white dark:bg-[#3A2F26] p-5 sm:p-6 border border-[#E4DBCB] dark:border-[#4A3C31] shadow-xs hover:border-[#D3C6AF] dark:hover:border-[#5C4B3A] transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-[#3A2F26] dark:text-white">
                          {exp.role}
                        </h4>
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#B9861F] dark:text-[#D9A62E]">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end text-xs text-[#9C8A6E] dark:text-[#B9A98C] font-mono">
                        <div className="flex items-center gap-1.5 bg-[#EFE6D5] dark:bg-[#4A3C31] px-2.5 py-1 rounded-md">
                          <Calendar className="w-3 h-3" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] mt-1 text-[#B9A98C]">
                          <MapPin className="w-3 h-3" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <ul className="mt-4 space-y-2 text-xs sm:text-sm text-[#7A6B58] dark:text-[#D3C6AF]">
                      {exp.description.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#CC9A24] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Badges */}
                    <div className="mt-5 pt-4 border-t border-[#EFE6D5] dark:border-[#4A3C31] flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 text-xs font-mono rounded-md bg-[#EFE6D5] dark:bg-[#4A3C31] text-[#7A6B58] dark:text-[#B9A98C]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2 rounded-lg bg-[#F6E9C4] dark:bg-[#3D2F12]/50 text-[#B9861F] dark:text-[#D9A62E]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#3A2F26] dark:text-white">
                Education & Credentials
              </h3>
            </div>

            <div className="space-y-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="rounded-2xl bg-white dark:bg-[#3A2F26] p-5 sm:p-6 border border-[#E4DBCB] dark:border-[#4A3C31] shadow-xs hover:border-[#D3C6AF] dark:hover:border-[#5C4B3A] transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-base font-bold text-[#3A2F26] dark:text-white">
                        {edu.degree}
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-[#B9861F] dark:text-[#D9A62E]">
                        {edu.institution}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#9C8A6E] dark:text-[#B9A98C] bg-[#EFE6D5] dark:bg-[#4A3C31] px-2 py-1 rounded-md shrink-0">
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#7A6B58] dark:text-[#D3C6AF] mt-2 leading-relaxed">
                    {edu.details}
                  </p>

                  {edu.honors && (
                    <div className="mt-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      <span>{edu.honors}</span>
                    </div>
                  )}
                </div>
              ))}

              {/* Verified Professional Competency Card */}
              <div className="rounded-2xl bg-gradient-to-br from-[#F6E9C4] to-[#F0DDA0]/50 dark:from-[#3D2F12]/30 dark:to-[#3A2F26] p-5 sm:p-6 border border-[#E8C765]/80 dark:border-[#8A6015]/50">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#B9861F] text-white shrink-0">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#3A2F26] dark:text-white">
                      Verified Code Quality & Standards
                    </h4>
                    <p className="text-xs text-[#7A6B58] dark:text-[#D3C6AF] mt-1 leading-relaxed">
                      All projects follow strict semantic versioning, automated continuous integration tests, and production security benchmarks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
