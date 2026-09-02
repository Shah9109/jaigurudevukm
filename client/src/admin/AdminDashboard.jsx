import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Bell,
  FileText,
  Video,
  Music,
  Image,
  BookOpen,
  MessageSquare,
  Bot,
  Activity,
  Plus,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import api from '../services/api';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/dashboard-stats');
        if (res.success && res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Error fetching admin dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const counts = stats?.counts || {
    satsangs: 3,
    notices: 3,
    events: 2,
    adhesh: 2,
    videos: 3,
    audio: 2,
    gallery: 4,
    documents: 4,
    faq: 5,
    chatbotKnowledge: 4,
    unreadEnquiries: 0,
  };

  const statCards = [
    { title: 'Upcoming Satsang', count: counts.satsangs, icon: Calendar, link: '/admin/satsang', color: 'text-maroon-700 bg-roseBlush-100' },
    { title: 'Active Notices', count: counts.notices, icon: Bell, link: '/admin/notices', color: 'text-rose-700 bg-rose-100' },
    { title: 'Ashram Adhesh', count: counts.adhesh, icon: FileText, link: '/admin/adhesh', color: 'text-amber-800 bg-amber-100' },
    { title: 'Upcoming Events', count: counts.events, icon: Sparkles, link: '/admin/events', color: 'text-emerald-800 bg-emerald-100' },
    { title: 'Video Discourses', count: counts.videos, icon: Video, link: '/admin/videos', color: 'text-blue-800 bg-blue-100' },
    { title: 'Audio Tracks', count: counts.audio, icon: Music, link: '/admin/audio', color: 'text-purple-800 bg-purple-100' },
    { title: 'Chatbot QA Bank', count: counts.chatbotKnowledge, icon: Bot, link: '/admin/knowledge', color: 'text-sacredGold-800 bg-sacredGold-100' },
    { title: 'Unread Messages', count: counts.unreadEnquiries, icon: MessageSquare, link: '/admin/enquiries', color: 'text-red-700 bg-red-100' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#2B090F] via-[#4D1219] to-[#2B090F] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-sacredGold-500/20">
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-sacredGold-300 uppercase tracking-widest font-devanagari">
            ॥ जयगुरुदेव ॥ केंद्रीय व्यवस्थापक
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Jaigurudev Sanstha CMS Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-roseBlush-200/80 font-light max-w-xl">
            Centralized content control for website announcements, satsang calendar, audio/video streams, and knowledge AI assistant.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            to="/admin/satsang"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-sacredGold-400 hover:bg-sacredGold-300 text-maroon-950 font-bold text-xs shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Satsang</span>
          </Link>
          <Link
            to="/admin/notices"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Notice</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs hover:shadow-soft transition-all duration-200 hover:-translate-y-0.5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-600" />
              </div>

              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 block">
                  {loading ? '...' : card.count}
                </span>
                <span className="text-xs text-stone-500 font-medium">{card.title}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity & Messages Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enquiries */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-maroon-700" />
              <span>Recent Devotee Enquiries</span>
            </h3>
            <Link to="/admin/enquiries" className="text-xs font-bold text-maroon-700 hover:text-maroon-900">
              View All →
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {stats?.recentEnquiries?.length > 0 ? (
              stats.recentEnquiries.map((enq) => (
                <div key={enq._id} className="py-3 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900">{enq.name}</h4>
                    <p className="text-xs text-stone-500 line-clamp-1">{enq.message}</p>
                    <span className="text-[10px] text-stone-400 mt-0.5 block">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    enq.isRead ? 'bg-stone-100 text-stone-600' : 'bg-red-50 text-red-700 font-bold'
                  }`}>
                    {enq.isRead ? 'Read' : 'New'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-stone-400 py-4 text-center italic">No new messages received.</p>
            )}
          </div>
        </div>

        {/* Audit Activity Logs */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-maroon-700" />
              <span>Recent System Activity Logs</span>
            </h3>
            <Link to="/admin/logs" className="text-xs font-bold text-maroon-700 hover:text-maroon-900">
              Full Logs →
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {stats?.recentLogs?.length > 0 ? (
              stats.recentLogs.map((log) => (
                <div key={log._id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-maroon-800 uppercase tracking-wider text-[10px] mr-2">
                      [{log.action}]
                    </span>
                    <span className="text-stone-700 font-medium">{log.details || log.resource}</span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">by {log.adminEmail}</span>
                  </div>
                  <span className="text-[10px] text-stone-400 shrink-0">
                    {new Date(log.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-stone-400 py-4 text-center italic">No recent mutation logs.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
