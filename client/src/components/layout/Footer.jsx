import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Youtube, Heart, Sparkles, Smartphone, MessageCircle } from 'lucide-react';
import Logo from '../common/Logo';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#2E0B11] to-[#1F070B] text-roseBlush-100/90 pt-16 pb-24 xl:pb-12 border-t-2 border-sacredGold-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Organization Bio */}
          <div className="space-y-4">
            <Logo light={true} size="large" />
            <p className="text-sm text-roseBlush-200/80 leading-relaxed font-light">
              जयगुरुदेव धर्म प्रचारक संस्था मानव कल्याण, आत्मिक जागृति, शाकाहार और प्रभु नाम-साधना के दिव्य मार्ग को समर्पित एक पावन आध्यात्मिक संगठन है।
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/40 text-pink-300 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>शाकाहारी रहें — सदाचारी बनें</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-serif font-bold text-base uppercase tracking-wider mb-4 border-b border-pink-500/30 pb-2 inline-block">
              महत्वपूर्ण लिंक / Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-pink-300 transition-colors flex items-center gap-1.5">
                  <span className="text-pink-400 font-bold">›</span> About Sanstha (संस्था परिचय)
                </Link>
              </li>
              <li>
                <Link to="/satsang" className="hover:text-pink-300 transition-colors flex items-center gap-1.5">
                  <span className="text-pink-400 font-bold">›</span> Satsang Schedule (सत्संग कार्यक्रम)
                </Link>
              </li>
              <li>
                <Link to="/adhesh" className="hover:text-pink-300 transition-colors flex items-center gap-1.5">
                  <span className="text-pink-400 font-bold">›</span> Ashram Adhesh (आश्रम आदेश)
                </Link>
              </li>
              <li>
                <Link to="/teachings" className="hover:text-pink-300 transition-colors flex items-center gap-1.5">
                  <span className="text-pink-400 font-bold">›</span> Divine Teachings (गुरु संदेश)
                </Link>
              </li>
              <li>
                <Link to="/videos" className="hover:text-pink-300 transition-colors flex items-center gap-1.5">
                  <span className="text-pink-400 font-bold">›</span> Video Discourses (प्रवचन)
                </Link>
              </li>
              <li>
                <Link to="/audio" className="hover:text-pink-300 transition-colors flex items-center gap-1.5">
                  <span className="text-pink-400 font-bold">›</span> Bhajan & Audio (भजन एवं धुन)
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-pink-300 transition-colors flex items-center gap-1.5">
                  <span className="text-pink-400 font-bold">›</span> Photo Gallery (चित्र दीर्घा)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Ashram Location */}
          <div>
            <h3 className="text-white font-serif font-bold text-base uppercase tracking-wider mb-4 border-b border-pink-500/30 pb-2 inline-block">
              आश्रम संपर्क / Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                <span className="text-roseBlush-100/85">
                  बाबा जयगुरुदेव आश्रम, पिंगलेश्वर रेलवे स्टेशन के सामने, मक्सी रोड, उज्जैन (म.प्र.)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-pink-400 shrink-0" />
                <span className="text-roseBlush-100/85">+91-9754700200 / +91-9575600700</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-pink-400 shrink-0" />
                <span className="text-roseBlush-100/85">contact@jaigurudev.org</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-pink-400 shrink-0" />
                <span className="text-roseBlush-100/85">प्रातः 06:00 बजे से सायं 08:00 बजे तक</span>
              </li>
            </ul>
          </div>

          {/* Column 4: App Download & Social Connect */}
          <div className="space-y-4">
            <h3 className="text-white font-serif font-bold text-base uppercase tracking-wider mb-4 border-b border-pink-500/30 pb-2 inline-block">
              मोबाइल ऐप / Connect
            </h3>
            <p className="text-xs text-roseBlush-200/80">
              Download the official Jaigurudev Android App for live satsang schedules, notices, and videos.
            </p>
            <Link
              to="/downloads"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-white font-semibold text-xs transition-all shadow-md hover:scale-[1.02]"
            >
              <Smartphone className="w-4 h-4 text-white" />
              <span>Download APK for Android</span>
            </Link>

            {/* Social Icons & WhatsApp Channel */}
            <div className="pt-2 space-y-3">
              <div>
                <a
                  href="https://whatsapp.com/channel/0029VaAcAA40QeadmEmp9y3c"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md w-full justify-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Join Official WhatsApp Channel</span>
                </a>
              </div>

              <div>
                <span className="text-xs text-roseBlush-200/70 block mb-2">Follow Official Updates:</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.youtube.com/@Jaigurudevukm"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center text-white transition-all hover:scale-105 shadow-sm"
                    aria-label="YouTube Channel"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a
                    href="https://whatsapp.com/channel/0029VaAcAA40QeadmEmp9y3c"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center text-white transition-all hover:scale-105 shadow-sm"
                    aria-label="WhatsApp Channel"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-roseBlush-200/60 text-center md:text-left">
          <p>© {new Date().getFullYear()} Jaigurudev Sanstha. All divine blessings and rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link to="/privacy-policy" className="hover:text-sacredGold-300">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-sacredGold-300">Terms of Service</Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-sacredGold-300">Disclaimer</Link>
            <span>•</span>
            <Link to="/admin" className="text-sacredGold-400/80 hover:text-sacredGold-300 font-medium">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
