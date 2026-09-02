import React, { useState, useEffect } from 'react';
import { MessageSquare, Check, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/enquiries?limit=50');
      if (res.success && res.data) {
        setEnquiries(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const markAsRead = async (id, isRead) => {
    try {
      await api.patch(`/admin/enquiries/${id}`, { isRead: !isRead, status: isRead ? 'new' : 'resolved' });
      fetchEnquiries();
    } catch (err) {
      alert(err.message || 'Update failed');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
          Devotee Enquiries & Messages
        </h2>
        <p className="text-xs text-stone-500">Review messages submitted by seekers and devotees via the public website.</p>
      </div>

      {loading ? (
        <LoadingSkeleton count={3} />
      ) : enquiries.length > 0 ? (
        <div className="space-y-4">
          {enquiries.map((enq) => (
            <div
              key={enq._id}
              className={`p-6 rounded-3xl border transition-all space-y-3 ${
                enq.isRead ? 'bg-white border-stone-200 opacity-90' : 'bg-roseBlush-50/50 border-roseBlush-200 shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-stone-900 text-sm sm:text-base">{enq.name}</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
                    {enq.subject || 'General'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-stone-400">
                    {new Date(enq.createdAt).toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => markAsRead(enq._id, enq.isRead)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      enq.isRead
                        ? 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{enq.isRead ? 'Mark Unread' : 'Mark Resolved'}</span>
                  </button>
                </div>
              </div>

              <p className="text-sm text-stone-700 font-light leading-relaxed whitespace-pre-line">
                {enq.message}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-2">
                {enq.phone && (
                  <span className="flex items-center gap-1 text-stone-700 font-medium">
                    <Phone className="w-3.5 h-3.5 text-maroon-600" />
                    <span>{enq.phone}</span>
                  </span>
                )}
                {enq.email && (
                  <span className="flex items-center gap-1 text-stone-700">
                    <Mail className="w-3.5 h-3.5 text-maroon-600" />
                    <span>{enq.email}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center text-stone-400 italic text-sm">
          No devotee enquiries received yet.
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
