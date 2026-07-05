import apiClient from './apiClient';

export interface SubmissionHistoryRecord {
  date: string;
  count: number;
}

export interface DailyActivity {
  date: string;
  passed: number;
  failed: number;
  total: number;
}

export interface ExtendedStats {
  total_cards_mastered: number;
  average_retention_rate: number;
  total_submissions: number;
  total_passed: number;
  current_streak: number;
  longest_streak: number;
  solved_by_difficulty: { Easy: number; Medium: number; Hard: number };
  submission_history: SubmissionHistoryRecord[];
  daily_activity: DailyActivity[];
}

export interface SkillStat {
  tag: string;
  total_attempts: number;
  passed_count: number;
  pass_rate: number;
  skill_score: number;
}

export interface FsrsProgressItem {
  card_id: string;
  title: string;
  tags: string[];
  difficulty_level: string;
  state: 'new' | 'learning' | 'review' | 'relearning';
  reps: number;
  lapses: number;
  stability: number | null;
  scheduled_days: number | null;
  last_reviewed_at: string | null;
  next_review_date: string | null;
  last_rating: 'again' | 'hard' | 'good' | 'easy' | null;
}

export interface FlashcardQuestion {
  question: string;
  options: { text: string }[];
  correct_index: number;
  explanation: string;
}

export interface FlashcardQuiz {
  card_id: string;
  questions: FlashcardQuestion[];
  is_ai_generated: boolean;
  created_at: string;
}

export const statsApi = {
  getStats: async (): Promise<ExtendedStats> => {
    const res = await apiClient.get<ExtendedStats>('/users/me/stats');
    return res.data;
  },

  getSkillStats: async (): Promise<SkillStat[]> => {
    const res = await apiClient.get<SkillStat[]>('/users/me/skill-stats');
    return res.data;
  },

  getFsrsProgress: async (): Promise<FsrsProgressItem[]> => {
    const res = await apiClient.get<FsrsProgressItem[]>(
      '/users/me/fsrs-progress',
    );
    return res.data;
  },

  getFlashcardQuiz: async (cardId: string): Promise<FlashcardQuiz> => {
    const res = await apiClient.get<FlashcardQuiz>(
      `/flashcards/${cardId}/quiz`,
    );
    return res.data;
  },
};
