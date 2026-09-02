import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, TreePine, Users, Award, BookOpen, MapPin } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';

export const AboutUs = () => {
  return (
    <div className="min-h-screen py-10 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <SectionTitle
          hindiSubtitle="संस्था परिचय एवं पावन इतिहास"
          title="About Jaigurudev Sanstha"
          subtitle="A premier spiritual and humanitarian movement dedicated to the moral upliftment, inner realization, and universal brotherhood of humanity."
        />

        {/* Hero Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-roseBlush-100/80 via-white to-cream-100 border border-roseBlush-200 shadow-soft">
          <div className="max-w-3.5xl mx-auto space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-roseBlush-200 text-maroon-800 text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-sacredGold-600" />
              <span>पवित्र ध्येय: मानव मात्र का आत्मिक एवं सामाजिक उत्थान</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 leading-snug">
              सत्य, दया, धर्म और नाम-साधना की पावन ज्योति
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              जयगुरुदेव धर्म प्रचारक संस्था का प्रादुर्भाव संपूर्ण मानव समाज को अज्ञान, आडंबर और भौतिक दुःखों से निकालकर आत्मिक शांति, सदाचार और ईश्वर-प्राप्ति के पावन मार्ग पर अग्रसर करने हेतु हुआ है। मथुरा (उत्तर प्रदेश) स्थित मुख्य आश्रम विश्व भर के लाखों साधकों और जिज्ञासुओं के लिए आध्यात्मिक साधना एवं सेवा का महान केंद्र है।
            </p>
          </div>
        </div>

        {/* 2 Sacred Guru Profile Cards */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="font-devanagari text-xs font-bold text-sacredGold-700 uppercase tracking-widest bg-sacredGold-50 px-3 py-1 rounded-full border border-sacredGold-200">
              ॥ पावन गुरु सत्ता ॥
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              संस्थापक एवं वर्तमान सन्त सतगुरु
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light">
              फोटो पर क्लिक करके पूज्य महापुरुषों का विस्तृत पावन जीवन परिचय पढ़ें
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Baba Jaigurudev Ji Maharaj */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-sacredGold-300 shadow-soft hover:shadow-sacred hover:border-sacredGold-400 transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 group">
              <Link
                to="/baba-jaigurudev-ji"
                className="relative w-36 h-44 sm:w-40 sm:h-48 rounded-2xl overflow-hidden border-2 border-sacredGold-400 shadow-md shrink-0 bg-roseBlush-50"
                aria-label="Read Param Pujya Baba Jaigurudev Ji Biography"
              >
                <img
                  src="/images/baba_jaigurudev.jpg"
                  alt="परम पूज्य बाबा जयगुरुदेव जी महाराज"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                  <span className="text-[10px] text-white font-bold bg-maroon-700/90 px-2 py-0.5 rounded-full">
                    क्लिक करें ›
                  </span>
                </div>
              </Link>

              <div className="space-y-3 flex-1 text-center sm:text-left">
                <span className="text-[10px] font-bold text-sacredGold-700 uppercase tracking-wider bg-sacredGold-50 px-2.5 py-0.5 rounded-full border border-sacredGold-200">
                  संस्थापक एवं युग प्रवर्तक
                </span>
                <h3 className="font-serif font-extrabold text-lg sm:text-xl text-maroon-950 group-hover:text-red-600 transition-colors">
                  <Link to="/baba-jaigurudev-ji">
                    परम पूज्य बाबा जयगुरुदेव जी महाराज
                  </Link>
                </h3>
                <p className="text-xs text-stone-600 font-light leading-relaxed line-clamp-3">
                  भारतवर्ष के महान युग-प्रवर्तक सन्त, शाकाहार क्रांति एवं नाम-साधना के प्रणेता जिन्होंने मथुरा आश्रम की पावन नींव रखी।
                </p>
                <div className="pt-1">
                  <Link
                    to="/baba-jaigurudev-ji"
                    className="inline-flex items-center gap-1 text-xs font-bold text-maroon-700 hover:text-red-600 transition-colors"
                  >
                    <span>जीवन परिचय पढ़ें</span>
                    <span>›</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Baba Umakant Ji Maharaj */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-sacredGold-300 shadow-soft hover:shadow-sacred hover:border-sacredGold-400 transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 group">
              <Link
                to="/baba-umakant-ji"
                className="relative w-36 h-44 sm:w-40 sm:h-48 rounded-2xl overflow-hidden border-2 border-sacredGold-400 shadow-md shrink-0 bg-roseBlush-50"
                aria-label="Read Param Pujya Baba Umakant Ji Biography"
              >
                <img
                  src="/images/maharaj_ji.jpg"
                  alt="परम पूज्य परम सन्त बाबा उमाकान्त जी महाराज"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                  <span className="text-[10px] text-white font-bold bg-maroon-700/90 px-2 py-0.5 rounded-full">
                    क्लिक करें ›
                  </span>
                </div>
              </Link>

              <div className="space-y-3 flex-1 text-center sm:text-left">
                <span className="text-[10px] font-bold text-sacredGold-700 uppercase tracking-wider bg-sacredGold-50 px-2.5 py-0.5 rounded-full border border-sacredGold-200">
                  वक्त के सन्त सतगुरु
                </span>
                <h3 className="font-serif font-extrabold text-lg sm:text-xl text-maroon-950 group-hover:text-red-600 transition-colors">
                  <Link to="/baba-umakant-ji">
                    परम पूज्य बाबा उमाकान्त जी महाराज
                  </Link>
                </h3>
                <p className="text-xs text-stone-600 font-light leading-relaxed line-clamp-3">
                  बाबा जयगुरुदेव जी महाराज के घोषित आध्यात्मिक उत्तराधिकारी, उज्जैन आश्रम के संस्थापक एवं करोड़ों जीवों को नामदान देने वाले वर्तमान सतगुरु।
                </p>
                <div className="pt-1">
                  <Link
                    to="/baba-umakant-ji"
                    className="inline-flex items-center gap-1 text-xs font-bold text-maroon-700 hover:text-red-600 transition-colors"
                  >
                    <span>जीवन परिचय एवं वचन पढ़ें</span>
                    <span>›</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sant Vanshavali (Spiritual Lineage) Section */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-sacredGold-300 shadow-sacred space-y-6">
          <div className="text-center max-w-2.5xl mx-auto space-y-2">
            <span className="font-devanagari text-xs font-bold text-sacredGold-700 uppercase tracking-widest bg-sacredGold-50 px-3 py-1 rounded-full border border-sacredGold-200">
              ॥ पावन संत परंपरा एवं गुरु धारा ॥
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              सन्त वंशावली (Spiritual Lineage)
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light">
              संत कबीर साहिब, गुरु नानक देव जी, स्वामी जी महाराज (शिवदयाल जी), दादा गुरु घूरेलाल जी महाराज, परम पूज्य बाबा जयगुरुदेव जी महाराज एवं वर्तमान वक्त के संत सतगुरु बाबा उमाकान्त जी महाराज की अविरल पावन धारा।
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-roseBlush-200 shadow-md bg-stone-50 group">
            <img
              src="/images/sant_vanshavali.jpg"
              alt="सन्त वंशावली - जयगुरुदेव पावन संत परंपरा"
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>

          <div className="p-5 rounded-2xl bg-roseBlush-50/80 border border-roseBlush-200 text-center space-y-3">
            <div>
              <p className="font-serif font-extrabold text-base sm:text-lg text-maroon-900">
                वक्त के सन्त सतगुरु बाबा उमाकान्त जी महाराज
              </p>
              <p className="text-xs text-stone-600 mt-0.5">
                (परम पूज्य बाबा जयगुरुदेव जी महाराज के आध्यात्मिक उत्तराधिकारी)
              </p>
            </div>
            <div>
              <Link
                to="/baba-umakant-ji"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                <span>पूज्य महाराज जी का विस्तृत जीवन परिचय एवं वचन पढ़ें</span>
                <span>›</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Core Mission & Social Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-roseBlush-100 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-roseBlush-100 text-maroon-700 flex items-center justify-center font-bold text-2xl">
              🌱
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">पूर्ण शाकाहार आंदोलन</h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              समस्त जीव-जंतु ईश्वर की संतान हैं। किसी निर्दोष जीव की हत्या कर अपना पेट भरना महान पाप है। संस्था द्वारा जन-जन को शाकाहार अपनाने की प्रेरणा दी जाती है।
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-roseBlush-100 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sacredGold-100 text-sacredGold-800 flex items-center justify-center font-bold text-2xl">
              🧘
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">सुरत-शब्द योग (नाम-साधना)</h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              मानव शरीर के भीतर विद्यमान दिव्य अनाहद नाद (शब्द) और आत्मिक प्रकाश से जुड़कर मोक्ष प्राप्ति की सरल, प्रामाणिक और सहज साधना पद्धति।
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-roseBlush-100 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-2xl">
              🚫
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">नशामुक्ति एवं नैतिक जागरण</h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              शराब, धूम्रपान और मादक पदार्थों से युवाओं एवं परिवारों को मुक्त कराकर एक स्वस्थ, चरित्रवान और सशक्त समाज का निर्माण करना।
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-roseBlush-100 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-2xl">
              🍲
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">अखंड भंडारा एवं अन्नदान</h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              आश्रम में आने वाले प्रत्येक दर्शनार्थी और जरूरतमंद के लिए 365 दिन शुद्ध, सात्विक एवं निशुल्क भोजन प्रसाद (लंगर) की अविरल व्यवस्था।
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-roseBlush-100 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-2xl">
              🌳
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">पर्यावरण एवं जीव रक्षा</h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              वृक्षारोपण, जल संरक्षण, गौ-सेवा और प्रकृति के प्रति संवेदनशील रहने का जन-संदेश।
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-roseBlush-100 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-2xl">
              🕊️
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">विश्व बंधुत्व एवं शांति</h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              जाति, संप्रदाय, भाषा और देश के समस्त भेदों को मिटाकर 'सबका मालिक एक' के भाव से संपूर्ण विश्व में प्रेम और शांति की स्थापना।
            </p>
          </div>
        </div>

        {/* Mathura Ashram Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-roseBlush-200 shadow-soft space-y-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-maroon-700" />
            <h3 className="text-2xl font-serif font-bold text-stone-900">
              Mathura Central Ashram (मथुरा मुख्य आश्रम)
            </h3>
          </div>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
            मथुरा-दिल्ली राष्ट्रीय राजमार्ग (NH-19) पर स्थित जयगुरुदेव आश्रम एक विशाल एवं शांत आध्यात्मिक तपोभूमि है। यहाँ भव्य नाम-साधना मंदिर, अखंड सत्संग भवन, दर्शनार्थियों के लिए विशाल आवास भवन, निशुल्क चिकित्सालय और गौशाला स्थित है। प्रत्येक रविवार तथा वार्षिक भंडारा उत्सवों पर लाखों श्रद्धालु यहाँ आत्मिक शांति प्राप्त करते हैं।
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/satsang"
              className="px-6 py-3 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-xs transition-colors"
            >
              View Satsang Schedule
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-roseBlush-100 hover:bg-roseBlush-200 text-maroon-800 font-semibold text-xs transition-colors"
            >
              Contact Ashram Office
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
