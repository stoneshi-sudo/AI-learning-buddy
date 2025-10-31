-- 题目表
CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    answer TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK(difficulty IN ('beginner', 'intermediate', 'advanced')),
    thinking_type TEXT NOT NULL, -- 抽象思维、逻辑推理、空间想象、数据分析等
    explanation TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 练习会话表
CREATE TABLE IF NOT EXISTS practice_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT DEFAULT 'default_user',
    start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_time DATETIME,
    total_questions INTEGER DEFAULT 0,
    correct_count INTEGER DEFAULT 0
);

-- 变式题目表
CREATE TABLE IF NOT EXISTS variations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_question_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    answer TEXT NOT NULL,
    variation_type TEXT, -- 换条件/问法/表述
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (original_question_id) REFERENCES questions(id)
);

-- 答题记录表
CREATE TABLE IF NOT EXISTS answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    user_answer TEXT,
    is_correct BOOLEAN NOT NULL,
    time_spent INTEGER, -- 秒
    question_type TEXT NOT NULL CHECK(question_type IN ('original', 'variation')),
    variation_id INTEGER,
    answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES practice_sessions(id),
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (variation_id) REFERENCES variations(id)
);

-- 反思记录表
CREATE TABLE IF NOT EXISTS reflections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    answer_id INTEGER NOT NULL,
    knowledge_points TEXT, -- JSON数组：关联的知识点
    error_type TEXT, -- 计算错误、概念理解错误、审题错误等
    analysis TEXT, -- AI生成的分析
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (answer_id) REFERENCES answers(id)
);

-- 错题本表
CREATE TABLE IF NOT EXISTS wrong_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT DEFAULT 'default_user',
    question_id INTEGER NOT NULL,
    error_type TEXT,
    error_count INTEGER DEFAULT 1,
    last_error_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    mastered BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_questions_thinking_type ON questions(thinking_type);
CREATE INDEX IF NOT EXISTS idx_answers_session ON answers(session_id);
CREATE INDEX IF NOT EXISTS idx_answers_question ON answers(question_id);
CREATE INDEX IF NOT EXISTS idx_variations_original ON variations(original_question_id);
CREATE INDEX IF NOT EXISTS idx_wrong_questions_user ON wrong_questions(user_id);
