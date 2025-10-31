#!/bin/bash

# 等待文件系统准备好
sleep 2

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║   🎓 七年级代数AI学习工具 - 自动启动中...                ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# 确保数据库目录存在
mkdir -p backend/data

# 启动后端
echo "📦 Starting backend server..."
cd backend
nohup npm run dev > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"
cd ..

# 等待后端启动
echo "⏳ Waiting for backend to initialize..."
sleep 8

# 启动前端
echo "🎨 Starting frontend development server..."
cd frontend
nohup npm run dev -- --host > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "   Frontend PID: $FRONTEND_PID"
cd ..

# 等待前端启动
sleep 5

echo ""
echo "✅ Application started successfully!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📱 Frontend App: http://localhost:5173"
echo "  🔧 Backend API:  http://localhost:3001"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 The app will open automatically in your browser"
echo "   If not, click the 'PORTS' tab below and open port 5173"
echo ""
echo "📊 View logs:"
echo "   Backend:  tail -f /tmp/backend.log"
echo "   Frontend: tail -f /tmp/frontend.log"
echo ""
echo "🔄 Restart manually:"
echo "   Run: ./start-app.sh"
echo ""
echo "🎉 Happy learning!"
echo ""
