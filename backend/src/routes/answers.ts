import { Router } from 'express';
import { db } from '../index';
import type { Answer, Reflection } from '../types';

export const answersRouter = Router();

// 提交答案
answersRouter.post('/', (req, res) => {
  try {
    const {
      session_id,
      question_id,
      user_answer,
      is_correct,
      time_spent,
      question_type,
      variation_id
    } = req.body;

    const result = db.prepare(`
      INSERT INTO answers (
        session_id, question_id, user_answer, is_correct,
        time_spent, question_type, variation_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(session_id, question_id, user_answer, is_correct, time_spent, question_type, variation_id || null);

    const answer = db.prepare('SELECT * FROM answers WHERE id = ?').get(result.lastInsertRowid) as Answer;

    // 如果答错了，加入错题本
    if (!is_correct) {
      const existing = db.prepare(`
        SELECT * FROM wrong_questions
        WHERE question_id = ? AND user_id = 'default_user'
      `).get(question_id);

      if (existing) {
        db.prepare(`
          UPDATE wrong_questions
          SET error_count = error_count + 1,
              last_error_at = datetime('now')
          WHERE id = ?
        `).run((existing as any).id);
      } else {
        db.prepare(`
          INSERT INTO wrong_questions (user_id, question_id, last_error_at)
          VALUES ('default_user', ?, datetime('now'))
        `).run(question_id);
      }
    }

    res.json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
});

// 为答案创建反思
answersRouter.post('/:id/reflection', (req, res) => {
  try {
    const { id } = req.params;
    const { knowledge_points, error_type, analysis } = req.body;

    const result = db.prepare(`
      INSERT INTO reflections (answer_id, knowledge_points, error_type, analysis)
      VALUES (?, ?, ?, ?)
    `).run(id, JSON.stringify(knowledge_points), error_type || null, analysis);

    const reflection = db.prepare('SELECT * FROM reflections WHERE id = ?').get(result.lastInsertRowid) as any;

    // 解析JSON
    const reflectionFormatted: Reflection = {
      ...reflection,
      knowledge_points: JSON.parse(reflection.knowledge_points)
    };

    res.json(reflectionFormatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create reflection' });
  }
});

// 获取答案的反思
answersRouter.get('/:id/reflection', (req, res) => {
  try {
    const { id } = req.params;
    const reflection = db.prepare('SELECT * FROM reflections WHERE answer_id = ?').get(id) as any;

    if (!reflection) {
      return res.status(404).json({ error: 'Reflection not found' });
    }

    const reflectionFormatted: Reflection = {
      ...reflection,
      knowledge_points: JSON.parse(reflection.knowledge_points)
    };

    res.json(reflectionFormatted);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reflection' });
  }
});

// 获取会话的所有答案
answersRouter.get('/session/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const answers = db.prepare(`
      SELECT a.*, q.content as question_content, q.difficulty, q.thinking_type
      FROM answers a
      JOIN questions q ON a.question_id = q.id
      WHERE a.session_id = ?
      ORDER BY a.answered_at
    `).all(sessionId);

    res.json(answers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch answers' });
  }
});
