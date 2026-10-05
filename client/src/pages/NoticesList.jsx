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
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import SEO from '../components/common/SEO';
import SectionTitle from '../components/common/SectionTitle';
import NoticeCard from '../components/cards/NoticeCard';
import EventCard from '../components/cards/EventCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';

const FALLBACK_ADHESH_LIST = [
  {
    _id: '64f1a2b3c4d5e6f7a8b9c301',
    id: '64f1a2b3c4d5e6f7a8b9c301',
    title: 'आश्रम आदेश सं. JGD/2026/08: आश्रम में आने वाले समस्त दर्शनार्थियों के लिए निशुल्क भंडारा एवं अनुशासन व्यवस्था',
    referenceNumber: 'JGD/2026/08',
    description: 'उज्जैन आश्रम केंद्रीय कार्यालय द्वारा जारी आधिकारिक निर्देश: आश्रम में सभी भक्तों के लिए 24 घंटे निशुल्क लंगर एवं आवास की पूर्ण व्यवस्था है। किसी भी सेवादार को कोई शुल्क नहीं देना है।',
    issueDate: '2026-10-03T09:07:57.397Z',
    issuedBy: 'केंद्रीय आश्रम कार्यालय, उज्जैन (म.प्र.)',
    category: 'Ashram Order',
    priority: 'Very Important',
    isImportant: true,
    attachmentUrl: '/downloads/ashram_adhesh_aug2026.pdf',
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c302',
    id: '64f1a2b3c4d5e6f7a8b9c302',
    title: 'आश्रम आदेश सं. JGD/2026/07: प्रत्येक जिले में शाकाहार प्रचार एवं गुलाबी झंडी वाहन रैलियों के संबंध में दिशा-निर्देश',
    referenceNumber: 'JGD/2026/07',
    description: 'सभी प्रांतीय एवं जिला कमेटियों को निर्देशित किया जाता है कि शाकाहार प्रचार हेतु गुलाबी झंडी लगाकर शांतिपूर्ण वाहन यात्राएं व जनसंपर्क अभियान चलाएं।',
    issueDate: '2026-09-27T09:07:57.397Z',
    issuedBy: 'परम पूज्य बाबा उमाकान्त जी महाराज के आदेशानुसार',
    category: 'Administrative Directive',
    priority: 'Important',
    isImportant: false,
    attachmentUrl: '/downloads/shakahar_nirdesh.pdf',
  }
];

const FALLBACK_EVENTS_LIST = [
  {
    _id: '64f1a2b3c4d5e6f7a8b9c201',
    id: '64f1a2b3c4d5e6f7a8b9c201',
    slug: 'annual-bhandara-mahotsav-ujjain',
    title: 'वार्षिक पावन भंडारा महोत्सव एवं विशाल संत समागम — उज्जैन',
    description: 'उज्जैन आश्रम में आयोजित होने वाला देश-विदेश के लाखों श्रद्धालुओं का भव्य त्रिदिवसीय संत समागम। निरंतर गुरु का अखंड लंगर, अमृत वाणी, नामदान एवं आध्यात्मिक प्रश्नोत्तरी सत्र।',
    startDate: '2026-10-20T09:07:57.396Z',
    endDate: '2026-10-23T09:07:57.397Z',
    startTime: '06:00 AM',
    endTime: '09:00 PM',
    location: 'बाबा जयगुरुदेव आश्रम, मक्सी रोड, उज्जैन (म.प्र.)',
    city: 'उज्जैन (Ujjain)',
    state: 'मध्य प्रदेश (Madhya Pradesh)',
    status: 'upcoming',
    expectedAttendees: '2,50,000+ श्रद्धालु',
    bannerImage: '/images/sant_vanshavali.jpg',
    isFeatured: true,
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c202',
    id: '64f1a2b3c4d5e6f7a8b9c202',
    slug: 'guru-purnima-mahotsav-jaipur',
    title: 'पावन गुरु पूर्णिमा महा-महोत्सव — जयपुर आश्रम',
    description: 'सतगुरु के चरणों में कृतज्ञता ज्ञापन, पावन गुरु वंदना, नाम-साधना दिशा-निर्देश एवं राजस्थान संगत का भव्य एकत्रीकरण।',
    startDate: '2026-11-19T09:07:57.397Z',
    endDate: '2026-11-21T09:07:57.397Z',
    startTime: '08:00 AM',
    endTime: '08:00 PM',
    location: 'जयगुरुदेव आश्रम, ठीकरिया, जयपुर',
    city: 'जयपुर (Jaipur)',
    state: 'राजस्थान (Rajasthan)',
    status: 'upcoming',
    expectedAttendees: '1,50,000+ श्रद्धालु',
    bannerImage: '/images/sant_vanshavali.jpg',
    isFeatured: true,
  }
];

export const NoticesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'notices'; // 'notices', 'adhesh', 'events'
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync tab with URL query parameter
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['notices', 'adhesh', 'events'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Notices State
  const [notices, setNotices] = useState([]);
  const [noticesLoading, setNoticesLoading] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [noticeSearch, setNoticeSearch] = useState('');

  // Adhesh State
  const [adheshList, setAdheshList] = useState(FALLBACK_ADHESH_LIST);
  const [adheshLoading, setAdheshLoading] = useState(false);
  const [adheshSearch, setAdheshSearch] = useState('');

  // Events State
  const [events, setEvents] = useState(FALLBACK_EVENTS_LIST);
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

  // Fetch Adhesh
  useEffect(() => {
    const fetchAdhesh = async () => {
      setAdheshLoading(true);
      try {
        const res = await api.get('/adhesh');
        if (res.success && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setAdheshList(res.data);
        }
      } catch (err) {
        console.warn('Error fetching adhesh, using fallback:', err);
      } finally {
        setAdheshLoading(false);
      }
    };
    fetchAdhesh();
  }, []);

  // Fetch Events
  useEffect(() => {
    const fetchEvents = async () => {
      setEventsLoading(true);
      try {
        const res = await api.get(`/events?status=${eventStatusFilter === 'all' ? '' : eventStatusFilter}`);
        if (res.success && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setEvents(res.data);
        }
      } catch (err) {
        console.warn('Error loading events, using fallback:', err);
      } finally {
        setEventsLoading(false);
      }
    };
    fetchEvents();
  }, [eventStatusFilter]);

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

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        to={`/adhesh/${adhesh._id || adhesh.id}`}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-maroon-700 to-roseBlush-700 hover:from-maroon-800 hover:to-roseBlush-800 text-white font-bold text-xs transition-all shadow-xs"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Document (आदेश पढ़ें)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {adhesh.attachmentUrl && (
                        <a
                          href={adhesh.attachmentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-stone-100 hover:bg-roseBlush-100 text-stone-700 hover:text-maroon-800 transition-colors shadow-2xs"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}
                    </div>
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
