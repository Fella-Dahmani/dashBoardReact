import React, { createContext, useState, useContext } from 'react';
 
type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};
 
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
export const useAuth = () => useContext(AuthContext);
 
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
 
  return (
<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
</AuthContext.Provider>
  );
};

