#!/bin/bash

# Daoda Component 发布脚本
echo "🚀 开始发布 Daoda Component..."

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ 有未提交的更改，请先提交或暂存更改"
  exit 1
fi

# 运行测试
echo "🧪 运行测试..."
pnpm test
if [ $? -ne 0 ]; then
  echo "❌ 测试失败，发布中止"
  exit 1
fi

# 代码检查
echo "🔍 运行代码检查..."
pnpm lint
if [ $? -ne 0 ]; then
  echo "❌ 代码检查失败，发布中止"
  exit 1
fi

# 构建所有包
echo "📦 构建所有包..."
pnpm build
if [ $? -ne 0 ]; then
  echo "❌ 构建失败，发布中止"
  exit 1
fi

# 检查 npm 登录状态
echo "🔐 检查 npm 登录状态..."
npm whoami
if [ $? -ne 0 ]; then
  echo "❌ 请先登录 npm: npm login"
  exit 1
fi

# 发布到 npm
echo "📤 发布到 npm..."
npm publish

if [ $? -eq 0 ]; then
  echo "✅ 发布完成！"
  echo "📦 包名: @daoda-component/core"
  echo "🌐 查看: https://www.npmjs.com/package/@daoda-component/core"
else
  echo "❌ 发布失败"
  exit 1
fi 