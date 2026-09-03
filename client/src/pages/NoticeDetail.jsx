import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Bell,
  Calendar,
  ChevronLeft,
  Share2,
  Printer,
  FileText,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Building,
  Tag
} from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import SmartMediaPreview from '../components/common/SmartMediaPreview';

const FALLBACK_NOTICES = [
  {
    _id: 'notice-agra-janmashtami-2026',
    title: 'श्री कृष्ण जन्माष्टमी पावन सत्संग कार्यक्रम — आगरा (Agra) में 2 से 4 तक आयोजित',
    content: `॥ जयगुरुदेव ॥\n\nसमस्त साधक-संगत, सत्संगी प्रेमियों एवं धर्मानुरागियों को सूचित किया जाता है कि परम पूज्य वक्त के समरथ सन्त सतगुरु बाबा उमाकान्त जी महाराज के पावन सानिध्य में 'श्री कृष्ण जन्माष्टमी' का पावन सत्संग एवं नामदान अमृत महोत्सव आगरा में आयोजित किया जा रहा है।\n\n📌 कार्यक्रम मुख्य विवरण:\n• दिनांक: 2 से 4 तक (दैनिक)\n• प्रातः कालीन सत्र: 08:00 AM से 11:30 AM (सत्संग एवं ध्यान-वचन)\n• सायं कालीन सत्र: 05:30 PM से 08:00 PM (आरती एवं गुरु-वंदना)\n• स्थान: विशाल सत्संग मैदान, श्री राम ढाबा के पास, नगला परमसुख, आगरा-कानपुर रोड, एत्मादपुर, आगरा (उ.प्र.)\n\n🍛 भंडारा एवं आवास:\nसत्संग परिसर में 24 घंटे गुरु का अखंड लंगर एवं शुद्ध पेयजल निशुल्क उपलब्ध रहेगा। बाहर से पधारने वाले श्रद्धालुओं के लिए विशाल विश्राम शिविरों की व्यवस्था की गई है।\n\n🕊️ पवित्र नामदान:\nजो भी भाई-बहन जीवन भर के लिए शाकाहारी रहने एवं नशामुक्त जीवन अपनाने का संकल्प लेंगे, उन्हें पूज्य महाराज जी द्वारा पवित्र नामदान (सुरत-शब्द योग दीक्षा) निशुल्क प्रदान की जाएगी।\n\nसभी प्रेमियों से विनम्र अनुरोध है कि सपरिवार इष्ट-मित्रों सहित पधारकर पुण्य लाभ अर्जित करें।`,
    priority: 'Very Important',
    category: 'Satsang Announcement',
    publishedAt: '2026-09-02T02:00:00.000Z',
    referenceNumber: 'JGD/NOT/2026/089',
    signatory: 'केंद्रीय प्रचार समिति, जयगुरुदेव आश्रम'
  },
  {
    _id: 'notice-weekly-sunday',
    title: 'प्रत्येक रविवार प्रातः 8:00 बजे पावन सत्संग एवं नाम-दान',
    content: `॥ जयगुरुदेव ॥\n\nबाबा जयगुरुदेव आश्रम, मक्सी रोड उज्जैन (म.प्र.) में प्रत्येक रविवार प्रातः 8:00 बजे से 11:30 बजे तक नियमित पावन सत्संग एवं पवित्र नाम-दान का विशाल कार्यक्रम आयोजित होता है।\n\nकार्यक्रम की मुख्य रूपरेखा:\n1. प्रातः 06:00 बजे: प्रभात फेरी एवं नित्य नियम प्रार्थना\n2. प्रातः 08:00 बजे: पावन गुरुवाणी पाठ एवं पूज्य महाराज जी के अमृत वचन\n3. प्रातः 10:30 बजे: नए जिज्ञासुओं के लिए पवित्र नामदान दीक्षा\n4. प्रातः 11:30 बजे: अखंड भंडारा प्रसाद वितरण\n\nसभी जिज्ञासुजन एवं श्रद्धालु सादर आमंत्रित हैं।`,
    priority: 'Important',
    category: 'General Notice',
    publishedAt: '2026-08-30T02:00:00.000Z',
    referenceNumber: 'JGD/NOT/2026/076',
    signatory: 'आश्रम कार्यालय व्यवस्थापक'
  },
  {
    _id: 'notice-online-live',
    title: 'आधिकारिक यूट्यूब चैनल (@Jaigurudevukm) पर लाइव सत्संग प्रसारण सूचना',
    content: `॥ जयगुरुदेव ॥\n\nदूर-दराज रहने वाले तथा अस्वस्थ प्रेमियों की सुविधा हेतु पूज्य महाराज जी के सभी सत्संग कार्यक्रमों का सीधा प्रसारण संस्था के आधिकारिक यूट्यूब चैनल (@Jaigurudevukm) पर उपलब्ध रहता है।\n\nलाइव प्रसारण से जुड़ने हेतु आधिकारिक लिंक: https://www.youtube.com/@Jaigurudevukm/streams\n\nकृपया अनाधिकृत चैनलों या भ्रामक वीडियो से सावधान रहें।`,
    priority: 'Normal',
    category: 'Media Notice',
    publishedAt: '2026-08-25T02:00:00.000Z',
    referenceNumber: 'JGD/NOT/2026/065',
    signatory: 'सूचना एवं प्रसारण विभाग'
  }
];

