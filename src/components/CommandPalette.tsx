import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Command, 
  FileText, 
  Moon, 
  Sun, 
  Sliders, 
  Copy, 
  ExternalLink, 
  Layers, 
  Terminal, 
  FolderGit2, 
  Sparkles, 
  Check, 
  X,
  ArrowRight,
  User,
  Zap,
  Briefcase,
  Mail
} from 'lucide-react';
import { ProfileData, Project } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
  onOpenCustomizer: () => void;
  onOpenTerminal: () => void;
  onSelectProject: (project: Project) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  profile,
  isDark,
  onToggleTheme,
  onOpenResume,
  onOpenCustomizer,
  onOpenTerminal,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Define commands list
  const navigationItems = [
    {
      id: 'nav-about',
      title: 'About & Principles',
      description: 'Navigate to biography, core values, and engineering background',
      icon: <User className="w-4 h-4 text-[#CC9A24]" />,
      category: 'Navigation',
      action: () => {
        onClose();
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'nav-projects',
      title: 'Projects Showcase',
      description: 'Explore full-stack applications, AI architectures, and cloud services',
      icon: <FolderGit2 className="w-4 h-4 text-[#CC9A24]" />,
      category: 'Navigation',
      action: () => {
        onClose();
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'nav-skills',
      title: 'Skills & Tech Stack',
      description: 'View categorized technical capabilities, frameworks, and proficiencies',
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      category: 'Navigation',
      action: () => {
        onClose();
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'nav-experience',
      title: 'Career & Education',
      description: 'Review full work experience timeline and university credentials',
      icon: <Briefcase className="w-4 h-4 text-emerald-500" />,
      category: 'Navigation',
      action: () => {
        onClose();
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'nav-contact',
      title: 'Contact & Inquiry',
      description: 'Send a project inquiry or connect via social platforms',
      icon: <Mail className="w-4 h-4 text-[#A8432F]" />,
      category: 'Navigation',
      action: () => {
        onClose();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  const actionItems = [
    {
      id: 'action-resume',
      title: 'View & Download Resume',
      description: 'Open clean, printable resume PDF with complete achievements',
      icon: <FileText className="w-4 h-4 text-[#CC9A24]" />,
      category: 'Actions',
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'action-terminal',
      title: 'Open Interactive CLI Terminal',
      description: 'Launch developer terminal to run commands and query profile data',
      icon: <Terminal className="w-4 h-4 text-emerald-500" />,
      category: 'Actions',
      action: () => {
        onClose();
        onOpenTerminal();
      },
    },
    {
      id: 'action-theme',
      title: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      description: isDark ? 'Activate clean high-contrast light theme' : 'Activate sleek dark mode theme',
      icon: isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#5C4B3A]" />,
      category: 'Actions',
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'action-customize',
      title: 'Customize Portfolio Content',
      description: 'Edit personal information, bio, stats, and projects in real-time',
      icon: <Sliders className="w-4 h-4 text-[#CC9A24]" />,
      category: 'Actions',
      action: () => {
        onClose();
        onOpenCustomizer();
      },
    },
    {
      id: 'action-copy-email',
      title: 'Copy Email Address',
      description: profile.email,
      icon: <Copy className="w-4 h-4 text-sky-500" />,
      category: 'Actions',
      action: () => {
        navigator.clipboard.writeText(profile.email);
        setCopiedNotification('Email address copied to clipboard!');
        setTimeout(() => setCopiedNotification(null), 2000);
      },
    },
  ];

  const projectItems = profile.projects.map((project) => ({
    id: `project-${project.id}`,
    title: project.title,
    description: `${project.category} • ${project.tags.slice(0, 3).join(', ')}`,
    icon: <Layers className="w-4 h-4 text-[#D9A62E]" />,
    category: 'Projects',
    action: () => {
      onClose();
      onSelectProject(project);
    },
  }));

  const allItems = [...navigationItems, ...actionItems, ...projectItems];

  const filteredItems = allItems.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    // Scroll active item into view
    const activeEl = listRef.current?.children[selectedIndex] as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      id="command-palette-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-[#2A211C]/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="command-palette-modal"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        className="w-full max-w-xl bg-white dark:bg-[#3A2F26] rounded-2xl border border-[#E4DBCB] dark:border-[#4A3C31] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transition-all"
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E4DBCB] dark:border-[#4A3C31] gap-3">
          <Search className="w-5 h-5 text-[#B9A98C] shrink-0" />
          <input
            ref={inputRef}
            id="command-palette-input"
            type="text"
            placeholder="Type a command, search project, or jump to section..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full text-sm bg-transparent text-[#3A2F26] dark:text-white placeholder:text-[#B9A98C] focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-[#B9A98C] hover:text-[#7A6B58] dark:hover:text-[#E4DBCB]"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-[#B9A98C] bg-[#EFE6D5] dark:bg-[#4A3C31] border border-[#E4DBCB] dark:border-[#5C4B3A] rounded-md">
              ESC
            </kbd>
          )}
        </div>

        {/* Copied Notification */}
        {copiedNotification && (
          <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 border-b border-emerald-200 dark:border-emerald-800">
            <Check className="w-3.5 h-3.5" />
            <span>{copiedNotification}</span>
          </div>
        )}

        {/* Results List */}
        <div
          ref={listRef}
          id="command-palette-results"
          className="flex-1 overflow-y-auto p-2 space-y-1 max-h-96 scrollbar-none"
        >
          {filteredItems.length === 0 ? (
            <div className="py-10 text-center text-[#9C8A6E] dark:text-[#B9A98C]">
              <Command className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">No matching commands found</p>
              <p className="text-xs text-[#B9A98C] mt-0.5">Try typing "projects", "resume", or "skills"</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  id={`command-item-${item.id}`}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors ${
                    isSelected
                      ? 'bg-[#F6E9C4] dark:bg-[#3D2F12]/50 text-[#3A2F26] dark:text-white'
                      : 'text-[#5C4B3A] dark:text-[#D3C6AF] hover:bg-[#F7F2E9] dark:hover:bg-[#4A3C31]/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#F0DDA0] dark:bg-[#6E4C11]/60' : 'bg-[#EFE6D5] dark:bg-[#4A3C31]'}`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-semibold truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#EFE6D5] dark:bg-[#4A3C31] text-[#B9A98C]">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-[11px] sm:text-xs text-[#9C8A6E] dark:text-[#B9A98C] truncate">
                        {item.description}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 text-[#CC9A24] shrink-0 ml-2 transition-transform ${
                      isSelected ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 border-t border-[#EFE6D5] dark:border-[#4A3C31]/80 bg-[#F7F2E9] dark:bg-[#2A211C]/40 text-[11px] text-[#B9A98C] flex items-center justify-between font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="hidden sm:inline">Press ⌘K anytime</span>
        </div>
      </div>
    </div>
  );
};
