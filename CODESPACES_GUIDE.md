# 🚀 GitHub Codespaces 一键启动指南

## ⚡ 超级简单！仅需1步

### 点击按钮，自动启动！

1. **点击启动链接：**
   ```
   https://codespaces.new/stoneshi-sudo/AI-learning-buddy/tree/claude/junior-algebra-learning-tool-011CUeWszVdK8HGfdBg7ymYp
   ```

   或访问项目主页，点击绿色按钮：
   ```
   https://github.com/stoneshi-sudo/AI-learning-buddy
   ```

2. **等待环境准备**（约1-2分钟）
   - 自动安装所有依赖
   - 自动启动后端服务器
   - 自动启动前端应用

3. **应用自动打开！** 🎉

**就这么简单！无需任何命令！**

### ✨ 完全自动化

打开 Codespace 后，系统会自动：
- ✅ 安装所有依赖（npm install）
- ✅ 创建数据库目录
- ✅ 启动后端API（端口3001）
- ✅ 启动前端应用（端口5173）
- ✅ 自动在浏览器中打开应用

**您什么都不用做，只需等待！**

---

## 📱 访问应用

### 方式1：自动打开（推荐）

Codespaces 会自动弹出提示框，点击 `Open in Browser` 即可。

### 方式2：手动访问

1. 点击底部的 `PORTS` 标签
2. 找到端口 `5173`（Frontend App）
3. 点击地球图标 🌐 或复制链接
4. 在新标签页中打开

---

## 🎯 开始使用

应用打开后，你会看到：

```
🎓 七年级代数AI学习工具
```

**功能导航：**
- 📝 **开始练习** - 15道代数测试题
- 📊 **学习看板** - 数据可视化分析
- 📕 **错题本** - 错题管理和复习

**完整学习流程：**
1. 点击"开始测试"
2. 回答15道题目
3. 每题完成后做2-4道变式练习
4. 查看反思分析报告
5. 在看板查看学习数据
6. 在错题本复习错题

---

## 🛠️ 其他命令

### 停止应用

在启动应用的终端按 `Ctrl + C`

或者运行：
```bash
kill $(cat .backend.pid) $(cat .frontend.pid)
```

### 查看日志

```bash
# 后端日志
tail -f backend.log

# 前端日志
tail -f frontend.log
```

### 重新安装依赖

```bash
npm run install:all
```

### 手动启动（分开运行）

如果需要在不同终端查看日志：

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

---

## 🐛 故障排除

### 问题：端口无法访问

**解决方案：**
1. 点击 `PORTS` 标签
2. 右键点击端口 5173
3. 选择 `Port Visibility` → `Public`
4. 重新点击地球图标

### 问题：后端启动失败

**解决方案：**
```bash
# 查看后端日志
cat backend.log

# 重启后端
cd backend
npm run dev
```

### 问题：数据库错误

**解决方案：**
```bash
# 删除数据库重建
rm backend/data/learning.db

# 重启后端
cd backend
npm run dev
```

### 问题：npm install 失败

**解决方案：**
```bash
# 清理缓存
npm cache clean --force

# 重新安装
cd backend && rm -rf node_modules && npm install
cd ../frontend && rm -rf node_modules && npm install
```

---

## 📊 验证应用是否正常

### 测试后端

```bash
curl http://localhost:3001/api/health
# 应该返回：{"status":"ok","message":"AI Learning Buddy API is running"}

curl http://localhost:3001/api/questions
# 应该返回15道题目的JSON
```

### 测试前端

在浏览器中：
1. ✅ 看到蓝色顶栏："🎓 七年级代数AI学习工具"
2. ✅ 左侧有三个导航项
3. ✅ 点击"开始测试"能加载题目
4. ✅ 能正常答题和提交

---

## 💡 提示

- **自动保存**：Codespaces 会自动保存你的工作
- **持久化数据**：数据库文件保存在 `backend/data/` 目录
- **多次使用**：Codespace 可以重复使用，数据会保留
- **停止后重启**：再次打开 Codespace 时运行 `./start-app.sh` 即可

---

## 🎓 功能特色

- ✅ **15道代数题**：初级、中级、高级各5题
- ✅ **变式练习**：每题2-4道变式巩固知识
- ✅ **智能反思**：自动分析知识点和错误类型
- ✅ **错题本**：自动收录错题，支持复习
- ✅ **数据可视化**：雷达图、柱状图、统计分析
- ✅ **实时计时**：记录每题答题时间
- ✅ **学习追踪**：所有数据持久化保存

---

## 📚 更多帮助

- **完整文档**：[README.md](./README.md)
- **快速启动**：[QUICKSTART.md](./QUICKSTART.md)
- **部署指南**：[DEPLOY.md](./DEPLOY.md)
- **项目架构**：[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

---

## 🎉 开始学习

现在就运行 `./start-app.sh` 开始你的代数学习之旅吧！

**有问题？** 在 [GitHub Issues](https://github.com/stoneshi-sudo/AI-learning-buddy/issues) 提问

**祝学习愉快！** 📚✨
