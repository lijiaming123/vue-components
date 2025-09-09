# Daoda Component 目录指南

## 📁 根目录文件说明

### 📋 配置文件

- **`package.json`** - 项目主配置文件
  - 定义项目依赖、脚本、元数据
  - 配置 pnpm workspace 和 Lerna
  - 包含发布和构建脚本

- **`pnpm-workspace.yaml`** - pnpm 工作空间配置
  - 定义 monorepo 结构
  - 管理多个包的依赖关系

- **`lerna.json`** - Lerna 配置
  - 多包版本管理
  - 发布流程配置

- **`tsconfig.json`** - TypeScript 配置
  - 编译选项设置
  - 路径映射配置

- **`vite.config.ts`** - Vite 构建配置
  - 构建工具配置
  - 插件和优化设置

- **`.eslintrc.cjs`** - ESLint 配置
  - 代码规范规则
  - 代码质量检查

- **`jest.config.js`** - Jest 测试配置
  - 测试框架设置
  - 测试环境配置

### 📚 文档文件

- **`README.md`** - 项目主要说明文档
- **`RELEASE_SUMMARY.md`** - 版本发布总结
- **`PUBLISH_GUIDE.md`** - 发布指南文档
- **`PROJECT_STRUCTURE.md`** - 项目结构说明（新增）
- **`DIRECTORY_GUIDE.md`** - 目录指南（本文件）

### 🔒 版本控制

- **`.git/`** - Git 版本控制目录
- **`.gitignore`** - Git 忽略文件配置

### 📦 依赖管理

- **`pnpm-lock.yaml`** - pnpm 锁定文件
  - 确保依赖版本一致性
  - 提供可重现的构建环境

- **`node_modules/`** - 项目依赖包目录
  - 包含所有安装的依赖包
  - 由 pnpm 管理

### 🏗️ 构建输出

- **`dist/`** - 构建输出目录
  - 包含主项目的构建产物
  - 各包的构建产物在各自的 dist/ 目录

## 📁 主要目录说明

### 📦 packages/ - 核心包目录

包含所有可独立发布和维护的包

- **`config/`** - 配置包
- **`utils/`** - 工具包
- **`components/`** - 组件包目录
- **`demo/`** - 主演示包

### 🎯 examples/ - 示例目录

包含各种使用示例

- **`usage-demo/`** - 使用示例
- **`standalone-demo/`** - 独立示例

### 🛠️ scripts/ - 脚本目录

包含自动化脚本

- **`publish.sh`** - 发布脚本

### 📁 其他目录

- **`src/`** - 主源码目录
- **`.ai/`** - AI 辅助目录

## 🔧 开发工作流

### 1. 项目初始化

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm run build
```

### 2. 开发新功能

```bash
# 启动开发服务器
pnpm dev

# 运行测试
pnpm test

# 代码检查
pnpm run lint
```

### 3. 发布新版本

```bash
# 发布补丁版本
./scripts/publish.sh patch

# 发布小版本
./scripts/publish.sh minor

# 发布大版本
./scripts/publish.sh major
```

## 📋 目录维护

### 定期检查

- 清理无用的文件和目录
- 更新文档和说明
- 检查依赖版本
- 验证构建流程

### 新增目录

1. 创建目录
2. 添加 README.md 说明
3. 更新相关文档
4. 提交代码变更

### 删除目录

1. 确认目录不再需要
2. 更新相关引用
3. 删除目录
4. 更新文档

## ⚠️ 注意事项

- 不要直接修改 `node_modules/` 目录
- 不要提交 `dist/` 目录到版本控制
- 定期更新依赖版本
- 保持文档与代码同步
- 遵循项目的命名和结构规范
