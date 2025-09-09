# Daoda Component 项目结构说明

## 📁 项目根目录

### 核心配置文件

- **`package.json`** - 项目主配置文件，定义依赖、脚本、元数据等
- **`pnpm-workspace.yaml`** - pnpm 工作空间配置，管理多包项目
- **`lerna.json`** - Lerna 配置，用于多包版本管理和发布
- **`tsconfig.json`** - TypeScript 编译配置
- **`vite.config.ts`** - Vite 构建工具配置
- **`.eslintrc.cjs`** - ESLint 代码规范配置
- **`jest.config.js`** - Jest 测试框架配置

### 文档文件

- **`README.md`** - 项目主要说明文档
- **`RELEASE_SUMMARY.md`** - 版本发布总结
- **`PUBLISH_GUIDE.md`** - 发布指南文档

### 依赖管理

- **`pnpm-lock.yaml`** - pnpm 锁定文件，确保依赖版本一致性
- **`node_modules/`** - 项目依赖包目录
- **`dist/`** - 构建输出目录

### 版本控制

- **`.git/`** - Git 版本控制目录
- **`.gitignore`** - Git 忽略文件配置

---

## 📦 packages/ - 核心包目录

### packages/config/ - 配置包

**作用**: 提供全局配置管理功能

- **`src/`** - 源码目录
  - 包含主题配置、全局设置等
- **`dist/`** - 构建输出目录
- **`package.json`** - 包配置文件
- **`vite.config.ts`** - 构建配置
- **`tsconfig.json`** - TypeScript 配置

### packages/utils/ - 工具包

**作用**: 提供通用工具函数和辅助方法

- **`src/`** - 源码目录
  - 包含防抖、节流、格式化等工具函数
- **`dist/`** - 构建输出目录
- **`package.json`** - 包配置文件
- **`vite.config.ts`** - 构建配置
- **`tsconfig.json`** - TypeScript 配置

### packages/components/ - 组件包目录

#### packages/components/button/ - 按钮组件

**作用**: 封装 Element Plus 按钮组件，提供增强功能

- **`src/`** - 源码目录
  - `Button.vue` - 按钮组件主文件
  - `index.ts` - 导出文件
- **`dist/`** - 构建输出目录
- **`button.spec.ts`** - 单元测试文件
- **`package.json`** - 包配置文件
- **`vite.config.ts`** - 构建配置

#### packages/components/select/ - 选择器组件

**作用**: 封装 Element Plus 选择器组件，支持国家选择器功能

- **`src/`** - 源码目录
  - `Select.vue` - 选择器组件主文件
  - `countries.ts` - 全球国家和地区数据
  - `index.ts` - 导出文件
- **`dist/`** - 构建输出目录
- **`COUNTRY_SELECTOR.md`** - 国家选择器使用文档
- **`package.json`** - 包配置文件
- **`vite.config.ts`** - 构建配置

### packages/demo/ - 主演示包

**作用**: 提供组件库的主要演示和测试环境

- **`src/`** - 源码目录
  - `App.vue` - 主应用组件
  - `main.ts` - 应用入口文件
- **`index.html`** - HTML 入口文件
- **`package.json`** - 包配置文件
- **`vite.config.ts`** - 构建配置

---

## 🎯 examples/ - 示例目录

### examples/usage-demo/ - 使用示例

**作用**: 展示如何在其他项目中使用组件库

- **`src/`** - 源码目录
  - `App.vue` - 示例应用，包含国家选择器演示
  - `main.ts` - 应用入口
- **`index.html`** - HTML 入口文件
- **`package.json`** - 包配置文件
- **`vite.config.ts`** - 构建配置

### examples/standalone-demo/ - 独立示例

**作用**: 提供独立的组件演示，不依赖主项目

- **`src/`** - 源码目录
  - `App.vue` - 独立演示应用
  - `main.ts` - 应用入口
- **`index.html`** - HTML 入口文件
- **`package.json`** - 包配置文件
- **`vite.config.ts`** - 构建配置

---

## 🛠️ scripts/ - 脚本目录

### scripts/publish.sh - 发布脚本

**作用**: 自动化发布流程脚本

- 包含版本更新、构建、发布等自动化操作

---

## 📁 其他目录

### src/ - 主源码目录

**作用**: 主项目的源码文件

- 包含核心逻辑和入口文件

### .ai/ - AI 辅助目录

**作用**: 存储 AI 生成或辅助的文件

- 可能包含 AI 生成的代码、文档等

---

## 🚀 项目特点

1. **Monorepo 架构**: 使用 pnpm workspace + Lerna 管理多包项目
2. **TypeScript 支持**: 全项目 TypeScript 开发
3. **组件化设计**: 每个组件独立打包和发布
4. **完整测试**: 包含单元测试和集成测试
5. **文档完善**: 每个功能都有详细的使用文档
6. **现代化工具链**: 使用 Vite、ESLint、Prettier 等现代工具

## 📋 开发流程

1. **开发**: 在 `packages/` 下开发组件
2. **测试**: 在 `examples/` 下测试组件
3. **构建**: 使用 `pnpm run build` 构建所有包
4. **发布**: 使用 `scripts/publish.sh` 发布包
5. **文档**: 更新相应的 README 和文档文件
