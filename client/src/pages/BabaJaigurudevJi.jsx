import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Quote, Calendar, MapPin, Award, BookOpen, Clock, Compass, ShieldCheck } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionTitle from '../components/common/SectionTitle';

export const BabaJaigurudevJi = () => {
  const [lang, setLang] = useState('hi'); // 'hi' or 'en'

  const sandeshList = [
    { id: 1, text: 'मनुष्य शरीर किराये का मकान है, इसमें जीवात्मा जो प्रभु का अंश है वो विराजमान है।' },
    { id: 2, text: 'मनुष्य शरीर को साँसों की पूँजी दी गई है जो गिनती की है, साँस खत्म होते ही शरीर गिर जायेगा और आप मर जायेंगे।' },
    { id: 3, text: 'मकान मालिक के सिपाही मकान को खाली करवा लेंगे। जीवात्मा को हिसाबकर्ता के पास सिपाही ले जायेंगे।' },
    { id: 4, text: 'हिसाबकर्ता पुण्य कर्म का भी हिसाब लेगा तथा पाप कर्म का भी हिसाब लेगा।' },
    { id: 5, text: 'कर्मों की सजा के लिए मालिक ने नरक तथा 84 लाख योनियाँ बनाई हैं।' },
    { id: 6, text: 'जीव अनगिनत समय से नरकों व 84 लाख योनियों में भटक रहा है, जहाँ दुःख व मुसीबत झेल कर अब मनुष्य शरीर मिला है।' },
    { id: 7, text: 'मनुष्य शरीर पाने का एक मात्र उद्देश्य भगवान को प्राप्त करना है।' },
    { id: 8, text: 'बिना पूर्ण महात्मा के भगवान को प्राप्त नहीं किया जा सकता।' },
    { id: 9, text: 'पूर्ण महात्मा की तलाश करें, तथा भजन का रास्ता लेकर भजन करें और अपने मनुष्य जीवन को सफल बनायें।' },
    { id: 10, text: 'भगवान प्राप्त करने के लिए शाकाहारी होना होगा तथा सभी प्रकार के नशों को छोड़ना होगा।' },
  ];

  return (
    <div className="min-h-screen py-10 sm:py-16 space-y-16">
      <SEO
        title="परम संत बाबा जयगुरुदेव जी महाराज का पावन जीवन परिचय — Jaigurudev"
        description="विश्व विख्यात परम संत बाबा जयगुरुदेव जी महाराज का पावन जीवन परिचय, बाल्यावस्था, दादा गुरु घूरेलाल जी से मिलाप, साधना, शाकाहार क्रांति एवं 10 अमर संदेश।"
        keywords="Baba Jaigurudev Ji Maharaj, Life History, Ghurelal Ji Maharaj, Chirauli Aligarh, Surat Shabd Yoga, Naamdan, Mathura Ashram"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Language Switcher */}
        <div className="flex items-center justify-between border-b border-roseBlush-200 pb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sacredGold-50 border border-sacredGold-200 text-sacredGold-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sacredGold-600" />
            <span>संस्थापक एवं युग प्रवर्तक सन्त</span>
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

        {/* Hero Card with Portrait */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-roseBlush-100/90 via-white to-cream-100 border-2 border-sacredGold-300 shadow-sacred">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Portrait */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl overflow-hidden border-4 border-sacredGold-400 shadow-xl bg-roseBlush-50 group">
                <img
                  src="/images/baba_jaigurudev.jpg"
                  alt="परम संत बाबा जयगुरुदेव जी महाराज"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 px-4 py-2 rounded-2xl bg-white border border-roseBlush-200 shadow-xs">
                <h3 className="font-serif font-extrabold text-lg text-maroon-900">
                  परम पूज्य बाबा जयगुरुदेव जी महाराज
                </h3>
                <p className="text-xs text-stone-600 font-medium">
                  संस्थापक — जयगुरुदेव धर्म प्रचारक संस्था, मथुरा
                </p>
              </div>
            </div>

            {/* Intro Content */}
            <div className="lg:col-span-7 space-y-5">
              <span className="font-devanagari text-xs font-bold text-sacredGold-700 uppercase tracking-widest bg-sacredGold-50 px-3 py-1 rounded-full border border-sacredGold-200">
                ॥ जयगुरुदेव नाम के प्रणेता ॥
              </span>

              <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-stone-900 leading-tight">
                {lang === 'hi'
                  ? 'विश्व विख्यात परम संत बाबा जयगुरूदेव जी महाराज का जीवन परिचय'
                  : 'Life History of Param Sant Baba Jaigurudev Ji Maharaj'}
              </h1>

              <p className="text-sm sm:text-base text-stone-700 font-light leading-relaxed">
                {lang === 'hi' ? (
                  <>
                    विश्व विख्यात परम संत बाबा जयगुरूदेव जी महाराज का अवतार भारत के उत्तर प्रदेश की पावन भूमि के एक छोटे से देहात में हुआ। धर्म के प्रति आस्था व परमात्मा प्राप्ति का मार्ग जानने की उत्कट इच्छा बाल्यावस्था से ही रही। बाल्यावस्था में आपके पिता का देहान्त हो गया। माताजी ने शरीर छोड़ने से पूर्व स्वामी जी को यही इच्छा आदेश के रूप में दिया कि प्रभु प्राप्ति का मार्ग प्राप्त कर ईश्वर को प्राप्त अवश्य कर लेना।
                  </>
                ) : (
                  <>
                    World-renowned Param Sant Baba Jaigurudev Ji Maharaj incarnated in a humble village of Uttar Pradesh, India. Guided by an intense innate thirst for God-realization since childhood, upon his mother's final departure, he received her sacred dying wish: "Seek the divine path and attain the Almighty Lord at all costs."
                  </>
                )}
              </p>

              <div className="p-4 rounded-2xl bg-roseBlush-50 border border-roseBlush-200/80">
                <Quote className="w-6 h-6 text-sacredGold-600 mb-2" />
                <p className="text-xs sm:text-sm font-serif italic text-maroon-950 leading-relaxed font-semibold">
                  "जयगुरूदेव नाम प्रभु का है। हर मुसीबत में यह नाम लेने से दुःख-तकलीफ दूर होगी और मौत के समय मौत की पीड़ा की अनुभूति कम होगी।"
                </p>
                <span className="text-[11px] text-stone-500 block mt-1">
                  — पूज्य बाबा जयगुरुदेव जी महाराज का सिद्ध वचन
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Chronicle of Divine Search & Meeting with Master */}
        <div className="space-y-8">
          <SectionTitle
            hindiSubtitle="ईश्वर खोज एवं पूर्ण सतगुरु मिलाप"
            title="The Divine Quest & Meeting the Satguru"
            subtitle="From deep spiritual wandering to meeting Dada Guru Ghurelal Ji Maharaj in 1948."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1. Divine Quest */}
            <div className="p-8 rounded-3xl bg-white border border-roseBlush-100 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-roseBlush-100 text-maroon-700 flex items-center justify-center font-bold text-xl">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                भगवान की खोज एवं वैराग्य
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                छोटी उम्र में स्वामी जी महाराज भगवान की खोज में निकल पड़े। मंदिरों में महन्तों-पुजारियों की सेवा की, धर्मग्रंथों का अध्ययन किया। सन् 1938 में द्वारकापुरी, कश्मीर यात्रा में साधुओं के साथ रहे। डल झील के किनारे जब निराशा में आत्महत्या का विचार आया, तभी पीछे से एक अत्यंत मधुर आवाज आई — <em>"बच्चे भगवान प्राप्ति का साधन है। तुमको एक गृहस्थ से मिलेगा।"</em> उस महामानव की दिव्य मूरत मन में बसाकर कश्मीर से लौट आए।
              </p>
            </div>

            {/* 2. 1948 Meeting with Dada Guru */}
            <div className="p-8 rounded-3xl bg-white border-2 border-sacredGold-300 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sacredGold-100 text-sacredGold-800 flex items-center justify-center font-bold text-xl">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                दादा गुरु घूरेलाल जी महाराज से मिलाप (सन् 1948)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                सन् 1948 में अलीगढ़ के पास चिरौली गाँव के महापुरुष पंडित घूरेलाल जी महाराज के पास पहुँचे। दादा गुरु ने स्वामी जी को देखते ही कहा — <em>"रोते क्यों हो, बहुत भटक लिये, अब तो आ ही गये हो।"</em> दादा गुरु ने सूरत-शब्द योग का भेद दिया। स्वामी जी 24 घंटे में 18-18 घंटे साधना करते रहे और पूर्ण आध्यात्मिक अवस्था प्राप्त की। 1948 में निजधाम जाने से पहले दादा गुरु ने घोषणा की कि उनके बाद सत्संग स्वामी जी (तुलसीदास जी) संभालेंगे।
              </p>
            </div>

            {/* 3. 1952 Kashi Initiation & Mass Awakening */}
            <div className="p-8 rounded-3xl bg-white border border-roseBlush-100 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl">
                🌱
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                काशी से नामदान एवं शाकाहार क्रांति (10 जुलाई 1952)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                10 जुलाई 1952 को काशी में प्रथम व्यक्ति को नामदान दीक्षा दी। अथाह परिश्रम के फलस्वरूप 1971 तक एक करोड़ से अधिक शिष्य बन गए। स्वामी जी ने देश-विदेश में शाकाहारिता, नशामुक्ति, सदाचार और प्रभु नाम की पावन ध्वनि जगाई। करोड़ों लोगों के दुःख दूर कर उन्हें भजनानंदी बनाया।
              </p>
            </div>

            {/* 4. Nijadham Gaman 18 May 2012 */}
            <div className="p-8 rounded-3xl bg-white border border-roseBlush-100 shadow-soft space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl">
                🕊️
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                परम पद एवं निजधाम गमन (18 मई 2012)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                अपने जीवन काल में परम संत बाबा जयगुरूदेव जी महाराज ने हमेशा अपने को सेवक के रूप में व्यक्त किया और अपना कुल मालिक का रूप पर्दे में रखा। 18 मई 2012 (ज्येष्ठ कृष्ण पक्ष त्रयोदशी) को पार्थिव शरीर का त्याग कर अपने निजधाम जाने की मौज फरमाई।
              </p>
            </div>
          </div>
        </div>

        {/* 10 Sacred Sandesh */}
        <div className="space-y-8">
          <SectionTitle
            hindiSubtitle="परम पूज्य बाबाजी के अमर सन्देश"
            title="10 Divine Messages of Baba Jaigurudev Ji"
            subtitle="The eternal truths regarding the human body, karma, vegetarianism, and the path to salvation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {sandeshList.map((s) => (
              <div
                key={s.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-roseBlush-100 shadow-soft hover:shadow-sacred hover:border-sacredGold-300 transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="w-8 h-8 rounded-full bg-sacredGold-100 text-maroon-900 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-sacredGold-500 group-hover:text-maroon-950 transition-colors">
                  {s.id}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Historic Declaration for Next Guru (16 May 2007 Bashiratganj) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-maroon-900 via-maroon-950 to-maroon-900 text-white shadow-xl space-y-6">
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sacredGold-500/20 border border-sacredGold-400/40 text-sacredGold-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-sacredGold-400" />
              <span>अगले गुरु के लिए पूज्य बाबाजी की ऐतिहासिक घोषणा</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              16 मई 2007 — बशीरतगंज, जिला-उन्नाव (उत्तर प्रदेश) सत्संग
            </h3>

            <blockquote className="font-serif text-base sm:text-lg text-roseBlush-100/95 leading-relaxed font-light italic border-l-4 border-sacredGold-400 pl-4 py-1">
              "बाबा जयगुरूदेव जी महाराज ने 16.05.2007 को बसीरतगंज में घोषणा की — नये लोगों के लिए जो नये आयेंगे नाम ये उमाकान्त तिवारी और पुराने जो नामदान लिया है, उनकी सम्भाल करते रहेंगे, जो भूले भटके जो बता देंगे और भजन ध्यान करायेंगे। यहाँ सुनते रहिये और बराबर याद रखिये और जब ये जाने लगेंगे तो कह देंगे किसी को, जिसको समझेंगे कि ठीक है और अभ्यासी है साधन भजन करता है... सन्तमत में ऐसा ही चलता है।"
            </blockquote>
          </div>
        </div>

        {/* Manifestation of Present Satguru (Baba Umakant Ji Maharaj) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-sacredGold-300 shadow-sacred space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sacredGold-100 text-sacredGold-800 flex items-center justify-center font-bold text-xl">
              👑
            </div>
            <div>
              <span className="text-xs font-bold text-sacredGold-700 uppercase tracking-widest">
                ॥ प्रगट सन्त महाराज जी ॥
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                प्रगट सन्त सतगुरु बाबा उमाकान्त जी महाराज (22 जुलाई 2013, जयपुर)
              </h3>
            </div>
          </div>

          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-light">
            परम सन्त बाबा जयगुरूदेव जी महाराज की अपार कृपा से <strong>22.07.2013 को गुरु पूर्णिमा</strong> के अवसर पर जयपुर (राजस्थान) में लाखों लोगों के सामने महाराज जी वक्त के सदगुरू के रूप में प्रगट हुए। उस दिन प्रातः महाराज जी ने जीव कल्याण के लिए नये लोगों को नामदान देकर सन्तमत का व्यापक प्रचार किया और उपस्थित जन समूह को प्रभु प्राप्ति का सरल एवं सुलभ मार्ग उपलब्ध कराया।
          </p>

          <div className="p-4 rounded-2xl bg-roseBlush-50 border border-roseBlush-200">
            <p className="text-xs sm:text-sm text-maroon-950 font-medium leading-relaxed">
              वर्तमान खराब समय से बचाव के लिए पूज्य महाराज जी ने प्रति दिन <strong>2 घंटे नाम-साधना</strong> करने का निर्देश दिया है तथा सभी सत्संगियों के लिए रक्षा कवच के रूप में <strong>गुलाबी वस्त्र धारण करने का पावन आदेश</strong> दिया है।
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/baba-umakant-ji"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-md"
            >
              <span>पूज्य बाबा उमाकान्त जी महाराज का विस्तृत जीवन परिचय पढ़ें</span>
              <span>›</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabaJaigurudevJi;
