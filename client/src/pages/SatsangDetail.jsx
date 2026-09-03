import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Navigation,
  Share2,
  CheckCircle2,
  ChevronLeft,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import api from '../services/api';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export const SatsangDetail = () => {
  const { id } = useParams();
  const [satsang, setSatsang] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const FALLBACK_SATSANG_DETAILS = [
    {
      _id: 'satsang-agra-2026',
      title: 'श्री कृष्ण जन्माष्टमी पावन सत्संग कार्यक्रम — आगरा (Agra)',
      date: '2026-09-02T02:30:00.000Z',
      startTime: '08:00 AM',
      endTime: '12:00 PM',
      location: 'विशाल सत्संग मैदान, श्री राम ढाबा के पास, नगला परमसुख, आगरा-कानपुर रोड, एत्मादपुर',
      city: 'Agra',
      state: 'Uttar Pradesh',
      speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
      contactNumber: '+91-9754700200',
      status: 'upcoming',
      isDaily: false,
      description: `॥ जयगुरुदेव ॥\n\nपावन श्री कृष्ण जन्माष्टमी के पावन पर्व पर 2 से 4 तक आगरा-कानपुर रोड पर विशाल सत्संग एवं नामदान अमृत महोत्सव आयोजित हो रहा है।\n\nपूज्य वक्त के समरथ सतगुरु बाबा उमाकान्त जी महाराज मानव मात्र के कल्याण, शाकाहारी जीवन एवं सुरत-शब्द योग साधना का दिव्य संदेश प्रदान करेंगे।\n\nसत्संग स्थल पर अखंड भंडारा, चिकित्सा शिविर एवं साधकों के ठहरने की उत्तम व्यवस्था है।`,
      specialInstructions: 'कृपया समय से पूर्व पधारकर अपना स्थान ग्रहण करें। मोबाइल फोन साइलेंट मोड पर रखें।',
    },
    {
      _id: 'satsang-mathura-weekly',
      title: 'साप्ताहिक रविवार पावन सत्संग एवं नामदान',
      date: new Date().toISOString(),
      startTime: '08:00 AM',
      endTime: '11:30 AM',
      location: 'बाबा जयगुरुदेव आश्रम, पिंगलेश्वर स्टेशन के सामने, मक्सी रोड',
      city: 'Ujjain',
      state: 'Madhya Pradesh',
      speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
      contactNumber: '+91-9754700200',
      status: 'upcoming',
      isDaily: true,
      description: `॥ जयगुरुदेव ॥\n\nप्रत्येक रविवार प्रातः कालीन पावन सत्संग, गुरु आरती एवं पवित्र नाम-दान दीक्षा का विशाल आयोजन। सभी धर्मानुरागी सपरिवार आमंत्रित हैं।`,
      specialInstructions: 'सत्संग के उपरांत गुरु का अखंड भंडारा प्रसाद सभी के लिए उपलब्ध रहेगा।',
    }
  ];

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/satsang/${id}`);
        if (res.success && res.data) {
          setSatsang(res.data);
        } else {
          const match = FALLBACK_SATSANG_DETAILS.find(s => s._id === id || s.id === id) || FALLBACK_SATSANG_DETAILS[0];
          setSatsang(match);
        }
      } catch (err) {
        const match = FALLBACK_SATSANG_DETAILS.find(s => s._id === id || s.id === id) || FALLBACK_SATSANG_DETAILS[0];
        setSatsang(match);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: satsang?.title || 'Jaigurudev Satsang',
          text: `Join the Jaigurudev Satsang at ${satsang?.location}, ${satsang?.city} on ${new Date(satsang?.date).toLocaleDateString()}`,
          url: window.location.href,
        });
      } catch (e) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <LoadingSkeleton count={1} />
      </div>
    );
  }

  if (!satsang) {
    return (
      <div className="max-w-md mx-auto my-20 text-center p-8 bg-white rounded-3xl border border-roseBlush-200">
        <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">Satsang Program Not Found</h3>
        <p className="text-sm text-stone-500 mb-6">The requested satsang schedule might have concluded or been relocated.</p>
        <Link to="/satsang" className="px-6 py-2.5 rounded-full bg-maroon-700 text-white text-xs font-semibold">
          Back to All Schedules
        </Link>
      </div>
    );
  }

  const dateObj = new Date(satsang.date);
  const formattedDate = dateObj.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation & Share */}
        <div className="flex items-center justify-between">
          <Link
            to="/satsang"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-maroon-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Schedules</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-roseBlush-200 text-maroon-800 hover:bg-roseBlush-50 text-xs font-semibold shadow-xs transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? 'Link Copied!' : 'Share Satsang'}</span>
          </button>
        </div>

        {/* Main Content Card */}
        <article className="bg-white rounded-3xl border border-roseBlush-200 p-6 sm:p-10 shadow-soft space-y-8">
          {/* Header Bar */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-devanagari text-maroon-800 font-bold text-xs px-3 py-1 bg-roseBlush-100 rounded-full">
                {satsang.isDaily ? 'दैनिक सत्संग' : 'विशेष पावन समागम'}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                {satsang.status || 'Upcoming'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              {satsang.title}
            </h1>
          </div>

          {/* Quick Details Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6 rounded-2xl bg-roseBlush-50/70 border border-roseBlush-100 text-stone-700">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-maroon-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">दिनांक / Date</span>
                <span className="text-sm font-semibold text-stone-900">{formattedDate}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-maroon-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">समय / Timings</span>
                <span className="text-sm font-semibold text-stone-900">{satsang.startTime} {satsang.endTime ? `to ${satsang.endTime}` : ''}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-maroon-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">वक्ता / Speaker</span>
                <span className="text-sm font-semibold text-stone-900">{satsang.speaker || 'Pujya Maharaj Ji'}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {satsang.description && (
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                About this Satsang Program
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light whitespace-pre-line">
                {satsang.description}
              </p>
            </div>
          )}

          {/* Venue & Location Details */}
          <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-maroon-700" />
              <span>स्थान एवं पता (Venue & Location)</span>
            </h3>

            <div className="space-y-1 text-sm text-stone-700">
              <p className="font-bold text-stone-900">{satsang.location}</p>
              {satsang.address && <p className="font-light">{satsang.address}</p>}
              <p className="font-medium text-maroon-800">{satsang.city}, {satsang.state}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={satsang.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${satsang.location} ${satsang.city}`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon-700 text-white text-xs font-semibold hover:bg-maroon-800 transition-colors shadow-xs"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              {satsang.contactNumber && (
                <a
                  href={`tel:${satsang.contactNumber}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-100 transition-colors"
                >
                  <Phone className="w-4 h-4 text-maroon-600" />
                  <span>Call Venue Coordinator ({satsang.contactNumber})</span>
                </a>
              )}
            </div>
          </div>

          {/* Special Instructions for Devotees */}
          <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-3">
            <h4 className="font-serif font-bold text-sm text-amber-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>श्रद्धालुओं के लिए आवश्यक निर्देश (Devotee Guidelines)</span>
            </h4>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-light">
              {satsang.specialInstructions || 'कृपया सत्संग प्रारंभ होने से 15 मिनट पूर्व स्थान ग्रहण करें। आश्रम में अनुशासन बनाए रखें और पूर्ण सात्विक भाव से उपस्थित हों।'}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default SatsangDetail;
