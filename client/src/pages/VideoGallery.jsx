import React, { useState, useEffect } from 'react';
import {
  Search,
  Video as VideoIcon,
  Play,
  Clock,
  User,
  Filter,
  Youtube,
  Radio,
  Sparkles,
  ExternalLink,
  Flame,
  ListVideo,
  Eye,
  CheckCircle2,
  X,
  ChevronRight,
  Share2,
  ThumbsUp
} from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export const VideoGallery = () => {
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('featured'); // 'featured', 'videos', 'shorts', 'streams', 'playlists'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      setLoading(true);
      try {
        const res = await api.get('/youtube-channel');
        if (res.success && res.data) {
          setChannelData(res.data);
        }
      } catch (err) {
        console.error('Error loading channel data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchChannelData();
  }, []);

  const channelInfo = channelData?.channelInfo || {
    title: 'Jaigurudev UKM Official',
    handle: '@Jaigurudevukm',
    customUrl: 'https://www.youtube.com/@Jaigurudevukm',
    subscribers: '1.2M+ Devotees',
    videosCount: '3,400+ Videos',
    avatar: '/images/baba_jaigurudev.jpg',
    maharajAvatar: '/images/maharaj_ji.jpg',
    description: 'जयगुरुदेव धर्म प्रचारक संस्था का आधिकारिक यूट्यूब मंच। परम संत बाबा उमाकान्त जी महाराज के नित्य पावन सत्संग, नामदान, आरती एवं शाकाहार संदेशों का पावन प्रसारण।'
  };

  const featured = channelData?.featured || {
    videoId: 'q_y5df4yhq0',
    title: 'परम पूज्य बाबा उमाकान्त जी महाराज — विशेष सत्संग एवं नामदान अमृत वर्षा',
    description: 'सतना-चित्रकूट पावन भूमि पर आयोजित विशाल सत्संग समारोह में पूज्य महाराज जी द्वारा मानव जीवन के कल्याण, शाकाहार और प्रभु प्राप्ति की साधना का दिव्य उपदेश।',
    thumbnail: 'https://i.ytimg.com/vi/q_y5df4yhq0/hqdefault.jpg',
    publishedDate: '28 Aug 2026',
    views: '45,200 views',
    duration: '1:45:20'
  };

  const allVideos = channelData?.videos || [];
  const allShorts = channelData?.shorts || [];
  const allStreams = channelData?.streams || [];
  const allPlaylists = channelData?.playlists || [];

  const filteredVideos = allVideos.filter((v) => {
    const matchCat = categoryFilter === 'all' || v.category === categoryFilter;
    const matchSearch =
      !searchTerm ||
      v.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.category?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

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
          <div className="relative h-40 sm:h-56 bg-gradient-to-r from-maroon-950 via-maroon-900 to-roseBlush-900 overflow-hidden flex items-center justify-between px-6 sm:px-12 text-white">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div className="relative z-10 space-y-1">
              <span className="text-sacredGold-300 font-devanagari font-bold text-xs tracking-wider uppercase block">
                ॥ जयगुरुदेव धर्म प्रचारक संस्था, उज्जैन ॥
              </span>
              <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-white">
                Jaigurudev UKM Official Channel
              </h1>
              <p className="text-xs sm:text-sm text-roseBlush-200/90 font-light">
                शाकाहार क्रांति, सुरत-शब्द योग एवं नित्य सत्संग का पावन केंद्र
              </p>
            </div>

            <div className="hidden md:flex items-center gap-3 relative z-10">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-sacredGold-400 shadow-md">
                <img src="/images/baba_jaigurudev.jpg" alt="Baba Jaigurudev" className="w-full h-full object-cover" />
              </div>
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-sacredGold-400 shadow-md">
                <img src="/images/maharaj_ji.jpg" alt="Baba Umakant Ji" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Channel Profile Info Bar */}
          <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative -mt-12 sm:-mt-16 w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-xl bg-maroon-900 shrink-0">
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
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-stone-600">
                  <span className="font-bold text-maroon-800">{channelInfo.handle}</span>
                  <span>•</span>
                  <span>{channelInfo.subscribers}</span>
                  <span>•</span>
                  <span>{channelInfo.videosCount}</span>
                </div>
                <p className="text-xs text-stone-500 font-light max-w-2xl line-clamp-2 sm:line-clamp-1 pt-1">
                  {channelInfo.description}
                </p>
              </div>
            </div>

            {/* Subscribe & Social Action */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
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
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-all"
              >
                <span>WhatsApp Channel</span>
              </a>
            </div>
          </div>

          {/* 2. YOUTUBE CHANNEL TABS NAVIGATION (Featured, Videos, Shorts, Streams, Playlists) */}
          <div className="px-6 border-t border-roseBlush-100 bg-roseBlush-50/40 flex items-center gap-2 sm:gap-6 overflow-x-auto scrollbar-none">
            {[
              { id: 'featured', label: 'Home / Featured', icon: Sparkles },
              { id: 'videos', label: 'Videos (प्रवचन)', icon: VideoIcon },
              { id: 'shorts', label: 'Shorts (रील्स)', icon: Flame },
              { id: 'streams', label: 'Live Streams (लाइव)', icon: Radio },
              { id: 'playlists', label: 'Playlists (श्रृंखला)', icon: ListVideo },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3.5 px-3 border-b-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600 font-bold'
                      : 'border-transparent text-stone-600 hover:text-maroon-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
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
              <div className="space-y-10">
                {/* Featured Headline Hero Video Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-roseBlush-200 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div
                    onClick={() => setActiveVideoModal(featured.videoId)}
                    className="lg:col-span-7 relative aspect-video rounded-2xl overflow-hidden bg-black/80 shadow-md group cursor-pointer border border-roseBlush-200"
                  >
                    <img
                      src={featured.thumbnail}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 ml-0.5 fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      {featured.duration}
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Featured Headline Satsang</span>
                    </div>
                    <h2
                      onClick={() => setActiveVideoModal(featured.videoId)}
                      className="text-xl sm:text-2xl font-serif font-bold text-maroon-950 hover:text-red-600 transition-colors cursor-pointer leading-tight"
                    >
                      {featured.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                      {featured.description}
                    </p>
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => setActiveVideoModal(featured.videoId)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-xs shadow-md transition-all"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Watch Video Now</span>
                      </button>
                      <span className="text-xs text-stone-500">
                        {featured.publishedDate} • {featured.views}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Latest Uploads Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-maroon-950">
                        Latest Video Discourses (नवीनतम वीडियो)
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('videos')}
                      className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
                    >
                      <span>View All Videos</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {allVideos.slice(0, 4).map((video) => (
                      <div
                        key={video.id}
                        onClick={() => setActiveVideoModal(video.videoId)}
                        className="p-3 rounded-2xl bg-white border border-roseBlush-200 shadow-2xs hover:shadow-soft cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group"
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-900 mb-2">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-8 h-8 text-white fill-current" />
                          </div>
                          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                            {video.duration}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-xs text-stone-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                          {video.title}
                        </h4>
                        <div className="flex items-center justify-between mt-2 text-[10px] text-stone-500">
                          <span>{video.views}</span>
                          <span>{video.publishedDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Shorts Reel Preview */}
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
                      className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
                    >
                      <span>View All Shorts</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                    {allShorts.slice(0, 6).map((short) => (
                      <div
                        key={short.id}
                        onClick={() => setActiveVideoModal(short.videoId)}
                        className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-stone-900 cursor-pointer shadow-soft group border border-roseBlush-200"
                      >
                        <img
                          src={short.thumbnail}
                          alt={short.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
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
              </div>
            )}

            {/* TAB 2: VIDEOS VIEW */}
            {activeTab === 'videos' && (
              <div className="space-y-6">
                {/* Search & Category Filter Bar */}
                <div className="bg-white p-3 rounded-3xl border border-roseBlush-200 shadow-soft flex flex-col md:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search discourses by title or topic..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-2xl bg-roseBlush-50/50 text-stone-800 placeholder-stone-400 text-xs focus:outline-hidden"
                    />
                  </div>

                  <div className="flex bg-roseBlush-50 p-1 rounded-2xl border border-roseBlush-100 text-xs flex-wrap">
                    {[
                      { label: 'All Videos', value: 'all' },
                      { label: 'Satsang Discourses', value: 'Satsang Discourse' },
                      { label: 'Sadhana Guidance', value: 'Sadhana Guidance' },
                      { label: 'Social Reform', value: 'Social Reform' },
                    ].map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setCategoryFilter(cat.value)}
                        className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
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
                      onClick={() => setActiveVideoModal(video.videoId)}
                      className="p-4 rounded-3xl bg-white border border-roseBlush-200 shadow-soft hover:shadow-sacred cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 mb-3">
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
                        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                          {video.duration}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-sacredGold-700 bg-sacredGold-50 px-2 py-0.5 rounded-full border border-sacredGold-200 inline-block mb-1.5">
                        {video.category || 'Satsang'}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-stone-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                        {video.title}
                      </h4>
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-roseBlush-100 text-[11px] text-stone-500">
                        <span>{video.views}</span>
                        <span>{video.publishedDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: SHORTS REELS VIEW */}
            {activeTab === 'shorts' && (
              <div className="space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
                    <Flame className="w-4 h-4" />
                    <span>Official YouTube Shorts</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-maroon-950">
                    Sacred Shorts & Updesh Reels
                  </h3>
                  <p className="text-xs text-stone-600">
                    Click any short reel to watch Pujya Maharaj Ji's divine pearls of wisdom in high definition.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {allShorts.map((short) => (
                    <div
                      key={short.id}
                      onClick={() => setActiveVideoModal(short.videoId)}
                      className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-stone-900 cursor-pointer shadow-soft group border-2 border-roseBlush-200 hover:border-red-500 transition-all"
                    >
                      <img
                        src={short.thumbnail}
                        alt={short.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3.5">
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
              </div>
            )}

            {/* TAB 4: LIVE STREAMS VIEW */}
            {activeTab === 'streams' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-maroon-950 flex items-center gap-2">
                      <Radio className="w-5 h-5 text-red-600" />
                      <span>Live & Recent Broadcast Streams</span>
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Full recording broadcasts from Chitrakoot, Ujjain, Jaipur, and nationwide Satsang venues.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allStreams.map((stream) => (
                    <div
                      key={stream.id}
                      onClick={() => setActiveVideoModal(stream.videoId)}
                      className="p-4 rounded-3xl bg-white border-2 border-roseBlush-200 hover:border-red-400 shadow-soft cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 mb-3">
                        <img
                          src={stream.thumbnail}
                          alt={stream.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold shadow-md">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          <span>SATSANG STREAM</span>
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
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-roseBlush-100 text-[11px] text-stone-500">
                        <span>{stream.date || 'Live Recording'}</span>
                        <span className="text-red-600 font-bold inline-flex items-center gap-1">
                          <span>Watch Stream</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: PLAYLISTS VIEW */}
            {activeTab === 'playlists' && (
              <div className="space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sacredGold-100 text-sacredGold-800 text-xs font-bold">
                    <ListVideo className="w-4 h-4" />
                    <span>Curated Video Playlists</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-maroon-950">
                    Official Topic-Wise Playlists
                  </h3>
                  <p className="text-xs text-stone-600">
                    Explore comprehensive collections of Amrit Vachan, Naamdan guidance, festival celebrations, and Aarti.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allPlaylists.map((pl) => (
                    <a
                      key={pl.id}
                      href={`https://www.youtube.com/playlist?list=${pl.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 rounded-3xl bg-white border-2 border-roseBlush-200 hover:border-sacredGold-400 shadow-soft hover:shadow-sacred transition-all duration-300 transform hover:-translate-y-1 group block"
                    >
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 mb-3">
                        <img
                          src={pl.thumbnail}
                          alt={pl.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Playlist Overlay Badge */}
                        <div className="absolute inset-y-0 right-0 w-2/5 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-1 p-2">
                          <ListVideo className="w-6 h-6" />
                          <span className="text-xs font-bold">{pl.videoCount}</span>
                        </div>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-stone-900 group-hover:text-red-600 line-clamp-2 leading-snug">
                        {pl.title}
                      </h4>
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-roseBlush-100 text-[11px] text-stone-500">
                        <span>{pl.updatedDate}</span>
                        <span className="text-red-600 font-bold inline-flex items-center gap-1 group-hover:underline">
                          <span>View on YouTube</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 4. HIGH-DEF YOUTUBE VIDEO POPUP MODAL */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-sacredGold-500/40 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
              aria-label="Close player"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoModal}?autoplay=1`}
                title="YouTube Video Player"
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
