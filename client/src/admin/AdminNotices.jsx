import React, { useState, useEffect } from 'react';
import { Bell, Plus, Edit2, Trash2, Search, X, AlertCircle } from 'lucide-react';
import api from '../services/api';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Ashram Announcement',
    priority: 'Normal',
    isPopup: false,
    status: 'active',
  });

  const FALLBACK_NOTICES = [
    {
      _id: 'notice-agra-janmashtami-2026',
      title: 'श्री कृष्ण जन्माष्टमी पावन सत्संग कार्यक्रम — आगरा (Agra) में 2 से 4 तक आयोजित',
      content: 'समस्त साधक-संगत एवं प्रेमियों को सूचित किया जाता है कि परम पूज्य बाबा उमाकान्त जी महाराज के सानिध्य में श्री कृष्ण जन्माष्टमी का पावन सत्संग एवं नामदान कार्यक्रम आगरा में 2 से 4 तक आयोजित किया जा रहा है।',
      priority: 'Very Important',
      category: 'Satsang Announcement',
      status: 'active',
      isPopup: true,
      publishedAt: '2026-09-02T02:00:00.000Z'
    },
    {
      _id: 'notice-weekly-sunday',
      title: 'प्रत्येक रविवार प्रातः 8:00 बजे पावन सत्संग एवं नाम-दान',
      content: 'बाबा जयगुरुदेव आश्रम, मक्सी रोड उज्जैन में प्रत्येक रविवार प्रातः 8:00 बजे से विशाल सत्संग एवं पवित्र नाम-दान का कार्यक्रम नियमित रूप से आयोजित होता है।',
      priority: 'Important',
      category: 'General Notice',
      status: 'active',
      isPopup: false,
      publishedAt: '2026-08-30T02:00:00.000Z'
    }
  ];

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/notices?limit=100');
      if (res.success && res.data && res.data.length > 0) {
        setNotices(res.data);
      } else {
        setNotices(FALLBACK_NOTICES);
      }
    } catch (err) {
      console.error(err);
      setNotices(FALLBACK_NOTICES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      content: '',
      category: 'Ashram Announcement',
      priority: 'Normal',
      isPopup: false,
      status: 'active',
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || '',
      content: item.content || '',
      category: item.category || 'Ashram Announcement',
      priority: item.priority || 'Normal',
      isPopup: !!item.isPopup,
      status: item.status || 'active',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/notices/${editingId}`, formData);
      } else {
        await api.post('/admin/notices', formData);
      }
      setModalOpen(false);
      fetchNotices();
    } catch (err) {
      alert(err.message || 'Action failed');
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete notice: "${title}"?`)) {
      try {
        await api.delete(`/admin/notices/${id}`);
        fetchNotices();
      } catch (err) {
        alert(err.message || 'Delete failed');
      }
    }
  };

  const filtered = notices.filter((n) =>
    !searchTerm ||
    n.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Ashram Notices & Announcements
          </h2>
          <p className="text-xs text-stone-500">Publish urgent circulars, festival guidelines, and general announcements.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-xs shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create Notice</span>
        </button>
      </div>

      <div className="bg-white p-3 rounded-2xl border border-stone-200/80 shadow-xs flex items-center">
        <Search className="w-4 h-4 text-stone-400 ml-2" />
        <input
          type="text"
          placeholder="Search notices by keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-1.5 text-xs sm:text-sm text-stone-800 bg-transparent focus:outline-hidden"
        />
      </div>

      {loading ? (
        <LoadingSkeleton count={3} />
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Priority & Category</th>
                  <th className="p-4">Notice Title & Preview</th>
                  <th className="p-4">Publish Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-roseBlush-50/40 transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase block max-w-fit mb-1 ${
                        item.priority === 'Emergency' ? 'bg-red-600 text-white' :
                        item.priority === 'Very Important' ? 'bg-rose-600 text-white' :
                        item.priority === 'Important' ? 'bg-amber-500 text-white' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {item.priority}
                      </span>
                      <span className="text-[11px] text-stone-400">{item.category}</span>
                    </td>
                    <td className="p-4 max-w-md">
                      <span className="font-serif font-bold text-stone-900 block truncate">{item.title}</span>
                      <p className="text-xs text-stone-500 truncate">{item.content}</p>
                    </td>
                    <td className="p-4 whitespace-nowrap text-stone-600">
                      {new Date(item.publishDate || item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        item.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => openEditModal(item)} className="p-1.5 text-stone-600 hover:text-maroon-700">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item._id, item.title)} className="p-1.5 text-stone-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-roseBlush-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {editingId ? 'Edit Notice' : 'Create New Notice'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-maroon-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Important">Important</option>
                    <option value="Very Important">Very Important</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                  >
                    <option value="Ashram Announcement">Ashram Announcement</option>
                    <option value="General Notice">General Notice</option>
                    <option value="Important Notice">Important Notice</option>
                    <option value="Emergency Notice">Emergency Notice</option>
                    <option value="Adhesh">Adhesh</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Content *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-semibold bg-maroon-700 hover:bg-maroon-800 text-white shadow-xs"
                >
                  {editingId ? 'Save Changes' : 'Publish Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotices;
