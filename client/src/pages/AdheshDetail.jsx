import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ScrollText,
  Calendar,
  ChevronLeft,
  Share2,
  Printer,
  Download,
  ShieldCheck,
  Building,
  CheckCircle2,
  FileCheck,
  ExternalLink
} from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import SmartMediaPreview from '../components/common/SmartMediaPreview';

const FALLBACK_ADHESH = [
  {
    _id: 'adhesh-001',
    title: 'आश्रम परिसर में अनुशासन, सात्विकता एवं स्वच्छता बनाए रखने संबंधी दिशा-निर्देश',
    referenceNumber: 'JGD/ADM/2026/014',
    issueDate: '2026-08-15',
    category: 'General Order',
    signatory: 'केंद्रीय व्यवस्थापक, जयगुरुदेव आश्रम',
    description: `॥ जयगुरुदेव ॥\n\nआश्रम परिसर में आने वाले समस्त साधक-संगत, सेवादारों एवं श्रद्धालुओं को सूचित किया जाता है कि आश्रम की गरिमा, अनुशासन एवं पवित्रता को दृष्टिगत रखते हुए निम्नलिखित आदेश तत्काल प्रभाव से लागू किए जाते हैं:\n\n1. शाकाहार एवं नशामुक्त आचरण:\nआश्रम परिसर में किसी भी प्रकार का मांसाहारी भोजन, अंडा, या नशीला पदार्थ (बीड़ी, सिगरेट, तंबाकू, गुटखा, शराब आदि) लाना अथवा सेवन करना पूर्णतः वर्जित एवं दंडनीय है।\n\n2. सत्संग एवं आरती अनुशासन:\nप्रातः एवं सायं आरती व सत्संग समय पर सभी साधक शांत भाव से नियत स्थान पर बैठें। मोबाइल फोन को अनिवार्य रूप से साइलेंट मोड पर रखें।\n\n3. लंगर एवं स्वच्छता मर्यादा:\nभंडारा प्रसाद का अनादर न करें और भोजन जूठा न छोड़ें। अपशिष्ट पदार्थों को केवल नियत कचरा पात्रों में ही डालें। जल का अपव्यय न करें।\n\n4. सेवादार दायित्व:\nसभी सेवा दल के सदस्य आश्रम वर्दी एवं पहचान-पत्र धारण कर ही अपनी सेवा निष्पादित करें एवं आगंतुकों से विनम्रतापूर्वक व्यवहार करें।\n\nउक्त आदेशों का कड़ाई से अनुपालन सुनिश्चित किया जाए।`,
  },
  {
    _id: 'adhesh-002',
    title: 'पवित्र भंडारा एवं लंगर सेवा में स्वच्छता और जल संरक्षण आदेश',
    referenceNumber: 'JGD/ADM/2026/012',
    issueDate: '2026-08-01',
    category: 'Bhandara Protocol',
    signatory: 'सेवा दल प्रमुख, केंद्रीय लंगर समिति',
    description: `॥ जयगुरुदेव ॥\n\nआश्रम के समस्त विशाल भंडारा एवं लंगर प्रभारियों को आदेशित किया जाता है:\n\n1. अन्न पकाने के बर्तनों की विशेष स्वच्छता एवं शुद्धता रखी जाए।\n2. केवल शुद्ध देसी मसालों एवं सात्विक सामग्रियों का ही उपयोग किया जाए।\n3. जल संरक्षण का विशेष ध्यान रखा जाए। जल नल खुला न छोड़ा जाए।\n4. प्रसाद वितरण में किसी भी प्रकार का भेदभाव न हो, सभी नर-नारियों को समान भाव से आदरपूर्वक प्रसाद वितरित किया जाए।`,
  }
];

