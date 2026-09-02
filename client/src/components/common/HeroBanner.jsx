import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Play, FileText, Sparkles, ChevronRight, HeartHandshake } from 'lucide-react';

export const HeroBanner = ({
  title = 'सत्य, दया, धर्म और नाम-साधना का पावन मार्ग',
  subtitle = 'Welcome to the Official Spiritual Portal of Jaigurudev Sanstha. Join our daily satsang, explore divine teachings, and immerse in spiritual upliftment.',
  ctaPrimary = { text: 'Upcoming Satsang', link: '/satsang' },
  ctaSecondary = { text: 'Ashram Adhesh', link: '/adhesh' },
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-roseBlush-100/70 via-roseBlush-50/40 to-cream-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-roseBlush-200/50">
      {/* Devotional background aura circles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-0">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-roseBlush-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-5 right-1/4 w-80 h-80 bg-sacredGold-200/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3.5xl mx-auto">
          {/* Sacred Top Banner Layout (Image 1: Left Guru + Vakt Guru Vachan Box + Right Guru) */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between gap-2 sm:gap-6 bg-white/90 p-3 sm:p-6 rounded-3xl border border-roseBlush-200 shadow-md">
              {/* Left: Param Pujya Baba Jaigurudev Ji Maharaj */}
              <Link to="/baba-jaigurudev-ji" className="flex flex-col items-center text-center shrink-0 w-24 sm:w-36 group">
                <div className="w-16 h-20 sm:w-28 sm:h-36 rounded-lg sm:rounded-xl overflow-hidden border-2 border-stone-800 shadow-xs bg-stone-100 mb-1.5 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/images/baba_jaigurudev.jpg"
                    alt="निजधाम वासी परम पूज्य बाबा जयगुरुदेव जी महाराज"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="font-devanagari text-[9px] sm:text-xs font-bold text-stone-800 leading-tight">
                  निजधाम वासी परम पूज्य<br />बाबा जयगुरुदेव जी महाराज
                </span>
              </Link>

              {/* Center: वक्त गुरु वचन Box */}
              <div className="flex-1 flex flex-col items-center justify-center text-center px-1 sm:px-4">
                <span className="font-devanagari font-extrabold text-lg sm:text-2xl text-red-600 tracking-wide block mb-0.5">
                  जयगुरुदेव
                </span>
                <span className="font-devanagari font-extrabold text-xs sm:text-base text-stone-900 tracking-wider mb-1.5 sm:mb-2.5">
                  वक्त गुरु वचन
                </span>
                <div className="w-full py-2.5 sm:py-5 px-2 sm:px-6 rounded-xl sm:rounded-2xl border-2 border-stone-800 bg-roseBlush-50/40 shadow-xs">
                  <p className="font-devanagari font-extrabold text-xs sm:text-xl md:text-2xl text-stone-900 leading-snug sm:leading-relaxed">
                    समरथ गुरु के मिल जाने<br />
                    पर इसी मनुष्य शरीर में<br />
                    भगवान के दर्शन होते हैं।
                  </p>
                </div>
              </div>

              {/* Right: Param Pujya Baba Umakant Ji Maharaj */}
              <Link to="/baba-umakant-ji" className="flex flex-col items-center text-center shrink-0 w-24 sm:w-36 group">
                <div className="w-16 h-20 sm:w-28 sm:h-36 rounded-lg sm:rounded-xl overflow-hidden border-2 border-stone-800 shadow-xs bg-stone-100 mb-1.5 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/images/maharaj_ji.jpg"
                    alt="वक्त गुरु परम सन्त बाबा उमाकान्त जी महाराज"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="font-devanagari text-[9px] sm:text-xs font-bold text-stone-800 leading-tight">
                  वक्त गुरु परम सन्त<br />बाबा उमाकान्त जी महाराज
                </span>
              </Link>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4.5xl md:text-5xl lg:text-5.5xl font-serif font-extrabold text-stone-900 tracking-tight leading-[1.15] mb-6">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-stone-600 font-light leading-relaxed mb-8 max-w-2.5xl mx-auto">
            {subtitle}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
            <Link
              to={ctaPrimary.link}
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-maroon-700 to-roseBlush-700 hover:from-maroon-800 hover:to-roseBlush-800 text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>{ctaPrimary.text}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <Link
              to={ctaSecondary.link}
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-white hover:bg-roseBlush-50 text-maroon-800 border border-roseBlush-300 font-semibold text-sm sm:text-base shadow-xs hover:shadow-sm transition-all duration-200"
            >
              <FileText className="w-4 h-4 text-maroon-600" />
              <span>{ctaSecondary.text}</span>
            </Link>
          </div>

          {/* 2 Sacred Satguru Profile Cards (Horizontal on Mobile & Desktop) */}
          <div className="pt-6 border-t border-roseBlush-200/60 max-w-4xl mx-auto text-left">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-6">
              {/* Card 1: Baba Jaigurudev Ji Maharaj */}
              <Link
                to="/baba-jaigurudev-ji"
                className="p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border-2 border-sacredGold-300 shadow-soft hover:shadow-sacred hover:border-sacredGold-400 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-2.5 sm:gap-4 group"
              >
                <div className="relative w-16 h-20 sm:w-24 sm:h-28 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-sacredGold-400 shadow-xs shrink-0 bg-roseBlush-50">
                  <img
                    src="/images/baba_jaigurudev.jpg"
                    alt="परम पूज्य बाबा जयगुरुदेव जी महाराज"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-bold text-sacredGold-700 uppercase tracking-wider bg-sacredGold-50 px-2 py-0.5 rounded-full border border-sacredGold-200 inline-block mb-1 truncate max-w-full">
                    संस्थापक एवं युग प्रवर्तक
                  </span>
                  <h3 className="font-serif font-extrabold text-xs sm:text-base text-maroon-950 group-hover:text-red-600 transition-colors leading-tight line-clamp-2">
                    परम पूज्य बाबा जयगुरुदेव जी
                  </h3>
                  <p className="text-[10px] sm:text-xs text-stone-500 font-light mt-1 hidden sm:line-clamp-2">
                    शाकाहार क्रांति एवं नाम-साधना के प्रणेता।
                  </p>
                  <span className="inline-flex items-center gap-0.5 text-[10px] sm:text-xs font-bold text-maroon-700 group-hover:text-red-600 mt-1 sm:mt-2">
                    <span>जीवन परिचय</span>
                    <span>›</span>
                  </span>
                </div>
              </Link>

              {/* Card 2: Baba Umakant Ji Maharaj */}
              <Link
                to="/baba-umakant-ji"
                className="p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border-2 border-sacredGold-300 shadow-soft hover:shadow-sacred hover:border-sacredGold-400 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-2.5 sm:gap-4 group"
              >
                <div className="relative w-16 h-20 sm:w-24 sm:h-28 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-sacredGold-400 shadow-xs shrink-0 bg-roseBlush-50">
                  <img
                    src="/images/maharaj_ji.jpg"
                    alt="परम पूज्य परम सन्त बाबा उमाकान्त जी महाराज"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-bold text-sacredGold-700 uppercase tracking-wider bg-sacredGold-50 px-2 py-0.5 rounded-full border border-sacredGold-200 inline-block mb-1 truncate max-w-full">
                    वक्त के सन्त सतगुरु
                  </span>
                  <h3 className="font-serif font-extrabold text-xs sm:text-base text-maroon-950 group-hover:text-red-600 transition-colors leading-tight line-clamp-2">
                    परम पूज्य बाबा उमाकान्त जी
                  </h3>
                  <p className="text-[10px] sm:text-xs text-stone-500 font-light mt-1 hidden sm:line-clamp-2">
                    उज्जैन आश्रम संस्थापक एवं आध्यात्मिक उत्तराधिकारी।
                  </p>
                  <span className="inline-flex items-center gap-0.5 text-[10px] sm:text-xs font-bold text-maroon-700 group-hover:text-red-600 mt-1 sm:mt-2">
                    <span>जीवन परिचय</span>
                    <span>›</span>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
