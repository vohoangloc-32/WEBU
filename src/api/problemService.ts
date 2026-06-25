import apiClient from './apiClient';
import { AiGeneratedProblem } from '../types/problem';

export const problemApi = {
  /**
   * Gọi AI đọc đề bài từ prompt text và/hoặc ảnh upload.
   * Trả về thông tin đề bài AI đã trích xuất (title, description, difficulty, tags, group, boilerplate code).
   */
  generateFromAi: async (_prompt: string, imageFile: File | null) => {
    const formData = new FormData();
    // formData.append('prompt', prompt || '');
    if (imageFile) {
      formData.append('image', imageFile);
    }

    // apiClient mặc định set Content-Type: application/json,
    // cần override lại thành multipart/form-data cho request có file.
    const response = await apiClient.post<AiGeneratedProblem>(
      '/api/ai/generate-problem',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return response.data;
  },
};
