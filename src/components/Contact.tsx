import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  MapPin, 
  Check, 
  Copy, 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink, 
  Sparkles, 
  Clock, 
  MessageSquare,
  AlertCircle,
  Phone
} from 'lucide-react';
import { ProfileData } from '../types';

interface ContactProps {
  profile: ProfileData;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errors.message = 'Please provide a message of at least 10 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const subject = encodeURIComponent(`${formData.subject} from ${formData.name}`);
    const body = encodeURIComponent(
      `${formData.message}\n\nFrom: ${formData.name}\nReply-to: ${formData.email}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setIsSubmitting(false);
    setSubmittedSuccess(true);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'Project Inquiry',
      message: '',
    });
    setSubmittedSuccess(false);
    setFormErrors({});
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
            Send a focused note about an internship, freelance project, collaboration, or product idea.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & Social Profile Cards */}
          <div className="lg:col-span-5 space-y-6">
            
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

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white dark:bg-[#3A2F26] p-6 sm:p-8 border border-[#E4DBCB] dark:border-[#4A3C31] shadow-xs">
              
              {submittedSuccess ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#3A2F26] dark:text-white">
                    Email Draft Ready
                  </h3>
                  <p className="text-sm text-[#7A6B58] dark:text-[#B9A98C] max-w-md mx-auto">
                    Your email app should now have a prepared message to Noah about "{formData.subject}". Send it there and he can reply to {formData.email}.
                  </p>
                  <div className="pt-4">
                    <button
                      id="contact-send-another-btn"
                      onClick={handleResetForm}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#B9861F] hover:bg-[#A2731A] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-2.5 pb-4 border-b border-[#EFE6D5] dark:border-[#4A3C31]">
                    <MessageSquare className="w-5 h-5 text-[#B9861F] dark:text-[#D9A62E]" />
                    <h3 className="text-base sm:text-lg font-bold text-[#3A2F26] dark:text-white">
                      Send a Message
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6B58] dark:text-[#D3C6AF] mb-1.5">
                        Your Name <span className="text-[#A8432F]">*</span>
                      </label>
                      <input
                        id="contact-form-name"
                        type="text"
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/80 border ${
                          formErrors.name
                            ? 'border-[#C1613F] dark:border-[#8F3623]'
                            : 'border-[#E4DBCB] dark:border-[#5C4B3A]'
                        } text-[#3A2F26] dark:text-white placeholder:text-[#B9A98C] focus:outline-none focus:ring-2 focus:ring-[#CC9A24]`}
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-xs text-[#A8432F] flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{formErrors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6B58] dark:text-[#D3C6AF] mb-1.5">
                        Your Email <span className="text-[#A8432F]">*</span>
                      </label>
                      <input
                        id="contact-form-email"
                        type="email"
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/80 border ${
                          formErrors.email
                            ? 'border-[#C1613F] dark:border-[#8F3623]'
                            : 'border-[#E4DBCB] dark:border-[#5C4B3A]'
                        } text-[#3A2F26] dark:text-white placeholder:text-[#B9A98C] focus:outline-none focus:ring-2 focus:ring-[#CC9A24]`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-xs text-[#A8432F] flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{formErrors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6B58] dark:text-[#D3C6AF] mb-1.5">
                      Subject / Topic
                    </label>
                    <select
                      id="contact-form-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/80 border border-[#E4DBCB] dark:border-[#5C4B3A] text-[#3A2F26] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#CC9A24]"
                    >
                      <option value="Project Inquiry">Freelance or product build</option>
                      <option value="Internship Opportunity">Internship opportunity</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Code Review">Code review or backend help</option>
                      <option value="General Question">General Hello / Quick Question</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6B58] dark:text-[#D3C6AF]">
                        Message Details <span className="text-[#A8432F]">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-[#B9A98C]">
                        {formData.message.length} chars
                      </span>
                    </div>
                    <textarea
                      id="contact-form-message"
                      rows={5}
                      placeholder="Tell me about your project, timeline, architecture requirements, or role details..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-[#F7F2E9] dark:bg-[#4A3C31]/80 border ${
                        formErrors.message
                          ? 'border-[#C1613F] dark:border-[#8F3623]'
                          : 'border-[#E4DBCB] dark:border-[#5C4B3A]'
                      } text-[#3A2F26] dark:text-white placeholder:text-[#B9A98C] focus:outline-none focus:ring-2 focus:ring-[#CC9A24]`}
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-xs text-[#A8432F] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{formErrors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      id="contact-form-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm text-white bg-[#B9861F] hover:bg-[#A2731A] active:bg-[#8A6015] disabled:opacity-50 transition-all shadow-xs hover:shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
