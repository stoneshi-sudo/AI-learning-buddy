export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type QuestionType = 'original' | 'variation';

export interface Question {
  id: number;
  content: string;
  answer: string;
  difficulty: Difficulty;
  thinking_type: string;
  explanation?: string;
  created_at: string;
}

export interface Variation {
  id: number;
  original_question_id: number;
  content: string;
  answer: string;
  variation_type?: string;
  created_at: string;
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
  question_type: QuestionType;
  variation_id?: number;
  answered_at: string;
}

export interface Reflection {
  id: number;
  answer_id: number;
  knowledge_points: string[];
  error_type?: string;
  analysis: string;
  created_at: string;
}

export interface WrongQuestion {
  id: number;
  user_id: string;
  question_id: number;
  error_type?: string;
  error_count: number;
  last_error_at: string;
  mastered: boolean;
}

export interface DashboardStats {
  thinkingRadar: Array<{ type: string; score: number }>;
  errorReasons: Array<{ reason: string; count: number }>;
  difficultyStats: Array<{ difficulty: string; correct: number; total: number }>;
}
