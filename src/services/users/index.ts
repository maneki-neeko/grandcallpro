import api from '../api';
import { USERS_ENDPOINTS } from './constants';
import type { UserModel } from '@/types';

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
};

export default usersService; 