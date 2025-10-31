# GitHub环境设置和运行指南

## 📋 GitHub Actions工作流

项目已配置CI/CD工作流，代码推送到GitHub后会自动：

1. ✅ 测试后端TypeScript编译
2. ✅ 构建前端应用
3. ✅ 运行集成测试
4. ✅ 健康检查API

查看工作流状态：
- 访问：https://github.com/stoneshi-sudo/AI-learning-buddy/actions

## 🚀 在GitHub Codespaces中运行

### 方式1：使用GitHub Codespaces（推荐）

1. **打开Codespaces**
   - 在GitHub仓库页面点击 `Code` → `Codespaces` → `Create codespace on branch`
   - 等待环境启动（约1-2分钟）

2. **安装依赖**
   ```bash
   # 安装后端依赖
   cd backend
   npm install

   # 安装前端依赖
   cd ../frontend
   npm install
   ```

3. **启动服务**

   **终端1 - 启动后端：**
   ```bash
   cd backend
   npm run dev
   ```

   **终端2 - 启动前端：**
   ```bash
   cd frontend
   npm run dev
   ```

4. **访问应用**
   - Codespaces会自动转发端口
   - 点击 `PORTS` 标签中的端口5173链接访问前端
   - 后端API在端口3001

### 方式2：本地克隆运行

1. **克隆仓库**
   ```bash
   git clone https://github.com/stoneshi-sudo/AI-learning-buddy.git
   cd AI-learning-buddy
   ```

2. **切换到功能分支**
   ```bash
   git checkout claude/junior-algebra-learning-tool-011CUeWszVdK8HGfdBg7ymYp
   ```

3. **安装依赖并启动**（同上）

## 🌐 部署到云平台

### 部署到Vercel（前端）+ Railway（后端）

#### 前端部署到Vercel

1. **登录Vercel**
   - 访问 https://vercel.com
   - 使用GitHub账号登录

2. **导入项目**
   - 点击 `New Project`
   - 选择 `AI-learning-buddy` 仓库
   - Root Directory: `frontend`
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **配置环境变量**
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```

4. **部署**
   - 点击 `Deploy`
   - 等待构建完成

#### 后端部署到Railway

1. **登录Railway**
   - 访问 https://railway.app
   - 使用GitHub账号登录

2. **创建新项目**
   - 点击 `New Project`
   - 选择 `Deploy from GitHub repo`
   - 选择 `AI-learning-buddy` 仓库

3. **配置服务**
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

4. **添加环境变量**
   ```
   PORT=3001
   DATABASE_PATH=/app/data/learning.db
   NODE_ENV=production
   ```

5. **配置持久化存储**
   - 在Railway中添加Volume
   - Mount Path: `/app/data`

6. **部署**
   - Railway会自动部署
   - 复制生成的URL，更新前端的`VITE_API_URL`

### 部署到Render（全栈）

1. **后端部署**
   - 访问 https://render.com
   - 创建 `Web Service`
   - 连接GitHub仓库
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - 添加环境变量（同上）

2. **前端部署**
   - 创建 `Static Site`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - 添加环境变量`VITE_API_URL`

## 📦 Docker部署

### 创建Docker镜像

1. **后端Dockerfile**
   ```dockerfile
   # 已在项目中创建
   docker build -t ai-learning-backend ./backend
   docker run -p 3001:3001 -v $(pwd)/data:/app/data ai-learning-backend
   ```

2. **前端Dockerfile**
   ```dockerfile
   # 已在项目中创建
   docker build -t ai-learning-frontend ./frontend
   docker run -p 5173:5173 ai-learning-frontend
   ```

3. **使用Docker Compose**
   ```bash
   docker-compose up -d
   ```

## 🔍 测试部署

### 测试后端API

```bash
# 健康检查
curl https://your-backend-url.com/api/health

# 获取题目列表
curl https://your-backend-url.com/api/questions

# 创建练习会话
curl -X POST https://your-backend-url.com/api/sessions \
  -H "Content-Type: application/json" \
  -d '{"user_id": "test_user"}'
```

### 测试前端

1. 访问前端URL
2. 点击"开始测试"
3. 验证能否加载题目
4. 提交答案测试
5. 检查Dashboard是否正常显示

## 📊 监控和日志

### 查看GitHub Actions日志

1. 访问仓库的 `Actions` 标签
2. 选择最近的工作流运行
3. 查看各个步骤的日志输出

### 查看应用日志

- **Vercel**: Dashboard → Project → Logs
- **Railway**: Project → Service → Logs
- **Render**: Service → Logs

## 🐛 故障排除

### 问题1：前端无法连接后端

**解决方案：**
1. 检查`frontend/src/services/api.ts`中的`API_BASE_URL`
2. 确保后端URL正确
3. 检查CORS配置

### 问题2：数据库文件丢失

**解决方案：**
1. 确保配置了持久化存储（Volume）
2. 检查`DATABASE_PATH`环境变量
3. 重启服务会自动重建数据库

### 问题3：GitHub Actions失败

**解决方案：**
1. 查看Actions日志
2. 检查Node.js版本兼容性
3. 确保package.json中的依赖正确

## 📞 支持

遇到问题？
1. 查看项目的 [Issues](https://github.com/stoneshi-sudo/AI-learning-buddy/issues)
2. 创建新Issue描述问题
3. 查看项目文档：README.md, DEPLOY.md

## 🎯 下一步

- [ ] 设置自动部署（推送到main分支自动部署）
- [ ] 配置环境变量管理
- [ ] 设置监控和告警
- [ ] 配置CDN加速
- [ ] 启用HTTPS
- [ ] 配置数据库备份

---

**当前状态**：✅ 代码已推送到GitHub

**分支**：`claude/junior-algebra-learning-tool-011CUeWszVdK8HGfdBg7ymYp`

**仓库**：https://github.com/stoneshi-sudo/AI-learning-buddy
