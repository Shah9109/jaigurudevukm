import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Calendar, Video, Bell, Menu, X, Music, Image, HelpCircle, Phone, Info, ScrollText, FileText, Smartphone, Download } from 'lucide-react';
import InstallAppGuideModal from '../common/InstallAppGuideModal';

export const MobileBottomNav = () => {
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);

  const mainTabs = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Satsang', path: '/satsang', icon: Calendar },
    { name: 'Videos', path: '/videos', icon: Video },
    { name: 'Notices', path: '/notices', icon: Bell },
  ];

  return (
    <>
      {/* Fixed Bottom Navigation Bar on Mobile/Tablet */}
      <nav aria-label="Mobile Navigation" className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-roseBlush-200 shadow-lg pb-safe">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all duration-200 select-none ${
                    isActive
                      ? 'text-pink-600 font-bold scale-105'
                      : 'text-stone-500 hover:text-pink-500 font-normal'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`p-1 rounded-full transition-colors ${isActive ? 'bg-pink-100 text-pink-600' : 'text-pink-500/80'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] mt-0.5 tracking-tight font-medium">{tab.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}

          {/* More Action Toggle */}
          <button
            onClick={() => setMoreDrawerOpen(true)}
            className="flex flex-col items-center justify-center flex-1 py-1 px-1 text-stone-500 hover:text-pink-500 transition-all select-none"
            aria-label="Open more menu options"
          >
            <div className="p-1 rounded-full text-pink-500/80">
              <Menu className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* More Options Bottom Drawer */}
      {moreDrawerOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMoreDrawerOpen(false)}
          />
          <div className="relative bg-white rounded-t-3xl shadow-2xl p-6 pb-safe max-h-[80vh] overflow-y-auto z-10 border-t border-roseBlush-200 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-roseBlush-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-maroon-600"></span>
                <h3 className="text-base font-bold text-maroon-900">More Sections</h3>
              </div>
              <button
                onClick={() => setMoreDrawerOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Install App Quick Banner inside Drawer */}
            <div className="my-3 p-3.5 rounded-2xl bg-gradient-to-r from-[#2B090F] to-[#450E17] text-white flex items-center justify-between border border-sacredGold-400/50 shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sacredGold-400 text-maroon-950 flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-sacredGold-200">
                    जय गुरु देव Official App
                  </h4>
                  <p className="text-[10px] text-roseBlush-200 font-light">
                    iPhone & Android होम स्क्रीन
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMoreDrawerOpen(false);
                  setInstallModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-sacredGold-400 text-maroon-950 font-bold text-[11px] hover:bg-sacredGold-300 shadow-xs"
              >
                Install App
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 py-2 text-center">
              <Link
                to="/audio"
                onClick={() => setMoreDrawerOpen(false)}
                className="flex flex-col items-center p-3 rounded-2xl bg-pink-50/60 hover:bg-pink-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-600 mb-1.5 shadow-xs">
                  <Music className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-stone-800">Audio Satsang</span>
              </Link>

              <Link
                to="/gallery"
                onClick={() => setMoreDrawerOpen(false)}
                className="flex flex-col items-center p-3 rounded-2xl bg-pink-50/60 hover:bg-pink-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-600 mb-1.5 shadow-xs">
                  <Image className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-stone-800">Photo Gallery</span>
              </Link>

              <Link
                to="/adhesh"
                onClick={() => setMoreDrawerOpen(false)}
                className="flex flex-col items-center p-3 rounded-2xl bg-pink-50/60 hover:bg-pink-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-600 mb-1.5 shadow-xs">
                  <ScrollText className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-stone-800">Ashram Adhesh</span>
              </Link>

              <Link
                to="/about"
                onClick={() => setMoreDrawerOpen(false)}
                className="flex flex-col items-center p-3 rounded-2xl bg-pink-50/60 hover:bg-pink-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-600 mb-1.5 shadow-xs">
                  <Info className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-stone-800">About Sanstha</span>
              </Link>

              <Link
                to="/faq"
                onClick={() => setMoreDrawerOpen(false)}
                className="flex flex-col items-center p-3 rounded-2xl bg-pink-50/60 hover:bg-pink-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-600 mb-1.5 shadow-xs">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-stone-800">FAQ & Help</span>
              </Link>

              <Link
                to="/contact"
                onClick={() => setMoreDrawerOpen(false)}
                className="flex flex-col items-center p-3 rounded-2xl bg-pink-50/60 hover:bg-pink-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-600 mb-1.5 shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-stone-800">Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Install App Modal */}
      <InstallAppGuideModal
        isOpen={installModalOpen}
        onClose={() => setInstallModalOpen(false)}
      />
    </>
  );
};

export default MobileBottomNav;
