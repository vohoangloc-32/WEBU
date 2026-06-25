import apiClient from './apiClient';
import {
  CardDetail,
  Language,
  RunCodeResult,
  SubmissionHistory,
  SubmitResult,
} from '../types/ide';

export const ideApi = {
  /**
   * Lấy thông tin card (bài tập) theo ID
   * Backend trả về: card info + boilerplate + public_test_cases
   */
  getCard: async (cardId: string): Promise<CardDetail> => {
    const res = await apiClient.get<CardDetail>(`/cards/${cardId}`);
    return res.data;
  },

  /**
   * Chạy code với public test cases (không lưu DB)
   */
  runCode: async (
    cardId: string,
    code: string,
    language: Language,
  ): Promise<RunCodeResult> => {
    const res = await apiClient.post<RunCodeResult>('/submissions/run', {
      card_id: cardId,
      code,
      language,
    });
    return res.data;
  },

  /**
   * Submit code đầy đủ (cần JWT token)
   */
  submitCode: async (
    cardId: string,
    submittedCode: string,
    language: Language,
  ): Promise<SubmitResult> => {
    const res = await apiClient.post<SubmitResult>('/submissions/submit', {
      card_id: cardId,
      submitted_code: submittedCode,
      language,
    });
    return res.data;
  },

  /**
   * Lấy lịch sử submission theo card + user
   */
  getSubmissions: async (
    cardId: string,
    userId: string,
  ): Promise<SubmissionHistory[]> => {
    const res = await apiClient.get<SubmissionHistory[]>('/submissions', {
      params: { card_id: cardId, user_id: userId },
    });
    return res.data;
  },
};
