import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Download,
  Share,
  PlusSquare,
  X,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Apple,
  Layers,
  ChevronRight
} from 'lucide-react';

export const InstallAppGuideModal = ({ isOpen, onClose }) => {
  const [platform, setPlatform] = useState('ios');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detect OS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    setPlatform(isIOS ? 'ios' : 'android');

    // Check if running in standalone mode (already installed)
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }

    // Android PWA beforeinstallprompt handler
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallAndroid = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert('अपने क्रोम ब्राउज़र के ऊपर दाहिनी ओर 3 बिंदुओं (⋮) पर क्लिक करें और "Install app" या "Add to Home screen" चुनें।');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-sacredGold-400 animate-in fade-in zoom-in-95 duration-200 text-stone-800 my-8">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#2B090F] via-[#450E17] to-[#2B090F] text-white flex items-center justify-between border-b-2 border-sacredGold-400/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sacredGold-400 text-maroon-950 flex items-center justify-center font-bold shadow-md">
              <Smartphone className="w-5 h-5 text-maroon-950" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-sacredGold-200 flex items-center gap-1.5">
                <span>जय गुरु देव ऐप इंस्टॉल करें</span>
              </h3>
              <p className="text-[11px] text-roseBlush-200/90 font-light">
                iPhone & Android मोबाइल ऐप गाइड
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Selector Tabs */}
        <div className="p-4 bg-roseBlush-50/70 border-b border-roseBlush-200 flex gap-2">
          <button
            onClick={() => setPlatform('ios')}
            className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              platform === 'ios'
                ? 'bg-gradient-to-r from-maroon-700 to-roseBlush-700 text-white shadow-md'
                : 'bg-white text-stone-600 hover:bg-roseBlush-100/70 border border-roseBlush-200'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>iPhone (iOS) गाइड</span>
          </button>

          <button
            onClick={() => setPlatform('android')}
            className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              platform === 'android'
                ? 'bg-gradient-to-r from-maroon-700 to-roseBlush-700 text-white shadow-md'
                : 'bg-white text-stone-600 hover:bg-roseBlush-100/70 border border-roseBlush-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Android (APK / PWA)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* App Preview Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#FAF8EB] to-roseBlush-50 border border-sacredGold-300">
            <img
              src="/images/app_logo.png"
              alt="जय गुरु देव App"
              className="w-16 h-16 rounded-2xl border-2 border-sacredGold-400 shadow-md object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-devanagari font-bold text-base text-maroon-900 leading-tight">
                जय गुरु देव — Official App
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                नित्य सत्संग, आदेश, ध्यान व नामदान
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] bg-sacredGold-100 text-maroon-950 px-2 py-0.5 rounded-full font-bold border border-sacredGold-300">
                  ★ 5.0 (आध्यात्मिक पोर्टल)
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>निःशुल्क</span>
                </span>
              </div>
            </div>
          </div>

          {/* TAB 1: IPHONE (iOS SAFARI) STEP-BY-STEP GUIDE */}
          {platform === 'ios' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="border-l-4 border-maroon-700 pl-3">
                <h5 className="font-serif font-bold text-sm text-maroon-950">
                  iPhone / iPad पर होम स्क्रीन पर ऐप जोड़ने की सरल विधि:
                </h5>
                <p className="text-xs text-stone-500 font-light mt-0.5">
                  बिना किसी ऐप स्टोर के सीधे सफारी (Safari) ब्राउज़र से 10 सेकंड में जोड़ें:
                </p>
              </div>

              {/* Step 1 */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-maroon-700 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">
                    वेबसाइट को सफारी (Safari Browser) में खोलें
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                    यह सुनिश्चित करें कि आप Chrome के बजाय Apple के <b>Safari</b> ब्राउज़र का उपयोग कर रहे हैं।
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-maroon-700 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <span>शेयर (Share) बटन दबाएँ</span>
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-stone-100 border border-stone-300 text-stone-700">
                      <Share className="w-3 h-3 text-blue-600" />
                    </span>
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                    स्क्रीन के सबसे नीचे बीच में स्थित <b>Share आइकन (नीले तीर वाला बॉक्स)</b> पर टैप करें।
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-maroon-700 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <span>'Add to Home Screen' चुनें</span>
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-stone-100 border border-stone-300 text-stone-700">
                      <PlusSquare className="w-3 h-3 text-stone-800" />
                    </span>
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                    नीचे स्क्रॉल करें और <b>"Add to Home Screen" (होम स्क्रीन पर जोड़ें)</b> विकल्प पर टैप करें।
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-950">
                    'Add' (जोड़ें) पर टैप करें
                  </p>
                  <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                    ऊपर दाएँ कोने में <b>Add</b> पर टैप करें। ऐप आपके iPhone की होम स्क्रीन पर आ जाएगा!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANDROID ONE-TAP INSTALL & APK GUIDE */}
          {platform === 'android' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* 1-Tap Install Button */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-maroon-800 to-roseBlush-800 text-white text-center space-y-3 shadow-md">
                <h5 className="font-bold text-sm">
                  Android मोबाइल पर 1-क्लिक में इंस्टॉल करें
                </h5>
                <p className="text-xs text-roseBlush-100 font-light">
                  कोई डाउनलोडिंग समय नहीं — तुरंत होम स्क्रीन पर सेव करें
                </p>
                <button
                  onClick={handleInstallAndroid}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-sacredGold-400 hover:bg-sacredGold-500 text-maroon-950 font-bold text-xs shadow-md transition-all transform hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4" />
                  <span>{isInstalled ? '✓ App Already Installed' : 'Install App Now (ऐप इंस्टॉल करें)'}</span>
                </button>
              </div>

              {/* Manual Android Steps */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
                <h6 className="font-bold text-xs text-stone-900">
                  Chrome ब्राउज़र से मैन्युअल जोड़ने की विधि:
                </h6>
                <ol className="text-xs text-stone-600 space-y-1.5 list-decimal list-inside">
                  <li>Chrome ब्राउज़र के ऊपर दाएँ कोने में <b>3 बिंदुओं (⋮)</b> पर टैप करें।</li>
                  <li>मेनू में से <b>"Install app"</b> या <b>"Add to Home screen"</b> चुनें।</li>
                  <li><b>Install</b> पर क्लिक करें।</li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-[11px] text-stone-500">
            जयगुरुदेव धर्म प्रचारक संस्था
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-colors"
          >
            समझ गए (Close)
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallAppGuideModal;
