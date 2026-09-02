import React from 'react';
import { Outlet } from 'react-router-dom';
import AnnouncementBar from '../common/AnnouncementBar';
import Header from './Header';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import BackToTop from '../common/BackToTop';
import SEO from '../common/SEO';
import ChatWidget from '../common/ChatWidget';
import LiveStreamPopupAlert from '../common/LiveStreamPopupAlert';

export const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF9] text-stone-800 antialiased">
      <SEO />
      {/* Top Devotional Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navigation Header */}
      <Header />

      {/* Dynamic Page Content */}
      <main className="flex-grow pb-16 xl:pb-0">
        {children || <Outlet />}
      </main>

      {/* Live Stream Pop-up Toast Alert */}
      <LiveStreamPopupAlert />

      {/* Knowledge AI Chatbot Widget */}
      <ChatWidget />

      {/* Footer */}
      <Footer />

      {/* Mobile-First Fixed Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Back to Top Floating Action */}
      <BackToTop />
    </div>
  );
};

export default MainLayout;
