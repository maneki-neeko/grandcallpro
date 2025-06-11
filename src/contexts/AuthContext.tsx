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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  console.log('AuthProvider - Estado atual:', { isAuthenticated, isLoading, hasUser: !!user });

  const checkAuth = async () => {
    console.log('checkAuth - Iniciando verificação de autenticação');
    setIsLoading(true);
    try {
      const token = authService.getToken();
      console.log('checkAuth - Token encontrado:', !!token);

      if (!token) {
        console.log('checkAuth - Sem token, deslogando');
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      const currentUser = authService.getCurrentUser();
      console.log('checkAuth - Usuário encontrado:', !!currentUser);

      if (!currentUser) {
        console.error('checkAuth - Token existe mas usuário não encontrado no localStorage');
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      console.log('checkAuth - Autenticação bem-sucedida, atualizando estado');
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('checkAuth - Erro na validação:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('AuthProvider - useEffect - Verificando autenticação');
    const token = authService.getToken();
    const currentUser = authService.getCurrentUser();

    if (token && currentUser) {
      console.log('AuthProvider - useEffect - Token e usuário encontrados no início');
      setUser(currentUser);
      setIsAuthenticated(true);
    } else {
      console.log('AuthProvider - useEffect - Token ou usuário não encontrados no início');
      setIsAuthenticated(false);
      setUser(null);
    }

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
    console.log('AuthContext - logout - Executando logout controlado');
    // Limpar localStorage
    authService.logout();
    // Atualizar o estado do contexto
    setUser(null);
    setIsAuthenticated(false);
    // A navegação será feita pelo componente que chama logout
  };

  // Ouvir o evento de logout não autorizado
  useEffect(() => {
    const handleUnauthorized = () => {
      console.log('AuthContext - Evento não autorizado detectado');
      setUser(null);
      setIsAuthenticated(false);
      // Não usar navigate aqui, deixar o ProtectedRoute cuidar do redirecionamento
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

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
