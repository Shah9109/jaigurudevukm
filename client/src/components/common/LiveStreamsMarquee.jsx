import React, { useState, useEffect } from 'react';
import { Youtube, Play, Pause, ExternalLink, Calendar, Radio, X } from 'lucide-react';
import api from '../../services/api';

// Current 10 latest videos from today (04.10.2026) backwards to past 10
const DEFAULT_FALLBACK_STREAMS = [
  {
    id: 'PGKVT_dwo1w',
    videoId: 'PGKVT_dwo1w',
    title: 'सेवा करने लग जाओगे तो सतसंग भी समझ आने लगेगा और भजन में भी दया होने लग जाएगी। #babaumakantjimaharaj',
    thumbnail: 'https://i.ytimg.com/vi/PGKVT_dwo1w/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=PGKVT_dwo1w',
    channel: 'Jaigurudevukm',
    publishedDate: '04 अक्टू॰ 2026',
    formattedDate: '04 अक्टू॰ 2026 (आज)'
  },
  {
    id: 'DCKnCHQ-wl4',
    videoId: 'DCKnCHQ-wl4',
    title: 'अच्छे-अच्छे साधकों और सेवादारों के विचार क्यों बदल जाते हैं? #babaumakantjimaharaj #jaigurudev',
    thumbnail: 'https://i.ytimg.com/vi/DCKnCHQ-wl4/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=DCKnCHQ-wl4',
    channel: 'Jaigurudevukm',
    publishedDate: '04 अक्टू॰ 2026',
    formattedDate: '04 अक्टू॰ 2026 (आज)'
  },
  {
    id: 'mxTE_ki2TjI',
    videoId: 'mxTE_ki2TjI',
    title: 'TV Episode 1904 | जगह-जगह पर साप्ताहिक सतसंग स्थापित करने का अभियान चालू करो',
    thumbnail: 'https://i.ytimg.com/vi/mxTE_ki2TjI/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=mxTE_ki2TjI',
    channel: 'Jaigurudevukm',
    publishedDate: '04 अक्टू॰ 2026',
    formattedDate: '04 अक्टू॰ 2026 (आज)'
  },
  {
    id: 'IRu_I5d9KoI',
    videoId: 'IRu_I5d9KoI',
    title: 'TV Episode 1903 | दृष्टांत: भक्ति कब पूरी नहीं होती है?',
    thumbnail: 'https://i.ytimg.com/vi/IRu_I5d9KoI/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=IRu_I5d9KoI',
    channel: 'Jaigurudevukm',
    publishedDate: '03 अक्टू॰ 2026',
    formattedDate: '03 अक्टू॰ 2026'
  },
  {
    id: 'DYODeKqcU08',
    videoId: 'DYODeKqcU08',
    title: 'गृहस्थी में एक दूसरे को सुनना चाहिए और एक दूसरे की मदद करनी चाहिए। #babaumakantjimaharaj #jaigurudev',
    thumbnail: 'https://i.ytimg.com/vi/DYODeKqcU08/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=DYODeKqcU08',
    channel: 'Jaigurudevukm',
    publishedDate: '03 अक्टू॰ 2026',
    formattedDate: '03 अक्टू॰ 2026'
  },
  {
    id: 'TwdmOh2cTIk',
    videoId: 'TwdmOh2cTIk',
    title: 'धार्मिक उपदेश, सतसंग सुनते-सुनते ज्ञान हो जाता है और संस्कार बन जाता है। #babaumakantjimaharaj',
    thumbnail: 'https://i.ytimg.com/vi/TwdmOh2cTIk/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=TwdmOh2cTIk',
    channel: 'Jaigurudevukm',
    publishedDate: '03 अक्टू॰ 2026',
    formattedDate: '03 अक्टू॰ 2026'
  },
  {
    id: 'GTFb9YAwoz0',
    videoId: 'GTFb9YAwoz0',
    title: 'TV Episode 1902 | विदेशी ताकतें किस प्रकार भारत के नौजवानों को बर्बाद करना चाह रही हैं?',
    thumbnail: 'https://i.ytimg.com/vi/GTFb9YAwoz0/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=GTFb9YAwoz0',
    channel: 'Jaigurudevukm',
    publishedDate: '03 अक्टू॰ 2026',
    formattedDate: '03 अक्टू॰ 2026'
  },
  {
    id: 'OazYrr953zA',
    videoId: 'OazYrr953zA',
    title: 'अपने लक्ष्य की तरफ आगे बढ़ते जाओ तो माया परछाई की तरह पीछे-पीछे चलने लगती है। #babaumakantjimaharaj',
    thumbnail: 'https://i.ytimg.com/vi/OazYrr953zA/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=OazYrr953zA',
    channel: 'Jaigurudevukm',
    publishedDate: '02 अक्टू॰ 2026',
    formattedDate: '02 अक्टू॰ 2026'
  },
  {
    id: 'TweubhGbuO0',
    videoId: 'TweubhGbuO0',
    title: 'महाराज जी को अगर अन्तर में देखना चाहो तो उनके द्वारा बताए गए उपाय से अन्तर में देखो। #jaigurudev',
    thumbnail: 'https://i.ytimg.com/vi/TweubhGbuO0/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=TweubhGbuO0',
    channel: 'Jaigurudevukm',
    publishedDate: '02 अक्टू॰ 2026',
    formattedDate: '02 अक्टू॰ 2026'
  },
  {
    id: 'DoGEHvRkdkw',
    videoId: 'DoGEHvRkdkw',
    title: 'जितनी भी बार साधना पर बैठो, सम्पुट लगाकर सुमिरन, ध्यान, भजन करो। #babaumakantjimaharaj #jaigurudev',
    thumbnail: 'https://i.ytimg.com/vi/DoGEHvRkdkw/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=DoGEHvRkdkw',
    channel: 'Jaigurudevukm',
    publishedDate: '30 सित॰ 2026',
    formattedDate: '30 सित॰ 2026'
  }
];

