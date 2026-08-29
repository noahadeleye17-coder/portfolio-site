import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, 
  X, 
  Minus, 
  Square, 
  CornerDownLeft, 
  Sparkles,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { ProfileData, Project } from '../types';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onOpenResume: () => void;
  onToggleTheme: () => void;
  onSelectProject: (project: Project) => void;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  profile,
  onOpenResume,
  onToggleTheme,
  onSelectProject,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && history.length === 0) {
      setHistory([
        {
          id: 'welcome',
          command: 'init',
          timestamp: new Date().toLocaleTimeString(),
          output: (
            <div className="space-y-2 text-[#D3C6AF]">
              <p className="text-emerald-400 font-bold">
                🚀 Welcome to Noah's Interactive Terminal CLI (v2.4.0)
              </p>
              <p className="text-xs text-[#B9A98C]">
                Type <span className="text-[#D9A62E] font-mono font-semibold">help</span> to view available commands, or try <span className="text-[#D9A62E] font-mono">skills</span>, <span className="text-[#D9A62E] font-mono">projects</span>, or <span className="text-[#D9A62E] font-mono">sudo hire</span>.
              </p>
            </div>
          ),
        },
      ]);
    }
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const timestamp = new Date().toLocaleTimeString();
    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
      case '?':
        output = (
          <div className="space-y-1.5 text-xs text-[#D3C6AF] font-mono">
            <p className="text-amber-300 font-semibold mb-1">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-[#D9A62E] font-bold">whoami / bio</span> : Executive overview</div>
              <div><span className="text-[#D9A62E] font-bold">skills</span> : Tech stack breakdown</div>
              <div><span className="text-[#D9A62E] font-bold">projects</span> : Shipped architectures</div>
              <div><span className="text-[#D9A62E] font-bold">experience</span> : Career history</div>
              <div><span className="text-[#D9A62E] font-bold">stats</span> : Engineering metrics</div>
              <div><span className="text-[#D9A62E] font-bold">contact</span> : Email & social links</div>
              <div><span className="text-[#D9A62E] font-bold">resume</span> : View & download CV</div>
              <div><span className="text-[#D9A62E] font-bold">theme</span> : Toggle Light / Dark mode</div>
              <div><span className="text-[#D9A62E] font-bold">sudo hire</span> : Start an inquiry</div>
              <div><span className="text-[#D9A62E] font-bold">clear</span> : Clear terminal screen</div>
              <div><span className="text-[#D9A62E] font-bold">exit</span> : Close terminal</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
      case 'bio':
      case 'about':
        output = (
          <div className="space-y-2 text-xs text-[#D3C6AF]">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{profile.name}</span>
              <span className="text-[#D9A62E] text-xs font-mono">({profile.title})</span>
            </div>
            <p className="text-[#D3C6AF] leading-relaxed">{profile.headline}</p>
            <p className="text-[#B9A98C]">📍 {profile.location} • Status: {profile.availability}</p>
          </div>
        );
        break;

      case 'skills':
      case 'stack':
        output = (
          <div className="space-y-3 text-xs">
            {profile.skillCategories.map((cat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-[#D9A62E] font-bold font-mono">▸ {cat.title}:</div>
                <div className="text-[#D3C6AF] pl-4 font-mono">
                  {cat.skills.map((s) => `${s.name} (${s.level}%)`).join(' • ')}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
      case 'work':
        output = (
          <div className="space-y-3 text-xs">
            <div className="text-[#B9A98C] mb-1">Click any project to inspect its architecture:</div>
            {profile.projects.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProject(p);
                  onClose();
                }}
                className="p-2 rounded bg-[#3A2F26]/80 border border-[#4A3C31] hover:border-[#CC9A24] cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white hover:text-[#D9A62E]">{p.title}</span>
                  <span className="text-[10px] font-mono text-emerald-400">{p.category}</span>
                </div>
                <p className="text-[#B9A98C] text-[11px] mt-0.5">{p.subtitle}</p>
                <p className="text-[10px] font-mono text-[#DFB94A] mt-1">Stack: {p.tags.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'stats':
        output = (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2 rounded bg-[#3A2F26] border border-[#4A3C31]">
              <span className="text-[#B9A98C] block text-[10px]">EXPERIENCE</span>
              <span className="text-base font-bold text-white">{profile.stats.yearsExperience}+ Years</span>
            </div>
            <div className="p-2 rounded bg-[#3A2F26] border border-[#4A3C31]">
              <span className="text-[#B9A98C] block text-[10px]">PROJECTS</span>
              <span className="text-base font-bold text-white">{profile.stats.completedProjects}+ Shipped</span>
            </div>
            <div className="p-2 rounded bg-[#3A2F26] border border-[#4A3C31]">
              <span className="text-[#B9A98C] block text-[10px]">COMMITS</span>
              <span className="text-base font-bold text-white">{profile.stats.codeContributions} /yr</span>
            </div>
            <div className="p-2 rounded bg-[#3A2F26] border border-[#4A3C31]">
              <span className="text-[#B9A98C] block text-[10px]">LIVE SITES</span>
              <span className="text-base font-bold text-emerald-400">2 In Prod</span>
            </div>
          </div>
        );
        break;

      case 'experience':
      case 'career':
        output = (
          <div className="space-y-2 text-xs">
            {profile.experiences.map((exp) => (
              <div key={exp.id} className="p-2 rounded bg-[#3A2F26] border border-[#4A3C31]">
                <div className="flex justify-between items-center text-white font-bold">
                  <span>{exp.role} @ {exp.company}</span>
                  <span className="text-[#B9A98C] font-mono text-[10px]">{exp.period}</span>
                </div>
                <p className="text-[#B9A98C] text-[11px] mt-1">{exp.description[0]}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
      case 'email':
        output = (
          <div className="space-y-2 text-xs font-mono text-[#D3C6AF]">
            <p>✉️ Email: <span className="text-[#D9A62E]">{profile.email}</span></p>
            <p>📍 Location: <span className="text-[#D3C6AF]">{profile.location}</span></p>
            <div className="flex flex-wrap gap-3 pt-1">
              {profile.socialLinks.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#D9A62E] hover:underline"
                >
                  [{s.label}]
                </a>
              ))}
            </div>
          </div>
        );
        break;

      case 'resume':
      case 'cv':
        output = <p className="text-xs text-emerald-400 font-mono">Opening complete resume view...</p>;
        setTimeout(() => {
          onClose();
          onOpenResume();
        }, 500);
        break;

      case 'theme':
        onToggleTheme();
        output = <p className="text-xs text-amber-300 font-mono">Theme toggled successfully.</p>;
        break;

      case 'sudo hire':
      case 'hire':
        output = (
          <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 font-mono space-y-2">
            <p className="font-bold">✨ Access Granted: Initiating direct collaboration sequence...</p>
            <p>Direct Email: <span className="text-white underline">{profile.email}</span></p>
            <p className="text-[#B9A98C]">{profile.availability}.</p>
            <button
              onClick={() => {
                onClose();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors"
            >
              Open Contact Form →
            </button>
          </div>
        );
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        output = (
          <p className="text-xs text-[#C1613F] font-mono">
            zsh: command not found: {rawCmd}. Type <span className="text-[#DFB94A] font-bold">help</span> to list commands.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: rawCmd,
        output,
        timestamp,
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="terminal-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A211C]/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="terminal-window"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#2A211C] text-[#EFE6D5] rounded-2xl border border-[#4A3C31] shadow-2xl overflow-hidden flex flex-col h-[520px] font-mono"
      >
        {/* macOS Style Window Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#3A2F26] border-b border-[#4A3C31] select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#A8432F] hover:bg-[#8F3623] transition-colors"
              title="Close"
            />
            <button
              onClick={() => setHistory([])}
              className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors"
              title="Clear"
            />
            <button
              onClick={onToggleTheme}
              className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors"
              title="Toggle Theme"
            />
            <span className="ml-2 text-xs font-semibold text-[#B9A98C]">
              guest@noah-portfolio: ~
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#9C8A6E]">
            <span className="hidden sm:inline">zsh 5.9</span>
            <button
              onClick={onClose}
              className="p-1 rounded text-[#B9A98C] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body Screen */}
        <div
          id="terminal-output-screen"
          className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm font-mono scrollbar-none"
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-[#B9A98C] text-xs">
                <span className="text-emerald-400">guest@portfolio</span>
                <span className="text-[#D9A62E]">~</span>
                <span className="text-[#9C8A6E]">$</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
              <div className="pl-3 border-l border-[#4A3C31]">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Prompt Bar */}
        <div className="p-3 bg-[#3A2F26]/90 border-t border-[#4A3C31] flex items-center gap-2">
          <span className="text-emerald-400 text-xs font-bold shrink-0">noah $</span>
          <input
            ref={inputRef}
            id="terminal-command-input"
            type="text"
            placeholder="Type 'help', 'skills', 'projects', 'sudo hire'..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder:text-[#7A6B58]"
            autoFocus
          />
          <button
            id="terminal-submit-btn"
            onClick={() => handleCommand(inputVal)}
            className="p-1.5 rounded-lg bg-[#B9861F] hover:bg-[#CC9A24] text-white transition-colors"
            title="Execute"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
