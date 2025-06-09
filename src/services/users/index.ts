import api from '../api';
import { USERS_ENDPOINTS } from './constants';
import type { UserModel } from '@/types';
import axios, { AxiosError } from 'axios';

// Interface para os dados de criação de usuário
export interface CreateUserData {
  name: string;
  email: string;
  username: string;
  department: string;
  password: string;
  role: string;
  level?: 'admin' | 'supervisor' | 'user';
}

// Interface para erro da API
interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}

const usersService = {
  async getAllUsers(): Promise<UserModel[]> {
    try {
      const response = await api.get<UserModel[]>(USERS_ENDPOINTS.GET_ALL);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  },

  async createUser(userData: CreateUserData): Promise<UserModel> {
    try {
      const response = await api.post<UserModel>(USERS_ENDPOINTS.CREATE, userData);
      return response.data;
    } catch (error) {
      // Verificar se é um erro de conflito (ex: usuário já existe)
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError.response?.status === 409) {
          throw {
            message: axiosError.response.data.message || 'Usuário já cadastrado',
            status: 409,
          };
        }
      }
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },
};

export default usersService; 