export const LiveStreamsMarquee = () => {
  const [streams, setStreams] = useState(DEFAULT_FALLBACK_STREAMS);
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchStreams = async () => {
      try {
        const res = await api.get('/streams');
        if (isMounted && res.data && Array.isArray(res.data) && res.data.length > 0) {
          // Strictly take top 10 items from today backwards
          setStreams(res.data.slice(0, 10));
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

  // Strictly keep exactly 10 videos, duplicated once for a 20-card infinite seamless track
  const current10 = (streams || []).slice(0, 10);
  const displayStreams = [...current10, ...current10];

  return (
    <div className="w-full py-10 bg-gradient-to-b from-[#FFF0F3] via-[#FFE4E8] to-[#FFF0F3] text-stone-900 border-y border-pink-200 overflow-hidden relative select-none">
      {/* Background Sacred Accents */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#E1828D_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold border border-pink-300 mb-2 animate-pulse">
            <Radio className="w-3.5 h-3.5 text-pink-600" />
            <span>नवीनतम 10 सत्संग वीडियो — आज से प्रारम्भ (Today's Latest 10 Videos)</span>
            <span className="text-[10px] text-pink-600 font-normal hidden sm:inline">• माउस ले जाकर रोकें (Hover to Pause)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-maroon-950">
            Official YouTube Live Streams & Latest Videos
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 font-light">
            पूज्य बाबा उमाकान्त जी महाराज के नित्य पावन सत्संग एवं अमृत वचनों के नवीनतम 10 वीडियो (आज से पिछले दिनों तक)
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "गति शुरू करें (Resume Stream Motion)" : "गति रोकें (Pause Stream Motion)"}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-pink-50 text-stone-700 hover:text-maroon-800 font-bold text-xs border border-pink-300 shadow-xs transition-all"
          >
            {isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-600 fill-current" />
                <span>गति शुरू करें (Play)</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 text-stone-600 fill-current" />
                <span>गति रोकें (Pause)</span>
              </>
            )}
          </button>

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
      </div>

      {/* Infinite Smooth Moving Marquee Track (Gentle Left Flow starting at item 1 today) */}
      <div className="relative w-full overflow-hidden group/track">
        {/* Left & Right Shadow Vignettes */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#FFF0F3] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FFF0F3] to-transparent z-10 pointer-events-none" />

        <div
          className="animate-marquee-left flex gap-5 py-2 group-hover/track:[animation-play-state:paused]"
          style={{
            animationDuration: '75s',
            animationPlayState: isPaused ? 'paused' : undefined,
          }}
        >
          {displayStreams.map((stream, idx) => {
            const displayDate = stream.formattedDate || stream.publishedDate || stream.date || 'हालिया';
            return (
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
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-bold shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>SATSANG</span>
                  </div>

                  {/* Prominent Publication Date Badge */}
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-stone-950/85 backdrop-blur-xs text-amber-300 border border-amber-400/40 text-[10px] font-bold shadow-md flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>{displayDate}</span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="w-11 h-11 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>
                </div>

                {/* Video Title */}
                <h3 className="font-serif font-bold text-xs sm:text-sm text-stone-900 group-hover:text-pink-600 line-clamp-2 leading-tight transition-colors">
                  {stream.title}
                </h3>

                {/* Footer with Date and Watch Stream Link */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-pink-100 text-[11px] text-stone-500">
                  <span className="font-semibold text-rose-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                    <span>{displayDate}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-red-600 font-bold group-hover:underline">
                    <span>Watch Stream</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
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
