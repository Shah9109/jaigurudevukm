import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  FileText,
  Video,
  Download,
  Phone,
  MapPin,
  Sparkles,
  Heart,
  ShieldCheck,
  ChevronRight,
  Play,
  Smartphone,
  CheckCircle2,
  Youtube,
  Radio,
  ExternalLink,
} from 'lucide-react';
import api from '../services/api';
import HeroBanner from '../components/common/HeroBanner';
import SectionTitle from '../components/common/SectionTitle';
import SatsangCard from '../components/cards/SatsangCard';
import NoticeCard from '../components/cards/NoticeCard';
import EventCard from '../components/cards/EventCard';
import VideoCard from '../components/cards/VideoCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import SantVanshavaliMarquee from '../components/common/SantVanshavaliMarquee';
import LiveStreamsMarquee from '../components/common/LiveStreamsMarquee';

export const Home = () => {
  const [data, setData] = useState(null);
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [homeRes, ytRes] = await Promise.allSettled([
          api.get('/homepage'),
          api.get('/youtube-channel')
        ]);

        if (homeRes.status === 'fulfilled' && homeRes.value?.success && homeRes.value?.data) {
          setData(homeRes.value.data);
        }
        if (ytRes.status === 'fulfilled' && ytRes.value?.success && ytRes.value?.data) {
          const ytData = ytRes.value.data;
          // Prioritize YouTube live section broadcasts from the past 20 days
          const liveSectionPast20Days = (ytData.streams || []).slice(0, 6).map((s) => ({
            ...s,
            category: 'Live Stream',
            isLiveStream: true,
            speaker: 'परम संत बाबा उमाकान्त जी महाराज'
          }));
          setYoutubeVideos(liveSectionPast20Days.length > 0 ? liveSectionPast20Days : (ytData.videos || []).slice(0, 6));
        }
      } catch (err) {
        console.warn('Using fallback for homepage data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const upcomingSatsang = data?.upcomingSatsang || [];
  const notices = data?.notices || [];
  const adheshList = data?.adheshList || [];
  const upcomingEvents = data?.upcomingEvents || [];
  const featuredVideos = (data?.featuredVideos && data.featuredVideos.length > 0)
    ? data.featuredVideos
    : (youtubeVideos.length > 0 ? youtubeVideos : []);
  const siteSettings = data?.settings || {};

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO BANNER */}
      <HeroBanner
        title={siteSettings?.tagline || 'सत्य, दया, धर्म और नाम-साधना का पावन मार्ग'}
        subtitle="जयगुरुदेव धर्म प्रचारक संस्था — मानव कल्याण, शाकाहार, नशामुक्ति और सुरत-शब्द योग (नाम-साधना) को समर्पित पावन आध्यात्मिक मंच।"
      />

      {/* SANT VANSHAVALI INFINITE MOVING RIGHT MARQUEE */}
      <SantVanshavaliMarquee />

      {/* 2. WELCOME & 4 SACRED PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          hindiSubtitle="संस्था परिचय एवं संदेश"
          title="The Divine Mission of Jaigurudev"
          subtitle="Awakening the soul through truth, righteousness, compassion for all living beings, and devotion to the holy name."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-roseBlush-100 shadow-soft hover:shadow-sacred transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-roseBlush-100 text-maroon-700 flex items-center justify-center font-bold text-xl mb-4">
              🌱
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">पूर्ण शाकाहार</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              जीव दया ही सच्चा धर्म है। समस्त प्राणियों के प्रति करुणा भाव रखें और मांसाहार का त्याग कर सात्विक आहार अपनाएं।
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-roseBlush-100 shadow-soft hover:shadow-sacred transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-sacredGold-100 text-sacredGold-800 flex items-center justify-center font-bold text-xl mb-4">
              ✨
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">सुरत-शब्द योग</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              आत्मा को परमात्मा से मिलाने का सहज साधन नाम-साधना (सिमरन, ध्यान और भजन) है। नित्य प्रातः-सायं अभ्यास करें।
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-roseBlush-100 shadow-soft hover:shadow-sacred transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl mb-4">
              🚫
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">पूर्ण नशामुक्ति</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              मदिरा, धूम्रपान व सभी प्रकार के मादक द्रव्यों से मुक्त होकर शुद्ध, संयमित और सदाचारी जीवन व्यतीत करें।
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-roseBlush-100 shadow-soft hover:shadow-sacred transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl mb-4">
              🤝
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">मानव एकता एवं सेवा</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              जाति, धर्म, भेद-भाव से परे होकर मानव मात्र से प्रेम करें और निःस्वार्थ भाव से समाज व असहायों की सेवा करें।
            </p>
          </div>
        </div>
      </section>

      {/* 2.5 LIVE YOUTUBE STREAMS MARQUEE (Moving Right & Auto-Updating) */}
      <LiveStreamsMarquee />

      {/* 3. UPCOMING SATSANG PROGRAMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-devanagari text-maroon-700 font-bold text-sm tracking-wider uppercase inline-block mb-1 px-3 py-1 bg-roseBlush-100/70 rounded-full">
              सत्संग समय सारिणी
            </span>
            <h2 className="text-2xl sm:text-3.5xl font-serif font-bold text-stone-900">
              Upcoming Satsang Programs
            </h2>
          </div>
          <Link
            to="/satsang"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-maroon-700 hover:text-maroon-900 shrink-0"
          >
            <span>View Full Calendar</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <LoadingSkeleton count={3} />
        ) : upcomingSatsang.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingSatsang.map((item) => (
              <SatsangCard key={item._id || item.id} satsang={item} />
            ))}
          </div>
        ) : (
          <p className="text-stone-500 text-sm italic">No upcoming satsang scheduled at this moment.</p>
        )}
      </section>

      {/* 4. ASHRAM ADHESH & IMPORTANT NOTICES */}
      <section className="bg-gradient-to-b from-roseBlush-50/50 to-white py-14 sm:py-18 border-y border-roseBlush-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Ashram Adhesh (Official Directives) */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <span className="font-devanagari text-sacredGold-800 font-bold text-xs tracking-wider uppercase inline-block px-2.5 py-0.5 bg-sacredGold-100 rounded-md">
                    आधिकारिक निर्देश
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
                    Ashram Orders (आश्रम आदेश)
                  </h3>
                </div>
                <Link to="/adhesh" className="text-xs font-bold text-maroon-700 hover:text-maroon-900">
                  All Adhesh →
                </Link>
              </div>

              <div className="space-y-4">
                {adheshList.map((adhesh) => (
                  <div
                    key={adhesh._id || adhesh.id}
                    className="p-5 rounded-2xl bg-white border border-roseBlush-200/80 shadow-xs hover:shadow-soft transition-all"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono font-bold text-maroon-700 bg-roseBlush-50 px-2 py-0.5 rounded border border-roseBlush-200">
                        {adhesh.referenceNumber}
                      </span>
                      <span className="text-xs text-stone-400">
                        {new Date(adhesh.issueDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-stone-900 mb-1.5">
                      {adhesh.title}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3 font-light">
                      {adhesh.description}
                    </p>
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-roseBlush-100">
                      <span className="text-stone-500 font-medium">हस्ताक्षर: {adhesh.signatory}</span>
                      <Link to="/adhesh" className="font-bold text-maroon-700 hover:underline">
                        Read Document
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Urgent Notices */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div>
                  <span className="font-devanagari text-maroon-700 font-bold text-xs tracking-wider uppercase inline-block px-2.5 py-0.5 bg-roseBlush-100 rounded-md">
                    आवश्यक सूचनाएं
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
                    Important Notices
                  </h3>
                </div>
                <Link to="/notices" className="text-xs font-bold text-maroon-700 hover:text-maroon-900">
                  All Notices →
                </Link>
              </div>

              <div className="space-y-4">
                {notices.map((notice) => (
                  <NoticeCard key={notice._id || notice.id} notice={notice} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED VIDEO DISCOURSES FROM OFFICIAL YOUTUBE CHANNEL (LIVE SECTION - PAST 20 DAYS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200/80 rounded-full text-red-700 text-xs font-bold">
              <Radio className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span>लाइव सत्संग प्रसारण — विगत 20 दिवस (Live Streams)</span>
            </div>
            <h2 className="text-2xl sm:text-3.5xl font-serif font-bold text-stone-900">
              Featured Video Discourses & Live Streams
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light max-w-xl">
              परम पूज्य बाबा उमाकान्त जी महाराज के विगत 20 दिनों के पावन लाइव सत्संग प्रसारण एवं अमृत उपदेश — सीधे आधिकारिक यूट्यूब चैनल @Jaigurudevukm के Live अनुभाग से।
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/videos"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Watch All Videos & Streams</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href="https://www.youtube.com/@Jaigurudevukm/streams"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              <Youtube className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live Channel</span>
            </a>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton count={3} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVideos.slice(0, 6).map((video) => (
              <VideoCard key={video._id || video.id || video.videoId} video={video} />
            ))}
          </div>
        )}
      </section>

      {/* 6. DEVOTEE SADHANA MOBILE APP PROMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-roseBlush-100 via-cream-100 to-roseBlush-50 border border-roseBlush-200 p-8 sm:p-12 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-maroon-700 font-bold text-xs shadow-xs">
                <Smartphone className="w-4 h-4 text-sacredGold-600" />
                <span>आधिकारिक मोबाइल ऐप • Jaigurudev Android App</span>
              </div>

              <h2 className="text-2xl sm:text-3.5xl font-serif font-bold text-stone-900 leading-tight">
                संपूर्ण जयगुरुदेव वेबसाइट अब आपके मोबाइल ऐप में
              </h2>

              <p className="text-sm text-stone-700 leading-relaxed">
                आधिकारिक जयगुरुदेव एंड्रॉइड ऐप (APK) के माध्यम से नित्य सत्संग कार्यक्रम, आश्रम आदेश, वीडियो प्रवचन, भजन-धुन, सन्त वंशावली एवं आश्रम संपर्क की समस्त जानकारी एक ही टैप में प्राप्त करें।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-800 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>लाइव सत्संग एवं कार्यक्रम सारिणी</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>आधिकारिक आश्रम आदेश एवं सूचनाएँ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ऑडियो भजन, आरती एवं वीडियो प्रवचन</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>तेज, सुरक्षित एवं सहज मोबाइल अनुभव</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/downloads"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-maroon-800 to-maroon-900 hover:from-maroon-900 hover:to-maroon-950 text-white hover:text-sacredGold-200 font-semibold text-sm shadow-md hover:shadow-lg transition-all border border-sacredGold-400/40"
                >
                  <Download className="w-4 h-4 text-sacredGold-300" />
                  <span>Download Official APK (v1.0.0)</span>
                </Link>
              </div>
            </div>

            {/* Devotional App Graphic Preview */}
            <div className="flex items-center justify-center">
              <div className="relative w-64 sm:w-72 bg-white rounded-3xl p-4 shadow-2xl border-2 border-sacredGold-300/40 rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-to-b from-[#3D0F17] via-[#2A080E] to-[#1A0508] text-white rounded-2xl p-6 text-center space-y-4 shadow-inner border border-maroon-800/60">
                  <div className="w-18 h-18 w-20 h-20 rounded-full overflow-hidden border-2 border-sacredGold-400 mx-auto shadow-lg ring-4 ring-sacredGold-400/20">
                    <img src="/images/baba_jaigurudev.jpg" alt="Baba Jaigurudev" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-devanagari text-2xl font-bold block text-sacredGold-300 tracking-wide drop-shadow-sm">जयगुरुदेव</span>
                    <p className="text-xs text-roseBlush-100 font-medium mt-1">
                      Official Android App APK
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="inline-block text-xs font-semibold text-sacredGold-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-sacredGold-400/40 shadow-xs">
                      Full Website in 1 App
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ASHRAM VISIT & CONTACT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-roseBlush-100 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <span className="font-devanagari text-maroon-700 font-bold text-sm tracking-wider uppercase">
                आश्रम दर्शन एवं संपर्क
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Visit Baba Jaigurudev Ashram, Ujjain
              </h2>
              <p className="text-sm text-stone-600 font-light leading-relaxed">
                Devotees from all over the world are welcome to attend daily Satsang, experience the divine atmosphere of the Ashram, and participate in seva. Free accommodation and langar (sacred vegetarian food) are provided for all visitors.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                  <MapPin className="w-4 h-4 text-maroon-600" />
                  <span>Opp. Pingleshvar Railway Station, Maksi Road, Ujjain (M.P.)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
                  <Phone className="w-4 h-4 text-maroon-600" />
                  <span>+91-9754700200 / +91-9575600700</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-start lg:items-end gap-3">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white text-sm font-semibold shadow-xs transition-colors"
              >
                <span>Get Directions & Enquire</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <span className="text-xs text-stone-400">Public Entry is Free for Everyone</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
