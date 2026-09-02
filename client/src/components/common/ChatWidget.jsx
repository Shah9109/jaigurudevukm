import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, Trash2, ArrowUpRight, HelpCircle, PhoneCall, ChevronRight } from 'lucide-react';

const PRESET_QA_DATABASE = [
  {
    keywords: ['पता', 'address', 'phone', 'contact', 'number', 'helpline', 'कहाँ', 'kahan', 'location', 'ujjain', 'उज्जैन', 'मथुरा', 'mathura', 'railway', 'स्टेशन', 'मक्सी'],
    reply: `॥ जयगुरुदेव ॥\n\n🏛️ **केंद्रीय आश्रम कार्यालय (उज्जैन):**\nबाबा जयगुरुदेव आश्रम, पिंगलेश्वर रेलवे स्टेशन के सामने, मक्सी रोड, उज्जैन (म.प्र.) - 456661\n\n📞 **आधिकारिक दूरभाष / हेल्पलाइन:**\n• +91-9754700200\n• +91-9575600700\n\n⏰ **कार्यालय समय:** प्रातः 06:00 बजे से सायं 08:00 बजे तक (दैनिक)\n\n🚗 **गूगल मैप लिंक:** [दिशा निर्देश देखें](https://maps.app.goo.gl/yMMis5r5gCwEPPKT7?g_st=ic)`
  },
  {
    keywords: ['सत्संग', 'satsang', 'time', 'timing', 'समय', 'schedule', 'कार्यक्रम', 'aarti', 'आरती', 'daily', 'नित्य'],
    reply: `॥ जयगुरुदेव ॥\n\n🗓️ **सत्संग एवं साधना समय सारिणी:**\n\n• **नित्य प्रातः काल ध्यान व आरती:** प्रातः 06:00 AM से 08:00 AM\n• **साप्ताहिक महा-सत्संग (उज्जैन आश्रम):** प्रत्येक रविवार प्रातः 08:00 AM से 11:30 AM\n• **श्री कृष्ण जन्माष्टमी सत्संग (आगरा):** 2 से 4 तक विशाल सत्संग मैदान, आगरा\n• **संध्या आरती एवं गुरु वंदना:** सायं 06:30 PM से 07:30 PM\n\nसमस्त कार्यक्रमों में पूज्य महाराज जी के पावन अमृत वचन एवं अखंड भंडारा रहता है।`
  },
  {
    keywords: ['नामदान', 'naamdan', 'diksha', 'दीक्षा', 'नाम', 'guru mantra', 'मंत्र', 'shiksha'],
    reply: `॥ जयगुरुदेव ॥\n\n🕊️ **पवित्र नामदान (सुरत-शब्द योग दीक्षा):**\n\n1. नामदान पूज्य वक्त के सतगुरु **बाबा उमाकान्त जी महाराज** द्वारा प्रत्यक्ष सत्संग समारोह में प्रदान किया जाता है।\n2. नामदान पूर्णतः **निःशुल्क** है। इसके लिए कोई शुल्क या दान नहीं लिया जाता।\n3. **शर्तें:** जीवन भर के लिए पूर्ण शाकाहारी रहना (मांस, मछली, अंडा वर्जित) एवं नशीले पदार्थों (शराब, बीड़ी, तंबाकू) का पूर्ण त्याग करना।\n4. आगामी सत्संग दौरों में पधारकर आप पवित्र नामदान प्राप्त कर सकते हैं।`
  },
  {
    keywords: ['योग', 'dhyan', 'yoga', 'surat', 'shabd', 'सुरत', 'शब्द', 'साधना', 'ध्यान', 'सिमरन', 'meditation', 'kundalini'],
    reply: `॥ जयगुरुदेव ॥\n\n🧘 **सुरत-शब्द योग (सहज योग साधना):**\n\n• **सुरत** = आत्मा की चेतना, **शब्द** = आंतरिक अनहद नाद (प्रभु की पावन ध्वनि)।\n• अपनी सुरत को दोनों भौंहों के मध्य (तीसरे तिल) पर एकाग्र करके अंतर में दिव्य प्रकाश और अनहद शब्द को सुनना ही सुरत-शब्द योग है।\n• यह कलिकाल का सबसे सरल और श्रेष्ठ मार्ग है जिसमें गृहस्थ धर्म का पालन करते हुए आत्म-कल्याण संभव है।`
  },
  {
    keywords: ['शाकाहार', 'shakahar', 'vegetarian', 'veg', 'मांस', 'meat', 'नशा', 'दारू', 'शराब', 'smoking', 'non veg'],
    reply: `॥ जयगुरुदेव ॥\n\n🥗 **शाकाहार एवं नशा मुक्ति का दिव्य संदेश:**\n\n• \"जैसा खाओगे अन्न, वैसा बनेगा मन।\"\n• किसी भी बेजुबान जीव-जंतु की हत्या करके उसका मांस खाना महापाप है और गंभीर व्याधियों व अशांति का कारण है।\n• सात्विक, शाकाहारी भोजन करने और सभी नशों से दूर रहने से शरीर निरोगी और आत्मा पवित्र बनती है। संस्था द्वारा राष्ट्रव्यापी शाकाहार जन-जागरण अभियान निरंतर जारी है।`
  },
  {
    keywords: ['आवास', 'stay', 'room', 'कमरा', 'भोजन', 'लंगर', 'food', 'भंडारा', 'bhandara', 'khana'],
    reply: `॥ जयगुरुदेव ॥\n\n🍛 **आश्रम में भोजन एवं आवास व्यवस्था:**\n\n• आश्रम में आने वाले सभी साधकों, श्रद्धालुओं एवं दर्शनार्थियों के लिए **24 घंटे गुरु का अखंड लंगर एवं शुद्ध जल** पूर्णतः निशुल्क उपलब्ध है।\n• सादगीपूर्ण आवास (विश्राम कक्ष एवं डॉर्मिटरी) की समुचित व्यवस्था है।\n• किसी भी सेवादार को कोई शुल्क न दें। आश्रम में स्वच्छता एवं अनुशासन बनाए रखने में सहयोग करें।`
  },
  {
    keywords: ['बाबा जयगुरुदेव', 'baba jaigurudev', 'guru ji', 'charitra', 'parichay', 'जीवन परिचय', 'history', 'इतिहास'],
    reply: `॥ जयगुरुदेव ॥\n\n🌸 **परम पूज्य बाबा जयगुरुदेव जी महाराज (निजधाम वासी):**\n\n• आप भारत के महान युग-दृष्टा संत रहे जिन्होंने करोड़ों मानवों को शाकाहारी, नशामुक्त और सदाचारी बनाया।\n• आपने अखंड नाम-साधना, गौ-सेवा, निर्धनों की सेवा और भारत को आध्यात्मिक विश्वगुरु बनाने का महान मार्ग प्रशस्त किया।\n• वर्तमान में आपकी दिव्य गुरु-धारा को पूज्य **बाबा उमाकान्त जी महाराज** आगे बढ़ा रहे हैं।`
  },
  {
    keywords: ['बाबा उमाकान्त', 'umakant', 'maharaj', 'उमाकांत', 'वक्त गुरु', 'satguru'],
    reply: `॥ जयगुरुदेव ॥\n\n🌺 **वक्त के सतगुरु परम सन्त बाबा उमाकान्त जी महाराज:**\n\n• पूज्य महाराज जी परम पूज्य बाबा जयगुरुदेव जी के सर्वमान्य आध्यात्मिक उत्तराधिकारी एवं वक्त के समरथ सतगुरु हैं।\n• आप देश-विदेश में निरंतर सत्संग यात्राओं के माध्यम से मानवता के उद्धार, सुरत-शब्द योग नामदान और शाकाहार क्रांति का पावन संदेश दे रहे हैं।\n• आपका पावन मुख्यालय: बाबा जयगुरुदेव आश्रम, मक्सी रोड, उज्जैन (म.प्र.)`
  },
  {
    keywords: ['यूट्यूब', 'youtube', 'video', 'shorts', 'stream', 'वीडियो', 'pravachan', 'प्रवचन', 'audio', 'भजन'],
    reply: `॥ जयगुरुदेव ॥\n\n🎬 **आधिकारिक डिजिटल मीडिया मंच:**\n\n• **YouTube:** [@Jaigurudevukm](https://www.youtube.com/@Jaigurudevukm)\n• **WhatsApp चैनल:** [आधिकारिक चैनल से जुड़ें](https://whatsapp.com/channel/0029VaAcAA40QeadmEmp9y3c)\n• **वेबसाइट वीडियो सेक्शन:** [वीडियो गैलरी देखें](/videos)\n\nनित्य नए सत्संग, लाइव स्ट्रीम एवं पावन रील्स यूट्यूब पर प्रसारित की जाती हैं।`
  },
  {
    keywords: ['नमस्ते', 'hello', 'hi', 'jai gurudev', 'जयगुरुदेव', 'pranam', 'प्रणाम', 'radha soami', 'radhasoami', 'hey'],
    reply: `॥ जयगुरुदेव! ॥\n\nसप्रेम जयगुरुदेव! आपका पावन स्वागत है। मैं जयगुरुदेव आश्रम का डिजिटल ज्ञान सहायक हूँ।\n\nआप मुझसे नीचे दिए गए विषयों या किसी भी आध्यात्मिक प्रश्न के बारे में पूछ सकते हैं:\n• आश्रम पता व फोन\n• सत्संग कार्यक्रम समय\n• पवित्र नामदान विधि\n• सुरत-शब्द योग साधना\n• शाकाहार व लंगर व्यवस्था`
  }
];