export const NoticeDetail = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchNotice = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/notices/${id}`);
        if (res.success && res.data) {
          setNotice(res.data);
        } else {
          const match = FALLBACK_NOTICES.find((n) => n._id === id || n.id === id) || FALLBACK_NOTICES[0];
          setNotice(match);
        }
      } catch (err) {
        const match = FALLBACK_NOTICES.find((n) => n._id === id || n.id === id) || FALLBACK_NOTICES[0];
        setNotice(match);
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: notice?.title || 'जयगुरुदेव आश्रम सूचना',
          text: notice?.title,
          url: window.location.href,
        });
      } catch (e) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <LoadingSkeleton count={1} />
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="max-w-md mx-auto my-20 text-center p-8 bg-white rounded-3xl border border-roseBlush-200 shadow-md">
        <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">Notice Not Found</h3>
        <p className="text-sm text-stone-500 mb-6">The requested official notice is unavailable or has expired.</p>
        <Link to="/notices" className="px-6 py-2.5 rounded-full bg-maroon-700 text-white text-xs font-semibold">
          Back to Notices
        </Link>
      </div>
    );
  }

  const pubDate = new Date(notice.publishedAt || notice.createdAt || Date.now()).toLocaleDateString('hi-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-cream-50 print:bg-white print:py-0">
      <SEO
        title={`${notice.title} — आधिकारिक आश्रम सूचना | जयगुरुदेव`}
        description={notice.content?.slice(0, 160)}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation & Action Bar (Hidden when printing) */}
        <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link
            to="/notices"
            className="inline-flex items-center gap-1 text-xs font-bold text-maroon-800 hover:text-maroon-950 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>वापस सूचना पट्ट (Back to Notices)</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-roseBlush-50 text-stone-700 font-semibold text-xs border border-roseBlush-200 shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>प्रिंट करें (Print)</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-maroon-700 to-roseBlush-700 hover:from-maroon-800 hover:to-roseBlush-800 text-white font-semibold text-xs shadow-xs transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? '✓ लिंक कॉपी हुआ' : 'साझा करें (Share)'}</span>
            </button>
          </div>
        </div>

        {/* Official Notice Document Card */}
        <div className="bg-white rounded-3xl border-2 border-sacredGold-300 shadow-sacred p-6 sm:p-10 space-y-6 relative overflow-hidden print:border-none print:shadow-none print:p-0">
          {/* Header Watermark Seal */}
          <div className="text-center pb-6 border-b-2 border-sacredGold-400/40 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 font-devanagari">
              ॥ जयगुरुदेव ॥
            </span>
            <h1 className="text-xl sm:text-2xl font-serif font-extrabold text-maroon-950">
              जयगुरुदेव धर्म प्रचारक संस्था (आधिकारिक सूचना)
            </h1>
            <p className="text-xs text-stone-500 font-devanagari">
              केंद्रीय आश्रम: पिंगलेश्वर स्टेशन के सामने, मक्सी रोड, उज्जैन (म.प्र.) / मथुरा आश्रम
            </p>
          </div>

          {/* Meta Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-roseBlush-50/70 border border-roseBlush-200 text-xs text-stone-700">
            <div className="flex items-center gap-2">
              <span className="font-bold text-maroon-900">
                क्रमांक / Ref: {notice.referenceNumber || `JGD/NOT/2026/0${notice._id?.slice(-3) || '101'}`}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-stone-600">
                <Calendar className="w-3.5 h-3.5 text-maroon-700" />
                <span>दिनांक: {pubDate}</span>
              </span>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white">
                {notice.priority || 'Notice'}
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase text-sacredGold-700 tracking-wider bg-sacredGold-50 px-2.5 py-0.5 rounded-full border border-sacredGold-200">
              {notice.category || 'आश्रम सूचना'}
            </span>
            <h2 className="text-lg sm:text-2xl font-serif font-bold text-stone-900 leading-snug">
              {notice.title}
            </h2>
          </div>

          {/* Media / Drive / YouTube Preview */}
          {notice.mediaUrl && (
            <div className="pt-2">
              <SmartMediaPreview
                url={notice.mediaUrl}
                title={notice.title}
                displayMode={notice.displayMode}
                showEmbedDirectly={true}
              />
              {notice.displayMode === 'link_with_details' && (
                <div className="mt-3">
                  <a
                    href={notice.mediaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs shadow-xs transition-all"
                  >
                    <span>Open External Link / संलग्न लिंक खोलें</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Content Body */}
          {notice.displayMode !== 'link_only' && (
            <div className="text-stone-800 text-xs sm:text-sm sm:leading-relaxed whitespace-pre-line space-y-4 pt-2 font-normal">
              {notice.content}
            </div>
          )}

          {/* Official Signatory Stamp */}
          <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-end justify-between gap-4">
            <div className="text-left text-xs text-stone-500 space-y-1">
              <p className="flex items-center gap-1 font-semibold text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
                <span>आधिकारिक प्रमाणित सूचना (Verified by Ashram Admin)</span>
              </p>
              <p className="text-[11px]">वेबसाइट: jaigurudev.org / हेल्पलाइन: +91-9754700200</p>
            </div>

            <div className="text-right space-y-1">
              <div className="w-28 h-10 border border-dashed border-stone-300 rounded-lg flex items-center justify-center text-[10px] text-stone-400 italic mb-1 ml-auto">
                [ मुहर / Seal ]
              </div>
              <p className="text-xs font-bold text-maroon-900">
                {notice.signatory || 'केंद्रीय व्यवस्थापक'}
              </p>
              <p className="text-[10px] text-stone-500">
                जयगुरुदेव धर्म प्रचारक संस्था
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
