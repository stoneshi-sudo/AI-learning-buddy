# 部署指南

## Git提交命令

请在终端中手动执行以下命令：

```bash
cd /home/user/AI-learning-buddy

# 添加所有文件
git add -A

# 提交
git commit -m "feat: 实现七年级代数AI学习工具

- 实现15道代数题目系统（初中高三个难度）
- 实现变式练习功能（每题2-4道变式）
- 实现反思分析系统（知识点分析、错误类型识别）
- 实现错题本功能
- 实现Dashboard数据可视化（思维雷达图、错题原因柱状图、难度统计）
- 实现计时器功能
- 完整的前后端架构（React + TypeScript + Express + SQLite）
- 所有学习数据持久化到数据库
"

# 推送到远程分支
git push -u origin claude/junior-algebra-learning-tool-011CUeWszVdK8HGfdBg7ymYp
```

## 安装依赖

```bash
# 安装后端依赖
cd backend
npm install

# 安装前端依赖
cd ../frontend
npm install
```

## 启动服务

### 方式1：分别启动（推荐）

```bash
# 终端1 - 启动后端
cd backend
npm run dev

# 终端2 - 启动前端
cd frontend
npm run dev
```

### 方式2：使用根目录脚本

```bash
# 启动后端
npm run dev:backend

# 启动前端（新终端）
npm run dev:frontend
```

## 访问应用

- 前端：http://localhost:5173
- 后端API：http://localhost:3001

## 测试API

```bash
# 测试后端健康检查
curl http://localhost:3001/api/health

# 获取所有题目
curl http://localhost:3001/api/questions
```

## 数据库

- 数据库文件位置：`backend/data/learning.db`
- 首次启动时会自动创建数据库并插入15道题目
- 如需重置数据库，删除该文件后重启后端即可

## 常见问题

### 1. 端口被占用

如果3001或5173端口被占用，可以修改：
- 后端：修改 `backend/.env` 中的 `PORT`
- 前端：修改 `frontend/vite.config.ts` 中的 `server.port`

### 2. 数据库连接失败

确保 `backend/data/` 目录存在：
```bash
mkdir -p backend/data
```

### 3. CORS错误

确保前端的API地址正确（`frontend/src/services/api.ts` 中的 `API_BASE_URL`）
