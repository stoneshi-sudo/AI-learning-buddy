import { Router } from 'express';
import { db } from '../index';
import type { WrongQuestion } from '../types';

export const wrongQuestionsRouter = Router();

// 获取错题本
wrongQuestionsRouter.get('/:userId?', (req, res) => {
  try {
    const userId = req.params.userId || 'default_user';

    const wrongQuestions = db.prepare(`
      SELECT
        wq.*,
        q.content,
        q.answer,
        q.difficulty,
        q.thinking_type,
        q.explanation
      FROM wrong_questions wq
      JOIN questions q ON wq.question_id = q.id
      WHERE wq.user_id = ? AND wq.mastered = 0
      ORDER BY wq.last_error_at DESC
    `).all(userId);

    res.json(wrongQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch wrong questions' });
  }
});

// 标记错题为已掌握
wrongQuestionsRouter.put('/:id/master', (req, res) => {
  try {
    const { id } = req.params;

    db.prepare(`
      UPDATE wrong_questions
      SET mastered = 1
      WHERE id = ?
    `).run(id);

    const wrongQuestion = db.prepare('SELECT * FROM wrong_questions WHERE id = ?').get(id) as WrongQuestion;

    res.json(wrongQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update wrong question' });
  }
});

// 删除错题
wrongQuestionsRouter.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    db.prepare('DELETE FROM wrong_questions WHERE id = ?').run(id);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete wrong question' });
  }
});

// 获取错题统计
wrongQuestionsRouter.get('/:userId/stats', (req, res) => {
  try {
    const userId = req.params.userId || 'default_user';

    const stats = db.prepare(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN mastered = 1 THEN 1 ELSE 0 END) as mastered,
        AVG(error_count) as avg_error_count
      FROM wrong_questions
      WHERE user_id = ?
    `).get(userId);

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch wrong question stats' });
  }
});
