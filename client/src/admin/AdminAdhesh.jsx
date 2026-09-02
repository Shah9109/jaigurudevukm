import React, { useState, useEffect } from 'react';
import { FileText, Plus, Edit2, Trash2, Search, X, Download } from 'lucide-react';
import api from '../services/api';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export const AdminAdhesh = () => {
  const [adheshList, setAdheshList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    referenceNumber: '',
    description: '',
    signatory: 'केंद्रीय व्यवस्थापक',
    documentUrl: '',
    category: 'Ashram Order',
  });

  const fetchAdhesh = async () => {
    setLoading(true);
    try {
      const res = await api.get('/adhesh');
      if (res.success && res.data) {
        setAdheshList(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdhesh();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      referenceNumber: `JGD/ADM/${new Date().getFullYear()}/0${adheshList.length + 1}`,
      description: '',
      signatory: 'केंद्रीय व्यवस्थापक',
      documentUrl: '',
      category: 'Ashram Order',
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || '',
      referenceNumber: item.referenceNumber || '',
      description: item.description || '',
      signatory: item.signatory || 'केंद्रीय व्यवस्थापक',
      documentUrl: item.documentUrl || '',
      category: item.category || 'Ashram Order',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/adhesh/${editingId}`, formData);
      } else {
        await api.post('/admin/adhesh', formData);
      }
      setModalOpen(false);
      fetchAdhesh();
    } catch (err) {
      alert(err.message || 'Action failed');
    }
  };

  const handleDelete = async (id, refNo) => {
    if (window.confirm(`Delete directive: "${refNo}"?`)) {
      try {
        await api.delete(`/admin/adhesh/${id}`);
        fetchAdhesh();
      } catch (err) {
        alert(err.message || 'Delete failed');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Ashram Adhesh (Official Directives)
          </h2>
          <p className="text-xs text-stone-500">Manage numbered circulars, rules, and administrative orders.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-xs shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Issue New Adhesh</span>
        </button>
      </div>

      {loading ? (
        <LoadingSkeleton count={3} />
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Ref Number</th>
                  <th className="p-4">Title & Description</th>
                  <th className="p-4">Signatory</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {adheshList.map((item) => (
                  <tr key={item._id} className="hover:bg-roseBlush-50/40 transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-maroon-800 bg-roseBlush-50 px-2 py-0.5 rounded border border-roseBlush-200">
                        {item.referenceNumber}
                      </span>
                    </td>
                    <td className="p-4 max-w-md">
                      <span className="font-serif font-bold text-stone-900 block truncate">{item.title}</span>
                      <p className="text-xs text-stone-500 truncate">{item.description}</p>
                    </td>
                    <td className="p-4 whitespace-nowrap text-stone-700 font-medium">
                      {item.signatory}
                    </td>
                    <td className="p-4 whitespace-nowrap text-stone-500">
                      {new Date(item.issueDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => openEditModal(item)} className="p-1.5 text-stone-600 hover:text-maroon-700">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item._id, item.referenceNumber)} className="p-1.5 text-stone-600 hover:text-red-700">
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
                {editingId ? 'Edit Adhesh Order' : 'Issue New Ashram Adhesh'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Ref Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.referenceNumber}
                    onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Signatory</label>
                  <input
                    type="text"
                    value={formData.signatory}
                    onChange={(e) => setFormData({ ...formData, signatory: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Order Details / Content *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  {editingId ? 'Save Changes' : 'Issue Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAdhesh;
