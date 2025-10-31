import { Router } from 'express';
import { db } from '../index';
import type { Question, Variation } from '../types';

export const questionsRouter = Router();

// 获取所有题目
questionsRouter.get('/', (req, res) => {
  try {
    const questions = db.prepare('SELECT * FROM questions ORDER BY difficulty, id').all() as Question[];
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// 按难度获取题目
questionsRouter.get('/by-difficulty/:difficulty', (req, res) => {
  try {
    const { difficulty } = req.params;
    const questions = db.prepare('SELECT * FROM questions WHERE difficulty = ?').all(difficulty) as Question[];
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// 获取单个题目
questionsRouter.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const question = db.prepare('SELECT * FROM questions WHERE id = ?').get(id) as Question | undefined;
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});

// 为题目生成变式（简化版本，不使用AI）
questionsRouter.post('/:id/variations', (req, res) => {
  try {
    const { id } = req.params;
    const question = db.prepare('SELECT * FROM questions WHERE id = ?').get(id) as Question | undefined;

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // 生成2-4道变式题（这里用预设的变式规则）
    const variations = generateVariations(question);

    const insert = db.prepare(`
      INSERT INTO variations (original_question_id, content, answer, variation_type)
      VALUES (?, ?, ?, ?)
    `);

    const insertedVariations: Variation[] = [];
    for (const v of variations) {
      const result = insert.run(id, v.content, v.answer, v.type);
      const newVariation = db.prepare('SELECT * FROM variations WHERE id = ?').get(result.lastInsertRowid) as Variation;
      insertedVariations.push(newVariation);
    }

    res.json(insertedVariations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate variations' });
  }
});

// 获取题目的变式
questionsRouter.get('/:id/variations', (req, res) => {
  try {
    const { id } = req.params;
    const variations = db.prepare('SELECT * FROM variations WHERE original_question_id = ?').all(id) as Variation[];
    res.json(variations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch variations' });
  }
});

// 简化的变式生成函数
function generateVariations(question: Question): Array<{ content: string; answer: string; type: string }> {
  const variations: Array<{ content: string; answer: string; type: string }> = [];
  const numVariations = Math.floor(Math.random() * 3) + 2; // 2-4道

  // 根据题目类型生成变式（这里是简化版本）
  for (let i = 0; i < numVariations; i++) {
    variations.push({
      content: `${question.content} [变式${i + 1}]`,
      answer: question.answer,
      type: ['换条件', '换问法', '换表述'][i % 3]
    });
  }

  return variations;
}
