import React from 'react';
import {
  Link as LinkIcon,
  Eye,
  ExternalLink,
  Youtube,
  Cloud,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import SmartMediaPreview from '../common/SmartMediaPreview';

export const MediaLinkSettingsField = ({
  mediaUrl,
  displayMode = 'full',
  onChangeUrl,
  onChangeMode
}) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-roseBlush-50/70 to-cream-50/60 border border-roseBlush-200 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-bold text-maroon-900 flex items-center gap-1.5">
          <LinkIcon className="w-4 h-4 text-maroon-700" />
          <span>Media / Google Drive / YouTube / Post Link</span>
        </label>
        <span className="text-[10px] font-semibold text-stone-500 bg-white px-2 py-0.5 rounded-full border border-roseBlush-200">
          Google Drive, YouTube, Image or URL
        </span>
      </div>

      <div>
        <input
          type="url"
          value={mediaUrl || ''}
          onChange={(e) => onChangeUrl(e.target.value)}
          placeholder="https://drive.google.com/... or https://youtube.com/... or https://..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-roseBlush-200 text-xs text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-roseBlush-300"
        />
        <p className="text-[11px] text-stone-500 mt-1.5 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1">
            <Cloud className="w-3 h-3 text-blue-600" />
            <span>Google Drive Share link automatically converts to preview image</span>
          </span>
          <span className="flex items-center gap-1">
            <Youtube className="w-3 h-3 text-red-600" />
            <span>YouTube links automatically embed player</span>
          </span>
        </p>
      </div>

      {/* Display Mode Selection */}
      <div className="space-y-2 pt-1 border-t border-roseBlush-100">
        <label className="text-xs font-bold text-stone-700 block">
          Admin Presentation Choice (क्या और कैसे दिखाना चाहते हैं?)
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onChangeMode('full')}
            className={`p-3 rounded-xl text-left border transition-all ${
              displayMode === 'full'
                ? 'bg-white border-maroon-700 shadow-xs ring-1 ring-maroon-700'
                : 'bg-white/60 border-stone-200 hover:bg-white text-stone-600'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900 mb-1">
              <Eye className="w-3.5 h-3.5 text-maroon-700" />
              <span>Full Details</span>
            </div>
            <p className="text-[10px] text-stone-500 leading-tight">
              Custom text details with embedded media preview.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onChangeMode('link_with_details')}
            className={`p-3 rounded-xl text-left border transition-all ${
              displayMode === 'link_with_details'
                ? 'bg-white border-maroon-700 shadow-xs ring-1 ring-maroon-700'
                : 'bg-white/60 border-stone-200 hover:bg-white text-stone-600'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900 mb-1">
              <ExternalLink className="w-3.5 h-3.5 text-blue-700" />
              <span>Details + Action Link</span>
            </div>
            <p className="text-[10px] text-stone-500 leading-tight">
              Details card with prominent external link button.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onChangeMode('link_only')}
            className={`p-3 rounded-xl text-left border transition-all ${
              displayMode === 'link_only'
                ? 'bg-white border-maroon-700 shadow-xs ring-1 ring-maroon-700'
                : 'bg-white/60 border-stone-200 hover:bg-white text-stone-600'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Link / Post Only</span>
            </div>
            <p className="text-[10px] text-stone-500 leading-tight">
              Focus entirely on media or external post direct click.
            </p>
          </button>
        </div>
      </div>

      {/* Live Preview in Admin Modal */}
      {mediaUrl && mediaUrl.trim() && (
        <div className="pt-2 border-t border-roseBlush-100 space-y-1.5">
          <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider block">
            Live Preview (कैसा दिखेगा):
          </span>
          <div className="max-w-md">
            <SmartMediaPreview url={mediaUrl} title="Live Admin Preview" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLinkSettingsField;
