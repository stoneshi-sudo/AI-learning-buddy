import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Question {
  id: number;
  content: string;
  answer: string;
  difficulty: Difficulty;
  thinking_type: string;
  explanation?: string;
}

export interface Variation {
  id: number;
  original_question_id: number;
  content: string;
  answer: string;
  variation_type?: string;
}

export interface PracticeSession {
  id: number;
  user_id: string;
  start_time: string;
  end_time?: string;
  total_questions: number;
  correct_count: number;
}

export interface Answer {
  id: number;
  session_id: number;
  question_id: number;
  user_answer: string;
  is_correct: boolean;
  time_spent: number;
  question_type: 'original' | 'variation';
  variation_id?: number;
}

export interface Reflection {
  id: number;
  answer_id: number;
  knowledge_points: string[];
  error_type?: string;
  analysis: string;
}

export interface DashboardStats {
  thinkingRadar: Array<{ type: string; score: number }>;
  errorReasons: Array<{ reason: string; count: number }>;
  difficultyStats: Array<{ difficulty: string; correct: number; total: number }>;
}

// Questions API
export const questionsApi = {
  getAll: () => api.get<Question[]>('/questions'),
  getById: (id: number) => api.get<Question>(`/questions/${id}`),
  getByDifficulty: (difficulty: Difficulty) => api.get<Question[]>(`/questions/by-difficulty/${difficulty}`),
  generateVariations: (id: number) => api.post<Variation[]>(`/questions/${id}/variations`),
  getVariations: (id: number) => api.get<Variation[]>(`/questions/${id}/variations`),
};

// Sessions API
export const sessionsApi = {
  create: (userId?: string) => api.post<PracticeSession>('/sessions', { user_id: userId }),
  end: (id: number) => api.put<PracticeSession>(`/sessions/${id}/end`),
  getById: (id: number) => api.get<PracticeSession>(`/sessions/${id}`),
};

// Answers API
export const answersApi = {
  submit: (data: {
    session_id: number;
    question_id: number;
    user_answer: string;
    is_correct: boolean;
    time_spent: number;
    question_type: 'original' | 'variation';
    variation_id?: number;
  }) => api.post<Answer>('/answers', data),
  createReflection: (answerId: number, data: {
    knowledge_points: string[];
    error_type?: string;
    analysis: string;
  }) => api.post<Reflection>(`/answers/${answerId}/reflection`, data),
  getSessionAnswers: (sessionId: number) => api.get(`/answers/session/${sessionId}`),
};

// Dashboard API
export const dashboardApi = {
  getStats: (userId?: string) => api.get<DashboardStats>(`/dashboard/stats/${userId || 'default_user'}`),
  getProgress: (userId?: string) => api.get(`/dashboard/progress/${userId || 'default_user'}`),
};

// Wrong Questions API
export const wrongQuestionsApi = {
  getAll: (userId?: string) => api.get(`/wrong-questions/${userId || 'default_user'}`),
  markAsMastered: (id: number) => api.put(`/wrong-questions/${id}/master`),
  delete: (id: number) => api.delete(`/wrong-questions/${id}`),
};

export default api;
