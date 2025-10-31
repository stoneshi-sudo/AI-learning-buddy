# ⚡ 快速启动指南

## 🎯 三种运行方式

### 方式1：GitHub Codespaces（最简单，推荐）

1. **打开项目**
   - 访问：https://github.com/stoneshi-sudo/AI-learning-buddy
   - 切换到分支：`claude/junior-algebra-learning-tool-011CUeWszVdK8HGfdBg7ymYp`

2. **启动Codespace**
   - 点击绿色按钮 `Code`
   - 选择 `Codespaces` 标签
   - 点击 `Create codespace on branch`
   - 等待1-2分钟环境准备完成

3. **安装依赖**
   ```bash
   cd backend && npm install && cd ..
   cd frontend && npm install && cd ..
   ```

4. **启动服务**

   打开两个终端：

   **终端1（后端）：**
   ```bash
   cd backend
   npm run dev
   ```

   **终端2（前端）：**
   ```bash
   cd frontend
   npm run dev
   ```

5. **访问应用**
   - Codespaces会自动弹出端口转发提示
   - 点击 `PORTS` 标签
   - 点击端口 `5173` 的地球图标访问应用

### 方式2：Docker一键启动（最快，需要Docker）

1. **克隆仓库**
   ```bash
   git clone https://github.com/stoneshi-sudo/AI-learning-buddy.git
   cd AI-learning-buddy
   git checkout claude/junior-algebra-learning-tool-011CUeWszVdK8HGfdBg7ymYp
   ```

2. **一键启动**
   ```bash
   docker-compose up -d
   ```

3. **访问应用**
   - 前端：http://localhost:8080
   - 后端API：http://localhost:3001

4. **停止服务**
   ```bash
   docker-compose down
   ```

### 方式3：本地开发（传统方式）

1. **克隆仓库**
   ```bash
   git clone https://github.com/stoneshi-sudo/AI-learning-buddy.git
   cd AI-learning-buddy
   git checkout claude/junior-algebra-learning-tool-011CUeWszVdK8HGfdBg7ymYp
   ```

2. **安装依赖**
   ```bash
   # 后端
   cd backend
   npm install

   # 前端
   cd ../frontend
   npm install
   ```

3. **启动服务**

   **终端1（后端）：**
   ```bash
   cd backend
   npm run dev
   ```

   **终端2（前端）：**
   ```bash
   cd frontend
   npm run dev
   ```

4. **访问应用**
   - 前端：http://localhost:5173
   - 后端API：http://localhost:3001

## 🔍 验证安装

### 测试后端API

```bash
# 健康检查
curl http://localhost:3001/api/health

# 应该返回：{"status":"ok","message":"AI Learning Buddy API is running"}

# 获取题目列表
curl http://localhost:3001/api/questions

# 应该返回15道题目的JSON数组
```

### 测试前端

1. 打开浏览器访问前端地址
2. 应该看到标题：🎓 七年级代数AI学习工具
3. 左侧有三个导航：开始练习、学习看板、错题本
4. 点击"开始测试"按钮
5. 应该显示"七年级代数测试"页面

## ❓ 常见问题

### Q1: GitHub Codespaces端口访问失败

**A:**
- 检查 `PORTS` 标签，确保端口可见性设置为 `Public`
- 重启前端开发服务器：`Ctrl+C` 然后重新运行 `npm run dev`

### Q2: Docker启动失败

**A:**
```bash
# 查看日志
docker-compose logs

# 重新构建
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Q3: npm install失败

**A:**
```bash
# 清理缓存
npm cache clean --force

# 删除node_modules
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### Q4: 前端无法连接后端

**A:**
- 检查后端是否正在运行：`curl http://localhost:3001/api/health`
- 检查前端API配置：`frontend/src/services/api.ts`
- 确保CORS已启用（后端默认已配置）

### Q5: 数据库错误

**A:**
```bash
# 删除数据库文件（会丢失所有数据）
rm backend/data/learning.db

# 重启后端，数据库会自动重建
cd backend
npm run dev
```

## 📊 GitHub Actions

每次推送代码到GitHub时，会自动运行：

1. ✅ 后端TypeScript类型检查
2. ✅ 前端构建测试
3. ✅ 集成测试和API健康检查

查看状态：https://github.com/stoneshi-sudo/AI-learning-buddy/actions

## 🚀 生产部署

详细的生产环境部署指南请查看：
- [GITHUB_SETUP.md](./GITHUB_SETUP.md) - GitHub环境详细配置
- [DEPLOY.md](./DEPLOY.md) - 云平台部署指南

## 📚 更多文档

- [README.md](./README.md) - 完整项目文档
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - 功能清单和技术架构
- [GITHUB_SETUP.md](./GITHUB_SETUP.md) - GitHub环境设置
- [DEPLOY.md](./DEPLOY.md) - 部署指南

## 🎮 开始使用

启动成功后：

1. 点击"开始练习" → "开始测试"
2. 回答15道代数题
3. 每题完成后会有2-4道变式练习
4. 完成变式后查看反思分析
5. 在"学习看板"查看数据统计
6. 在"错题本"复习错题

**祝学习愉快！** 🎉

---

**当前分支**：`claude/junior-algebra-learning-tool-011CUeWszVdK8HGfdBg7ymYp`

**仓库地址**：https://github.com/stoneshi-sudo/AI-learning-buddy

**Issues报告**：https://github.com/stoneshi-sudo/AI-learning-buddy/issues
