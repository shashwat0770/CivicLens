
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock login for now - replace with actual API call later
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, determine role based on email
      const role: UserRole = email.includes('admin') ? 'admin' : 'citizen';
      
      const user: User = {
        id: '123', // would come from API
        name: email.split('@')[0], // For demo purposes
        email,
        role,
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Mock register for now - replace with actual API call later
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: '123', // would come from API
        name,
        email,
        role: 'citizen', // Default role for new users
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
