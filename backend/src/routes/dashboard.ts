import { Router } from 'express';
import { db } from '../index';
import type { DashboardStats } from '../types';

export const dashboardRouter = Router();

// 获取Dashboard统计数据
dashboardRouter.get('/stats/:userId?', (req, res) => {
  try {
    const userId = req.params.userId || 'default_user';

    // 1. 思维雷达图数据
    const thinkingRadar = db.prepare(`
      SELECT
        q.thinking_type as type,
        COUNT(*) as total,
        SUM(CASE WHEN a.is_correct = 1 THEN 1 ELSE 0 END) as score
      FROM answers a
      JOIN questions q ON a.question_id = q.id
      JOIN practice_sessions ps ON a.session_id = ps.id
      WHERE ps.user_id = ?
      GROUP BY q.thinking_type
    `).all(userId) as Array<{ type: string; total: number; score: number }>;

    // 2. 错题原因热点（柱状图）
    const errorReasons = db.prepare(`
      SELECT
        r.error_type as reason,
        COUNT(*) as count
      FROM reflections r
      JOIN answers a ON r.answer_id = a.id
      JOIN practice_sessions ps ON a.session_id = ps.id
      WHERE ps.user_id = ? AND r.error_type IS NOT NULL
      GROUP BY r.error_type
      ORDER BY count DESC
    `).all(userId) as Array<{ reason: string; count: number }>;

    // 3. 按难度统计答对数 VS 总数
    const difficultyStats = db.prepare(`
      SELECT
        q.difficulty,
        COUNT(*) as total,
        SUM(CASE WHEN a.is_correct = 1 THEN 1 ELSE 0 END) as correct
      FROM answers a
      JOIN questions q ON a.question_id = q.id
      JOIN practice_sessions ps ON a.session_id = ps.id
      WHERE ps.user_id = ?
      GROUP BY q.difficulty
    `).all(userId) as Array<{ difficulty: string; total: number; correct: number }>;

    const stats: DashboardStats = {
      thinkingRadar: thinkingRadar.map(item => ({
        type: item.type,
        score: item.score
      })),
      errorReasons,
      difficultyStats: difficultyStats.map(item => ({
        difficulty: item.difficulty,
        correct: item.correct,
        total: item.total
      }))
    };

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// 获取学习进度概览
dashboardRouter.get('/progress/:userId?', (req, res) => {
  try {
    const userId = req.params.userId || 'default_user';

    const progress = db.prepare(`
      SELECT
        COUNT(DISTINCT ps.id) as total_sessions,
        SUM(ps.total_questions) as total_questions_answered,
        SUM(ps.correct_count) as total_correct,
        AVG(CAST(ps.correct_count AS FLOAT) / NULLIF(ps.total_questions, 0) * 100) as avg_accuracy,
        (SELECT COUNT(*) FROM wrong_questions WHERE user_id = ? AND mastered = 0) as active_wrong_questions
      FROM practice_sessions ps
      WHERE ps.user_id = ?
    `).get(userId, userId);

    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});
