# 🎓 七年级代数AI学习工具

一个专为七年级学生设计的代数学习系统，通过智能练习、变式训练和数据分析帮助学生掌握代数知识。

## 🌐 立即在线使用（无需安装）

<div align="center">

### ⚡ 点击下方按钮，1分钟启动完整应用！

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/stoneshi-sudo/AI-learning-buddy/tree/claude/junior-algebra-learning-tool-011CUeWszVdK8HGfdBg7ymYp)

**Codespace 打开后，在终端运行：`./start-app.sh`**

📖 详细说明：[Codespaces 一键启动指南](./CODESPACES_GUIDE.md)

---

</div>

## 🚀 其他运行方式

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/stoneshi-sudo/AI-learning-buddy)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)](./docker-compose.yml)

**选择适合你的方式：**

1. **GitHub Codespaces**（推荐）- 浏览器中直接运行，无需安装 - [查看指南](./CODESPACES_GUIDE.md)
2. **Docker一键启动** - 本地快速启动 - [查看指南](./QUICKSTART.md#方式2docker一键启动最快需要docker)
3. **本地开发** - 传统开发方式 - [查看指南](./QUICKSTART.md#方式3本地开发传统方式)

📖 更多文档：[QUICKSTART.md](./QUICKSTART.md) | [GITHUB_SETUP.md](./GITHUB_SETUP.md) | [ACCESS.md](./ACCESS.md)

## ✨ 核心功能

### 1. 📝 智能测试系统
- **15道精选代数题**：覆盖初级、中级、高级三个难度等级（各5题）
- **关联数学思维**：每道题标注思维类型（代数运算、方程求解、逻辑推理等）
- **实时计时**：记录每道题的答题时间
- **即时反馈**：提交答案后立即显示正误和详细解析

### 2. 🔄 变式练习
- **自动生成变式**：每道题完成后自动生成2-4道变式题
- **深化理解**：通过换条件、换问法、换表述强化知识点
- **巩固记忆**：变式全部做对后才能进入下一环节

### 3. 💭 反思分析系统
- **自动分析**：完成变式后自动生成反思报告
- **知识点关联**：分析题目关联的知识点和思维类型
- **错误诊断**：对错题进行错误类型识别
  - 计算错误
  - 概念理解错误
  - 审题错误
  - 解题步骤错误
- **改进建议**：针对错误类型给出个性化学习建议

### 4. 📕 错题本
- **自动收录**：答错的题目自动加入错题本
- **错误统计**：记录每道题的错误次数和最后错误时间
- **分类管理**：按难度、思维类型、错误类型分类
- **复习功能**：支持标记"已掌握"和删除错题

### 5. 📊 学习看板（Dashboard）

#### 5.1 思维雷达图
- 展示各个思维类型的掌握程度
- 直观看出强项和弱项
- 每道做对的题计1分，同思维类型得分累加

#### 5.2 错题原因热点（柱状图）
- 统计各类错误原因的出现次数
- 识别最常见的学习障碍
- 帮助针对性改进

#### 5.3 难度统计
- 按初级、中级、高级统计答对数和总数
- 显示各难度的正确率
- 追踪学习进度

## 🛠️ 技术栈

### 前端
- **框架**：React 18 + TypeScript
- **构建工具**：Vite
- **UI组件库**：Ant Design 5
- **图表库**：Recharts
- **HTTP客户端**：Axios

### 后端
- **运行时**：Node.js
- **框架**：Express + TypeScript
- **数据库**：SQLite 3（轻量级，无需额外安装）
- **开发工具**：tsx（TypeScript执行器）

## 📦 快速开始

### 前置要求
- Node.js >= 16
- npm >= 7

### 安装依赖

```bash
# 安装后端依赖
cd backend
npm install

# 安装前端依赖
cd ../frontend
npm install
```

### 启动开发服务器

**方式1：分别启动（推荐）**

```bash
# 终端1 - 启动后端（端口3001）
cd backend
npm run dev

# 终端2 - 启动前端（端口5173）
cd frontend
npm run dev
```

**方式2：从根目录启动**

```bash
# 启动后端
npm run dev:backend

# 启动前端（新终端）
npm run dev:frontend
```

### 访问应用

打开浏览器访问：http://localhost:5173

## 📁 项目结构

```
AI-learning-buddy/
├── frontend/                # 前端项目
│   ├── src/
│   │   ├── components/     # React组件
│   │   │   ├── PracticePage.tsx       # 练习页面
│   │   │   ├── Dashboard.tsx          # 学习看板
│   │   │   ├── WrongQuestionsPage.tsx # 错题本
│   │   │   ├── Timer.tsx              # 计时器
│   │   │   └── ReflectionModal.tsx    # 反思模态框
│   │   ├── services/
│   │   │   └── api.ts      # API服务层
│   │   ├── App.tsx         # 主应用组件
│   │   └── main.tsx        # 应用入口
│   └── package.json
│
├── backend/                 # 后端项目
│   ├── src/
│   │   ├── database/
│   │   │   ├── schema.sql  # 数据库Schema
│   │   │   └── init.ts     # 数据库初始化（含15道题目）
│   │   ├── routes/         # API路由
│   │   │   ├── questions.ts      # 题目相关API
│   │   │   ├── sessions.ts       # 会话管理API
│   │   │   ├── answers.ts        # 答题记录API
│   │   │   ├── dashboard.ts      # 统计数据API
│   │   │   └── wrongQuestions.ts # 错题本API
│   │   ├── types/
│   │   │   └── index.ts    # TypeScript类型定义
│   │   └── index.ts        # 服务器入口
│   ├── data/               # SQLite数据库文件（自动创建）
│   ├── .env                # 环境变量配置
│   └── package.json
│
├── README.md               # 项目文档
├── package.json            # 根项目配置
└── start.sh                # 启动脚本
```

## 🎯 使用流程

1. **开始练习**
   - 点击"开始测试"按钮
   - 系统创建练习会话，加载15道题目

2. **答题**
   - 阅读题目，输入答案
   - 点击"提交答案"查看结果
   - 查看正确答案和详细解析

3. **变式练习**
   - 点击"继续变式练习"
   - 完成2-4道变式题目
   - 每道变式都会记录答题情况

4. **反思总结**
   - 完成所有变式后自动弹出反思窗口
   - 查看答题情况统计
   - 阅读AI生成的分析和建议
   - 点击"完成反思，继续下一题"

5. **查看数据**
   - 切换到"学习看板"查看统计数据
   - 查看思维雷达图、错题原因、难度统计
   - 切换到"错题本"复习错题

## 📊 数据库设计

### 主要表结构

- **questions**：题目表（15道预置题目）
- **practice_sessions**：练习会话表
- **answers**：答题记录表
- **variations**：变式题目表
- **reflections**：反思记录表
- **wrong_questions**：错题本表

所有数据持久化到SQLite数据库，支持长期学习追踪。

## 🔧 API接口

### 题目相关
- `GET /api/questions` - 获取所有题目
- `GET /api/questions/:id` - 获取单个题目
- `POST /api/questions/:id/variations` - 生成变式题
- `GET /api/questions/:id/variations` - 获取变式列表

### 会话管理
- `POST /api/sessions` - 创建练习会话
- `PUT /api/sessions/:id/end` - 结束会话
- `GET /api/sessions/:id` - 获取会话详情

### 答题记录
- `POST /api/answers` - 提交答案
- `POST /api/answers/:id/reflection` - 创建反思
- `GET /api/answers/session/:sessionId` - 获取会话答题记录

### Dashboard
- `GET /api/dashboard/stats/:userId` - 获取统计数据
- `GET /api/dashboard/progress/:userId` - 获取学习进度

### 错题本
- `GET /api/wrong-questions/:userId` - 获取错题列表
- `PUT /api/wrong-questions/:id/master` - 标记为已掌握
- `DELETE /api/wrong-questions/:id` - 删除错题

## 🎨 界面预览

- **主页**：三个主要导航 - 开始练习、学习看板、错题本
- **练习页面**：题目卡片、计时器、进度统计、答题区
- **学习看板**：雷达图、柱状图、统计卡片
- **错题本**：错题列表、操作按钮、统计信息

## 🚀 未来扩展

- [ ] 接入OpenAI/Claude API实现真正的AI变式生成
- [ ] 添加用户认证系统
- [ ] 支持多个年级和科目
- [ ] 添加学习计划功能
- [ ] 生成PDF学习报告
- [ ] 添加语音讲解功能
- [ ] 家长/老师监控面板

## 📝 开发说明

### 添加新题目

编辑 `backend/src/database/init.ts` 中的 `questions` 数组：

```typescript
{
  content: '题目内容',
  answer: '答案',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  thinking_type: '思维类型',
  explanation: '详细解析'
}
```

### 修改题库后重置数据库

```bash
# 删除现有数据库
rm backend/data/learning.db

# 重启后端服务，数据库会自动重建
```

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 👥 作者

AI Learning Buddy Team

---

**祝学习进步！** 🎉
