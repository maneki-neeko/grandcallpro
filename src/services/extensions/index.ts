import api from '../api';
import { EXTENSIONS_ENDPOINTS } from './constants';
import type { Extension } from '@/types';

const extensionsService = {
  async getAllExtensions(): Promise<Extension[]> {
    try {
      const response = await api.get<Extension[]>(EXTENSIONS_ENDPOINTS.GET_ALL);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar ramais:', error);
      throw error;
    }
  },
};

export default extensionsService; 