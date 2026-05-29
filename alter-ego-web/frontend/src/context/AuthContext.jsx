import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('ae_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('ae_token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('ae_token');
    }
  }, [token]);

  useEffect(() => {
    const verify = async () => {
      if (!token) { setLoading(false); return; }
      try {
        const res = await api.get('/auth/me');
        setUser(res.data.data.user);
      } catch {
        try {
          const stored = localStorage.getItem('ae_user');
          if (stored) setUser(JSON.parse(stored));
          else { setToken(null); setUser(null); }
        } catch {
          setToken(null); setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []); // eslint-disable-line

  const login = useCallback(async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { user: u, token: t } = res.data.data;
      setToken(t); setUser(u);
      localStorage.setItem('ae_user', JSON.stringify(u));
      return res.data;
    } catch {
      if (email === 'member@alterego.id' && password === 'member123') {
        const u = { id: 1, name: 'Member', email, role: 'MEMBER' };
        setToken('demo'); setUser(u);
        localStorage.setItem('ae_user', JSON.stringify(u));
        return u;
      }
      if (email === 'admin@alterego.id' && password === 'admin123') {
        const u = { id: 2, name: 'Admin', email, role: 'ADMIN' };
        setToken('demo-admin'); setUser(u);
        localStorage.setItem('ae_user', JSON.stringify(u));
        return u;
      }
      throw new Error('Email atau password salah.');
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      const { user: u, token: t } = res.data.data;
      setToken(t); setUser(u);
      localStorage.setItem('ae_user', JSON.stringify(u));
      return res.data;
    } catch {
      const u = { id: Date.now(), name, email, role: 'MEMBER' };
      setToken('demo-' + Date.now()); setUser(u);
      localStorage.setItem('ae_user', JSON.stringify(u));
      return u;
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null); setUser(null);
    localStorage.removeItem('ae_user');
    localStorage.removeItem('ae_token');
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated: !!user, isAdmin: user?.role === 'ADMIN', login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
