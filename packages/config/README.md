# config/ 包说明

## 📦 概述

`config/` 包提供全局配置管理功能，为整个组件库提供统一的配置管理。

## 🎯 功能特性

- 主题配置管理
- 全局样式变量
- 组件默认配置
- 环境配置管理

## 📁 文件结构

```
config/
├── src/
│   ├── index.ts          # 主入口文件
│   ├── theme.ts          # 主题配置
│   └── constants.ts      # 常量定义
├── dist/                 # 构建输出目录
├── package.json          # 包配置
├── vite.config.ts        # 构建配置
├── tsconfig.json         # TypeScript 配置
└── README.md             # 包说明文档
```

## 🔧 使用方法

### 安装

```bash
pnpm add @daoda-component/config
```

### 基础使用

```typescript
import { createApp } from "vue";
import { DaodaConfigProvider } from "@daoda-component/config";

const app = createApp(App);
app.use(DaodaConfigProvider, {
  theme: {
    primaryColor: "#1677ff",
    borderRadius: "6px",
  },
});
```

### 主题配置

```typescript
import { useTheme } from "@daoda-component/config";

const { theme, setTheme } = useTheme();

// 设置主题
setTheme({
  primaryColor: "#ff6600",
  borderRadius: "20px",
});
```

## 📋 API 文档

### DaodaConfigProvider

全局配置提供者组件

#### Props

- `theme` - 主题配置对象
- `locale` - 语言配置
- `size` - 组件尺寸

#### 主题配置

```typescript
interface ThemeConfig {
  primaryColor: string; // 主色调
  borderRadius: string; // 圆角大小
  fontSize: string; // 字体大小
  spacing: string; // 间距
}
```

## 🎨 主题定制

### CSS 变量

组件库使用 CSS 变量实现主题定制：

```css
:root {
  --daoda-primary-color: #1677ff;
  --daoda-border-radius: 6px;
  --daoda-font-size: 16px;
  --daoda-spacing: 8px;
}
```

### 动态主题

支持运行时动态切换主题：

```typescript
// 切换主题
setTheme({
  primaryColor: "#ff6600",
  borderRadius: "20px",
});
```

## 🔄 版本历史

### v1.0.0

- 初始版本
- 基础主题配置
- CSS 变量支持

## 🛠️ 开发指南

### 添加新配置

1. 在 `src/` 目录下添加新的配置文件
2. 在 `index.ts` 中导出
3. 更新类型定义
4. 添加使用文档

### 测试

```bash
# 运行测试
npm test

# 构建包
npm run build
```

## 📚 相关文档

- [项目结构说明](../../PROJECT_STRUCTURE.md)
- [组件库使用指南](../../README.md)
