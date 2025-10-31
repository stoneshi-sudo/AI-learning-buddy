import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';

export function initDatabase(dbPath: string) {
  const db = new Database(dbPath);

  // 读取并执行schema
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
  db.exec(schema);

  // 插入初始题目（15道代数题）
  insertInitialQuestions(db);

  return db;
}

function insertInitialQuestions(db: Database.Database) {
  const checkCount = db.prepare('SELECT COUNT(*) as count FROM questions').get() as { count: number };

  if (checkCount.count > 0) {
    console.log('Questions already exist, skipping initialization.');
    return;
  }

  const questions = [
    // 初级题目 (5道)
    {
      content: '计算：3x + 5x = ?',
      answer: '8x',
      difficulty: 'beginner',
      thinking_type: '代数运算',
      explanation: '同类项合并：系数相加，字母和指数不变'
    },
    {
      content: '解方程：x + 7 = 15',
      answer: 'x = 8',
      difficulty: 'beginner',
      thinking_type: '方程求解',
      explanation: '等式两边同时减7，得到x = 15 - 7 = 8'
    },
    {
      content: '化简：2(x + 3)',
      answer: '2x + 6',
      difficulty: 'beginner',
      thinking_type: '分配律',
      explanation: '使用分配律：2 × x + 2 × 3 = 2x + 6'
    },
    {
      content: '计算：-3 + 8 = ?',
      answer: '5',
      difficulty: 'beginner',
      thinking_type: '有理数运算',
      explanation: '负数加正数，用正数减去负数的绝对值'
    },
    {
      content: '如果 y = 2x，当 x = 3 时，y = ?',
      answer: '6',
      difficulty: 'beginner',
      thinking_type: '代入求值',
      explanation: '将x = 3代入y = 2x，得y = 2 × 3 = 6'
    },

    // 中级题目 (5道)
    {
      content: '解方程：2x - 5 = 3x + 1',
      answer: 'x = -6',
      difficulty: 'intermediate',
      thinking_type: '一元一次方程',
      explanation: '移项：2x - 3x = 1 + 5，合并：-x = 6，所以x = -6'
    },
    {
      content: '化简：3(2x - 1) - 2(x + 4)',
      answer: '4x - 11',
      difficulty: 'intermediate',
      thinking_type: '整式加减',
      explanation: '先去括号：6x - 3 - 2x - 8，再合并同类项：4x - 11'
    },
    {
      content: '如果 a + b = 10 且 a - b = 4，求 a 的值',
      answer: 'a = 7',
      difficulty: 'intermediate',
      thinking_type: '二元一次方程组',
      explanation: '两式相加：2a = 14，所以a = 7'
    },
    {
      content: '计算：(-2)³ × 3² = ?',
      answer: '-72',
      difficulty: 'intermediate',
      thinking_type: '幂运算',
      explanation: '(-2)³ = -8，3² = 9，-8 × 9 = -72'
    },
    {
      content: '小明有x元，小红的钱比小明多20%，小红有多少元？',
      answer: '1.2x 或 (6/5)x',
      difficulty: 'intermediate',
      thinking_type: '应用题建模',
      explanation: '多20%即为原来的120%，所以是x × (1 + 0.2) = 1.2x'
    },

    // 高级题目 (5道)
    {
      content: '解方程：(x+1)/2 - (x-1)/3 = 1',
      answer: 'x = 5',
      difficulty: 'advanced',
      thinking_type: '分式方程',
      explanation: '两边乘6：3(x+1) - 2(x-1) = 6，展开：3x+3-2x+2 = 6，x = 1'
    },
    {
      content: '已知 2^x = 8，求 x 的值',
      answer: 'x = 3',
      difficulty: 'advanced',
      thinking_type: '指数方程',
      explanation: '因为 2³ = 8，所以 x = 3'
    },
    {
      content: '化简：(a²b - ab²) ÷ ab',
      answer: 'a - b',
      difficulty: 'advanced',
      thinking_type: '因式分解',
      explanation: '提取公因式：ab(a - b) ÷ ab = a - b'
    },
    {
      content: '若 x² - 5x + 6 = 0，求 x 的两个解',
      answer: 'x = 2 或 x = 3',
      difficulty: 'advanced',
      thinking_type: '因式分解法',
      explanation: '因式分解：(x-2)(x-3) = 0，所以x = 2或x = 3'
    },
    {
      content: '一个长方形的长是宽的2倍多3cm，周长是30cm，求长和宽',
      answer: '长11cm，宽4cm',
      difficulty: 'advanced',
      thinking_type: '列方程解应用题',
      explanation: '设宽为x，则长为2x+3，周长：2(x + 2x+3) = 30，解得x=4，长=11'
    }
  ];

  const insert = db.prepare(`
    INSERT INTO questions (content, answer, difficulty, thinking_type, explanation)
    VALUES (@content, @answer, @difficulty, @thinking_type, @explanation)
  `);

  const insertMany = db.transaction((questions) => {
    for (const q of questions) {
      insert.run(q);
    }
  });

  insertMany(questions);
  console.log('Initialized 15 algebra questions successfully!');
}
