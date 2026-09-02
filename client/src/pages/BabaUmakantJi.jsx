import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, CheckCircle2, BookOpen, Quote, ShieldCheck, Calendar, MapPin, Award } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionTitle from '../components/common/SectionTitle';

export const BabaUmakantJi = () => {
  const [lang, setLang] = useState('hi'); // 'hi' or 'en'

  const vachans = [
    { id: 1, text: 'सच्चे सन्त के दर्शन, सतसंग और आशीर्वाद से नहीं बनने वाला काम भी बन जाता है।' },
    { id: 2, text: 'जीव के मुक्ति-मोक्ष व जन्म-मरण की पीड़ा से मुक्त करने का उपाय वक्त गुरु के पास ही होता है।' },
    { id: 3, text: 'विवेकशील, बुद्धिजीवियों को भारत के आध्यात्मवाद को जगाते रहना चाहिए।' },
    { id: 4, text: 'जीव हत्या करके पैसा कमाने वाला कोई भी देश कभी तरक्की नहीं कर सकता है।' },
    { id: 5, text: 'अब ऐसा समय आ गया है कि आप सब लोग शाकाहारी, चरित्रवान, नशे से मुक्त, देशप्रेमी, धर्मप्रेमी बनकर कुदरती कहर का मुकाबला करो, नहीं तो अस्तित्व ही मिट जाएगा।' },
    { id: 6, text: 'किसी भी जाति, धर्म व धार्मिक पुस्तक की निंदा, अपमान मत करो। सभी के दिल में प्यार - मोहब्बत का जज्बा पैदा करो।' },
    { id: 7, text: 'ध्यान दें ! बच्चे और बच्चियों में नशे की आदत व चरित्र का गिरना भारत जैसे धार्मिक देश के लिए खतरनाक होगा।' },
    { id: 8, text: 'बच्चे-बच्चियों का ध्यान रखो। इनमें नशाखोरी या चरित्रहीनता आयेगी तो समझ लो नाश ही हो जायेगा।' },
    { id: 9, text: 'आजमाइश करके देख लो जयगुरुदेव नाम प्रभु का ही है। जब मुसीबत में आदमी देवी-देवता फरिश्ते मददगार नहीं होंगे तब यह जयगुरुदेव नाम शाकाहारी, चरित्रवान, नशामुक्त लोगों के लिए मददगार होगा।' },
    { id: 10, text: 'बीमारी व तकलीफों में आराम देने वाला नाम "जयगुरुदेव" जयगुरुदेव जयगुरुदेव जयगुरुदेव जय जयगुरुदेव की ध्वनि रोज सुबह-शाम बोलिए और परिवार वालों को बोलवाइए फिर फायदा देखिए।' },
    { id: 11, text: 'इंसान को दान, बुद्धिदान, गौदान, कन्यादान व मतदान बहुत सोच समझ कर सुपात्र को देना चाहिए।' },
    { id: 12, text: 'शाकाहारी, नशामुक्त, चरित्रवान की बुद्धि व सोच समझ सभी लोगों के लिए हितकारी होती है।' },
    { id: 13, text: 'समय ऐसा आएगा की मजबूर होकर लोग शाकाहार अपनाएंगे।' },
    { id: 14, text: 'एक ऐसा भी समय आएगा कि देश के सभी मंत्री, एम.एल.ए, एम.पी व अधिकारी कर्मचारी शाकाहारी नशा मुक्त, सेवाभावी व देशभक्त होंगे।' },
    { id: 15, text: 'तेज नशे का सेवन करने वाला मनुष्य दीन-दुनिया का सुख कभी नहीं भोग सकता है।' },
    { id: 16, text: 'माता-पिता, बूढ़े, बुजुर्गों, अधिकारी, कर्मचारी सभी का सम्मान करो।' },
  ];

  return (
    <div className="min-h-screen py-10 sm:py-16 space-y-16">
      <SEO
        title="परम पूज्य परम सन्त बाबा उमाकान्त जी महाराज के बारे में — Jaigurudev"
        description="निजधाम वासी परम पूज्य बाबा जयगुरुदेव जी महाराज के आध्यात्मिक उत्तराधिकारी परम पूज्य परम सन्त बाबा उमाकान्त जी महाराज का जीवन परिचय, आध्यात्मिक मिशन एवं जीव हितकारी वचन।"
        keywords="Baba Umakant Ji Maharaj, Jaigurudev UKM, Sant Parampara, Ujjain Ashram, Naamdan, Shakahar"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Language Switcher Bar */}
        <div className="flex items-center justify-between border-b border-roseBlush-200 pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sacredGold-50 border border-sacredGold-200 text-sacredGold-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sacredGold-600" />
            <span>वक्त के सन्त सतगुरु</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang('hi')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                lang === 'hi'
                  ? 'bg-maroon-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                lang === 'en'
                  ? 'bg-maroon-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Hero Section with Portrait */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-roseBlush-100/90 via-white to-cream-100 border-2 border-sacredGold-300 shadow-sacred">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Portrait Image */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl overflow-hidden border-4 border-sacredGold-400 shadow-xl bg-roseBlush-50 group">
                <img
                  src="/images/maharaj_ji.jpg"
                  alt="परम पूज्य परम सन्त बाबा उमाकान्त जी महाराज"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 px-4 py-2 rounded-2xl bg-white border border-roseBlush-200 shadow-xs">
                <h3 className="font-serif font-extrabold text-lg text-maroon-900">
                  परम पूज्य परम सन्त बाबा उमाकान्त जी महाराज
                </h3>
                <p className="text-xs text-stone-600 font-medium">
                  निजधाम वासी परम पूज्य बाबा जयगुरुदेव जी महाराज के आध्यात्मिक उत्तराधिकारी
                </p>
              </div>
            </div>

            {/* Intro Text */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-block">
                <span className="font-devanagari text-xs font-bold text-sacredGold-700 uppercase tracking-widest bg-sacredGold-50 px-3 py-1 rounded-full border border-sacredGold-200">
                  ॥ आध्यात्मिक उत्तराधिकारी ॥
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-stone-900 leading-tight">
                {lang === 'hi'
                  ? 'परम पूज्य परम सन्त बाबा उमाकान्त जी महाराज का पावन जीवन परिचय'
                  : 'About Param Sant Baba Umakant Ji Maharaj'}
              </h1>

              <p className="text-sm sm:text-base text-stone-700 font-light leading-relaxed">
                {lang === 'hi' ? (
                  <>
                    परम पूज्य परम सन्त बाबा उमाकान्त जी महाराज का जन्म उत्तर प्रदेश (भारत) के एक छोटे से गाँव में एक धार्मिक परिवार में हुआ। बाल्यावस्था से ही आध्यात्मिक रुचि के कारण पढ़ाई पूर्ण होते ही सन् 1973 में खिंचकर बाबा जयगुरुदेव जी महाराज के पास पहुँचे, नामदान लिया और गुरु आदेशानुसार सेवा व भजन कार्य में लग गए।
                  </>
                ) : (
                  <>
                    Param Pujya Param Sant Baba Umakant Ji Maharaj was born in a pious family in a small village of Uttar Pradesh, India. Drawn by an innate spiritual inclination from childhood, upon completing his education in 1973, he arrived at the feet of Param Pujya Baba Jaigurudev Ji Maharaj, received divine initiation (Naamdan), and dedicated his life to selfless seva and devotion.
                  </>
                )}
              </p>

              <div className="p-4 rounded-2xl bg-roseBlush-50 border border-roseBlush-200/80">
                <Quote className="w-6 h-6 text-sacredGold-600 mb-2" />
                <p className="text-xs sm:text-sm font-serif italic text-maroon-950 leading-relaxed font-semibold">
                  “उमाकान्त तिवारी को भेज रहा हूँ, समझ लेना मैं ही आ रहा हूँ।”
                </p>
                <span className="text-[11px] text-stone-500 block mt-1">
                  — पूज्य बाबा जयगुरुदेव जी महाराज द्वारा देश भर के सत्संगों के लिए भेजी गई आधिकारिक चिट्ठियों के शब्द
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Spiritual Journey */}
        <div className="space-y-8">
          <SectionTitle
            hindiSubtitle="अखंड समर्पण एवं सेवा की यात्रा"
            title="Spiritual Journey & Succession"
            subtitle="How Baba Umakant Ji Maharaj served with unyielding devotion and was officially anointed by Baba Jaigurudev Ji Maharaj."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: 1976 Dedicated Seva */}
            <div className="p-8 rounded-3xl bg-white border border-roseBlush-100 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-roseBlush-100 text-maroon-700 flex items-center justify-center font-bold text-xl">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                साये की तरह गुरु सेवा (1976 से निरंतर)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                शुरू में गुरु के पास रहते तथा बीच-बीच में थोड़े समय के लिए गाँव जाकर माता-पिता की सेवा करते रहे और सन् 1976 से बाबा उमाकान्त जी महाराज साये की तरह अपने गुरु बाबा जयगुरुदेव जी महाराज के साथ बराबर लगे रहे। गुरु की इतनी असीम दया हुई कि अपनी हर तरह की नजदीकी सेवा तो बाबा उमाकान्त जी महाराज को सौंपी ही, साथ ही साथ पूरे देश में सतसंग करने का दिव्य दायित्व भी प्रदान किया।
              </p>
            </div>

            {/* Card 2: 16 May 2007 Succession Declaration */}
            <div className="p-8 rounded-3xl bg-white border-2 border-sacredGold-300 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sacredGold-100 text-sacredGold-800 flex items-center justify-center font-bold text-xl">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                उत्तराधिकार की पावन घोषणा (16 मई 2007)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                शरीर छोड़ने से लगभग पाँच साल पहले ही, 16 मई 2007 को बशीरतगंज, जिला-उन्नाव (उ.प्र.) के सतसंग में, बाबा जयगुरुदेव जी महाराज ने चालीसों साल शरण में रहे अपने परम शिष्य बाबा उमाकान्त जी महाराज को अपने बाद पुराने प्रेमियों की संभाल करने तथा नए प्रेमियों को नामदान देने की खुले मंच से घोषणा कर दी थी।
              </p>
            </div>

            {/* Card 3: Establishment of Ujjain Ashram */}
            <div className="p-8 rounded-3xl bg-white border border-roseBlush-100 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                उज्जैन आश्रम एवं धर्म विकास संस्था की स्थापना
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                बाबा जयगुरुदेव जी महाराज के निजधाम गमन के बाद विषम परिस्थितियों में बाबा उमाकान्त जी महाराज सब कुछ छोड़कर खाली हाथ उज्जैन (मध्य प्रदेश) पधारे, जहाँ प्रेमियों के सहयोग से भव्य आश्रम बनाया व 'बाबा जयगुरुदेव धर्म विकास संस्था, उज्जैन' की स्थापना कर गुरु मिशन को अविरल आगे बढ़ाया।
              </p>
            </div>

            {/* Card 4: Guru Purnima 2013 Open Naamdan Initiation */}
            <div className="p-8 rounded-3xl bg-white border-2 border-sacredGold-300 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                खुले मंच से नामदान — गुरु पूर्णिमा (22 जुलाई 2013)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                संस्कारी जीवों पर दया करते हुए बाबा उमाकान्त जी महाराज ने गुरु आदेशानुसार गुरु पूर्णिमा 22 जुलाई 2013 को जयपुर (राजस्थान) में विशाल जनसमूह की उपस्थिति में खुले मंच से नामदान देना प्रारंभ किया। वर्तमान में महाराज जी द्वारा देश-विदेश में करोड़ों जीवों को नामदान दिया जा चुका है।
              </p>
            </div>
          </div>
        </div>

        {/* Historic Words of Baba Jaigurudev Ji Maharaj */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-maroon-900 via-maroon-950 to-maroon-900 text-white shadow-xl space-y-6">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2 text-sacredGold-300 text-xs font-bold uppercase tracking-wider">
              <Quote className="w-5 h-5" />
              <span>परम पूज्य बाबा जयगुरुदेव जी महाराज के ऐतिहासिक अमृत वचन</span>
            </div>

            <blockquote className="font-serif text-base sm:text-lg text-roseBlush-100/95 leading-relaxed font-light italic">
              "कभी भी हम आयेंगे अब वो अपने लिए। परमार्थ के लिए, नये लोगों के लिए, जो नये आयेंगे लेंगे नाम तो ये 'उमाकान्त तिवारी' और पुराने जो नामदानी हैं वो भी ये सम्हाल करते रहेंगे। जो भूले भटके ये बता देंगे और भजन ध्यान करायेंगे। समझ गये! याद करते रहिये और बराबर याद रखना तो हम आपकी यहाँ भी सम्हाल करते रहेंगे... और नया कोई आएगा कि हमको भी चाहिए नामदान, तो ये बता देंगे और भजन, ध्यान उससे करायेंगे। सीधा सादा समझ गये।"
            </blockquote>

            <div className="pt-2 text-right">
              <p className="text-xs text-sacredGold-300 font-semibold">
                — 16 मई 2007, बशीरतगंज, जिला-उन्नाव (उत्तर प्रदेश) सत्संग
              </p>
            </div>
          </div>
        </div>

        {/* 16 Jeev Hitkari Vachan (Divine Teachings) */}
        <div className="space-y-8">
          <SectionTitle
            hindiSubtitle="अमृत वचनों का पावन संकलन"
            title="परम पूज्य बाबा उमाकान्त जी महाराज के जीव हितकारी वचन"
            subtitle="Divine golden principles for righteous living, spiritual liberation, morality, and inner peace."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {vachans.map((vachan) => (
              <div
                key={vachan.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-roseBlush-100 shadow-soft hover:shadow-sacred hover:border-sacredGold-300 transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="w-8 h-8 rounded-full bg-sacredGold-100 text-maroon-900 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-sacredGold-500 group-hover:text-maroon-950 transition-colors">
                  {vachan.id}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                  {vachan.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to Satsang & Teachings */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-roseBlush-100 via-white to-cream-100 border border-roseBlush-200 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            पूज्य महाराज जी के दिव्य सत्संग एवं कार्यक्रमों से जुड़ें
          </h3>
          <p className="text-sm text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            शाकाहारी रहें, नशामुक्त बनें और नित्य सुरत-शब्द योग (नाम-साधना) का अभ्यास कर अपना लोक और परलोक दोनों संवारें।
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/satsang"
              className="px-8 py-3.5 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors"
            >
              Upcoming Satsang Schedule
            </Link>
            <Link
              to="/videos"
              className="px-8 py-3.5 rounded-full bg-white hover:bg-roseBlush-50 text-maroon-800 border border-roseBlush-300 font-semibold text-xs sm:text-sm transition-colors shadow-xs"
            >
              Watch Video Discourses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabaUmakantJi;
