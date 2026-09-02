import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/common/Logo';

export const AdminLogin = () => {
  const [email, setEmail] = useState('admin@jaigurudev.org');
  const [password, setPassword] = useState('JaigurudevAdmin@2026');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-roseBlush-100 via-cream-50 to-roseBlush-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-sacred border border-roseBlush-200 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-block">
            <Logo size="default" />
          </div>
          <div className="pt-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-maroon-700 bg-roseBlush-100 px-3 py-1 rounded-full border border-roseBlush-200">
              Admin CMS Control Panel
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-2">
              Sign In to Admin Portal
            </h2>
            <p className="text-xs text-stone-500 font-light mt-1">
              Authorized Ashram administrators and editors only.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-center gap-3 text-xs font-medium">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jaigurudev.org"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-roseBlush-50/50 border border-roseBlush-200 text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-roseBlush-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-roseBlush-50/50 border border-roseBlush-200 text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-roseBlush-300"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-gradient-to-r from-maroon-700 to-roseBlush-700 hover:from-maroon-800 hover:to-roseBlush-800 text-white font-semibold text-sm shadow-md transition-all disabled:opacity-60"
            >
              <span>{submitting ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="text-center pt-2 border-t border-roseBlush-100">
          <a
            href="/"
            className="text-xs text-stone-500 hover:text-maroon-700 transition-colors"
          >
            ← Return to Public Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
