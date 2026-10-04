import React, { useState } from 'react';
import { Play, Clock, User, X } from 'lucide-react';

export const VideoCard = ({ video }) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (!video) return null;

  const ytId = video.youtubeId || video.videoId || video.id;

  const getYoutubeEmbedUrl = () => {
    if (ytId) {
      return `https://www.youtube.com/embed/${ytId}?autoplay=1`;
    }
    return video.videoUrl;
  };

  const thumbUrl =
    video.thumbnailUrl ||
    video.thumbnail ||
    (ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : '/images/baba_jaigurudev.jpg');

  return (
    <>
      <div className="group bg-white rounded-3xl border border-roseBlush-200 shadow-soft hover:shadow-sacred transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1">
        {/* Thumbnail with Play Button */}
        <div
          onClick={() => setModalOpen(true)}
          className="relative aspect-video w-full bg-stone-900 cursor-pointer overflow-hidden"
        >
          <img
            src={thumbUrl}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />

          {/* Overlay & Central Play Button */}
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 flex items-center justify-center transition-colors">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 fill-white ml-0.5" />
            </div>
          </div>

          {video.duration && (
            <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" />
              <span>{video.duration}</span>
            </div>
          )}

          {video.isLiveStream || video.category === 'Live Stream' ? (
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold shadow-md">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>LIVE STREAM</span>
            </div>
          ) : (
            <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-maroon-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase shadow-xs">
              {video.category || 'Discourse'}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3
              onClick={() => setModalOpen(true)}
              className="text-base font-serif font-bold text-stone-900 group-hover:text-red-600 cursor-pointer transition-colors mb-2 line-clamp-2 leading-snug"
            >
              {video.title}
            </h3>

            {video.views && (
              <p className="text-[11px] text-stone-500 mb-2">
                {video.views} • {video.publishedDate || video.date || 'हाल ही में'}
              </p>
            )}
          </div>

          <div className="pt-2.5 border-t border-roseBlush-100 flex items-center justify-between text-xs text-stone-500">
            <span className="flex items-center gap-1.5 truncate text-[11px]">
              <User className="w-3.5 h-3.5 text-maroon-600 shrink-0" />
              <span className="truncate">{video.speaker || 'Pujya Maharaj Ji'}</span>
            </span>

            <button
              onClick={() => setModalOpen(true)}
              className="font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer text-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-3 bg-stone-900 text-white border-b border-stone-800">
              <h3 className="font-medium text-sm truncate max-w-md">{video.title}</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
                aria-label="Close Video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              {ytId || video.videoType === 'youtube' ? (
                <iframe
                  src={getYoutubeEmbedUrl()}
                  title={video.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={video.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCard;
