import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Edit2, Trash2, Search, X, Check, MapPin, Clock, User, AlertCircle } from 'lucide-react';
import api from '../services/api';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import MediaLinkSettingsField from '../components/admin/MediaLinkSettingsField';

export const AdminSatsang = () => {
  const [satsangs, setSatsangs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00 AM',
    endTime: '11:00 AM',
    location: '',
    city: 'Mathura',
    state: 'Uttar Pradesh',
    speaker: 'Pujya Maharaj Ji',
    contactNumber: '',
    status: 'upcoming',
    isDaily: false,
    specialInstructions: '',
  });

  const FALLBACK_SATSANGS = [
    {
      _id: 'satsang-agra-2026',
      title: 'श्री कृष्ण जन्माष्टमी पावन सत्संग कार्यक्रम — आगरा (Agra)',
      date: '2026-09-02T02:30:00.000Z',
      startTime: '08:00 AM',
      endTime: '12:00 PM',
      location: 'विशाल सत्संग मैदान, आगरा-कानपुर रोड',
      city: 'Agra',
      state: 'Uttar Pradesh',
      speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
      contactNumber: '+91-9754700200',
      status: 'upcoming',
      isDaily: false,
      description: 'पावन श्री कृष्ण जन्माष्टमी के शुभ अवसर पर 2 से 4 तक आयोजित विशाल सत्संग एवं नामदान समारोह।'
    },
    {
      _id: 'satsang-mathura-weekly',
      title: 'साप्ताहिक रविवार पावन सत्संग एवं नामदान',
      date: new Date().toISOString(),
      startTime: '08:00 AM',
      endTime: '11:30 AM',
      location: 'बाबा जयगुरुदेव आश्रम, मक्सी रोड',
      city: 'Ujjain',
      state: 'Madhya Pradesh',
      speaker: 'परम पूज्य बाबा उमाकान्त जी महाराज',
      contactNumber: '+91-9754700200',
      status: 'upcoming',
      isDaily: true,
      description: 'प्रत्येक रविवार प्रातः कालीन पावन सत्संग एवं पवित्र नाम-दान दीक्षा।'
    }
  ];

  const fetchSatsangs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/satsang?limit=100');
      if (res.success && res.data && res.data.length > 0) {
        setSatsangs(res.data);
      } else {
        setSatsangs(FALLBACK_SATSANGS);
      }
    } catch (err) {
      console.error(err);
      setSatsangs(FALLBACK_SATSANGS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSatsangs();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '08:00 AM',
      endTime: '11:00 AM',
      location: '',
      city: 'Mathura',
      state: 'Uttar Pradesh',
      speaker: 'Pujya Maharaj Ji',
      contactNumber: '',
      status: 'upcoming',
      isDaily: false,
      specialInstructions: '',
      mediaUrl: '',
      displayMode: 'full',
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
      startTime: item.startTime || '08:00 AM',
      endTime: item.endTime || '11:00 AM',
      location: item.location || '',
      city: item.city || 'Mathura',
      state: item.state || 'Uttar Pradesh',
      speaker: item.speaker || 'Pujya Maharaj Ji',
      contactNumber: item.contactNumber || '',
      status: item.status || 'upcoming',
      isDaily: !!item.isDaily,
      specialInstructions: item.specialInstructions || '',
      mediaUrl: item.mediaUrl || '',
      displayMode: item.displayMode || 'full',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/satsang/${editingId}`, formData);
      } else {
        await api.post('/admin/satsang', formData);
      }
      setModalOpen(false);
      fetchSatsangs();
    } catch (err) {
      alert(err.message || 'Action failed');
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete the satsang: "${title}"?`)) {
      try {
        await api.delete(`/admin/satsang/${id}`);
        fetchSatsangs();
      } catch (err) {
        alert(err.message || 'Delete failed');
      }
    }
  };

  const filtered = satsangs.filter((s) =>
    !searchTerm ||
    s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Satsang Programs Management
          </h2>
          <p className="text-xs text-stone-500">Manage daily satsang, weekly discourses, and special samagams.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-xs shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Satsang</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-3 rounded-2xl border border-stone-200/80 shadow-xs flex items-center">
        <Search className="w-4 h-4 text-stone-400 ml-2" />
        <input
          type="text"
          placeholder="Filter by title, venue, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-1.5 text-xs sm:text-sm text-stone-800 bg-transparent focus:outline-hidden"
        />
      </div>

      {/* Satsang Table */}
      {loading ? (
        <LoadingSkeleton count={3} />
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Title & Speaker</th>
                  <th className="p-4">Venue & City</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-roseBlush-50/40 transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      <span className="font-bold text-stone-900 block">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                      <span className="text-[11px] text-stone-500">{item.startTime}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-serif font-bold text-stone-900 block">{item.title}</span>
                      <span className="text-[11px] text-maroon-700">{item.speaker || 'Pujya Maharaj Ji'}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-stone-800 block">{item.location}</span>
                      <span className="text-[11px] text-stone-500">{item.city}, {item.state}</span>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        item.status === 'upcoming' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 text-stone-600 hover:text-maroon-700 hover:bg-stone-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id, item.title)}
                        className="p-1.5 text-stone-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
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

      {/* Modal for Create/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-roseBlush-200 my-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {editingId ? 'Edit Satsang Schedule' : 'Create New Satsang Schedule'}
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Start Time *</label>
                  <input
                    type="text"
                    required
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">End Time</label>
                  <input
                    type="text"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Venue / Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Main Satsang Hall"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Speaker</label>
                  <input
                    type="text"
                    value={formData.speaker}
                    onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden resize-none"
                />
              </div>

              <MediaLinkSettingsField
                mediaUrl={formData.mediaUrl}
                displayMode={formData.displayMode}
                onChangeUrl={(url) => setFormData({ ...formData, mediaUrl: url })}
                onChangeMode={(mode) => setFormData({ ...formData, displayMode: mode })}
              />

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
                  {editingId ? 'Save Changes' : 'Create Satsang'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSatsang;
