import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronRight, X, Sparkles } from 'lucide-react';

export const AnnouncementBar = ({
  text = 'श्री कृष्ण जन्माष्टमी पावन सत्संग कार्यक्रम — आगरा (Agra) में 2 से 4 तक आयोजित।',
  link = '/satsang',
  isEmergency = false,
  enabled = true,
}) => {
  const [visible, setVisible] = useState(true);

  if (!enabled || !visible) return null;

  return (
    <aside aria-label="Announcement" className={`relative z-40 transition-all duration-300 py-2 px-3 sm:px-6 text-xs sm:text-sm font-medium ${
      isEmergency
        ? 'bg-rose-700 text-white shadow-sm animate-pulse'
        : 'bg-gradient-to-r from-roseBlush-700 via-maroon-700 to-roseBlush-800 text-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden flex-1 justify-center sm:justify-start">
          <span className="flex items-center justify-center p-1 rounded-full bg-sacredGold-400 text-maroon-900 shrink-0">
            <Bell className="w-3.5 h-3.5 animate-bounce" />
          </span>
          <span className="font-semibold text-sacredGold-300 uppercase tracking-wider text-[11px] shrink-0 hidden sm:inline">
            सूचना / Notice:
          </span>
          <p className="truncate text-white/95 text-center sm:text-left">
            {text}
          </p>
          {link && (
            <Link
              to={link}
              className="inline-flex items-center gap-0.5 text-sacredGold-300 hover:text-white font-semibold underline underline-offset-2 shrink-0 ml-1 transition-colors"
            >
              <span>View Details</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        <button
          onClick={() => setVisible(false)}
          className="text-white/70 hover:text-white p-1 rounded transition-colors shrink-0"
          aria-label="Close announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};

export default AnnouncementBar;
