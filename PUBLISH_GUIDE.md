# Daoda Component 发布指南

参考 Element Plus 的方案，本文档详细说明如何将 Daoda Component 发布到 npm 上供其他项目使用。

## 📋 发布前准备

### 1. 注册 npm 账号

```bash
# 如果没有 npm 账号，先注册
npm adduser
```

### 2. 登录 npm

```bash
npm login
```

### 3. 检查包名可用性

```bash
npm view @daoda-component/core
# 如果返回 404，说明包名可用
```

## 🏗️ 项目结构说明

```
daoda-component/
├── package.json              # 主包配置
├── src/
│   └── index.ts              # 主入口文件
├── packages/
│   ├── components/
│   │   ├── button/
│   │   │   ├── package.json  # Button 组件包配置
│   │   │   ├── vite.config.ts
│   │   │   └── src/
│   │   └── select/
│   │       ├── package.json  # Select 组件包配置
│   │       ├── vite.config.ts
│   │       └── src/
│   ├── config/
│   │   ├── package.json      # 配置包配置
│   │   ├── vite.config.ts
│   │   └── src/
│   └── utils/
│       ├── package.json      # 工具包配置
│       ├── vite.config.ts
│       └── src/
└── dist/                     # 构建输出目录
```

## 🚀 发布方式

### 方式一：发布主包（推荐）

发布主包 `@daoda-component/core`，用户可以通过以下方式使用：

```bash
# 构建所有包
pnpm build

# 发布主包
npm publish
```

用户使用方式：

```typescript
// 完整引入
import { Button, Select, DaodaConfigProvider } from "@daoda-component/core";

// 按需引入
import { Button } from "@daoda-component/core";
```

### 方式二：发布独立包

每个子包都可以独立发布：

```bash
# 发布 Button 组件
cd packages/components/button
npm publish

# 发布 Select 组件
cd packages/components/select
npm publish

# 发布配置包
cd packages/config
npm publish

# 发布工具包
cd packages/utils
npm publish
```

用户使用方式：

```typescript
// 按需引入各个包
import { Button } from "@daoda-component/button";
import { Select } from "@daoda-component/select";
import { DaodaConfigProvider } from "@daoda-component/config";
import { throttle } from "@daoda-component/utils";
```

## 📦 构建配置说明

### 1. 主包配置 (package.json)

```json
{
  "name": "@daoda-component/core",
  "main": "dist/index.js", // CommonJS 入口
  "module": "dist/index.es.js", // ES Module 入口
  "types": "dist/index.d.ts", // TypeScript 类型定义
  "files": [
    // 发布时包含的文件
    "dist",
    "packages/components/*/src",
    "packages/config/src",
    "packages/utils/src",
    "README.md"
  ]
}
```

### 2. 子包配置示例

```json
{
  "name": "@daoda-component/button",
  "main": "dist/index.js",
  "module": "dist/index.es.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "src"],
  "peerDependencies": {
    // 外部依赖
    "vue": "^3.0.0",
    "element-plus": "^2.0.0"
  }
}
```

### 3. Vite 构建配置

```typescript
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "DaodaButton",
      fileName: "index",
      formats: ["es", "cjs"], // 同时输出 ES Module 和 CommonJS
    },
    rollupOptions: {
      external: ["vue", "element-plus"], // 外部依赖
      output: {
        globals: {
          vue: "Vue",
          "element-plus": "ElementPlus",
        },
      },
    },
  },
});
```

## 🔧 发布脚本

### 1. 自动化发布脚本

```bash
#!/bin/bash
# scripts/publish.sh

echo "🚀 开始发布 Daoda Component..."

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ 有未提交的更改，请先提交或暂存更改"
  exit 1
fi

# 运行测试
echo "🧪 运行测试..."
pnpm test

# 代码检查
echo "🔍 运行代码检查..."
pnpm lint

# 构建所有包
echo "📦 构建所有包..."
pnpm build

# 发布
echo "📤 发布到 npm..."
npm publish

echo "✅ 发布完成！"
```

### 2. 使用发布脚本

```bash
chmod +x scripts/publish.sh
./scripts/publish.sh
```

## 📝 版本管理

### 1. 版本号规则

- `major.minor.patch`
- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

### 2. 更新版本号

```bash
# 使用 lerna 更新版本号
lerna version patch  # 修订版本
lerna version minor  # 次版本
lerna version major  # 主版本

# 或者手动更新 package.json 中的 version 字段
```

## 🌐 发布到其他平台

### 1. 发布到私有 npm 仓库

```bash
# 设置私有仓库地址
npm config set registry https://your-private-registry.com

# 发布
npm publish
```

### 2. 发布到 GitHub Packages

```bash
# 设置 GitHub Packages 仓库
npm config set @your-org:registry https://npm.pkg.github.com

# 发布
npm publish
```

## 📚 用户使用指南

### 1. 安装

```bash
# 安装主包
npm install @daoda-component/core

# 或者安装独立包
npm install @daoda-component/button @daoda-component/select
```

### 2. 使用示例

```vue
<template>
  <DaodaConfigProvider :theme="theme">
    <Button type="primary" @click="handleClick">主要按钮</Button>
    <Select v-model="value" :options="options" />
  </DaodaConfigProvider>
</template>

<script setup lang="ts">
import { Button, Select, DaodaConfigProvider } from "@daoda-component/core";

const theme = {
  primaryColor: "#1677ff",
  borderRadius: "6px",
};

const value = ref("a");
const options = [
  { label: "选项A", value: "a" },
  { label: "选项B", value: "b" },
];
</script>
```

## 🚨 常见问题

### Q: 发布失败怎么办？

A: 检查以下几点：

- npm 登录状态 (`npm whoami`)
- 包名是否已被占用
- 版本号是否重复
- 网络连接是否正常

### Q: 如何回滚版本？

A: 使用 npm 的 unpublish 功能：

```bash
npm unpublish @daoda-component/core@1.0.0
```

### Q: 如何更新已发布的包？

A: 更新版本号后重新发布：

```bash
# 更新版本号
lerna version patch

# 重新发布
npm publish
```

### Q: 如何处理依赖关系？

A: 使用 `peerDependencies` 声明外部依赖：

```json
{
  "peerDependencies": {
    "vue": "^3.0.0",
    "element-plus": "^2.0.0"
  }
}
```

## 📞 获取帮助

如果在发布过程中遇到问题，可以：

1. 查看 npm 官方文档
2. 检查项目 Issues
3. 联系项目维护者

---

**注意**: 发布前请确保所有代码都已提交到版本控制系统，并且有完整的测试覆盖。