const QUICK_QUESTION_PILLS = [
  '📍 आश्रम का पता व फोन नंबर',
  '🗓️ आगामी सत्संग कार्यक्रम का समय',
  '🕊️ नामदान कैसे और कहाँ मिलता है?',
  '🧘 सुरत-शब्द योग साधना क्या है?',
  '🥗 शाकाहार क्यों आवश्यक है?',
  '🍛 लंगर व आवास की क्या व्यवस्था है?',
  '🌸 वक्त के सतगुरु बाबा उमाकान्त जी'
];

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '॥ जयगुरुदेव! ॥\nमैं जयगुरुदेव आश्रम का ज्ञान सहायक हूँ। आप मुझसे सत्संग समय, आश्रम पता, सुरत-शब्द योग, नामदान, शाकाहार या आश्रम नियमों के बारे में पूछ सकते हैं।',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Smart Pre-Question & Answer Matching (Instant response without external API dependency)
  const getOfflineResponse = (query) => {
    const qLower = query.toLowerCase().trim();

    for (const item of PRESET_QA_DATABASE) {
      const match = item.keywords.some((kw) => qLower.includes(kw.toLowerCase()));
      if (match) {
        return item.reply;
      }
    }

    // Default friendly devotional guidance
    return `॥ जयगुरुदेव! ॥\n\nआपके प्रश्न के लिए धन्यवाद। आश्रम कार्यालय से सीधे संपर्क करने अथवा विशेष मार्गदर्शन हेतु कृपया आश्रम हेल्पलाइन पर संपर्क करें:\n\n📞 **हेल्पलाइन:** +91-9754700200 / +91-9575600700\n🏛️ **पता:** बाबा जयगुरुदेव आश्रम, मक्सी रोड, उज्जैन (म.प्र.)\n\nआप नीचे दिए गए त्वरित प्रश्नों में से भी चुन सकते हैं।`;
  };

  const handleSend = (queryText) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend) return;

    const userMsg = { sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Instant simulated thought & response
    setTimeout(() => {
      const reply = getOfflineResponse(textToSend);
      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 250);
  };

  return (
    <div className="fixed bottom-20 xl:bottom-6 right-4 sm:right-6 z-50">
      {/* Floating Action Trigger (Matches website sacred maroon & gold theme) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#2E0B11] via-[#4D1219] to-[#691420] text-sacredGold-300 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-sacredGold-400 shadow-maroon-950/50"
          aria-label="Open AI spiritual knowledge assistant"
        >
          {/* Subtle golden halo glow */}
          <div className="absolute inset-0 rounded-full bg-sacredGold-400/20 blur-md group-hover:blur-lg transition-all" />

          {/* AI Bot & Sparkles Icons in Sacred Gold */}
          <div className="relative flex items-center justify-center">
            <Bot className="w-7 h-7 text-sacredGold-300 stroke-[2.2] relative z-10" />
            <Sparkles className="w-3.5 h-3.5 text-sacredGold-200 absolute -top-1.5 -right-2 z-15 animate-pulse" />
          </div>

          {/* Small "AI" badge chip in Gold at bottom */}
          <span className="absolute -bottom-1 bg-sacredGold-400 text-maroon-950 font-black text-[9px] px-1.5 py-0.2 rounded-full border border-maroon-900 shadow-xs z-20 uppercase tracking-tighter">
            AI
          </span>

          {/* Green online indicator dot on top right */}
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white shadow-xs absolute top-0.5 right-0.5 z-20 animate-pulse" />
        </button>
      )}

      {/* Chat Drawer Window (Website Themed) */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[410px] h-[540px] max-h-[85vh] bg-[#FAF8EB] rounded-3xl shadow-2xl border-2 border-sacredGold-400/60 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#2B090F] via-[#450E17] to-[#2B090F] text-white flex items-center justify-between border-b-2 border-sacredGold-400/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sacredGold-400 text-maroon-950 flex items-center justify-center font-bold shadow-md">
                <Bot className="w-5 h-5 text-maroon-950" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-sacredGold-200 flex items-center gap-1.5">
                  <span>जयगुरुदेव ज्ञान मित्र</span>
                  <span className="text-[10px] font-mono bg-sacredGold-500/20 text-sacredGold-300 px-1.5 py-0.2 rounded border border-sacredGold-400/30">AI Q&A</span>
                </h4>
                <span className="text-[10px] text-roseBlush-200/80 block">
                  आश्रम नियम, सत्संग एवं आध्यात्मिक समाधान
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  setMessages([
                    {
                      sender: 'bot',
                      text: '॥ जयगुरुदेव! ॥\nनया सत्र प्रारंभ हुआ। आप मुझसे कोई भी प्रश्न पूछ सकते हैं।',
                    },
                  ])
                }
                className="p-1.5 text-roseBlush-200 hover:text-white rounded-lg transition-colors"
                title="Clear Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-roseBlush-200 hover:text-white rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Suggestions Chips Carousel (Pink / Rose Blush Themed) */}
          <div className="p-2.5 bg-roseBlush-100/50 border-b border-roseBlush-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {QUICK_QUESTION_PILLS.map((pill, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSend(pill.replace(/^[^\s]+\s/, ''))}
                className="text-[11px] font-medium bg-white hover:bg-roseBlush-200 text-maroon-900 px-3 py-1 rounded-full border border-roseBlush-300 whitespace-nowrap shadow-2xs transition-all hover:scale-[1.02] shrink-0"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF8EB]/60">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-sacredGold-100 text-maroon-800 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 border border-sacredGold-300 shadow-2xs">
                    ॐ
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-maroon-800 to-roseBlush-800 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-stone-800 border border-roseBlush-200 shadow-xs rounded-bl-xs font-normal'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input & Send Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-roseBlush-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="सत्संग, नामदान या आश्रम संबंधी प्रश्न लिखें..."
              className="flex-1 px-4 py-2.5 rounded-2xl bg-roseBlush-50/50 border border-roseBlush-200 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-maroon-600"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-2xl bg-gradient-to-r from-maroon-700 to-roseBlush-700 hover:from-maroon-800 hover:to-roseBlush-800 text-sacredGold-200 flex items-center justify-center disabled:opacity-40 shadow-xs transition-all shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
