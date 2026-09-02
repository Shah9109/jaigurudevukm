import React from 'react';
import { Sparkles } from 'lucide-react';

export const SantVanshavaliMarquee = () => {
  const gurus = [
    { id: 1, name: 'सन्त कबीरदास जी', image: '/images/gurus/guru_1_sant_kabirdas.jpg', era: 'प्रथम संत' },
    { id: 2, name: 'गुरु नानक देव जी', image: '/images/gurus/guru_2_guru_nanak_dev.jpg', era: 'सिख परंपरा' },
    { id: 3, name: 'गुरु अंगद देव जी', image: '/images/gurus/guru_3_guru_angad_dev.jpg', era: 'द्वितीय पातशाही' },
    { id: 4, name: 'गुरु अमरदास जी', image: '/images/gurus/guru_4_guru_amardas.jpg', era: 'तृतीय पातशाही' },
    { id: 5, name: 'गुरु रामदास जी', image: '/images/gurus/guru_5_guru_ramdas.jpg', era: 'चतुर्थ पातशाही' },
    { id: 6, name: 'गुरु अर्जुन देव जी', image: '/images/gurus/guru_6_guru_arjun_dev.jpg', era: 'पंचम पातशाही' },
    { id: 7, name: 'गुरु हर गोविन्द जी', image: '/images/gurus/guru_7_guru_har_gobind.jpg', era: 'षष्ठम पातशाही' },
    { id: 8, name: 'गुरु हर राय जी', image: '/images/gurus/guru_8_guru_har_rai.jpg', era: 'सप्तम पातशाही' },
    { id: 9, name: 'गुरु हर किशन जी', image: '/images/gurus/guru_9_guru_har_kishan.jpg', era: 'अष्टम पातशाही' },
    { id: 10, name: 'गुरु तेग बहादुर जी', image: '/images/gurus/guru_10_guru_teg_bahadur.jpg', era: 'नवम पातशाही' },
    { id: 11, name: 'गुरु गोविन्द सिंह जी', image: '/images/gurus/guru_11_guru_gobind_singh.jpg', era: 'दशम पातशाही' },
    { id: 12, name: 'तुलसीदास जी (हाथरस)', image: '/images/gurus/guru_12_tulsidas_ji_hathras.jpg', era: 'संत मत' },
    { id: 13, name: 'शिवदयाल जी', image: '/images/gurus/guru_13_shivdayal_ji.jpg', era: 'राधास्वामी परंपरा' },
    { id: 14, name: 'विष्णु दयाल जी', image: '/images/gurus/guru_14_vishnu_dayal_ji.jpg', era: 'संत परंपरा' },
    { id: 15, name: 'घूरेलाल जी महाराज', image: '/images/gurus/guru_15_ghurelal_ji_maharaj.jpg', era: 'दादा गुरु' },
    { id: 16, name: 'बाबा जयगुरुदेव जी', image: '/images/gurus/guru_16_baba_jaigurudev_ji.jpg', era: 'मथुरा आश्रम' },
    { id: 17, name: 'बाबा उमाकान्त जी', image: '/images/gurus/guru_17_baba_umakant_ji.jpg', era: 'वक्त के सतगुरु' },
  ];

  // Duplicate for seamless infinite loop
  const marqueeItems = [...gurus, ...gurus];

  return (
    <section className="py-6 sm:py-8 bg-gradient-to-r from-[#2B090F] via-[#4D1219] to-[#2B090F] border-y-2 border-sacredGold-400/40 overflow-hidden relative shadow-lg">
      {/* Top Banner Tagline */}
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-sacredGold-500/15 border border-sacredGold-400/40 text-sacredGold-300 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-sacredGold-400" />
          <span className="font-devanagari">॥ पावन सन्त वंशावली — अखंड संत परंपरा एवं गुरु धारा ॥</span>
        </div>
      </div>

      {/* Infinite Moving Right Marquee Track */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge gradient fading */}
        <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-[#2B090F] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-[#2B090F] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-right flex gap-4 sm:gap-6 py-2">
          {marqueeItems.map((guru, index) => (
            <div
              key={`${guru.id}-${index}`}
              className="w-36 sm:w-44 bg-white/95 backdrop-blur-xs rounded-2xl p-2.5 sm:p-3 border-2 border-sacredGold-400/60 shadow-md hover:shadow-sacred hover:scale-105 transition-all duration-300 flex flex-col items-center shrink-0 group"
            >
              {/* Cropped Guru Portrait */}
              <div className="w-full h-32 sm:h-40 rounded-xl overflow-hidden bg-stone-100 border border-sacredGold-200 mb-2 relative">
                <img
                  src={guru.image}
                  alt={guru.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Name & Era */}
              <span className="font-devanagari font-bold text-xs sm:text-sm text-stone-900 text-center leading-tight line-clamp-1">
                {guru.name}
              </span>
              <span className="text-[10px] text-maroon-700 font-semibold tracking-wider mt-0.5">
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
