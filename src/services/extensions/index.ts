import api from '../api';
import { EXTENSIONS_ENDPOINTS } from './constants';
import type { Extension } from '@/types';
import axios, { AxiosError } from 'axios';

// Tipo para os dados de criação de extensão
type CreateExtensionData = Omit<Extension, 'id'>;

// Interface para o erro da API
interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}

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

  async createExtension(data: CreateExtensionData): Promise<Extension> {
    try {
      const response = await api.post<Extension>(EXTENSIONS_ENDPOINTS.GET_ALL, data);
      return response.data;
    } catch (error) {
      // Verificar se é um erro de conflito (ramal já existe)
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError.response?.status === 409) {
          throw {
            message: axiosError.response.data.message || 'Ramal já cadastrado',
            status: 409
          };
        }
      }
      console.error('Erro ao criar ramal:', error);
      throw error;
    }
  },

  async updateExtension(data: Extension): Promise<Extension> {
    try {
      const response = await api.put<Extension>(EXTENSIONS_ENDPOINTS.GET_ALL, data);
      return response.data;
    } catch (error) {
      // Verificar se é um erro de conflito (ramal já existe)
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError.response?.status === 409) {
          throw {
            message: axiosError.response.data.message || 'Ramal já cadastrado',
            status: 409
          };
        }
      }
      console.error('Erro ao atualizar ramal:', error);
      throw error;
    }
  },

  async deleteExtension(id: number): Promise<void> {
    try {
      await api.delete(`${EXTENSIONS_ENDPOINTS.GET_ALL}/${id}`);
    } catch (error) {
      console.error('Erro ao excluir ramal:', error);
      throw error;
    }
  },
};

export default extensionsService; 