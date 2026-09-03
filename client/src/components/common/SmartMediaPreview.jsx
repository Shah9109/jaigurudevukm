import React, { useState } from 'react';
import {
  ExternalLink,
  Play,
  Image as ImageIcon,
  Maximize2,
  X,
  Youtube,
  Cloud,
  FileText
} from 'lucide-react';
import {
  detectMediaType,
  getDriveDirectImageUrl,
  getYouTubeVideoId,
  getYouTubeThumbnail,
  getYouTubeEmbedUrl
} from '../../utils/mediaUtils';

export const SmartMediaPreview = ({
  url,
  displayMode = 'full',
  title = '',
  className = '',
  showEmbedDirectly = false
}) => {
  const [isPlaying, setIsPlaying] = useState(showEmbedDirectly);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!url || typeof url !== 'string' || !url.trim()) return null;

  const mediaType = detectMediaType(url);

  // 1. YOUTUBE MEDIA
  if (mediaType === 'youtube') {
    const videoId = getYouTubeVideoId(url);
    const thumbUrl = getYouTubeThumbnail(url);

    if (isPlaying) {
      return (
        <div className={`relative w-full aspect-video rounded-2xl overflow-hidden shadow-md border border-roseBlush-200 bg-black ${className}`}>
          <iframe
            src={getYouTubeEmbedUrl(url)}
            title={title || 'YouTube video'}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    return (
      <div
        onClick={() => setIsPlaying(true)}
        className={`relative w-full aspect-video rounded-2xl overflow-hidden group cursor-pointer border border-roseBlush-200 shadow-soft bg-stone-900 ${className}`}
      >
        <img
          src={thumbUrl}
          alt={title || 'YouTube Preview'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 ml-0.5 fill-current" />
          </div>
        </div>
        <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
          <Youtube className="w-3.5 h-3.5" />
          <span>YouTube Video</span>
        </div>
      </div>
    );
  }

  // 2. GOOGLE DRIVE IMAGE / DIRECT IMAGE
  if (mediaType === 'gdrive' || mediaType === 'image') {
    const previewSrc = mediaType === 'gdrive' ? getDriveDirectImageUrl(url) : url;

    if (imgError) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className={`flex items-center justify-between p-3.5 rounded-2xl bg-roseBlush-50 border border-roseBlush-200 text-xs font-semibold text-maroon-800 hover:bg-roseBlush-100 transition-colors ${className}`}
        >
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-maroon-700" />
            <span>Google Drive / Image Link</span>
          </div>
          <ExternalLink className="w-4 h-4" />
        </a>
      );
    }

    return (
      <>
        <div className={`relative rounded-2xl overflow-hidden group border border-roseBlush-200 shadow-soft bg-stone-100 ${className}`}>
          <img
            src={previewSrc}
            alt={title || 'Media Preview'}
            onError={() => setImgError(true)}
            onClick={() => setLightboxOpen(true)}
            className="w-full h-auto max-h-96 object-cover cursor-zoom-in group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setLightboxOpen(true)}
              className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-xs transition-colors"
              title="View full image"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
          {mediaType === 'gdrive' && (
            <div className="absolute bottom-2 left-2 bg-blue-600/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
              <Cloud className="w-3 h-3" />
              <span>Google Drive</span>
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-xs"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={previewSrc}
              alt={title || 'Full View'}
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        )}
      </>
    );
  }

  // 3. EXTERNAL LINK / POST
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-roseBlush-50 to-cream-50 border border-roseBlush-200 text-stone-800 hover:border-maroon-300 hover:shadow-soft transition-all group ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-maroon-100 text-maroon-800 flex items-center justify-center shrink-0">
          <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </div>
        <div>
          <span className="text-xs font-bold text-maroon-900 block">
            {title || 'External Reference Post'}
          </span>
          <span className="text-[11px] text-stone-500 line-clamp-1 break-all">
            {url}
          </span>
        </div>
      </div>
      <span className="text-xs font-bold text-maroon-700 group-hover:text-maroon-900 flex items-center gap-1 shrink-0 ml-2">
        <span>Open</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </span>
    </a>
  );
};

export default SmartMediaPreview;
