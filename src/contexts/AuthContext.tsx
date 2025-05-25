import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService from '../services/auth';
import type { User, LoginCredentials, RegisterData } from '@/types';

// Interface para o contexto de autenticação
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  forgotPassword: (login: string) => Promise<void>;
  isAuthenticated: boolean;
}

// Valores padrão para o contexto
const defaultAuthContext: AuthContextType = {
  user: null,
  isLoading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  forgotPassword: async () => {},
  isAuthenticated: false,
};

// Criação do contexto
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);

// Props para o provedor de contexto
interface AuthProviderProps {
  children: ReactNode;
}

// Provedor de contexto
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const token = authService.getToken();

      if (!token) {
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erro na validação:', error);
      authService.logout();
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(data);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao registrar');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.forgotPassword(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar email de recuperação');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Valor do contexto
  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
