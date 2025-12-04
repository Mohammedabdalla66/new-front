import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authAPI } from '@/services/api';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';
const LEGACY_USER_KEY = 'user';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY) || localStorage.getItem(LEGACY_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Restore session on mount using token -> /auth/me
  useEffect(() => {
    let mounted = true;
    const restore = async () => {
      try {
        if (token && !user) {
          const res = await authAPI.getProfile();
          const u = res?.data?.user || res?.data || null;
          if (mounted && u) {
            setUser(u);
            localStorage.setItem(USER_KEY, JSON.stringify(u));
            localStorage.setItem(LEGACY_USER_KEY, JSON.stringify(u));
          }
        }
      } catch (e) {
        // invalid token
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(LEGACY_USER_KEY);
        setToken('');
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    restore();
    return () => { mounted = false; };
  }, []);

  const isAuthenticated = !!token && !!user;

  const loginWithCredentials = async (email, password) => {
    const res = await authAPI.login({ email, password });
    const t = res?.data?.token || res?.data?.accessToken || '';
    const u = res?.data?.user || res?.data?.data?.user || null;
    if (t) {
      setToken(t);
      localStorage.setItem(TOKEN_KEY, t);
    }
    if (u) {
      setUser(u);
      localStorage.setItem(USER_KEY, JSON.stringify(u));
      localStorage.setItem(LEGACY_USER_KEY, JSON.stringify(u));
    }
    return { token: t, user: u };
  };

  const loginWithData = (u, t) => {
    if (t) {
      setToken(t);
      localStorage.setItem(TOKEN_KEY, t);
    }
    if (u) {
      setUser(u);
      localStorage.setItem(USER_KEY, JSON.stringify(u));
      localStorage.setItem(LEGACY_USER_KEY, JSON.stringify(u));
    }
  };

  const register = async (data) => {
    return authAPI.register(data);
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(LEGACY_USER_KEY);
  };

  const value = useMemo(() => ({
    token,
    user,
    loading,
    isAuthenticated,
    loginWithCredentials,
    loginWithData,
    register,
    logout,
  }), [token, user, loading, isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
};
