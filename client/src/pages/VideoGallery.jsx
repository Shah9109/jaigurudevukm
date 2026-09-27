import React, { useState, useEffect } from 'react';
import {
  Search,
  Video as VideoIcon,
  Play,
  Clock,
  Youtube,
  Radio,
  Sparkles,
  ExternalLink,
  Flame,
  ListVideo,
  CheckCircle2,
  X,
  ChevronRight,
  RefreshCw,
  Share2
} from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export const VideoGallery = () => {
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('featured'); // 'featured', 'videos', 'shorts', 'streams', 'playlists'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeVideoModal, setActiveVideoModal] = useState(null); // { videoId, title, url }

  const fetchChannelData = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      if (isManualRefresh) {
        await api.post('/youtube-channel/refresh');
      }
      const res = await api.get('/youtube-channel');
      if (res.success && res.data) {
        setChannelData(res.data);
      }
    } catch (err) {
      console.error('Error loading channel data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchChannelData();
  }, []);

  const channelInfo = channelData?.channelInfo || {
    title: 'Jaigurudev UKM Official',
    handle: '@Jaigurudevukm',
    customUrl: 'https://www.youtube.com/@Jaigurudevukm',
    subscribers: '1.25M+ Devotees',
    videosCount: '3,450+ Videos',
    avatar: '/images/baba_jaigurudev.jpg',
    maharajAvatar: '/images/maharaj_ji.jpg',
    description: 'जयगुरुदेव धर्म प्रचारक संस्था का आधिकारिक यूट्यूब मंच। परम संत बाबा उमाकान्त जी महाराज के नित्य पावन सत्संग, नामदान, आरती एवं शाकाहार संदेशों का पावन प्रसारण।'
  };

  const featured = channelData?.featured || {
    videoId: '4yhuGRpLSN4',
    title: 'परम पूज्य बाबा उमाकान्त जी महाराज — विशेष सत्संग एवं नामदान अमृत वर्षा',
    description: 'सतना-चित्रकूट व उज्जैन पावन धाम से पूज्य महाराज जी द्वारा मानव जीवन के कल्याण, शाकाहार और प्रभु प्राप्ति की साधना का दिव्य उपदेश।',
    thumbnail: 'https://i.ytimg.com/vi/4yhuGRpLSN4/maxresdefault.jpg',
    publishedDate: '27 Sep 2026',
    views: '17K+ views',
    duration: '1:45:20'
  };

  const allVideos = channelData?.videos || [];
  const allShorts = channelData?.shorts || [];
  const allStreams = channelData?.streams || [];
  const allPlaylists = channelData?.playlists || [];

  // Filtered lists with search
  const filteredVideos = allVideos.filter((v) => {
    const matchCat = categoryFilter === 'all' || v.category === categoryFilter;
    const matchSearch =
      !searchTerm ||
      v.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.category?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const filteredShorts = allShorts.filter((s) =>
    !searchTerm || s.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStreams = allStreams.filter((s) =>
    !searchTerm ||
    s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.date?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPlaylists = allPlaylists.filter((p) =>
    !searchTerm || p.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (video) => {
    if (typeof video === 'string') {
      setActiveVideoModal({
        videoId: video,
        title: 'Jaigurudev Spiritual Discourse',
        url: `https://www.youtube.com/watch?v=${video}`
      });
    } else {
      setActiveVideoModal({
        videoId: video.videoId || video.id,
        title: video.title || 'Jaigurudev Spiritual Discourse',
        url: video.url || `https://www.youtube.com/watch?v=${video.videoId || video.id}`
      });
    }
  };

  return (
    <div className="min-h-screen py-6 sm:py-10 bg-[#FAF8EB]">
      <SEO
        title="Jaigurudev Official YouTube Channel — Videos, Shorts, Live Streams & Playlists"
        description="Explore the complete official YouTube channel of Jaigurudev UKM (@Jaigurudevukm). Watch live satsang streams, video discourses, sacred shorts, and playlists."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* 1. OFFICIAL YOUTUBE CHANNEL HEADER & BANNER PREVIEW */}
        <div className="bg-white rounded-3xl border border-roseBlush-200 shadow-soft overflow-hidden">
          {/* Channel Banner Cover */}
          <div className="relative h-44 sm:h-60 bg-gradient-to-r from-maroon-950 via-maroon-900 to-roseBlush-900 overflow-hidden flex items-center justify-between px-6 sm:px-12 text-white">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div className="relative z-10 space-y-1.5 max-w-2xl">
              <span className="text-sacredGold-300 font-devanagari font-bold text-xs tracking-wider uppercase inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sacredGold-400" />
                <span>॥ जयगुरुदेव धर्म प्रचारक संस्था, उज्जैन ॥</span>
              </span>
              <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-white tracking-tight">
                Jaigurudev UKM Official Channel
              </h1>
              <p className="text-xs sm:text-sm text-roseBlush-200 font-light leading-relaxed">
                शाकाहार क्रांति, सुरत-शब्द योग एवं नित्य सत्संग का पावन डिजिटल केंद्र — यूट्यूब चैनल प्रीव्यू
              </p>
            </div>

            <div className="hidden md:flex items-center gap-3 relative z-10">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sacredGold-400 shadow-xl bg-maroon-950">
                <img src="/images/baba_jaigurudev.jpg" alt="Baba Jaigurudev" className="w-full h-full object-cover" />
              </div>
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sacredGold-400 shadow-xl bg-maroon-950">
                <img src="/images/maharaj_ji.jpg" alt="Baba Umakant Ji" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Channel Profile Info Bar */}
          <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative -mt-14 sm:-mt-20 w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-xl bg-maroon-900 shrink-0">
                <img
                  src="/images/baba_jaigurudev.jpg"
                  alt="Jaigurudev UKM Official Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-maroon-950">
                    {channelInfo.title}
                  </h2>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-stone-600 font-medium">
                  <span className="font-bold text-red-600">{channelInfo.handle}</span>
                  <span>•</span>
                  <span>{channelInfo.subscribers}</span>
                  <span>•</span>
                  <span>{channelInfo.videosCount}</span>
                </div>
                <p className="text-xs text-stone-500 font-light max-w-2xl line-clamp-2 sm:line-clamp-1 pt-0.5">
                  {channelInfo.description}
                </p>
              </div>
            </div>

            {/* Actions: Subscribe & Manual Refresh */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <a
                href={channelInfo.customUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md hover:shadow-red-600/30 transition-all transform hover:-translate-y-0.5"
              >
                <Youtube className="w-4 h-4" />
                <span>Subscribe on YouTube</span>
              </a>
              <a
                href="https://whatsapp.com/channel/0029VaAcAA40QeadmEmp9y3c"
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-all"
              >
                <span>WhatsApp Channel</span>
              </a>
              <button
                onClick={() => fetchChannelData(true)}
                disabled={refreshing}
                title="Sync latest videos from YouTube"
                className="inline-flex items-center justify-center p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-red-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* 2. YOUTUBE CHANNEL TABS NAVIGATION */}
          <div className="px-6 border-t border-roseBlush-100 bg-roseBlush-50/40 flex items-center gap-2 sm:gap-6 overflow-x-auto scrollbar-none">
            {[
              { id: 'featured', label: 'Home / Featured', icon: Sparkles, count: null },
              { id: 'videos', label: 'Videos (प्रवचन)', icon: VideoIcon, count: allVideos.length },
              { id: 'shorts', label: 'Shorts (रील्स)', icon: Flame, count: allShorts.length },
              { id: 'streams', label: 'Live Streams (लाइव)', icon: Radio, count: allStreams.length },
              { id: 'playlists', label: 'Playlists (श्रृंखला)', icon: ListVideo, count: allPlaylists.length },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchTerm('');
                  }}
                  className={`flex items-center gap-2 py-3.5 px-3 border-b-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600 font-bold'
                      : 'border-transparent text-stone-600 hover:text-maroon-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        activeTab === tab.id
                          ? 'bg-red-100 text-red-700 font-bold'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. TAB CONTENT VIEWS */}
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : (
          <>
            {/* TAB 1: FEATURED HOME VIEW */}
            {activeTab === 'featured' && (
              <div className="space-y-12">
                {/* Featured Headline Hero Video Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-roseBlush-200 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div
                    onClick={() => openModal(featured)}
                    className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden bg-black/80 shadow-md group cursor-pointer border border-roseBlush-200"
                  >
                    <img
                      src={featured.thumbnail}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 ml-1 fill-current" />
                      </div>
                    </div>
                    {featured.duration && (
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded font-semibold">
                        {featured.duration}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Featured Headline Satsang</span>
                    </div>
                    <h2
                      onClick={() => openModal(featured)}
                      className="text-xl sm:text-2xl font-serif font-bold text-maroon-950 hover:text-red-600 transition-colors cursor-pointer leading-tight"
                    >
                      {featured.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                      {featured.description}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => openModal(featured)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Watch Preview Now</span>
                      </button>
                      <a
                        href={`https://www.youtube.com/watch?v=${featured.videoId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors"
                      >
                        <span>Open on YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <div className="text-[11px] text-stone-500 pt-1">
                      {featured.publishedDate} • {featured.views}
                    </div>
                  </div>
                </div>

                {/* Section 1: Latest Video Discourses (प्रवचन) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-maroon-950">
                        Latest Video Discourses (नवीनतम प्रवचन)
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('videos')}
                      className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All {allVideos.length} Videos</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {allVideos.slice(0, 4).map((video) => (
                      <div
                        key={video.id}
                        onClick={() => openModal(video)}
                        className="p-3.5 rounded-2xl bg-white border border-roseBlush-200 shadow-2xs hover:shadow-soft cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group"
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-900 mb-2.5">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-8 h-8 text-white fill-current" />
                          </div>
                          {video.duration && (
                            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded font-medium">
                              {video.duration}
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] font-bold text-sacredGold-700 bg-sacredGold-50 px-2 py-0.5 rounded-full border border-sacredGold-200 inline-block mb-1">
                          {video.category || 'Satsang'}
                        </span>
                        <h4 className="font-serif font-bold text-xs text-stone-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                          {video.title}
                        </h4>
                        <div className="flex items-center justify-between mt-2.5 text-[10px] text-stone-500 pt-1.5 border-t border-roseBlush-100">
                          <span>{video.views}</span>
                          <span>{video.publishedDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 2: Popular Shorts Reel Preview (रील्स) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-600" />
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-maroon-950">
                        Popular YouTube Shorts (पावन रील्स)
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('shorts')}
                      className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All {allShorts.length} Shorts</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {allShorts.slice(0, 6).map((short) => (
                      <div
                        key={short.id}
                        onClick={() => openModal(short)}
                        className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-stone-900 cursor-pointer shadow-soft group border border-roseBlush-200"
                      >
                        <img
                          src={short.thumbnail}
                          alt={short.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-3">
                          <span className="text-[10px] text-orange-400 font-bold mb-1 flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            <span>{short.views}</span>
                          </span>
                          <h4 className="text-[11px] font-semibold text-white line-clamp-2 leading-tight">
                            {short.title}
                          </h4>
                        </div>
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-10 h-10 text-white fill-current" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Live Broadcast Streams (लाइव) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Radio className="w-5 h-5 text-red-600" />
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-maroon-950">
                        Recent Satsang Streams (लाइव प्रसारण)
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('streams')}
                      className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All {allStreams.length} Streams</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {allStreams.slice(0, 3).map((stream) => (
                      <div
                        key={stream.id}
                        onClick={() => openModal(stream)}
                        className="p-3.5 rounded-2xl bg-white border border-roseBlush-200 shadow-2xs hover:shadow-soft cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group"
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-900 mb-2.5">
                          <img
                            src={stream.thumbnail}
                            alt={stream.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span>STREAM</span>
                          </div>
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-8 h-8 text-white fill-current" />
                          </div>
                        </div>
                        <h4 className="font-serif font-bold text-xs text-stone-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                          {stream.title}
                        </h4>
                        <div className="flex items-center justify-between mt-2.5 text-[10px] text-stone-500 pt-1.5 border-t border-roseBlush-100">
                          <span>{stream.views}</span>
                          <span>{stream.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Curated Playlists (श्रृंखला) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ListVideo className="w-5 h-5 text-sacredGold-700" />
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-maroon-950">
                        Topic-Wise Curated Playlists (श्रृंखला)
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('playlists')}
                      className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All {allPlaylists.length} Playlists</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {allPlaylists.slice(0, 3).map((pl) => (
                      <a
                        key={pl.id}
                        href={pl.url || `https://www.youtube.com/playlist?list=${pl.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3.5 rounded-2xl bg-white border border-roseBlush-200 shadow-2xs hover:shadow-soft transition-all duration-300 transform hover:-translate-y-1 group block"
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-900 mb-2.5">
                          <img
                            src={pl.thumbnail}
                            alt={pl.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-y-0 right-0 w-2/5 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-1 p-2">
                            <ListVideo className="w-5 h-5" />
                            <span className="text-[10px] font-bold">{pl.videoCount}</span>
                          </div>
                        </div>
                        <h4 className="font-serif font-bold text-xs text-stone-900 group-hover:text-red-600 line-clamp-1 leading-snug">
                          {pl.title}
                        </h4>
                        <div className="flex items-center justify-between mt-2 text-[10px] text-stone-500 pt-1 border-t border-roseBlush-100">
                          <span>{pl.updatedDate}</span>
                          <span className="text-red-600 font-bold inline-flex items-center gap-1 group-hover:underline">
                            <span>Open Playlist</span>
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: VIDEOS VIEW (प्रवचन) */}
            {activeTab === 'videos' && (
              <div className="space-y-6">
                {/* Search & Category Filter Bar */}
                <div className="bg-white p-3.5 rounded-3xl border border-roseBlush-200 shadow-soft flex flex-col md:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search discourses by title, episode, or topic..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-roseBlush-50/50 text-stone-800 placeholder-stone-400 text-xs focus:outline-hidden border border-transparent focus:border-roseBlush-300"
                    />
                  </div>

                  <div className="flex bg-roseBlush-50 p-1 rounded-2xl border border-roseBlush-100 text-xs flex-wrap gap-1">
                    {[
                      { label: `All (${allVideos.length})`, value: 'all' },
                      { label: 'TV Discourses', value: 'TV Discourse' },
                      { label: 'Satsang Discourses', value: 'Satsang Discourse' },
                      { label: 'Sadhana Guidance', value: 'Sadhana Guidance' },
                      { label: 'Social Reform', value: 'Social Reform' },
                    ].map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setCategoryFilter(cat.value)}
                        className={`px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
                          categoryFilter === cat.value
                            ? 'bg-white text-maroon-800 font-bold shadow-xs'
                            : 'text-stone-600 hover:text-maroon-700'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Videos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map((video) => (
                    <div
                      key={video.id}
                      className="p-4 rounded-3xl bg-white border border-roseBlush-200 shadow-soft hover:shadow-sacred transition-all duration-300 transform hover:-translate-y-1 group flex flex-col justify-between"
                    >
                      <div>
                        <div
                          onClick={() => openModal(video)}
                          className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 mb-3 cursor-pointer"
                        >
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                              <Play className="w-5 h-5 ml-0.5 fill-current" />
                            </div>
                          </div>
                          {video.duration && (
                            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded font-medium">
                              {video.duration}
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] font-bold text-sacredGold-700 bg-sacredGold-50 px-2.5 py-0.5 rounded-full border border-sacredGold-200 inline-block mb-1.5">
                          {video.category || 'Satsang'}
                        </span>
                        <h4
                          onClick={() => openModal(video)}
                          className="font-serif font-bold text-sm text-stone-900 group-hover:text-red-600 line-clamp-2 leading-snug cursor-pointer"
                        >
                          {video.title}
                        </h4>
                      </div>

                      <div className="mt-3 pt-3 border-t border-roseBlush-100 flex items-center justify-between text-[11px] text-stone-500">
                        <span>{video.views} • {video.publishedDate}</span>
                        <button
                          onClick={() => openModal(video)}
                          className="text-red-600 font-bold hover:text-red-700 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Preview</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredVideos.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-3xl border border-roseBlush-200">
                    <p className="text-stone-500 text-sm">No videos found matching "{searchTerm}".</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: SHORTS REELS VIEW (रील्स) */}
            {activeTab === 'shorts' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
                      <Flame className="w-4 h-4" />
                      <span>{allShorts.length} Official YouTube Shorts</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-maroon-950">
                      Sacred Shorts & Updesh Reels (पावन रील्स)
                    </h3>
                  </div>

                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search shorts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white text-stone-800 placeholder-stone-400 text-xs border border-roseBlush-200 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredShorts.map((short) => (
                    <div
                      key={short.id}
                      onClick={() => openModal(short)}
                      className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-stone-900 cursor-pointer shadow-soft group border-2 border-roseBlush-200 hover:border-red-500 transition-all transform hover:-translate-y-1"
                    >
                      <img
                        src={short.thumbnail}
                        alt={short.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-end p-3.5">
                        <span className="text-[10px] text-orange-400 font-bold mb-1 flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          <span>{short.views}</span>
                        </span>
                        <h4 className="text-xs font-semibold text-white line-clamp-2 leading-tight">
                          {short.title}
                        </h4>
                      </div>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                          <Play className="w-5 h-5 ml-0.5 fill-current" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredShorts.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-3xl border border-roseBlush-200">
                    <p className="text-stone-500 text-sm">No shorts found matching "{searchTerm}".</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: LIVE STREAMS VIEW (लाइव) */}
            {activeTab === 'streams' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-maroon-950 flex items-center gap-2">
                      <Radio className="w-5 h-5 text-red-600" />
                      <span>Live & Recent Broadcast Streams ({allStreams.length})</span>
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Full live recording broadcasts from Jaipur, Chitrakoot, Ujjain, and nationwide venues.
                    </p>
                  </div>

                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search streams by venue or date..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white text-stone-800 placeholder-stone-400 text-xs border border-roseBlush-200 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStreams.map((stream) => (
                    <div
                      key={stream.id}
                      onClick={() => openModal(stream)}
                      className="p-4 rounded-3xl bg-white border-2 border-roseBlush-200 hover:border-red-400 shadow-soft cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 mb-3">
                          <img
                            src={stream.thumbnail}
                            alt={stream.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold shadow-md">
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            <span>SATSANG BROADCAST</span>
                          </div>
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                              <Play className="w-5 h-5 ml-0.5 fill-current" />
                            </div>
                          </div>
                        </div>
                        <h4 className="font-serif font-bold text-sm text-stone-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                          {stream.title}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-roseBlush-100 text-[11px] text-stone-500">
                        <span>{stream.views} • {stream.date}</span>
                        <span className="text-red-600 font-bold inline-flex items-center gap-1 group-hover:underline">
                          <span>Watch Stream</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredStreams.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-3xl border border-roseBlush-200">
                    <p className="text-stone-500 text-sm">No streams found matching "{searchTerm}".</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: PLAYLISTS VIEW (श्रृंखला) */}
            {activeTab === 'playlists' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sacredGold-100 text-sacredGold-800 text-xs font-bold">
                      <ListVideo className="w-4 h-4" />
                      <span>{allPlaylists.length} Official Topic Playlists</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-maroon-950">
                      Curated Spiritual Playlists (श्रृंखला)
                    </h3>
                  </div>

                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search playlists..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white text-stone-800 placeholder-stone-400 text-xs border border-roseBlush-200 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlaylists.map((pl) => (
                    <a
                      key={pl.id}
                      href={pl.url || `https://www.youtube.com/playlist?list=${pl.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 rounded-3xl bg-white border-2 border-roseBlush-200 hover:border-sacredGold-400 shadow-soft hover:shadow-sacred transition-all duration-300 transform hover:-translate-y-1 group block flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 mb-3">
                          <img
                            src={pl.thumbnail}
                            alt={pl.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-y-0 right-0 w-2/5 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-1 p-2">
                            <ListVideo className="w-6 h-6" />
                            <span className="text-xs font-bold">{pl.videoCount}</span>
                          </div>
                        </div>
                        <h4 className="font-serif font-bold text-sm text-stone-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                          {pl.title}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-roseBlush-100 text-[11px] text-stone-500">
                        <span>{pl.updatedDate}</span>
                        <span className="text-red-600 font-bold inline-flex items-center gap-1 group-hover:underline">
                          <span>View on YouTube</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </a>
                  ))}
                </div>

                {filteredPlaylists.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-3xl border border-roseBlush-200">
                    <p className="text-stone-500 text-sm">No playlists found matching "{searchTerm}".</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* 4. HIGH-DEF YOUTUBE VIDEO POPUP MODAL */}
      {activeVideoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-stone-950 rounded-3xl overflow-hidden shadow-2xl border border-sacredGold-500/40 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:px-6 bg-stone-900 border-b border-stone-800 flex items-center justify-between gap-4">
              <h3 className="text-sm sm:text-base font-serif font-bold text-white line-clamp-1">
                {activeVideoModal.title}
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href={activeVideoModal.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open in YouTube</span>
                </a>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close player"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Player */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoModal.videoId}?autoplay=1&rel=0`}
                title={activeVideoModal.title}
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
