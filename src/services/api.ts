import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { config } from '@/config/env';
import { STORAGE_KEYS } from './auth/constants';

const { API_URL } = config;

// Criando instância do axios
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Tratamento para erro 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // Limpar dados de autenticação
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
      
      // Redirecionar para login
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api; 