export const AdheshDetail = () => {
  const { id } = useParams();
  const [adhesh, setAdhesh] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchAdhesh = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/adhesh/${id}`);
        if (res.success && res.data) {
          setAdhesh(res.data);
        } else {
          const match = FALLBACK_ADHESH.find((a) => a._id === id || a.id === id) || FALLBACK_ADHESH[0];
          setAdhesh(match);
        }
      } catch (err) {
        const match = FALLBACK_ADHESH.find((a) => a._id === id || a.id === id) || FALLBACK_ADHESH[0];
        setAdhesh(match);
      } finally {
        setLoading(false);
      }
    };

    fetchAdhesh();
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: adhesh?.title || 'जयगुरुदेव आश्रम आधिकारिक आदेश',
          text: adhesh?.title,
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

  if (!adhesh) {
    return (
      <div className="max-w-md mx-auto my-20 text-center p-8 bg-white rounded-3xl border border-roseBlush-200 shadow-md">
        <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">Order Not Found</h3>
        <p className="text-sm text-stone-500 mb-6">The requested official directive is unavailable.</p>
        <Link to="/adhesh" className="px-6 py-2.5 rounded-full bg-maroon-700 text-white text-xs font-semibold">
          Back to Ashram Adhesh
        </Link>
      </div>
    );
  }

  const issueDate = new Date(adhesh.issueDate || adhesh.createdAt || Date.now()).toLocaleDateString('hi-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-cream-50 print:bg-white print:py-0">
      <SEO
        title={`${adhesh.title} — आधिकारिक आश्रम आदेश | जयगुरुदेव`}
        description={adhesh.description?.slice(0, 160)}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link
            to="/adhesh"
            className="inline-flex items-center gap-1 text-xs font-bold text-maroon-800 hover:text-maroon-950 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>वापस आदेश सूची (Back to Ashram Adhesh)</span>
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

        {/* Official Directive Document Letterhead */}
        <div className="bg-white rounded-3xl border-2 border-sacredGold-400 shadow-sacred p-6 sm:p-10 space-y-6 relative overflow-hidden print:border-none print:shadow-none print:p-0">
          {/* Top Letterhead */}
          <div className="text-center pb-6 border-b-2 border-sacredGold-400/50 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 font-devanagari">
              ॥ जयगुरुदेव ॥
            </span>
            <h1 className="text-xl sm:text-2xl font-serif font-extrabold text-maroon-950">
              जयगुरुदेव धर्म प्रचारक संस्था — आधिकारिक आश्रम आदेश
            </h1>
            <p className="text-xs text-stone-500 font-devanagari">
              केंद्रीय कार्यालय: बाबा जयगुरुदेव आश्रम, पिंगलेश्वर, मक्सी रोड, उज्जैन (म.प्र.)
            </p>
          </div>

          {/* Reference Meta Box */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-sacredGold-50 to-roseBlush-50 border border-sacredGold-300 text-xs text-stone-800">
            <div>
              <span className="font-bold text-maroon-950 block">
                आदेश पत्रांक: {adhesh.referenceNumber || 'JGD/ADM/2026/014'}
              </span>
              <span className="text-[11px] text-stone-500 font-medium">
                श्रेणी / Category: {adhesh.category || 'General Directive'}
              </span>
            </div>

            <div className="text-right">
              <span className="flex items-center gap-1 font-semibold text-stone-700">
                <Calendar className="w-3.5 h-3.5 text-maroon-700" />
                <span>जारी दिनांक: {issueDate}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-bold mt-0.5">
                <FileCheck className="w-3 h-3" />
                <span>सक्रिय आदेश (In Effect)</span>
              </span>
            </div>
          </div>

          {/* Order Title */}
          <div className="pt-2">
            <h2 className="text-lg sm:text-2xl font-serif font-bold text-stone-900 leading-snug">
              विषय: {adhesh.title}
            </h2>
          </div>

          {/* Media / Drive / YouTube Preview */}
          {adhesh.mediaUrl && (
            <div className="pt-2">
              <SmartMediaPreview
                url={adhesh.mediaUrl}
                title={adhesh.title}
                displayMode={adhesh.displayMode}
                showEmbedDirectly={true}
              />
              {adhesh.displayMode === 'link_with_details' && (
                <div className="mt-3">
                  <a
                    href={adhesh.mediaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs shadow-xs transition-all"
                  >
                    <span>Open External Reference / संलग्न लिंक खोलें</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Directive Text Body */}
          {adhesh.displayMode !== 'link_only' && (
            <div className="text-stone-800 text-xs sm:text-sm sm:leading-relaxed whitespace-pre-line space-y-4 font-normal pt-2">
              {adhesh.description}
            </div>
          )}

          {/* Official Seal and Signature */}
          <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-end justify-between gap-4">
            <div className="text-left text-xs text-stone-500 space-y-1">
              <p className="flex items-center gap-1 font-semibold text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
                <span>आधिकारिक मान्यता प्राप्त आदेश (Official Executive Order)</span>
              </p>
              <p className="text-[11px]">समस्त आश्रम प्रभारियों एवं साधक-संगत द्वारा मान्य</p>
            </div>

            <div className="text-right space-y-1">
              <div className="w-28 h-10 border border-dashed border-stone-300 rounded-lg flex items-center justify-center text-[10px] text-stone-400 italic mb-1 ml-auto">
                [ अधिकृत मुहर ]
              </div>
              <p className="text-xs font-bold text-maroon-900">
                {adhesh.signatory || 'केंद्रीय व्यवस्थापक'}
              </p>
              <p className="text-[10px] text-stone-500">
                जयगुरुदेव धर्म प्रचारक संस्था, उज्जैन आश्रम
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdheshDetail;
