import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Calendar, Download, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import SmartMediaPreview from '../common/SmartMediaPreview';

export const NoticeCard = ({ notice }) => {
  if (!notice) return null;

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'Emergency':
        return 'bg-red-500 text-white border-red-600 animate-pulse';
      case 'Very Important':
        return 'bg-rose-600 text-white border-rose-700';
      case 'Important':
        return 'bg-amber-500 text-white border-amber-600';
      default:
        return 'bg-roseBlush-100 text-maroon-800 border-roseBlush-200';
    }
  };

  const publishDate = new Date(notice.publishDate || notice.createdAt || Date.now()).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const isLinkOnly = notice.displayMode === 'link_only' && notice.mediaUrl;
  const isLinkWithDetails = notice.displayMode === 'link_with_details' && notice.mediaUrl;

  return (
    <div className="bg-white rounded-2xl border border-roseBlush-100 shadow-soft hover:shadow-md transition-all p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${getPriorityStyle(notice.priority)}`}>
            {notice.priority || 'Notice'}
          </span>
          <div className="flex items-center gap-1.5 text-stone-400 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            <span>{publishDate}</span>
          </div>
        </div>

        {/* Media Preview (Google Drive / YouTube / Image) */}
        {notice.mediaUrl && (
          <div className="mb-3">
            <SmartMediaPreview
              url={notice.mediaUrl}
              title={notice.title}
              displayMode={notice.displayMode}
            />
          </div>
        )}

        <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 hover:text-maroon-700 transition-colors mb-2 line-clamp-2">
          {isLinkOnly ? (
            <a href={notice.mediaUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-2">
              <span>{notice.title}</span>
              <ExternalLink className="w-4 h-4 text-maroon-700 shrink-0" />
            </a>
          ) : (
            <Link to={`/notices/${notice._id || notice.id || ''}`}>
              {notice.title}
            </Link>
          )}
        </h3>

        {!isLinkOnly && (
          <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4">
            {notice.content}
          </p>
        )}
      </div>

      <div className="pt-3 border-t border-roseBlush-100/60 flex items-center justify-between text-xs gap-2">
        <span className="font-semibold text-stone-500 truncate">{notice.category || 'Ashram Notice'}</span>

        <div className="flex items-center gap-2 shrink-0">
          {isLinkWithDetails && (
            <a
              href={notice.mediaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <span>Open Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {notice.attachmentUrl ? (
            <a
              href={notice.attachmentUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-bold text-maroon-700 hover:text-maroon-900"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          ) : isLinkOnly ? (
            <a
              href={notice.mediaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-bold text-maroon-700 hover:text-maroon-900"
            >
              <span>View Post</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <Link
              to={`/notices/${notice._id || notice.id || ''}`}
              className="inline-flex items-center gap-1 font-bold text-maroon-700 hover:text-maroon-900"
            >
              <span>Read Notice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
