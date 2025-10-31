#!/bin/bash

cd /home/user/AI-learning-buddy

echo "Adding files to git..."
git add -A

echo "Committing changes..."
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

echo "Done!"
