import api from '../api';
import { AUTH_ENDPOINTS, STORAGE_KEYS } from './constants';
import type { User, LoginCredentials, RegisterData, AuthResponse } from '@/types';

const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
      const { accessToken } = response.data;
      localStorage.setItem(STORAGE_KEYS.TOKEN, accessToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, data);
      const { accessToken, user } = response.data;
      localStorage.setItem(STORAGE_KEYS.TOKEN, accessToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw error;
    }
  },

  async forgotPassword(email: string): Promise<void> {
    try {
      await api.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
    } catch (error) {
      console.error('Erro ao enviar email de recuperação:', error);
      throw error;
    }
  },

  logout(): void {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    window.location.href = '/login';
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
