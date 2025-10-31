#!/bin/bash

# 七年级代数AI学习工具启动脚本

echo "🎓 七年级代数AI学习工具"
echo "======================================"

# 检查并安装依赖
if [ ! -d "backend/node_modules" ]; then
    echo "📦 安装后端依赖..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 安装前端依赖..."
    cd frontend && npm install && cd ..
fi

# 创建数据库目录
mkdir -p backend/data

echo ""
echo "✅ 准备完成！"
echo ""
echo "请在两个终端中分别运行："
echo "  终端1 (后端): cd backend && npm run dev"
echo "  终端2 (前端): cd frontend && npm run dev"
echo ""
echo "或者使用以下命令："
echo "  npm run dev:backend  # 启动后端（端口3001）"
echo "  npm run dev:frontend # 启动前端（端口5173）"
echo ""
