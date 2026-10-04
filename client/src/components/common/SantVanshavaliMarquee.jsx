import React, { useState } from 'react';
import { Sparkles, Play, Pause } from 'lucide-react';

const GURUS_VANSHAVALI = [
  {
    id: 1,
    name: 'सन्त कबीर साहिब जी',
    image: '/images/gurus/guru_1_sant_kabirdas.jpg',
    era: 'प्रथम सन्त (परम प्रवर्तक)',
  },
  {
    id: 2,
    name: 'गुरु नानक देव जी',
    image: '/images/gurus/guru_2_guru_nanak_dev.jpg',
    era: 'प्रथम पातशाही',
  },
  {
    id: 3,
    name: 'गुरु अंगद देव जी',
    image: '/images/gurus/guru_3_guru_angad_dev.jpg',
    era: 'द्वितीय पातशाही',
  },
  {
    id: 4,
    name: 'गुरु अमरदास जी',
    image: '/images/gurus/guru_4_guru_amardas.jpg',
    era: 'तृतीय पातशाही',
  },
  {
    id: 5,
    name: 'गुरु रामदास जी',
    image: '/images/gurus/guru_5_guru_ramdas.jpg',
    era: 'चतुर्थ पातशाही',
  },
  {
    id: 6,
    name: 'गुरु अर्जुन देव जी',
    image: '/images/gurus/guru_6_guru_arjun_dev.jpg',
    era: 'पंचम पातशाही',
  },
  {
    id: 7,
    name: 'गुरु हर गोविन्द जी',
    image: '/images/gurus/guru_7_guru_har_gobind.jpg',
    era: 'षष्ठम पातशाही',
  },
  {
    id: 8,
    name: 'गुरु हर राय जी',
    image: '/images/gurus/guru_8_guru_har_rai.jpg',
    era: 'सप्तम पातशाही',
  },
  {
    id: 9,
    name: 'गुरु हर किशन जी',
    image: '/images/gurus/guru_9_guru_har_kishan.jpg',
    era: 'अष्टम पातशाही',
  },
  {
    id: 10,
    name: 'गुरु तेग बहादुर जी',
    image: '/images/gurus/guru_10_guru_teg_bahadur.jpg',
    era: 'नवम पातशाही',
  },
  {
    id: 11,
    name: 'गुरु गोविन्द सिंह जी',
    image: '/images/gurus/guru_11_guru_gobind_singh.jpg',
    era: 'दशम पातशाही',
  },
  {
    id: 12,
    name: 'माताजी रत्न राव जी',
    image: '/images/gurus/guru_12_ratan_rao_ji.jpg',
    era: 'गुरु परंपरा धारा',
  },
  {
    id: 13,
    name: 'सन्त तुलसी साहिब जी',
    image: '/images/gurus/guru_13_tulsidas_ji_hathras.jpg',
    era: 'हाथरस वाले (घट रामायण)',
  },
  {
    id: 14,
    name: 'स्वामी जी महाराज',
    image: '/images/gurus/guru_14_shivdayal_ji.jpg',
    era: 'शिवदयाल सिंह जी (आगरा)',
  },
  {
    id: 15,
    name: 'सन्त गरीब दास जी महाराज',
    image: '/images/gurus/guru_15_garibdas_ji.jpg?v=20261004',
    era: 'हाथरस परंपरा',
  },
  {
    id: 16,
    name: 'पण्डित विष्णु दयाल जी',
    image: '/images/gurus/guru_16_vishnu_dayal_ji.jpg',
    era: 'संत परंपरा',
  },
  {
    id: 17,
    name: 'घूरेलाल जी महाराज',
    image: '/images/gurus/guru_17_ghurelal_ji_maharaj.jpg',
    era: 'दादा गुरु जी (चिरौली)',
  },
  {
    id: 18,
    name: 'बाबा जयगुरुदेव जी महाराज',
    image: '/images/gurus/guru_18_baba_jaigurudev_ji.jpg',
    era: 'संस्थापक सन्त सतगुरु',
  },
  {
    id: 19,
    name: 'बाबा उमाकान्त जी महाराज',
    image: '/images/gurus/guru_19_baba_umakant_ji.jpg',
    era: 'वर्तमान सतगुरु (उज्जैन आश्रम)',
  },
];

