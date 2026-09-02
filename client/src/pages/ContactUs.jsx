import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, Sparkles, Navigation, ExternalLink } from 'lucide-react';
import api from '../services/api';
import SectionTitle from '../components/common/SectionTitle';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const res = await api.post('/contact', formData);
      if (res.success) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionTitle
          hindiSubtitle="आश्रम संपर्क एवं मार्गदर्शन"
          title="Contact Jaigurudev Sanstha"
          subtitle="Reach out to the Ashram office for Satsang queries, accommodation guidance, or general spiritual information."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#2E0B11] to-[#1F070B] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-8 border border-sacredGold-500/30">
            <div>
              <span className="font-devanagari text-sacredGold-300 font-bold text-sm block mb-1">
                जयगुरुदेव आश्रम कार्यालय
              </span>
              <h3 className="text-2xl font-serif font-bold text-white">
                Baba Jaigurudev Ashram, Ujjain
              </h3>
              <p className="text-xs text-roseBlush-200/80 mt-2 font-light leading-relaxed">
                Feel free to visit us directly or contact through official channels. All devotees and seekers are warmly welcomed.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-sacredGold-400 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-roseBlush-200 font-bold block">पता / Address</span>
                  <span className="text-white/90">
                    बाबा जयगुरुदेव आश्रम, पिंगलेश्वर रेलवे स्टेशन के सामने, मक्सी रोड, उज्जैन (म.प्र.)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-sacredGold-400 shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-roseBlush-200 font-bold block">दूरभाष / Helpline</span>
                  <span className="text-white/90">+91-9754700200 / +91-9575600700</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-sacredGold-400 shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-roseBlush-200 font-bold block">ईमेल / Email</span>
                  <span className="text-white/90">contact@jaigurudev.org</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-sacredGold-400 shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-roseBlush-200 font-bold block">कार्यालय समय / Timings</span>
                  <span className="text-white/90">प्रातः 06:00 बजे से सायं 08:00 बजे तक (दैनिक)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-roseBlush-200 shadow-soft">
            <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
              Send an Enquiry / संदेश भेजें
            </h3>
            <p className="text-xs text-stone-500 mb-6 font-light">
              Submit your enquiry directly to the ashram office. No user account or registration is required.
            </p>

            {status.success && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Your message has been submitted to the Ashram office. Jai Gurudev!</span>
              </div>
            )}

            {status.error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-center gap-3 text-sm font-medium">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{status.error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    आपका नाम / Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 rounded-2xl bg-roseBlush-50/50 border border-roseBlush-200 text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-roseBlush-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    फोन नंबर / Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-2.5 rounded-2xl bg-roseBlush-50/50 border border-roseBlush-200 text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-roseBlush-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    ईमेल / Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-2xl bg-roseBlush-50/50 border border-roseBlush-200 text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-roseBlush-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    विषय / Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-2xl bg-roseBlush-50/50 border border-roseBlush-200 text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-roseBlush-300"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Satsang Information">Satsang Information</option>
                    <option value="Ashram Accommodation">Ashram Accommodation</option>
                    <option value="Seva / Volunteering">Seva / Volunteering</option>
                    <option value="Naam Dhyan Guidance">Naam Dhyan Guidance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  संदेश / Your Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 rounded-2xl bg-roseBlush-50/50 border border-roseBlush-200 text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-roseBlush-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-maroon-700 to-roseBlush-700 hover:from-maroon-800 hover:to-roseBlush-800 text-white font-semibold text-sm shadow-md transition-all disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                <span>{status.loading ? 'Submitting...' : 'Submit Message'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Embedded Google Maps Section */}
        <div className="bg-white rounded-3xl border border-roseBlush-200 shadow-soft overflow-hidden">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-roseBlush-50 to-white border-b border-roseBlush-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-maroon-950">
                  Ashram Location on Google Maps (आश्रम मानचित्र)
                </h3>
                <p className="text-xs text-stone-500">
                  Baba Jaigurudev Ashram, Opposite Pingleshwar Railway Station, Maksi Rd, Ujjain (M.P.)
                </p>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/yMMis5r5gCwEPPKT7?g_st=ic"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md hover:shadow-red-600/30 transition-all self-start sm:self-auto shrink-0"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps / दिशा निर्देश</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative w-full h-80 sm:h-96 md:h-[420px] bg-stone-100">
            <iframe
              src="https://maps.google.com/maps?q=Baba+Jai+Guru+Dev+Ashram+Ujjain,+Opposite+Pingleshwar,+Railway+Station,+Maksi+Rd,+Ujjain,+Madhya+Pradesh+456661&t=&z=15&ie=UTF8&iwloc=&output=embed"
              title="Baba Jaigurudev Ashram Ujjain Google Maps"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
