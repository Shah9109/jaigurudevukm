import React, { useState, useEffect } from 'react';
import { Radio, Play, X, ExternalLink, Youtube, Sparkles } from 'lucide-react';
import api from '../../services/api';

export const LiveStreamPopupAlert = () => {
  const [liveInfo, setLiveInfo] = useState(null);
  const [visible, setVisible] = useState(false);
  const [activeModalVideo, setActiveModalVideo] = useState(null);

  useEffect(() => {
    const checkLiveStream = async () => {
      try {
        const res = await api.get('/live-now');
        if (res.success && res.data && res.data.isLiveNow) {
          setLiveInfo(res.data);
          const isDismissed = sessionStorage.getItem('dismissed_live_' + res.data.videoId);
          if (!isDismissed) {
            setVisible(true);
          }
        } else {
          // If not currently live in real time, do not show intrusive popup
          setVisible(false);
        }
      } catch (err) {
        console.error('Error checking live stream:', err);
      }
    };

    // Check immediately on load
    checkLiveStream();

    // Check again every 60 seconds so live broadcast pops up in real-time as soon as it starts
    const interval = setInterval(checkLiveStream, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    if (liveInfo?.videoId) {
      sessionStorage.setItem('dismissed_live_' + liveInfo.videoId, 'true');
    }
  };

  if (!liveInfo || !visible) return null;

  return (
    <>
      {/* Floating Live Stream Popup Toast (Bottom Left) */}
      <div className="fixed bottom-20 xl:bottom-6 left-4 sm:left-6 z-40 max-w-sm w-[calc(100vw-2rem)] animate-in fade-in slide-in-from-bottom-5 duration-300">
        <div className="bg-gradient-to-br from-[#2E0B11] via-[#4D1219] to-[#1A0508] text-white p-3.5 sm:p-4 rounded-3xl border-2 border-sacredGold-400 shadow-2xl shadow-maroon-950/70 relative overflow-hidden group">
          {/* Pulsing red live glow aura */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-red-600/25 rounded-full blur-2xl pointer-events-none animate-pulse" />

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/10 hover:bg-white/25 text-roseBlush-200 hover:text-white flex items-center justify-center transition-colors z-10"
            aria-label="Dismiss live stream notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-start gap-3">
            {/* Real-Time Live Thumbnail with Play Button */}
            <div
              onClick={() => setActiveModalVideo(liveInfo.videoId)}
              className="relative w-24 h-16 rounded-xl overflow-hidden bg-black shrink-0 cursor-pointer border-2 border-sacredGold-400/80 group/thumb shadow-md"
            >
              <img
                src={liveInfo.thumbnail || `https://i.ytimg.com/vi/${liveInfo.videoId}/hqdefault.jpg`}
                alt={liveInfo.title}
                className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-red-600 group-hover/thumb:bg-red-500 text-white flex items-center justify-center shadow-md">
                  <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                </div>
              </div>
            </div>

            {/* Live Stream Title & CTA */}
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-extrabold tracking-wider animate-pulse shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>🔴 LIVE NOW ON YOUTUBE</span>
                </span>
              </div>

              <h4
                onClick={() => setActiveModalVideo(liveInfo.videoId)}
                className="text-xs font-serif font-bold text-sacredGold-200 line-clamp-2 leading-tight cursor-pointer hover:text-white transition-colors mb-2"
              >
                {liveInfo.title}
              </h4>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModalVideo(liveInfo.videoId)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] shadow-sm transition-all transform hover:scale-105"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Watch Live</span>
                </button>

                <a
                  href={liveInfo.streamUrl || `https://www.youtube.com/watch?v=${liveInfo.videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-roseBlush-200 hover:text-white font-semibold transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5 text-red-500" />
                  <span>YouTube</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High Definition Video Modal */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border-2 border-sacredGold-400 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModalVideo(null)}
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
              aria-label="Close live stream player"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeModalVideo}?autoplay=1`}
                title="Live Satsang Stream"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveStreamPopupAlert;
