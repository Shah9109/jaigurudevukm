import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jaigurudev_admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyStoredToken = async () => {
      const storedToken = localStorage.getItem('jaigurudev_admin_token');
      const storedUser = localStorage.getItem('jaigurudev_admin_user');
      if (storedToken) {
        try {
          const res = await api.get('/auth/me');
          if (res.success && res.data?.admin) {
            setAdmin(res.data.admin);
          } else if (storedUser) {
            setAdmin(JSON.parse(storedUser));
          } else {
            logout();
          }
        } catch (err) {
          // If server is unreachable or offline, preserve existing admin session
          if (storedUser) {
            try {
              setAdmin(JSON.parse(storedUser));
            } catch (e) {
              logout();
            }
          } else {
            logout();
          }
        }
      }
      setLoading(false);
    };

    verifyStoredToken();
  }, []);

  const login = async (email, password) => {
    const defaultEmail = 'admin@jaigurudev.org';
    const defaultPassword = 'JaigurudevAdmin@2026';
    const cleanEmail = email?.toLowerCase().trim();

    try {
      const res = await api.post('/auth/login', { email: cleanEmail, password });
      if (res.success && res.data?.token) {
        localStorage.setItem('jaigurudev_admin_token', res.data.token);
        localStorage.setItem('jaigurudev_admin_user', JSON.stringify(res.data.admin));
        setToken(res.data.token);
        setAdmin(res.data.admin);
        return res.data;
      }
    } catch (apiErr) {
      // Offline / Vercel preview fallback for master credentials
      if (cleanEmail === defaultEmail && password === defaultPassword) {
        const fallbackAdmin = {
          id: 'admin-root-id',
          name: 'Jaigurudev Super Admin',
          email: defaultEmail,
          role: 'superadmin',
          lastLogin: new Date().toISOString(),
        };
        const mockToken = 'jaigurudev_fallback_admin_token_2026';
        localStorage.setItem('jaigurudev_admin_token', mockToken);
        localStorage.setItem('jaigurudev_admin_user', JSON.stringify(fallbackAdmin));
        setToken(mockToken);
        setAdmin(fallbackAdmin);
        return { token: mockToken, admin: fallbackAdmin };
      }
      throw new Error(apiErr.message || 'Invalid email or password');
    }
  };

  const logout = () => {
    localStorage.removeItem('jaigurudev_admin_token');
    localStorage.removeItem('jaigurudev_admin_user');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, isAuthenticated: !!admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
