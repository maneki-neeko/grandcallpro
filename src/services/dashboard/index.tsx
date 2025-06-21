import api from '../api';
import { DASHBOARD_ENDPOINTS } from './constants';
import { Dashboard } from '@/types/dashboard';

const dashboardServices = {
  async getDataDashboard(): Promise<Dashboard> {
    try {
      const response = await api.get<Dashboard>(DASHBOARD_ENDPOINTS.GET_ALL_DATA);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar registros:', error);
      throw error;
    }
  },
};

export default dashboardServices;
