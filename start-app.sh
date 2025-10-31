#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║   🎓 七年级代数AI学习工具 - 启动中...                    ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# 创建数据库目录
mkdir -p backend/data

echo "📦 Starting backend server..."
cd backend
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

echo "⏳ Waiting for backend to start (5 seconds)..."
sleep 5

echo "🎨 Starting frontend development server..."
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

sleep 3

echo ""
echo "✅ Application started successfully!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📱 Frontend: http://localhost:5173"
echo "  🔧 Backend API: http://localhost:3001"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Tips:"
echo "  • GitHub Codespaces will open the frontend automatically"
echo "  • Click on PORTS tab to see port forwarding"
echo "  • To stop: Ctrl+C or run: kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "📊 View logs:"
echo "  • Backend: tail -f backend.log"
echo "  • Frontend: tail -f frontend.log"
echo ""
echo "🎉 Enjoy learning algebra!"
echo ""

# Save PIDs for cleanup
echo $BACKEND_PID > .backend.pid
echo $FRONTEND_PID > .frontend.pid

# Wait for user interrupt
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; rm -f .backend.pid .frontend.pid; echo '✅ Stopped'; exit 0" INT TERM

# Keep script running
wait
