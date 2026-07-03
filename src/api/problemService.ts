import apiClient from './apiClient';
import { AiGeneratedProblem } from '../types/problem';

export const problemApi = {
  /**
   * Gọi AI đọc đề bài từ prompt text và/hoặc ảnh upload.
   * Trả về thông tin đề bài AI đã trích xuất (title, description, difficulty, tags, group, boilerplate code).
   */
  generateFromAi: async (prompt: string, imageFile: File | null) => {
    if (imageFile) {
      const formData = new FormData();
      if (prompt) formData.append('prompt', prompt);
      formData.append('image', imageFile);

      const response = await apiClient.post<AiGeneratedProblem>(
        '/api/ai/generate-problem',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      return response.data;
    } else {
      const response = await apiClient.post<AiGeneratedProblem>(
        '/api/ai/generate-problem',
        { prompt },
      );
      return response.data;
    }
  },

  /**
   * Lấy cấu hình các thẻ tag, group, độ khó động từ BE
   */
  getMetaOptions: async () => {
    const response = await apiClient.get<{
      tags: string[];
      courses: string[];
      difficulties: string[];
    }>('/cards/meta-options');
    return response.data;
  },
};
