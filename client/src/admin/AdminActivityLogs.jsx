import React, { useState, useEffect } from 'react';
import { Activity, Search, Filter, ShieldCheck, Clock } from 'lucide-react';
import api from '../services/api';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export const AdminActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState('all');

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const query = actionFilter === 'all' ? '' : `?action=${actionFilter}`;
        const res = await api.get(`/admin/logs${query}`);
        if (res.success && res.data) {
          setLogs(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [actionFilter]);

  const actions = ['all', 'LOGIN', 'CREATE', 'UPDATE', 'DELETE', 'SETTINGS_CHANGE'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            System Activity & Audit Logs
          </h2>
          <p className="text-xs text-stone-500">Track all administrative logins, content mutations, and setting modifications.</p>
        </div>

        <div className="flex bg-white p-1 rounded-2xl border border-stone-200 text-xs flex-wrap">
          {actions.map((act) => (
            <button
              key={act}
              onClick={() => setActionFilter(act)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors uppercase ${
                actionFilter === act
                  ? 'bg-maroon-700 text-white font-bold shadow-xs'
                  : 'text-stone-600 hover:text-maroon-700'
              }`}
            >
              {act}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton count={3} />
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Action</th>
                  <th className="p-4">Resource & Details</th>
                  <th className="p-4">Admin User</th>
                  <th className="p-4">IP Address</th>
                  <th className="p-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-roseBlush-50/40 transition-colors">
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        log.action === 'CREATE' ? 'bg-emerald-100 text-emerald-800' :
                        log.action === 'DELETE' ? 'bg-red-100 text-red-800' :
                        log.action === 'UPDATE' ? 'bg-blue-100 text-blue-800' :
                        log.action === 'LOGIN' ? 'bg-sacredGold-100 text-sacredGold-800' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 max-w-md">
                      <span className="font-bold text-stone-900 block">{log.resource}</span>
                      <span className="text-xs text-stone-600 font-light">{log.details}</span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-stone-700 font-medium">
                      {log.adminEmail}
                    </td>
                    <td className="p-4 whitespace-nowrap font-mono text-[11px] text-stone-400">
                      {log.ipAddress || '127.0.0.1'}
                    </td>
                    <td className="p-4 whitespace-nowrap text-stone-500">
                      {new Date(log.createdAt).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminActivityLogs;
