import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuthData, clearAuthData } from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authData = getAuthData();
    if (authData) {
      setUser(authData);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};