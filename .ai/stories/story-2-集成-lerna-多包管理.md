# Story: 集成 lerna 多包管理

## 目标

在已初始化的 pnpm workspace 基础上，集成 lerna，实现多包的统一版本管理与发布流程。

## 验收标准

- 安装并配置 lerna，生成 lerna.json
- 支持 lerna bootstrap、publish、version 等命令
- 能通过 lerna 管理和发布 packages 下的多个包
- 相关脚本可在根目录 package.json 中调用
- 代码提交并通过基础测试

## 关联 Feature

- feature-1-monorepo-架构初始化.md

## 优先级

P0（必须）

## 依赖

- story-1-初始化-pnpm-workspace.md

## 测试用例

- [ ] 根目录存在 lerna.json 文件
- [ ] lerna bootstrap 能正确安装多包依赖
- [ ] lerna version 能统一管理多包版本
- [ ] lerna publish 能发布 packages 下的包（可跳过实际发布，仅校验流程）
- [ ] 相关脚本可通过 pnpm run 调用