export const SantVanshavaliMarquee = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate array for seamless infinite looping
  const marqueeItems = [...GURUS_VANSHAVALI, ...GURUS_VANSHAVALI];

  return (
    <section className="py-6 sm:py-8 bg-gradient-to-r from-[#2B090F] via-[#4D1219] to-[#2B090F] border-y-2 border-sacredGold-400/40 overflow-hidden relative shadow-lg">
      {/* Top Banner Tagline */}
      <div className="max-w-7xl mx-auto px-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sacredGold-500/15 border border-sacredGold-400/40 text-sacredGold-300 text-xs sm:text-sm font-bold shadow-xs">
          <Sparkles className="w-4 h-4 text-sacredGold-400 shrink-0" />
          <span className="font-devanagari">॥ पावन सन्त वंशावली — अखंड संत परंपरा एवं गुरु धारा ॥</span>
          <span className="text-[10px] text-sacredGold-300/80 font-normal hidden sm:inline ml-2">• माउस ले जाकर रोकें (Hover to Pause)</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-roseBlush-200/90 font-medium tracking-wide hidden md:inline">
            (क्रम १ से १९ : सन्त कबीर साहिब जी से वर्तमान सतगुरु बाबा उमाकान्त जी महाराज तक)
          </span>

          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "गति शुरू करें (Resume Stream Motion)" : "गति रोकें (Pause Stream Motion)"}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-maroon-950/80 hover:bg-maroon-900 text-sacredGold-300 font-bold text-xs border border-sacredGold-400/50 shadow-xs transition-all"
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3 text-sacredGold-400 fill-current" />
                <span>गति शुरू करें (Play)</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-sacredGold-400 fill-current" />
                <span>गति रोकें (Pause)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Infinite Moving Marquee Track (Smooth Left Flow preserving chronological order 1 -> 19) */}
      <div className="relative w-full overflow-hidden group/track">
        {/* Soft edge gradient fading */}
        <div className="absolute left-0 inset-y-0 w-16 sm:w-24 bg-gradient-to-r from-[#2B090F] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 sm:w-24 bg-gradient-to-l from-[#2B090F] to-transparent z-10 pointer-events-none" />

        <div
          className="animate-marquee-left flex gap-4 sm:gap-6 py-2 px-4 group-hover/track:[animation-play-state:paused]"
          style={{
            animationDuration: '280s',
            animationPlayState: isPaused ? 'paused' : undefined,
          }}
        >
          {marqueeItems.map((guru, index) => (
            <div
              key={`${guru.id}-${index}`}
              className="w-32 sm:w-44 bg-white/95 backdrop-blur-xs rounded-2xl p-2 sm:p-3 border-2 border-sacredGold-400/60 shadow-md hover:shadow-sacred hover:scale-105 transition-all duration-300 flex flex-col items-center shrink-0 group relative select-none"
            >
              {/* Chronological Sequence Badge */}
              <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-10 px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-md bg-gradient-to-r from-maroon-950 to-maroon-900 text-sacredGold-300 font-devanagari font-bold text-[9px] sm:text-[11px] border border-sacredGold-400/60 shadow-xs">
                #{guru.id}
              </span>

              {/* Guru Portrait */}
              <div className="w-full h-28 sm:h-40 rounded-xl overflow-hidden bg-stone-100 border border-sacredGold-200 mb-1.5 sm:mb-2 relative shadow-xs">
                <img
                  src={guru.image}
                  alt={guru.name}
                  className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.errorRetried) {
                      e.currentTarget.dataset.errorRetried = 'true';
                      e.currentTarget.src = guru.image.split('?')[0];
                    }
                  }}
                />
              </div>

              {/* Name */}
              <span className="font-devanagari font-bold text-[11px] sm:text-sm text-stone-900 text-center leading-tight line-clamp-1 group-hover:text-maroon-800 transition-colors">
                {guru.name}
              </span>

              {/* Spiritual Era / Title */}
              <span className="text-[9px] sm:text-[10px] text-maroon-700 font-semibold tracking-wider mt-0.5 sm:mt-1 text-center line-clamp-1">
                {guru.era}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SantVanshavaliMarquee;
