import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (payload: { token: string; id?: string; name?: string; email?: string; role?: string }) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) as User : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = (payload: { token: string; id?: string; name?: string; email?: string; role?: string }) => {
    setToken(payload.token);
    const u: User = { id: payload.id, name: payload.name, email: payload.email, role: payload.role };
    setUser(u);

    // role-based redirect
    if (payload.role === 'admin') navigate('/admin');
    else if (payload.role === 'supplier') navigate('/supplier');
    else navigate('/');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
