import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronRight, X, AlertTriangle } from 'lucide-react';
import api from '../../services/api';

export const AnnouncementBar = ({
  text: propText,
  link: propLink,
  isEmergency: propIsEmergency,
  enabled: propEnabled,
}) => {
  const [settings, setSettings] = useState({
    enabled: propEnabled !== undefined ? propEnabled : true,
    text: propText || 'श्री कृष्ण जन्माष्टमी पावन सत्संग कार्यक्रम — आगरा (Agra) में 2 से 4 तक आयोजित।',
    link: propLink || '/satsang',
    isEmergency: propIsEmergency !== undefined ? propIsEmergency : false,
  });
  const [visible, setVisible] = useState(true);

  // Fetch real-time settings configured by Admin Panel
  useEffect(() => {
    let isMounted = true;
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (isMounted && res.success && res.data?.announcementBar) {
          const ab = res.data.announcementBar;
          setSettings({
            enabled: ab.enabled !== undefined ? Boolean(ab.enabled) : true,
            text: ab.text || 'श्री कृष्ण जन्माष्टमी पावन सत्संग कार्यक्रम — आगरा (Agra) में 2 से 4 तक आयोजित।',
            link: ab.link || '/satsang',
            isEmergency: Boolean(ab.isEmergency),
          });
        }
      } catch (err) {
        console.warn('AnnouncementBar using local cache fallback');
      }
    };

    fetchSettings();

    // Re-fetch instantly when Admin saves changes
    const onSettingsUpdate = () => {
      fetchSettings();
    };
    window.addEventListener('site-settings-updated', onSettingsUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('site-settings-updated', onSettingsUpdate);
    };
  }, []);

  // Update if props change
  useEffect(() => {
    if (propText !== undefined || propEnabled !== undefined) {
      setSettings((prev) => ({
        ...prev,
        text: propText !== undefined ? propText : prev.text,
        link: propLink !== undefined ? propLink : prev.link,
        isEmergency: propIsEmergency !== undefined ? propIsEmergency : prev.isEmergency,
        enabled: propEnabled !== undefined ? propEnabled : prev.enabled,
      }));
    }
  }, [propText, propLink, propIsEmergency, propEnabled]);

  if (!settings.enabled || !visible) return null;

  const isExternal = settings.link && /^https?:\/\//i.test(settings.link);

  return (
    <aside
      aria-label="Announcement"
      className={`relative z-40 transition-all duration-300 py-2 px-3 sm:px-6 text-xs sm:text-sm font-medium ${
        settings.isEmergency
          ? 'bg-red-700 text-white shadow-md animate-pulse border-b border-red-500'
          : 'bg-gradient-to-r from-roseBlush-700 via-maroon-700 to-roseBlush-800 text-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden flex-1 justify-center sm:justify-start">
          <span
            className={`flex items-center justify-center p-1 rounded-full shrink-0 ${
              settings.isEmergency
                ? 'bg-white text-red-700 animate-bounce'
                : 'bg-sacredGold-400 text-maroon-900'
            }`}
          >
            {settings.isEmergency ? (
              <AlertTriangle className="w-3.5 h-3.5" />
            ) : (
              <Bell className="w-3.5 h-3.5 animate-bounce" />
            )}
          </span>

          <span
            className={`font-semibold uppercase tracking-wider text-[11px] shrink-0 hidden sm:inline ${
              settings.isEmergency ? 'text-yellow-200' : 'text-sacredGold-300'
            }`}
          >
            {settings.isEmergency ? 'आपातकालीन सूचना / Emergency Alert:' : 'सूचना / Notice:'}
          </span>

          <p className="truncate text-white/95 text-center sm:text-left font-devanagari">
            {settings.text}
          </p>

          {settings.link && (
            isExternal ? (
              <a
                href={settings.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-0.5 text-sacredGold-300 hover:text-white font-semibold underline underline-offset-2 shrink-0 ml-1 transition-colors"
              >
                <span>View Details</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            ) : (
              <Link
                to={settings.link}
                className="inline-flex items-center gap-0.5 text-sacredGold-300 hover:text-white font-semibold underline underline-offset-2 shrink-0 ml-1 transition-colors"
              >
                <span>View Details</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            )
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
