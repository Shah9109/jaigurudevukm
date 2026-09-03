import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Phone, User, Calendar, Navigation, ExternalLink } from 'lucide-react';
import SmartMediaPreview from '../common/SmartMediaPreview';

export const SatsangCard = ({ satsang }) => {
  if (!satsang) return null;

  const dateObj = new Date(satsang.date || Date.now());
  const monthName = dateObj.toLocaleString('default', { month: 'short' });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  const isLinkOnly = satsang.displayMode === 'link_only' && satsang.mediaUrl;
  const isLinkWithDetails = satsang.displayMode === 'link_with_details' && satsang.mediaUrl;

  return (
    <div className="group bg-white rounded-2xl border border-roseBlush-100 shadow-soft hover:shadow-sacred transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1">
      <div className="p-5 sm:p-6">
        {/* Media Preview (Google Drive / YouTube / Image) */}
        {satsang.mediaUrl && (
          <div className="mb-4">
            <SmartMediaPreview
              url={satsang.mediaUrl}
              title={satsang.title}
              displayMode={satsang.displayMode}
            />
          </div>
        )}

        {/* Top bar: Date Badge & Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-roseBlush-600 to-maroon-700 text-white flex flex-col items-center justify-center font-serif shadow-xs shrink-0">
              <span className="text-xl font-bold leading-none">{day}</span>
              <span className="text-[11px] uppercase tracking-wider font-sans font-medium">{monthName}</span>
            </div>
            <div>
              <span className="text-xs text-stone-500 font-medium block">{year}</span>
              <span className="text-xs font-semibold text-sacredGold-700 inline-block px-2 py-0.5 rounded-md bg-sacredGold-50 border border-sacredGold-200">
                {satsang.isDaily ? 'Daily Satsang' : 'Special Program'}
              </span>
            </div>
          </div>

          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${
            satsang.status === 'upcoming'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-stone-100 text-stone-600'
          }`}>
            {satsang.status || 'Upcoming'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-maroon-700 transition-colors mb-3 line-clamp-2">
          {isLinkOnly ? (
            <a href={satsang.mediaUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-2">
              <span>{satsang.title}</span>
              <ExternalLink className="w-4 h-4 text-maroon-700 shrink-0" />
            </a>
          ) : (
            <Link to={`/satsang/${satsang._id || satsang.id || ''}`}>
              {satsang.title}
            </Link>
          )}
        </h3>

        {/* Details list */}
        <div className="space-y-2 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-maroon-600 shrink-0" />
            <span className="font-medium text-stone-700">{satsang.startTime} {satsang.endTime ? `– ${satsang.endTime}` : ''}</span>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-maroon-600 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{satsang.location}, {satsang.city}</span>
          </div>

          {satsang.speaker && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-maroon-600 shrink-0" />
              <span>{satsang.speaker}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer link */}
      <div className="px-5 py-3.5 bg-roseBlush-50/50 border-t border-roseBlush-100 flex items-center justify-between">
        <span className="text-xs text-stone-500 truncate max-w-[160px]">
          {satsang.contactNumber ? `Ph: ${satsang.contactNumber}` : 'Jaigurudev Ashram'}
        </span>
        <Link
          to={`/satsang/${satsang._id || satsang.id || ''}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-maroon-700 hover:text-maroon-900 group-hover:translate-x-0.5 transition-all"
        >
          <span>View Details</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default SatsangCard;
