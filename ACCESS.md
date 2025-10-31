# 🚀 快速访问指南

## 📍 GitHub仓库地址

**仓库：** https://github.com/stoneshi-sudo/AI-learning-buddy

**当前分支：** `claude/junior-algebra-learning-tool-011CUeWszVdK8HGfdBg7ymYp`

**直接访问链接：**
```
https://github.com/stoneshi-sudo/AI-learning-buddy/tree/claude/junior-algebra-learning-tool-011CUeWszVdK8HGfdBg7ymYp
```

## ⚡ 立即开始（3种方式）

### 🌐 方式1：GitHub Codespaces（无需本地安装）

**最简单的方式，完全在浏览器中运行**

1. **打开Codespace**
   - 访问：https://github.com/stoneshi-sudo/AI-learning-buddy
   - 点击绿色的 `Code` 按钮
   - 选择 `Codespaces` 标签
   - 点击 `Create codespace on claude/junior-algebra-learning-tool-011CUeWszVdK8HGfdBg7ymYp`
   - 等待环境启动（约1-2分钟）

2. **安装依赖**（在Codespace终端中）
   ```bash
   # 后端
   cd backend
   npm install

   # 前端
   cd ../frontend
   npm install
   ```

3. **启动服务**

   **打开终端1（后端）：**
   ```bash
   cd backend
   npm run dev
   ```
   等待看到：`Server running on http://localhost:3001`

   **打开终端2（前端）：**
   - 点击终端右上角的 `+` 创建新终端
   ```bash
   cd frontend
   npm run dev
   ```
   等待看到：`Local: http://localhost:5173`

4. **访问应用**
   - Codespaces会自动弹出提示框
   - 或点击底部的 `PORTS` 标签
   - 找到端口 `5173`，点击地球图标🌐
   - 开始使用！

---

### 🐳 方式2：Docker（最快速度）

**适合有Docker的用户，一条命令启动**

```bash
# 1. 克隆仓库
git clone https://github.com/stoneshi-sudo/AI-learning-buddy.git
cd AI-learning-buddy

# 2. 切换分支
git checkout claude/junior-algebra-learning-tool-011CUeWszVdK8HGfdBg7ymYp

# 3. 一键启动
docker-compose up -d

# 4. 访问应用
# 前端：http://localhost:8080
# 后端API：http://localhost:3001

# 停止服务
docker-compose down
```

---

### 💻 方式3：本地开发（传统方式）

**需要Node.js >= 16**

```bash
# 1. 克隆仓库
git clone https://github.com/stoneshi-sudo/AI-learning-buddy.git
cd AI-learning-buddy

# 2. 切换分支
git checkout claude/junior-algebra-learning-tool-011CUeWszVdK8HGfdBg7ymYp

# 3. 安装后端依赖
cd backend
npm install

# 4. 安装前端依赖
cd ../frontend
npm install

# 5. 启动后端（终端1）
cd backend
npm run dev
# 看到：Server running on http://localhost:3001

# 6. 启动前端（终端2，新窗口）
cd frontend
npm run dev
# 看到：Local: http://localhost:5173

# 7. 访问应用
# 打开浏览器：http://localhost:5173
```

## ✅ 验证安装

### 1. 测试后端API

```bash
# 健康检查
curl http://localhost:3001/api/health
# 应该返回：{"status":"ok","message":"AI Learning Buddy API is running"}

# 获取题目
curl http://localhost:3001/api/questions
# 应该返回15道题目的JSON数组
```

### 2. 测试前端

打开浏览器，你应该看到：
- ✅ 顶部蓝色标题栏："🎓 七年级代数AI学习工具"
- ✅ 左侧导航栏：开始练习、学习看板、错题本
- ✅ 点击"开始测试"按钮，能看到测试页面

### 3. 完整功能测试

1. **点击"开始测试"** → 应该显示"开始测试"按钮
2. **点击"开始测试"按钮** → 加载15道题目
3. **答题** → 输入答案，点击提交
4. **查看结果** → 显示正误和解析
5. **变式练习** → 自动生成2-4道变式
6. **反思分析** → 完成变式后显示反思报告
7. **学习看板** → 查看雷达图、柱状图、统计数据
8. **错题本** → 查看错题列表

## 📚 文档索引

| 文档 | 说明 | 链接 |
|------|------|------|
| **README.md** | 完整项目文档 | [查看](./README.md) |
| **QUICKSTART.md** | 详细启动指南 | [查看](./QUICKSTART.md) |
| **GITHUB_SETUP.md** | GitHub环境配置 | [查看](./GITHUB_SETUP.md) |
| **DEPLOY.md** | 云平台部署 | [查看](./DEPLOY.md) |
| **PROJECT_SUMMARY.md** | 功能清单 | [查看](./PROJECT_SUMMARY.md) |

## 🔧 故障排除

### 问题：npm install失败

```bash
# 清理缓存后重试
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 问题：端口被占用

```bash
# 查看端口占用
lsof -i :3001  # 后端
lsof -i :5173  # 前端

# 杀死进程
kill -9 <PID>
```

### 问题：Codespaces端口无法访问

- 点击 `PORTS` 标签
- 右键点击端口 → `Port Visibility` → `Public`
- 重新点击地球图标访问

### 问题：Docker无法启动

```bash
# 查看日志
docker-compose logs

# 重新构建
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🎯 GitHub Actions

每次推送代码，自动运行：
- ✅ TypeScript类型检查
- ✅ 前端构建测试
- ✅ 后端API测试
- ✅ 集成测试

**查看测试状态：**
https://github.com/stoneshi-sudo/AI-learning-buddy/actions

## 📊 项目统计

- **前端组件**：5个主要组件
- **后端API**：20+ 个接口
- **数据库表**：6个表
- **代码文件**：50+ 文件
- **代码行数**：8000+ 行
- **文档页数**：5篇完整文档

## 💬 获取帮助

- **Issues**：https://github.com/stoneshi-sudo/AI-learning-buddy/issues
- **Pull Requests**：欢迎贡献代码
- **Discussions**：https://github.com/stoneshi-sudo/AI-learning-buddy/discussions

## 🎉 开始使用

选择上面任意一种方式启动项目，开始你的代数学习之旅！

**推荐顺序：**
1. 完成一次完整的15题测试
2. 查看学习看板的数据可视化
3. 在错题本中复习错题
4. 探索更多功能

---

**祝学习愉快！** 📚✨
