import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserSession, ApiResponse } from '@/types';
import { authService } from '../services/authService';
import { LoginInput, RegisterInput, VerifyEmailInput, RegisterResponse, AuthResponse } from '../types';

interface AuthContextType {
  user: UserSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<ApiResponse<RegisterResponse>>;
  verifyEmail: (data: VerifyEmailInput) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('accessToken');

      if (storedUser && token) {
        setUser(JSON.parse(storedUser) as UserSession);
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      const response: ApiResponse<AuthResponse> = await authService.login(data);
      if (response.success) {
        const { user, accessToken } = response.data;
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      return await authService.register(data);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (data: VerifyEmailInput) => {
    setIsLoading(true);
    try {
      await authService.verifyEmail(data);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (error: unknown) {
      console.error('Logout failed', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user, 
      login, 
      register, 
      verifyEmail, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
