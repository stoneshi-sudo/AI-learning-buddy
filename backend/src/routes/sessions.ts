import { Router } from 'express';
import { db } from '../index';
import type { PracticeSession } from '../types';

export const sessionsRouter = Router();

// 创建新的练习会话
sessionsRouter.post('/', (req, res) => {
  try {
    const { user_id = 'default_user' } = req.body;

    const result = db.prepare(`
      INSERT INTO practice_sessions (user_id, start_time)
      VALUES (?, datetime('now'))
    `).run(user_id);

    const session = db.prepare('SELECT * FROM practice_sessions WHERE id = ?').get(result.lastInsertRowid) as PracticeSession;

    res.json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// 结束练习会话
sessionsRouter.put('/:id/end', (req, res) => {
  try {
    const { id } = req.params;

    // 计算统计数据
    const stats = db.prepare(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct
      FROM answers
      WHERE session_id = ?
    `).get(id) as { total: number; correct: number };

    db.prepare(`
      UPDATE practice_sessions
      SET end_time = datetime('now'),
          total_questions = ?,
          correct_count = ?
      WHERE id = ?
    `).run(stats.total, stats.correct, id);

    const session = db.prepare('SELECT * FROM practice_sessions WHERE id = ?').get(id) as PracticeSession;

    res.json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to end session' });
  }
});

// 获取会话详情
sessionsRouter.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const session = db.prepare('SELECT * FROM practice_sessions WHERE id = ?').get(id) as PracticeSession | undefined;

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

// 获取用户的所有会话
sessionsRouter.get('/user/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const sessions = db.prepare(`
      SELECT * FROM practice_sessions
      WHERE user_id = ?
      ORDER BY start_time DESC
    `).all(userId) as PracticeSession[];

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});
