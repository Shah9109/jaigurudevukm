import React, { useState, useEffect } from 'react';
import { Youtube, Play, ExternalLink, Sparkles, Radio, X } from 'lucide-react';
import api from '../../services/api';

const DEFAULT_FALLBACK_STREAMS = [
  {
    id: 'q_y5df4yhq0',
    videoId: 'q_y5df4yhq0',
    title: 'Satsang | Satna-Chitrakoot Road, Babupur, MP | Param Pujya Baba Umakant Ji Maharaj',
    thumbnail: 'https://i.ytimg.com/vi/q_y5df4yhq0/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=q_y5df4yhq0',
    channel: 'Jaigurudevukm'
  },
  {
    id: 'iI7_q03OhUA',
    videoId: 'iI7_q03OhUA',
    title: 'Satsang & Naamdan | Babupur, Satna MP | Baba Umakant Ji Maharaj',
    thumbnail: 'https://i.ytimg.com/vi/iI7_q03OhUA/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=iI7_q03OhUA',
    channel: 'Jaigurudevukm'
  },
  {
    id: 'OG_u1nC7owQ',
    videoId: 'OG_u1nC7owQ',
    title: 'Evening Satsang | Chitrakoot Region | Baba Umakant Ji Maharaj',
    thumbnail: 'https://i.ytimg.com/vi/OG_u1nC7owQ/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=OG_u1nC7owQ',
    channel: 'Jaigurudevukm'
  },
  {
    id: 'eNBvAPWfKyE',
    videoId: 'eNBvAPWfKyE',
    title: 'Amrit Vani & Updesh | Param Sant Baba Umakant Ji Maharaj',
    thumbnail: 'https://i.ytimg.com/vi/eNBvAPWfKyE/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=eNBvAPWfKyE',
    channel: 'Jaigurudevukm'
  },
  {
    id: 'jpxokz4XxW4',
    videoId: 'jpxokz4XxW4',
    title: 'Divya Sandesh & Naam Mahima | Jaigurudev UKM Official',
    thumbnail: 'https://i.ytimg.com/vi/jpxokz4XxW4/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=jpxokz4XxW4',
    channel: 'Jaigurudevukm'
  },
  {
    id: 'nr0hailrs7A',
    videoId: 'nr0hailrs7A',
    title: 'Daily Satsang Live Stream | Ujjain Ashram | Baba Umakant Ji Maharaj',
    thumbnail: 'https://i.ytimg.com/vi/nr0hailrs7A/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=nr0hailrs7A',
    channel: 'Jaigurudevukm'
  },
  {
    id: 'kcl9mOd30oo',
    videoId: 'kcl9mOd30oo',
    title: 'Shakahar Prachar & Satsang | Jaigurudev UKM Live',
    thumbnail: 'https://i.ytimg.com/vi/kcl9mOd30oo/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=kcl9mOd30oo',
    channel: 'Jaigurudevukm'
  },
  {
    id: 'TmWlGPLXT8A',
    videoId: 'TmWlGPLXT8A',
    title: 'Spiritual Discourse & Shravan Satsang | Baba Umakant Ji Maharaj',
    thumbnail: 'https://i.ytimg.com/vi/TmWlGPLXT8A/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=TmWlGPLXT8A',
    channel: 'Jaigurudevukm'
  },
  {
    id: 'ScfWdoaeArw',
    videoId: 'ScfWdoaeArw',
    title: 'Special Adhyatmik Satsang | Baba Umakant Ji Maharaj',
    thumbnail: 'https://i.ytimg.com/vi/ScfWdoaeArw/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=ScfWdoaeArw',
    channel: 'Jaigurudevukm'
  },
  {
    id: 'pLUSNZ7Brjk',
    videoId: 'pLUSNZ7Brjk',
    title: 'Guruvani & Surat Shabd Yoga Updesh | Jaigurudev UKM',
    thumbnail: 'https://i.ytimg.com/vi/pLUSNZ7Brjk/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=pLUSNZ7Brjk',
    channel: 'Jaigurudevukm'
  }
];

export const LiveStreamsMarquee = () => {
  const [streams, setStreams] = useState(DEFAULT_FALLBACK_STREAMS);
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchStreams = async () => {
      try {
        const res = await api.get('/streams');
        if (isMounted && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setStreams(res.data);
        }
      } catch (err) {
        console.log('Using default streams cache');
      }
    };

    fetchStreams();
    // Refresh every 5 minutes so newly published streams are updated automatically
    const interval = setInterval(fetchStreams, 5 * 60 * 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Duplicate the array for seamless infinite moving right loop
  const displayStreams = [...streams, ...streams];

  return (
    <div className="w-full py-10 bg-gradient-to-b from-[#FFF0F3] via-[#FFE4E8] to-[#FFF0F3] text-stone-900 border-y border-pink-200 overflow-hidden relative select-none">
      {/* Background Sacred Accents */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#E1828D_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold border border-pink-300 mb-2 animate-pulse">
            <Radio className="w-3.5 h-3.5 text-pink-600" />
            <span>लाइव सत्संग एवं नवीनतम 10 धाराप्रवाह (Live & Recent Streams)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-maroon-950">
            Official YouTube Live Streams
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 font-light">
            पूज्य बाबा उमाकान्त जी महाराज के नित्य पावन सत्संग, नामदान एवं अमृत वचनों के नवीनतम 10 वीडियो
          </p>
        </div>

        <a
          href="https://www.youtube.com/@Jaigurudevukm/streams"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md hover:shadow-red-600/30 transition-all shrink-0"
        >
          <Youtube className="w-4 h-4" />
          <span>View All on YouTube Channel ›</span>
        </a>
      </div>

      {/* Infinite Moving Right Marquee Track */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Shadow Vignettes */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#FFF0F3] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FFF0F3] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-right flex gap-5 py-2">
          {displayStreams.map((stream, idx) => (
            <div
              key={`${stream.videoId}-${idx}`}
              onClick={() => setActiveVideoModal(stream.videoId)}
              className="w-72 sm:w-80 shrink-0 rounded-2xl bg-white hover:bg-pink-50/50 border-2 border-pink-200/90 hover:border-pink-400 p-3 shadow-soft hover:shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group"
            >
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-stone-900 border border-pink-200 mb-2.5">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-bold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>SATSANG STREAM</span>
                </div>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="w-11 h-11 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>
              </div>

              {/* Video Title & Details */}
              <h3 className="font-serif font-bold text-xs sm:text-sm text-stone-900 group-hover:text-pink-600 line-clamp-2 leading-tight transition-colors">
                {stream.title}
              </h3>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-pink-100 text-[10px] text-stone-500">
                <span className="font-semibold text-pink-700">Jaigurudev UKM</span>
                <span className="inline-flex items-center gap-1 text-red-600 font-bold group-hover:underline">
                  <span>Watch Stream</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Popup */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-sacredGold-500/40">
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoModal}?autoplay=1`}
                title="YouTube Live Stream"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStreamsMarquee;
