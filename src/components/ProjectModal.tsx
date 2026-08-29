import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  BarChart3,
  Code2
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      id="project-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#2A211C]/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-[#3A2F26] rounded-2xl border border-[#E4DBCB] dark:border-[#4A3C31] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-project-modal-btn"
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#3A2F26]/60 hover:bg-[#3A2F26] text-white backdrop-blur-xs transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Image Banner */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-[#2A211C]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A211C]/90 via-[#2A211C]/40 to-transparent flex items-end p-6 sm:p-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#B9861F] text-white mb-2 shadow-xs">
                {project.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-[#D3C6AF] font-medium mt-1">
                {project.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-280px)] overflow-y-auto">
          
          {/* Key Metrics Strip if available */}
          {project.metrics && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F6E9C4] dark:bg-[#3D2F12]/40 border border-[#E8C765] dark:border-[#8A6015]/60 text-[#6E4C11] dark:text-[#E8C765] text-sm">
              <BarChart3 className="w-5 h-5 text-[#B9861F] dark:text-[#D9A62E] shrink-0" />
              <div>
                <span className="font-semibold text-xs uppercase tracking-wider block text-[#A2731A] dark:text-[#DFB94A]">
                  Key Impact / Benchmark
                </span>
                <span className="font-medium text-[#4A3C31] dark:text-[#E4DBCB]">
                  {project.metrics}
                </span>
              </div>
            </div>
          )}

          {/* Detailed Narrative */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#B9A98C] dark:text-[#9C8A6E] mb-2">
              Overview
            </h4>
            <p className="text-[#5C4B3A] dark:text-[#D3C6AF] text-base leading-relaxed">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Architecture Notes */}
          {project.architectureNotes && (
            <div className="p-4 rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/60 border border-[#E4DBCB] dark:border-[#4A3C31]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9C8A6E] dark:text-[#B9A98C] mb-1.5 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#CC9A24]" />
                <span>Architecture & System Design</span>
              </h4>
              <p className="text-sm text-[#5C4B3A] dark:text-[#D3C6AF] leading-relaxed font-mono">
                {project.architectureNotes}
              </p>
            </div>
          )}

          {/* Key Deliverables & Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#B9A98C] dark:text-[#9C8A6E] mb-3">
                Key Engineering Highlights
              </h4>
              <ul className="space-y-2.5">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#5C4B3A] dark:text-[#D3C6AF]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#B9A98C] dark:text-[#9C8A6E] mb-2.5 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-[#CC9A24]" />
              <span>Technologies & Libraries Used</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-[#EFE6D5] dark:bg-[#4A3C31] text-[#5C4B3A] dark:text-[#D3C6AF] border border-[#E4DBCB] dark:border-[#5C4B3A]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer / Action Links */}
        <div className="p-4 sm:p-6 bg-[#F7F2E9] dark:bg-[#4A3C31]/80 border-t border-[#E4DBCB] dark:border-[#4A3C31] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                id="modal-project-github-link"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-[#3A2F26] text-white dark:bg-[#4A3C31] hover:bg-[#4A3C31] dark:hover:bg-[#5C4B3A] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                id="modal-project-demo-link"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-[#B9861F] hover:bg-[#A2731A] text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <button
            id="modal-close-secondary-btn"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-xl text-[#7A6B58] dark:text-[#B9A98C] hover:text-[#3A2F26] dark:hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
