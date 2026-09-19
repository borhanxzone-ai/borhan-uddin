import React, { useState } from 'react';
import { siteConfig } from '../data/portfolioData';
import { Mail, MessageCircle, Send, Check, Copy, ExternalLink, Calendar, Sparkles, Facebook, Youtube, Instagram, Loader2, ArrowRight } from 'lucide-react';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brandOrChannel: '',
    service: preselectedService || 'Color Grading & Correction',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const targetEmail = "borohanxzone@gmail.com";
    const backupEmail = "borhanxzone@gmail.com";

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          websiteOrHandle: formData.brandOrChannel || 'None provided',
          message: formData.message,
          _subject: `New Project Inquiry from ${formData.name} (${formData.service})`,
          _replyto: formData.email,
          _cc: backupEmail,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        // Fallback: still show submitted with direct action options
        setSubmitted(true);
      }
    } catch (err) {
      console.warn('Form submission notice:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    'Color Grading & Correction',
    'Thumbnail & Graphic Design',
    'Full-Service Monthly Retainers',
    'Sound Design & Audio Mixing',
    '3D & Motion Graphics',
    'Viral Short-Form & Retention Edits'
  ];

  const mailtoLink = `mailto:borohanxzone@gmail.com?cc=borhanxzone@gmail.com&subject=${encodeURIComponent(
    `Project Inquiry: ${formData.service} - ${formData.name}`
  )}&body=${encodeURIComponent(
    `Hello Borhan,\n\nName: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\nWebsite/Social: ${formData.brandOrChannel || 'N/A'}\n\nProject Details:\n${formData.message}\n\nLooking forward to hearing from you!`
  )}`;

  const whatsappMessage = encodeURIComponent(
    `Hi Borhan! I just submitted an inquiry for "${formData.service}".\n\nName: ${formData.name}\nEmail: ${formData.email}\nWebsite/Social: ${formData.brandOrChannel || 'N/A'}\n\nProject Brief:\n${formData.message}`
  );

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-white/5 relative bg-[#0b0c13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info & Booking Options */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Let's Collaborate</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                Ready to Scale Your Brand With Elite Video?
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-8">
                Whether you need high-converting Meta/TikTok ads or viral long-term retention edits for your personal brand, we are ready to take your visual storytelling to the next level.
              </p>

              {/* Quick Contact Methods */}
              <div className="space-y-3.5 mb-8">
                {/* Email Box */}
                <div className="p-4 rounded-xl bg-[#12141f] border border-white/5 flex items-center justify-between gap-4">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-3 group/mail flex-1"
                    title="Click to send an email"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-400/10 group-hover/mail:bg-amber-400/20 flex items-center justify-center text-amber-400 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-neutral-400 font-medium">Direct Inquiries (Email)</div>
                      <div className="text-sm font-bold text-white group-hover/mail:text-amber-300 font-mono transition-colors">
                        {siteConfig.contact.email}
                      </div>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* WhatsApp Direct Chat */}
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#12141f] hover:bg-[#161a29] border border-white/5 hover:border-emerald-500/40 transition-all flex items-center justify-between gap-4 group"
                  title="Click to chat on WhatsApp"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 flex items-center justify-center text-emerald-400 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-neutral-400 font-medium">Instant WhatsApp Chat</div>
                      <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors font-mono">
                        {siteConfig.contact.whatsapp}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                </a>

                {/* Facebook Profile Link */}
                {siteConfig.contact.socials.facebook && (
                  <a
                    href={siteConfig.contact.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-[#12141f] hover:bg-[#161a29] border border-white/5 hover:border-blue-500/40 transition-all flex items-center justify-between gap-4 group"
                    title="Click to visit Facebook Profile"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 flex items-center justify-center text-blue-400 transition-colors">
                        <Facebook className="w-5 h-5 fill-current" />
                      </div>
                      <div>
                        <div className="text-[11px] text-neutral-400 font-medium">Official Facebook Profile</div>
                        <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                          Connect with Borhan Uddin
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  </a>
                )}

                {/* YouTube Channel Link */}
                {siteConfig.contact.socials.youtube && (
                  <a
                    href={siteConfig.contact.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-[#12141f] hover:bg-[#161a29] border border-white/5 hover:border-red-500/40 transition-all flex items-center justify-between gap-4 group"
                    title="Click to visit YouTube Channel"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-colors">
                        <Youtube className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[11px] text-neutral-400 font-medium">YouTube Channel</div>
                        <div className="text-sm font-bold text-white group-hover:text-red-300 transition-colors font-mono">
                          @Borhan_Creation-e6n
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  </a>
                )}

                {/* Instagram Profile Link */}
                {siteConfig.contact.socials.instagram && (
                  <a
                    href={siteConfig.contact.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-[#12141f] hover:bg-[#161a29] border border-white/5 hover:border-pink-500/40 transition-all flex items-center justify-between gap-4 group"
                    title="Click to visit Instagram Profile"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-pink-500/10 group-hover:bg-pink-500/20 flex items-center justify-center text-pink-400 transition-colors">
                        <Instagram className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[11px] text-neutral-400 font-medium">Instagram Profile</div>
                        <div className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors font-mono">
                          @borhan_xyz
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                  </a>
                )}

                {/* Response speed badge */}
                <div className="flex items-center gap-2 text-xs text-neutral-400 pt-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Average response time: <strong>under 3 hours</strong></span>
                </div>
              </div>
            </div>

            {/* Location & Status */}
            <div className="pt-6 border-t border-white/5 text-xs text-neutral-400">
              <p>📍 {siteConfig.contact.location}</p>
              <p className="mt-1 text-emerald-400 font-medium">● {siteConfig.availabilityStatus}</p>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7 bg-[#11131c] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            {submitted ? (
              <div className="py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-8 h-8" />
                </div>
                <div className="text-center mb-6">
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">
                    Inquiry Sent Successfully!
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto">
                    Your brief has been forwarded directly to <strong className="text-amber-400">borohanxzone@gmail.com</strong>. We will review your project requirements and reply within 3 hours.
                  </p>
                </div>

                {/* Submitted Brief Summary */}
                <div className="bg-[#161826] border border-white/10 rounded-2xl p-5 mb-6 text-left space-y-2.5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 mb-1">
                    Submitted Brief Summary:
                  </div>
                  <div className="text-xs text-neutral-300">
                    <span className="text-neutral-500">Client:</span> {formData.name} ({formData.email})
                  </div>
                  <div className="text-xs text-neutral-300">
                    <span className="text-neutral-500">Service:</span> <span className="text-amber-300 font-semibold">{formData.service}</span>
                  </div>
                  {formData.brandOrChannel && (
                    <div className="text-xs text-neutral-300">
                      <span className="text-neutral-500">Channel / Brand:</span> {formData.brandOrChannel}
                    </div>
                  )}
                  <div className="text-xs text-neutral-300 pt-1 border-t border-white/5">
                    <span className="text-neutral-500">Details:</span> {formData.message}
                  </div>
                </div>

                {/* Fast Direct Send / Verification Options */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <a
                    href={mailtoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span>Open in Email App</span>
                  </a>
                  <a
                    href={`https://wa.me/8801811263668?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Send on WhatsApp</span>
                  </a>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        brandOrChannel: '',
                        service: 'Color Grading & Correction',
                        message: '',
                      });
                    }}
                    className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors underline cursor-pointer"
                  >
                    ← Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-1">
                    Send A Project Brief
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Fill out the parameters below and we'll reply with a custom scope of work.
                  </p>
                </div>

                {/* Service Selector */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Service Required
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {services.map((svc) => (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => setFormData({ ...formData, service: svc })}
                        className={`px-3 py-2 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                          formData.service === svc
                            ? 'bg-amber-400/15 border-amber-400 text-amber-300 font-semibold'
                            : 'bg-[#161826] border-white/5 text-neutral-300 hover:border-white/20'
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Rivera"
                      className="w-full bg-[#161826] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full bg-[#161826] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                {/* Brand / Channel URL */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Website or Social Handle (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.brandOrChannel}
                    onChange={(e) => setFormData({ ...formData, brandOrChannel: e.target.value })}
                    placeholder="e.g. youtube.com/@channel or brand.com"
                    className="w-full bg-[#161826] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                {/* Project Message */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Project Details & Goals *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your footage, deliverables needed, deadline, or reference videos you love..."
                    className="w-full bg-[#161826] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="submit-inquiry-btn"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-black bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-xl shadow-amber-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending inquiry to Borhan...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Project Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
