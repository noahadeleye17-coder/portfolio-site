import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Check, 
  Copy, 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink, 
  Clock
} from 'lucide-react';
import { ProfileData } from '../types';

interface ContactProps {
  profile: ProfileData;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#EFE6D5]/60 dark:bg-[#3A2F26]/40 border-t border-[#E4DBCB]/60 dark:border-[#4A3C31]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F6E9C4] dark:bg-[#3D2F12]/50 border border-[#E8C765] dark:border-[#8A6015]/50 text-[#B9861F] dark:text-[#D9A62E] text-xs font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2F26] dark:text-white tracking-tight">
            Let’s build it.
          </h2>
          <p className="mt-3 text-base text-[#7A6B58] dark:text-[#B9A98C] leading-relaxed">
            Reach me directly by email, or through any of the profiles below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          
          {/* Direct Info & Social Profile Cards */}
          <div className="space-y-6">
            
            {/* Direct Email Card */}
            <div className="rounded-2xl bg-white dark:bg-[#3A2F26] p-6 sm:p-7 border border-[#E4DBCB] dark:border-[#4A3C31] shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-[#F6E9C4] dark:bg-[#3D2F12]/50 text-[#B9861F] dark:text-[#D9A62E]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#3A2F26] dark:text-white">
                    Direct Email
                  </h3>
                  <p className="text-xs text-[#9C8A6E] dark:text-[#B9A98C]">
                    Always monitored & active
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/80 border border-[#E4DBCB]/80 dark:border-[#5C4B3A]/80">
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#4A3C31] dark:text-[#E4DBCB] truncate mr-2">
                  {profile.email}
                </span>
                <button
                  id="contact-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B9861F] hover:bg-[#A2731A] text-white text-xs font-semibold transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-[#9C8A6E] dark:text-[#B9A98C]">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                <span>Typical response time: Within 12-24 hours</span>
              </div>
            </div>

            {/* Professional Profiles Grid */}
            <div className="rounded-2xl bg-white dark:bg-[#3A2F26] p-6 sm:p-7 border border-[#E4DBCB] dark:border-[#4A3C31] shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#3A2F26] dark:text-white uppercase tracking-wider">
                Professional Profiles & Links
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    id={`contact-profile-card-${social.platform}`}
                    href={social.url}
                    target={social.platform === 'email' ? '_self' : '_blank'}
                    rel="noreferrer noopener"
                    className="p-3.5 rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/60 border border-[#E4DBCB]/70 dark:border-[#5C4B3A]/70 hover:border-[#D9A62E] dark:hover:border-[#B9861F] transition-all group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-white dark:bg-[#5C4B3A] text-[#5C4B3A] dark:text-[#E4DBCB] group-hover:text-[#B9861F] dark:group-hover:text-[#D9A62E] transition-colors">
                        {social.platform === 'github' && <Github className="w-4 h-4" />}
                        {social.platform === 'linkedin' && <Linkedin className="w-4 h-4" />}
                        {social.platform === 'twitter' && <Twitter className="w-4 h-4" />}
                        {social.platform === 'email' && <Mail className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#3A2F26] dark:text-white">
                          {social.label}
                        </div>
                        <div className="text-[11px] text-[#9C8A6E] dark:text-[#B9A98C] font-mono truncate max-w-[100px]">
                          {social.username}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#B9A98C] group-hover:text-[#B9861F] dark:group-hover:text-[#D9A62E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Location & Availability Card */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#3A2F26] border border-[#E4DBCB] dark:border-[#4A3C31] flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-[#4A3C31] dark:text-[#E4DBCB]">
                  Location & Timezone
                </div>
                <div className="text-[#9C8A6E] dark:text-[#B9A98C]">
                  {profile.location} (WAT)
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
