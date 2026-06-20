import apiClient from './apiClient';
import {
  OnboardingSetupPayload,
  SetupResponse,
  DailyTask,
  ReviewPayload,
  UserStatsResponse,
} from '../types/user';

export const userApi = {
  updateSetup: async (data: OnboardingSetupPayload) => {
    const response = await apiClient.put<SetupResponse>(
      '/users/me/setup',
      data,
    );
    return response.data;
  },

  getDailyTasks: async () => {
    const response = await apiClient.get<DailyTask[]>('/users/me/daily-tasks');
    return response.data;
  },

  reviewCard: async (cardId: string, data: ReviewPayload) => {
    const response = await apiClient.post<void>(
      `/users/me/daily-tasks/${cardId}/review`,
      data,
    );
    return response.data;
  },

  getStats: async () => {
    const response = await apiClient.get<UserStatsResponse>('/users/me/stats');
    return response.data;
  },
};
