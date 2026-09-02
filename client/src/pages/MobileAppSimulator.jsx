import React, { useState } from 'react';
import {
  Smartphone,
  RotateCcw,
  Download,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Layers,
  Globe,
  Wifi,
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  Search,
  BookOpen
} from 'lucide-react';
import SEO from '../components/common/SEO';

export const MobileAppSimulator = () => {
  const [deviceType, setDeviceType] = useState('android');
  const [currentUrl, setCurrentUrl] = useState('/');
  const [iframeKey, setIframeKey] = useState(1);

  const quickPages = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Baba Jaigurudev Ji', path: '/baba-jaigurudev-ji' },
    { name: 'Baba Umakant Ji', path: '/baba-umakant-ji' },
    { name: 'Satsang', path: '/satsang' },
    { name: 'Videos', path: '/videos' },
    { name: 'Audio', path: '/audio' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavigate = (path) => {
    setCurrentUrl(path);
    setIframeKey((k) => k + 1);
  };

  const handleReload = () => {
    setIframeKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-slate-900 text-slate-100">
      <SEO
        title="Jaigurudev Android App (APK WebView) — Live Mobile Preview"
        description="Experience the entire Jaigurudev full-stack spiritual website running natively inside the Android APK WebView container."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sacredGold-500/20 text-sacredGold-300 text-xs font-bold border border-sacredGold-400/30 mb-2">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Official Android WebView APK (Version 1.0.0)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Jaigurudev Website Mobile App (APK Live View)
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              The Android APK wraps the complete spiritual website with native performance, pull-to-refresh, and full page interactivity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
              <button
                onClick={() => setDeviceType('android')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  deviceType === 'android' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Android Frame
              </button>
              <button
                onClick={() => setDeviceType('ios')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  deviceType === 'ios' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                iPhone Frame
              </button>
            </div>

            <a
              href="/downloads/jaigurudev-sadhana.apk"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sacredGold-500 hover:bg-sacredGold-400 text-maroon-950 text-xs font-bold transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download APK</span>
            </a>
          </div>
        </div>

        {/* Quick Route Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-center">
          <span className="text-xs text-slate-400 font-semibold shrink-0">Quick Navigate:</span>
          {quickPages.map((page) => (
            <button
              key={page.path}
              onClick={() => handleNavigate(page.path)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${
                currentUrl === page.path
                  ? 'bg-sacredGold-500 text-maroon-950 font-bold shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {page.name}
            </button>
          ))}
        </div>

        {/* Phone Mockup Frame containing Live Website WebView */}
        <div className="flex justify-center items-center py-2">
          <div
            className={`w-full max-w-[390px] h-[800px] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-4 ${
              deviceType === 'ios' ? 'border-slate-700' : 'border-slate-800'
            } flex flex-col relative overflow-hidden ring-1 ring-white/10`}
          >
            {/* Top Notch / Camera Cutout */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-36 h-5 px-3 bg-black rounded-full pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
            </div>

            {/* Mobile Status Bar */}
            <div className="pt-2 px-6 pb-1.5 flex items-center justify-between text-[11px] text-stone-300 font-semibold select-none z-40 bg-[#2B090F]">
              <span>09:30 AM</span>
              <div className="flex items-center gap-1 text-[10px]">
                <Wifi className="w-3 h-3 text-white/90" />
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* In-App Mini URL / Navigation Bar */}
            <div className="px-3 py-1.5 bg-[#3B0C15] flex items-center justify-between text-xs text-roseBlush-200 border-b border-sacredGold-500/20 z-40">
              <div className="flex items-center gap-2">
                <button onClick={() => handleNavigate('/')} title="Go Home">
                  <HomeIcon className="w-3.5 h-3.5 hover:text-white" />
                </button>
                <button onClick={handleReload} title="Reload App">
                  <RotateCcw className="w-3 h-3 hover:text-white" />
                </button>
              </div>

              <div className="px-2.5 py-0.5 rounded-full bg-black/40 text-[10px] text-sacredGold-300 font-mono truncate max-w-[200px]">
                jaigurudev.org{currentUrl}
              </div>

              <span className="text-[10px] bg-emerald-700/60 text-emerald-200 px-1.5 py-0.5 rounded font-bold">
                APK
              </span>
            </div>

            {/* Live Website Iframe (True Webview Container) */}
            <div className="flex-1 bg-[#FFFDF9] overflow-hidden relative">
              <iframe
                key={iframeKey}
                src={currentUrl}
                title="Jaigurudev Mobile App Webview"
                className="w-full h-full border-none select-auto"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="h-5 bg-black flex items-center justify-center rounded-b-[40px] z-40">
              <div className="w-32 h-1 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppSimulator;
