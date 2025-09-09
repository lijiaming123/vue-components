# examples/ 目录说明

## 🎯 概述

`examples/` 目录包含各种使用示例，展示如何在不同场景下使用 daoda-component 组件库。

## 📁 示例列表

### 🚀 usage-demo/ - 使用示例

**作用**: 展示如何在其他项目中使用组件库

- **文件结构**:
  - `src/App.vue` - 主应用组件，包含所有组件演示
  - `src/main.ts` - 应用入口文件
  - `index.html` - HTML 入口文件
  - `package.json` - 项目配置
  - `vite.config.ts` - 构建配置
- **功能演示**:
  - Button 组件各种用法
  - Select 组件基础用法
  - 国家选择器功能演示
  - 主题切换功能
  - 工具函数使用示例
- **访问方式**: `http://localhost:5173`

### 🎨 standalone-demo/ - 独立示例

**作用**: 提供独立的组件演示，不依赖主项目结构

- **文件结构**:
  - `src/App.vue` - 独立演示应用
  - `src/main.ts` - 应用入口文件
  - `index.html` - HTML 入口文件
  - `package.json` - 项目配置
  - `vite.config.ts` - 构建配置
- **特点**:
  - 独立运行，不依赖 monorepo 结构
  - 展示组件库的独立使用方式
  - 适合作为组件库的官方示例

## 🔧 开发指南

### 添加新示例

1. 在 `examples/` 下创建新目录
2. 复制现有示例的配置文件
3. 修改 `src/App.vue` 添加新功能演示
4. 更新 `package.json` 中的项目信息
5. 在根目录的 `package.json` 中添加启动脚本

### 示例开发规范

- **命名**: 使用 kebab-case 命名目录
- **结构**: 保持与现有示例一致的文件结构
- **文档**: 每个示例都要有 README 说明
- **测试**: 确保示例可以正常运行

## 📋 运行示例

### 启动所有示例

```bash
# 在项目根目录
pnpm dev
```

### 启动特定示例

```bash
# 启动 usage-demo
cd examples/usage-demo
npm run dev

# 启动 standalone-demo
cd examples/standalone-demo
npm run dev
```

## 🎯 示例内容

### Button 组件示例

- 基础按钮样式
- 不同尺寸和类型
- 节流功能演示
- 主题定制效果

### Select 组件示例

- 基础选择器用法
- 国家选择器功能
- 搜索和过滤
- 自定义选项

### 工具函数示例

- 防抖函数使用
- 节流函数使用
- 其他工具函数

## 📚 文档维护

每个示例都应该包含：

- 功能说明
- 使用方法
- 代码示例
- 注意事项

## 🔄 更新流程

1. **开发**: 在示例中添加新功能演示
2. **测试**: 确保示例正常运行
3. **文档**: 更新相关文档
4. **提交**: 提交代码变更
