import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock user data
const MOCK_USER = {
  id: 1,
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin'
};

// Mock credentials for login
const MOCK_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (credentials) => {
    // Mock authentication logic
    if (credentials.email === MOCK_CREDENTIALS.email && 
        credentials.password === MOCK_CREDENTIALS.password) {
      setUser(MOCK_USER);
      localStorage.setItem('user', JSON.stringify(MOCK_USER));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 