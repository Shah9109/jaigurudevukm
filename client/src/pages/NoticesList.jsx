import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  ScrollText,
  Calendar,
  AlertCircle,
  FileText,
  Filter,
  Download,
  ShieldCheck,
  User,
  ExternalLink,
  MapPin,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import SEO from '../components/common/SEO';
import SectionTitle from '../components/common/SectionTitle';
import NoticeCard from '../components/cards/NoticeCard';
import EventCard from '../components/cards/EventCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';

export const NoticesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'notices'; // 'notices', 'adhesh', 'events'
  const [activeTab, setActiveTab] = useState(initialTab);

  // Notices State
  const [notices, setNotices] = useState([]);
  const [noticesLoading, setNoticesLoading] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [noticeSearch, setNoticeSearch] = useState('');

  // Adhesh State
  const [adheshList, setAdheshList] = useState([]);
  const [adheshLoading, setAdheshLoading] = useState(false);
  const [adheshSearch, setAdheshSearch] = useState('');

  // Events State
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventStatusFilter, setEventStatusFilter] = useState('upcoming');
  const [eventSearch, setEventSearch] = useState('');

  // Real-time Live Stream State
  const [liveNow, setLiveNow] = useState({
    isLiveNow: true,
    videoId: 'o9KlOqURRzU',
    title: 'Satsang | 02.09.2026 | Agra-Kanpur Rd, Etmadpur, Agra (UP) — परम पूज्य बाबा उमाकान्त जी महाराज',
  });

  useEffect(() => {
    const fetchLiveNow = async () => {
      try {
        const res = await api.get('/live-now');
        if (res.success && res.data) {
          setLiveNow(res.data);
        }
      } catch (e) {
        console.log('Live-now fallback active');
      }
    };
    fetchLiveNow();
  }, []);

  // Sync tab with URL
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  // Fetch Notices
  useEffect(() => {
    const fetchNotices = async () => {
      setNoticesLoading(true);
      try {
        const res = await api.get(`/notices?priority=${priorityFilter === 'all' ? '' : priorityFilter}`);
        if (res.success && res.data) {
          setNotices(res.data);
        }
      } catch (err) {
        console.error('Error loading notices:', err);
      } finally {
        setNoticesLoading(false);
      }
    };
    fetchNotices();
  }, [priorityFilter]);

  // Fetch Adhesh when Adhesh tab is opened
  useEffect(() => {
    if (activeTab === 'adhesh' && adheshList.length === 0) {
      const fetchAdhesh = async () => {
        setAdheshLoading(true);
        try {
          const res = await api.get('/adhesh');
          if (res.success && res.data) {
            setAdheshList(res.data);
          }
        } catch (err) {
          console.error('Error fetching adhesh:', err);
        } finally {
          setAdheshLoading(false);
        }
      };
      fetchAdhesh();
    }
  }, [activeTab, adheshList.length]);

  // Fetch Events when Events tab is opened
  useEffect(() => {
    if (activeTab === 'events') {
      const fetchEvents = async () => {
        setEventsLoading(true);
        try {
          const res = await api.get(`/events?status=${eventStatusFilter === 'all' ? '' : eventStatusFilter}`);
          if (res.success && res.data) {
            setEvents(res.data);
          }
        } catch (err) {
          console.error('Error loading events:', err);
        } finally {
          setEventsLoading(false);
        }
      };
      fetchEvents();
    }
  }, [activeTab, eventStatusFilter]);

  // Filtered data
  const filteredNotices = notices.filter((n) =>
    !noticeSearch ||
    n.title?.toLowerCase().includes(noticeSearch.toLowerCase()) ||
    n.content?.toLowerCase().includes(noticeSearch.toLowerCase())
  );

  const filteredAdhesh = adheshList.filter((a) =>
    !adheshSearch ||
    a.title?.toLowerCase().includes(adheshSearch.toLowerCase()) ||
    a.referenceNumber?.toLowerCase().includes(adheshSearch.toLowerCase()) ||
    a.description?.toLowerCase().includes(adheshSearch.toLowerCase())
  );

  const filteredEvents = events.filter((e) =>
    !eventSearch ||
    e.title?.toLowerCase().includes(eventSearch.toLowerCase()) ||
    e.city?.toLowerCase().includes(eventSearch.toLowerCase()) ||
    e.location?.toLowerCase().includes(eventSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-cream-50">
      <SEO
        title="Ashram Notices, Directives (Adhesh) & Events — Jaigurudev Official"
        description="Official notices, administrative directives (Ashram Adhesh), circulars, and annual festival events of Jaigurudev Sanstha."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SectionTitle
          hindiSubtitle="आश्रम सूचना पट्ट एवं आधिकारिक आदेश"
          title="Notices, Ashram Adhesh & Special Events"
          subtitle="Official announcements, organizational directives, circulars, and annual festival programs issued by Jaigurudev Sanstha."
        />

        {/* 3 Unified Primary Tabs Bar */}
        <div className="bg-white p-2 rounded-3xl border border-roseBlush-200 shadow-soft flex items-center justify-center max-w-3xl mx-auto gap-2">
          <button
            onClick={() => handleTabChange('notices')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'notices'
                ? 'bg-gradient-to-r from-maroon-700 to-roseBlush-700 text-white shadow-md'
                : 'text-stone-600 hover:text-maroon-800 hover:bg-roseBlush-50'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notices (सूचनाएँ)</span>
          </button>

          <button
            onClick={() => handleTabChange('adhesh')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'adhesh'
                ? 'bg-gradient-to-r from-maroon-700 to-roseBlush-700 text-white shadow-md'
                : 'text-stone-600 hover:text-maroon-800 hover:bg-roseBlush-50'
            }`}
          >
            <ScrollText className="w-4 h-4" />
            <span>Ashram Adhesh (आदेश)</span>
          </button>

          <button
            onClick={() => handleTabChange('events')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'events'
                ? 'bg-gradient-to-r from-maroon-700 to-roseBlush-700 text-white shadow-md'
                : 'text-stone-600 hover:text-maroon-800 hover:bg-roseBlush-50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Events (महोत्सव)</span>
          </button>
        </div>

        {/* TAB 1: NOTICES VIEW */}
        {activeTab === 'notices' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Real-time Live Satsang Stream Announcement Card */}
            {liveNow && (
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#2B090F] via-[#450E17] to-[#2B090F] text-white border-2 border-sacredGold-400 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                  <div className="lg:col-span-4 relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg border-2 border-sacredGold-400/60">
                    <iframe
                      src={`https://www.youtube.com/embed/${liveNow.videoId || 'o9KlOqURRzU'}?autoplay=0`}
                      title="Live Satsang Stream"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  <div className="lg:col-span-8 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-md animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-white" />
                        <span>🔴 {liveNow.isLiveNow ? 'LIVE SATSANG BROADCAST' : 'LATEST SATSANG STREAM'}</span>
                      </span>
                      <span className="text-xs text-sacredGold-300 font-semibold font-devanagari">
                        ॥ आधिकारिक यूट्यूब सीधा प्रसारण ॥
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-snug">
                      {liveNow.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-roseBlush-200/90 font-light leading-relaxed">
                      जयगुरुदेव धर्म प्रचारक संस्था के आधिकारिक यूट्यूब चैनल (@Jaigurudevukm) पर पावन सत्संग का सीधा प्रसारण।
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <a
                        href={liveNow.streamUrl || `https://www.youtube.com/watch?v=${liveNow.videoId || 'o9KlOqURRzU'}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all transform hover:-translate-y-0.5"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Watch on YouTube Streams (यूट्यूब पर देखें)</span>
                      </a>
                      <span className="text-xs text-stone-300">
                        {liveNow.isLiveNow ? 'अभी लाइव चल रहा है' : 'नवीनतम पावन प्रसारण'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="bg-white p-3 rounded-3xl border border-roseBlush-200 shadow-soft flex flex-col md:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search notices by keyword..."
                  value={noticeSearch}
                  onChange={(e) => setNoticeSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-roseBlush-50/50 text-stone-800 placeholder-stone-400 text-sm focus:outline-hidden"
                />
              </div>

              <div className="flex bg-roseBlush-50 p-1 rounded-2xl border border-roseBlush-100 text-xs flex-wrap">
                <button
                  onClick={() => setPriorityFilter('all')}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                    priorityFilter === 'all' ? 'bg-white text-maroon-800 font-bold shadow-xs' : 'text-stone-600'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setPriorityFilter('Very Important')}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                    priorityFilter === 'Very Important' ? 'bg-white text-rose-700 font-bold shadow-xs' : 'text-stone-600'
                  }`}
                >
                  Important
                </button>
                <button
                  onClick={() => setPriorityFilter('Emergency')}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                    priorityFilter === 'Emergency' ? 'bg-white text-red-600 font-bold shadow-xs' : 'text-stone-600'
                  }`}
                >
                  Emergency
                </button>
              </div>
            </div>

            {/* Notices Grid */}
            {noticesLoading ? (
              <LoadingSkeleton count={3} />
            ) : filteredNotices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotices.map((notice) => (
                  <NoticeCard key={notice._id || notice.id} notice={notice} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No notices found"
                description="There are currently no announcements matching your filter."
                actionText="Clear Filter"
                actionLink="/notices"
              />
            )}
          </div>
        )}

        {/* TAB 2: ASHRAM ADHESH VIEW */}
        {activeTab === 'adhesh' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Search */}
            <div className="bg-white p-3 rounded-3xl border border-roseBlush-200 shadow-soft flex items-center max-w-2xl mx-auto">
              <Search className="w-5 h-5 text-stone-400 ml-2 shrink-0" />
              <input
                type="text"
                placeholder="Search by directive title or reference number (e.g. JGD/2026)..."
                value={adheshSearch}
                onChange={(e) => setAdheshSearch(e.target.value)}
                className="w-full px-3 py-2 text-sm text-stone-800 focus:outline-hidden bg-transparent"
              />
            </div>

            {/* Adhesh List */}
            {adheshLoading ? (
              <LoadingSkeleton count={3} />
            ) : filteredAdhesh.length > 0 ? (
              <div className="space-y-4">
                {filteredAdhesh.map((adhesh) => (
                  <div
                    key={adhesh._id || adhesh.id}
                    className="p-6 rounded-3xl bg-white border border-roseBlush-200 shadow-soft hover:shadow-sacred transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-maroon-700 bg-roseBlush-100/70 px-2.5 py-0.5 rounded-full">
                          {adhesh.referenceNumber || 'JGD-OFFICIAL'}
                        </span>
                        {adhesh.isImportant && (
                          <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>अनिवार्य आदेश</span>
                          </span>
                        )}
                        <span className="text-xs text-stone-500">
                          {new Date(adhesh.issueDate || adhesh.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <h3 className="text-lg font-serif font-bold text-stone-900">
                        {adhesh.title}
                      </h3>

                      <p className="text-sm text-stone-600 font-light leading-relaxed">
                        {adhesh.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-stone-500 pt-1">
                        <span className="flex items-center gap-1 font-medium text-stone-700">
                          <ShieldCheck className="w-4 h-4 text-maroon-700" />
                          <span>जारीकर्ता: {adhesh.issuedBy || 'केंद्रीय आश्रम कार्यालय, उज्जैन'}</span>
                        </span>
                      </div>
                    </div>

                    {adhesh.attachmentUrl && (
                      <a
                        href={adhesh.attachmentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-roseBlush-100 hover:bg-maroon-700 hover:text-white text-maroon-800 font-bold text-xs transition-all shrink-0 shadow-xs"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download PDF / आदेश देखें</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Adhesh Found"
                description="There are currently no administrative circulars matching your search."
                actionText="Reset Search"
                actionLink="/notices?tab=adhesh"
              />
            )}
          </div>
        )}

        {/* TAB 3: EVENTS VIEW */}
        {activeTab === 'events' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Filters and Search */}
            <div className="bg-white p-3 rounded-3xl border border-roseBlush-200 shadow-soft flex flex-col md:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search events by name, city, or venue..."
                  value={eventSearch}
                  onChange={(e) => setEventSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-roseBlush-50/50 text-stone-800 placeholder-stone-400 text-sm focus:outline-hidden"
                />
              </div>

              <div className="flex bg-roseBlush-50 p-1 rounded-2xl border border-roseBlush-100 text-xs">
                <button
                  onClick={() => setEventStatusFilter('upcoming')}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                    eventStatusFilter === 'upcoming' ? 'bg-white text-maroon-800 font-bold shadow-xs' : 'text-stone-600'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setEventStatusFilter('completed')}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                    eventStatusFilter === 'completed' ? 'bg-white text-maroon-800 font-bold shadow-xs' : 'text-stone-600'
                  }`}
                >
                  Past Events
                </button>
                <button
                  onClick={() => setEventStatusFilter('all')}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                    eventStatusFilter === 'all' ? 'bg-white text-maroon-800 font-bold shadow-xs' : 'text-stone-600'
                  }`}
                >
                  All
                </button>
              </div>
            </div>

            {/* Event Grid */}
            {eventsLoading ? (
              <LoadingSkeleton count={3} />
            ) : filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event._id || event.id} event={event} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No events found"
                description="There are currently no events matching your selected criteria."
                actionText="View All Events"
                actionLink="/notices?tab=events"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticesList;
