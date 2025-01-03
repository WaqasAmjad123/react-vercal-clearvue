import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check localStorage on initial load
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const savedUser = JSON.parse(localStorage.getItem('user'));
    setIsAuthenticated(authStatus);
    setUser(savedUser);
  }, []);

  const login = (credentials) => {
    // Simulate API login with demo credentials
    if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
      const userData = {
        email: credentials.email,
        name: 'Admin User',
        role: 'admin'
      };
      
      // Store auth state in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      
      setIsAuthenticated(true);
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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