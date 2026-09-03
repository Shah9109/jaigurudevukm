import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public Layout & Pages
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import SatsangList from './pages/SatsangList';
import SatsangDetail from './pages/SatsangDetail';
import EventsList from './pages/EventsList';
import EventDetail from './pages/EventDetail';
import NoticesList from './pages/NoticesList';
import NoticeDetail from './pages/NoticeDetail';
import AdheshList from './pages/AdheshList';
import AdheshDetail from './pages/AdheshDetail';
import VideoGallery from './pages/VideoGallery';
import AudioLibrary from './pages/AudioLibrary';
import PhotoGallery from './pages/PhotoGallery';
import AboutUs from './pages/AboutUs';
import BabaJaigurudevJi from './pages/BabaJaigurudevJi';
import BabaUmakantJi from './pages/BabaUmakantJi';
import Teachings from './pages/Teachings';
import Publications from './pages/Publications';
import FAQPage from './pages/FAQPage';
import ContactUs from './pages/ContactUs';
import SearchPage from './pages/SearchPage';
import Legal from './pages/Legal';
import MobileAppSimulator from './pages/MobileAppSimulator';

// Admin CMS
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminSatsang from './admin/AdminSatsang';
import AdminNotices from './admin/AdminNotices';
import AdminAdhesh from './admin/AdminAdhesh';
import AdminVideos from './admin/AdminVideos';
import AdminAudio from './admin/AdminAudio';
import AdminSettings from './admin/AdminSettings';
import AdminActivityLogs from './admin/AdminActivityLogs';
import AdminEnquiries from './admin/AdminEnquiries';
import AdminKnowledge from './admin/AdminKnowledge';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* 1. Public Spiritual Organization Website */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="baba-jaigurudev-ji" element={<BabaJaigurudevJi />} />
          <Route path="baba-umakant-ji" element={<BabaUmakantJi />} />
          <Route path="Baba-Umakant-Ji-Maharaj-Ke-Bare-Me.aspx" element={<BabaUmakantJi />} />
          <Route path="teachings" element={<Teachings />} />
          <Route path="publications" element={<Publications />} />
          <Route path="downloads" element={<Publications />} />
          <Route path="satsang" element={<SatsangList />} />
          <Route path="satsang/:id" element={<SatsangDetail />} />
          <Route path="events" element={<EventsList />} />
          <Route path="events/:slugOrId" element={<EventDetail />} />
          <Route path="notices" element={<NoticesList />} />
          <Route path="notices/:id" element={<NoticeDetail />} />
          <Route path="adhesh" element={<AdheshList />} />
          <Route path="adhesh/:id" element={<AdheshDetail />} />
          <Route path="videos" element={<VideoGallery />} />
          <Route path="audio" element={<AudioLibrary />} />
          <Route path="gallery" element={<PhotoGallery />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="privacy-policy" element={<Legal />} />
          <Route path="terms" element={<Legal />} />
          <Route path="disclaimer" element={<Legal />} />
          <Route path="app-preview" element={<MobileAppSimulator />} />
          <Route path="app" element={<MobileAppSimulator />} />
          <Route path="sadhana-app" element={<MobileAppSimulator />} />
        </Route>

        {/* 2. Admin Authentication */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 3. Protected Admin CMS Control Panel */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="satsang" element={<AdminSatsang />} />
          <Route path="notices" element={<AdminNotices />} />
          <Route path="adhesh" element={<AdminAdhesh />} />
          <Route path="videos" element={<AdminVideos />} />
          <Route path="audio" element={<AdminAudio />} />
          <Route path="knowledge" element={<AdminKnowledge />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="homepage-builder" element={<AdminSettings />} />
          <Route path="logs" element={<AdminActivityLogs />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="*" element={<AdminDashboard />} />
        </Route>

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
