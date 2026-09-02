import React, { useState, useEffect } from 'react';
import { Sliders, Save, CheckCircle2, AlertCircle, Bell, Phone, Globe, Smartphone, Eye } from 'lucide-react';
import api from '../services/api';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export const AdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/settings');
        if (res.success && res.data) {
          setSettings(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await api.put('/admin/settings', settings);
      if (res.success) {
        setMessage({ type: 'success', text: 'Site settings and homepage configurations saved successfully!' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };

  const updateNested = (parent, field, value) => {
    setSettings({
      ...settings,
      [parent]: {
        ...settings[parent],
        [field]: value,
      },
    });
  };

  if (loading) {
    return <LoadingSkeleton count={3} />;
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Website & App CMS Settings
          </h2>
          <p className="text-xs text-stone-500">Manage global branding, homepage sections, contact details, and APK config.</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-xs shadow-md transition-all disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving Changes...' : 'Save All Settings'}</span>
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold ${
          message.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-red-50 border border-red-200 text-red-900'
        }`}>
          {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* 1. Announcement Bar Manager */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
        <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Bell className="w-4 h-4 text-maroon-700" />
          <span>Top Announcement / Emergency Alert Bar</span>
        </h3>

        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
              <input
                type="checkbox"
                checked={!!settings?.announcementBar?.enabled}
                onChange={(e) => updateNested('announcementBar', 'enabled', e.target.checked)}
                className="w-4 h-4 rounded text-maroon-700 accent-maroon-700"
              />
              <span>Enable Announcement Bar</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-red-700">
              <input
                type="checkbox"
                checked={!!settings?.announcementBar?.isEmergency}
                onChange={(e) => updateNested('announcementBar', 'isEmergency', e.target.checked)}
                className="w-4 h-4 rounded text-red-600 accent-red-600"
              />
              <span>Mark as Emergency Alert (Pulsing Red)</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Announcement Text</label>
            <input
              type="text"
              value={settings?.announcementBar?.text || ''}
              onChange={(e) => updateNested('announcementBar', 'text', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Target Link (Optional)</label>
            <input
              type="text"
              value={settings?.announcementBar?.link || ''}
              onChange={(e) => updateNested('announcementBar', 'link', e.target.value)}
              placeholder="/satsang"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* 2. Homepage Section Visibility Toggles */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
        <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Eye className="w-4 h-4 text-maroon-700" />
          <span>Homepage Section Visibility Manager</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(settings?.homepageSections || {}).map(([key, isEnabled]) => (
            <label key={key} className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 cursor-pointer hover:bg-roseBlush-50/50 transition-colors">
              <span className="text-xs font-medium text-stone-800 capitalize">
                {key.replace(/([A-Z])/g, ' $1')}
              </span>
              <input
                type="checkbox"
                checked={!!isEnabled}
                onChange={(e) => updateNested('homepageSections', key, e.target.checked)}
                className="w-4 h-4 rounded text-maroon-700 accent-maroon-700"
              />
            </label>
          ))}
        </div>
      </div>

      {/* 3. Ashram Contact Details */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
        <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Phone className="w-4 h-4 text-maroon-700" />
          <span>Ashram Official Contact Information</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Primary Phone / Helpline</label>
            <input
              type="text"
              value={settings?.contactInfo?.phone || ''}
              onChange={(e) => updateNested('contactInfo', 'phone', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Emergency / 24x7 Helpline</label>
            <input
              type="text"
              value={settings?.contactInfo?.emergencyPhone || ''}
              onChange={(e) => updateNested('contactInfo', 'emergencyPhone', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Office Email</label>
            <input
              type="email"
              value={settings?.contactInfo?.email || ''}
              onChange={(e) => updateNested('contactInfo', 'email', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Office Working Hours</label>
            <input
              type="text"
              value={settings?.contactInfo?.officeHours || ''}
              onChange={(e) => updateNested('contactInfo', 'officeHours', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-stone-700 mb-1">Ashram Physical Address</label>
            <input
              type="text"
              value={settings?.contactInfo?.address || ''}
              onChange={(e) => updateNested('contactInfo', 'address', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-hidden"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminSettings;
