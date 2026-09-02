import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import api from '../services/api';
import SectionTitle from '../components/common/SectionTitle';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(0);

  // Default rich fallback FAQs
  const fallbackFaqs = [
    {
      question: 'जयगुरुदेव धर्म प्रचारक संस्था क्या है और इसका मुख्य उद्देश्य क्या है?',
      answer: 'जयगुरुदेव संस्था एक पावन आध्यात्मिक एवं मानव सेवा संगठन है, जिसका मुख्यालय मथुरा (उत्तर प्रदेश) में स्थित है। संस्था का मुख्य उद्देश्य समाज में शाकाहार, नशामुक्ति, नैतिक मूल्यों और सुरत-शब्द योग (नाम-साधना) के माध्यम से मानव मात्र का आत्मिक कल्याण करना है।',
      category: 'About Sanstha',
    },
    {
      question: 'सत्संग में भाग लेने के क्या नियम हैं और क्या कोई शुल्क लगता है?',
      answer: 'जयगुरुदेव सत्संग और आश्रम दर्शन पूर्णतया निशुल्क हैं। किसी भी श्रद्धालु या आगंतुक से कोई प्रवेश शुल्क नहीं लिया जाता। सत्संग में भाग लेने के लिए केवल सात्विक भाव, अनुशासन और शांति बनाए रखना आवश्यक है।',
      category: 'Satsang Programs',
    },
    {
      question: 'मथुरा आश्रम में आवास एवं भोजन (लंगर) की क्या व्यवस्था है?',
      answer: 'आश्रम में देश-विदेश से आने वाले सभी श्रद्धालुओं के लिए स्वच्छ आवास और 24 घंटे शुद्ध सात्विक भोजन प्रसाद (लंगर) की निशुल्क व्यवस्था आश्रम प्रबंधन द्वारा की जाती है।',
      category: 'Ashram Visit',
    },
    {
      question: 'नाम-दान (दीक्षा) प्राप्त करने की क्या प्रक्रिया है?',
      answer: 'नाम-दान प्राप्त करने के लिए साधक को आजीवन पूर्ण शाकाहारी रहने, किसी भी प्रकार के नशे से दूर रहने तथा प्रतिदिन प्रातः-सायं नाम-साधना (सिमरन, ध्यान, भजन) करने का संकल्प लेना होता है। यह दीक्षा सत्संग के उपरांत निशुल्क प्रदान की जाती है।',
      category: 'Sadhana & Dhyan',
    },
    {
      question: 'जयगुरुदेव साधना मोबाइल ऐप का उपयोग कैसे करें?',
      answer: 'साधना ऐप को हमारी वेबसाइट के Downloads सेक्शन से सीधे APK रूप में डाउनलोड किया जा सकता है। यह ऐप 100% ऑफलाइन कार्य करता है और आपकी नाम-साधना का समय, अलार्म एवं दैनिक रिपोर्ट आपके फोन में पूर्णतः सुरक्षित व निजी रखता है।',
      category: 'General',
    },
  ];

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const res = await api.get('/faq');
        if (res.success && res.data && res.data.length > 0) {
          setFaqs(res.data);
        } else {
          setFaqs(fallbackFaqs);
        }
      } catch (e) {
        setFaqs(fallbackFaqs);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionTitle
          hindiSubtitle="अक्सर पूछे जाने वाले प्रश्न"
          title="Frequently Asked Questions (FAQ)"
          subtitle="Find clear, verified answers to common questions about Jaigurudev Sanstha, Ashram visits, and Sadhana rules."
        />

        {loading ? (
          <LoadingSkeleton count={4} />
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-roseBlush-200 overflow-hidden shadow-soft transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-roseBlush-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-roseBlush-100 text-maroon-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 font-devanagari">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-maroon-700' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 border-t border-roseBlush-100/60 text-stone-600 text-sm sm:text-base leading-relaxed font-light font-devanagari">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQPage;
