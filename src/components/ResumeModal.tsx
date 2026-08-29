import React, { useEffect } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  MapPin, 
  Mail, 
  Globe, 
  Github, 
  Linkedin, 
  CheckCircle2,
  Calendar,
  Building2,
  GraduationCap
} from 'lucide-react';
import { ProfileData } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-preview-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#2A211C]/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#3A2F26] rounded-2xl border border-[#E4DBCB] dark:border-[#4A3C31] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Controls Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#EFE6D5] dark:bg-[#4A3C31]/80 border-b border-[#E4DBCB] dark:border-[#4A3C31]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-[#4A3C31] dark:text-[#E4DBCB]">
              Resume Preview
            </span>
            <span className="text-xs text-[#9C8A6E] font-mono">
              ({profile.name} — Updated 2026)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="resume-print-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#B9861F] hover:bg-[#A2731A] text-white transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              id="resume-close-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#9C8A6E] hover:text-[#4A3C31] dark:hover:text-[#E4DBCB] hover:bg-[#E4DBCB]/60 dark:hover:bg-[#5C4B3A] transition-colors"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="p-8 sm:p-12 max-h-[calc(85vh-80px)] overflow-y-auto space-y-8 print:p-0 print:max-h-none text-[#4A3C31] dark:text-[#E4DBCB]">
          
          {/* Resume Header */}
          <div className="border-b border-[#E4DBCB] dark:border-[#4A3C31] pb-6">
            <h1 className="text-3xl font-extrabold text-[#3A2F26] dark:text-white tracking-tight">
              {profile.name}
            </h1>
            <p className="text-lg font-semibold text-[#B9861F] dark:text-[#D9A62E] mt-1">
              {profile.title}
            </p>

            <div className="mt-3 flex flex-wrap gap-y-2 gap-x-6 text-xs text-[#7A6B58] dark:text-[#B9A98C]">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#B9A98C]" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B9A98C]" />
                <span>{profile.location}</span>
              </div>
              {profile.socialLinks.map((s) => (
                <div key={s.platform} className="flex items-center gap-1.5">
                  {s.platform === 'github' && <Github className="w-3.5 h-3.5 text-[#B9A98C]" />}
                  {s.platform === 'linkedin' && <Linkedin className="w-3.5 h-3.5 text-[#B9A98C]" />}
                  <span>{s.username}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#B9A98C] dark:text-[#9C8A6E] mb-2">
              Executive Summary
            </h2>
            <p className="text-sm text-[#5C4B3A] dark:text-[#D3C6AF] leading-relaxed">
              {profile.bioParagraphs.join(' ')}
            </p>
          </div>

          {/* Core Technical Competencies */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#B9A98C] dark:text-[#9C8A6E] mb-3">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {profile.skillCategories.map((cat, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#F7F2E9] dark:bg-[#4A3C31]/60 border border-[#EFE6D5] dark:border-[#4A3C31]">
                  <span className="font-bold text-[#3A2F26] dark:text-white block mb-1">
                    {cat.title}
                  </span>
                  <span className="text-[#7A6B58] dark:text-[#D3C6AF]">
                    {cat.skills.map((s) => s.name).join(' • ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#B9A98C] dark:text-[#9C8A6E] mb-4">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {profile.experiences.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="text-sm font-bold text-[#3A2F26] dark:text-white">
                      {exp.role} — <span className="text-[#B9861F] dark:text-[#D9A62E]">{exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-[#9C8A6E] dark:text-[#B9A98C]">
                      {exp.period} | {exp.location}
                    </span>
                  </div>

                  <ul className="mt-2 space-y-1.5 text-xs text-[#7A6B58] dark:text-[#D3C6AF]">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#CC9A24] font-bold">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#B9A98C] dark:text-[#9C8A6E] mb-3">
              Education & Certifications
            </h2>
            <div className="space-y-3">
              {profile.education.map((edu) => (
                <div key={edu.id} className="flex flex-wrap items-baseline justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#3A2F26] dark:text-white">
                      {edu.degree}
                    </span>
                    <span className="text-[#7A6B58] dark:text-[#B9A98C]"> — {edu.institution}</span>
                    {edu.honors && (
                      <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                        {edu.honors}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[#9C8A6E]">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
