import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Video,
  Music,
  Image,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Bot,
  Sliders,
  Shield,
  Activity,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Bell,
  Sparkles,
  User,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/common/Logo';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navSections = [
    {
      title: 'Main',
      items: [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
      ],
    },
    {
      title: 'Content CMS',
      items: [
        { name: 'Satsang Programs', path: '/admin/satsang', icon: Calendar },
        { name: 'Notices & Alerts', path: '/admin/notices', icon: Bell },
        { name: 'Ashram Adhesh', path: '/admin/adhesh', icon: FileText },
        { name: 'Events & Utsav', path: '/admin/events', icon: Sparkles },
        { name: 'Videos', path: '/admin/videos', icon: Video },
        { name: 'Audio Tracks', path: '/admin/audio', icon: Music },
        { name: 'Photo Gallery', path: '/admin/gallery', icon: Image },
        { name: 'Publications', path: '/admin/publications', icon: BookOpen },
      ],
    },
    {
      title: 'Communication',
      items: [
        { name: 'Devotee Enquiries', path: '/admin/enquiries', icon: MessageSquare },
        { name: 'FAQs', path: '/admin/faq', icon: HelpCircle },
      ],
    },
    {
      title: 'AI Assistant',
      items: [
        { name: 'Knowledge Base', path: '/admin/knowledge', icon: Bot },
      ],
    },
    {
      title: 'Website & App Settings',
      items: [
        { name: 'Homepage CMS', path: '/admin/homepage-builder', icon: Sliders },
        { name: 'Site Settings', path: '/admin/settings', icon: Sliders },
      ],
    },
    {
      title: 'System & Security',
      items: [
        { name: 'Activity Logs', path: '/admin/logs', icon: Activity },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* 1. Desktop & Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#23080D] text-roseBlush-100 flex flex-col justify-between transition-transform duration-300 xl:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Logo light={true} size="small" showTagline={false} />
            <button
              onClick={() => setSidebarOpen(false)}
              className="xl:hidden p-1 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links Scrollable List */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {navSections.map((sec, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-sacredGold-400/80 px-3 block mb-1">
                  {sec.title}
                </span>
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.end}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-roseBlush-800 text-white font-bold shadow-xs border-l-4 border-sacredGold-400'
                            : 'text-roseBlush-200/80 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0 text-sacredGold-300" />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Sidebar Footer with Admin Profile & Logout */}
          <div className="p-4 border-t border-white/10 bg-black/20">
            <div className="flex items-center justify-between gap-2">
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-white block truncate">
                  {admin?.name || 'Administrator'}
                </span>
                <span className="text-[10px] text-sacredGold-300 block truncate">
                  {admin?.email || 'admin@jaigurudev.org'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl bg-white/10 hover:bg-red-600/80 text-white transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 xl:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 2. Main Content Container */}
      <div className="flex-1 flex flex-col xl:pl-72 min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="xl:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-xl"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-maroon-800 bg-roseBlush-100 px-3 py-1 rounded-md hidden sm:inline-block">
              CMS Control Center
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-roseBlush-50 text-stone-700 hover:text-maroon-800 text-xs font-semibold border border-stone-200 transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-roseBlush-50 hover:bg-roseBlush-100 text-maroon-800 text-xs font-semibold border border-roseBlush-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
