import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './database/init';
import { questionsRouter } from './routes/questions';
import { sessionsRouter } from './routes/sessions';
import { answersRouter } from './routes/answers';
import { dashboardRouter } from './routes/dashboard';
import { wrongQuestionsRouter } from './routes/wrongQuestions';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = process.env.DATABASE_PATH || './data/learning.db';

// 中间件
app.use(cors());
app.use(express.json());

// 初始化数据库
export const db = initDatabase(DB_PATH);

// 路由
app.use('/api/questions', questionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/answers', answersRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/wrong-questions', wrongQuestionsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Learning Buddy API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Database: ${DB_PATH}`);
});
