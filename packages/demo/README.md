# demo/ 包说明

## 📦 概述

`demo/` 包是组件库的主要演示和测试环境，用于开发和测试所有组件的功能。

## 🎯 功能特性

- 组件功能演示
- 交互式测试环境
- 主题切换演示
- 响应式设计测试
- 开发调试工具

## 📁 文件结构

```
demo/
├── src/
│   ├── App.vue            # 主应用组件
│   ├── main.ts            # 应用入口文件
│   └── components/        # 演示组件
├── index.html             # HTML 入口文件
├── package.json           # 包配置
├── vite.config.ts         # 构建配置
└── README.md              # 包说明文档
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:5174` 查看演示。

### 构建生产版本

```bash
pnpm build
```

## 🎨 演示内容

### Button 组件演示

- **基础样式**: 主要、成功、警告、危险按钮
- **尺寸变化**: 大、中、小三种尺寸
- **状态演示**: 正常、禁用、加载状态
- **节流功能**: 防重复点击演示
- **主题定制**: 动态切换主题色

### Select 组件演示

- **基础选择器**: 普通选项选择
- **国家选择器**: 全球国家和地区选择
- **搜索功能**: 可搜索的选择器
- **多选模式**: 支持多选的选择器
- **自定义选项**: 自定义选项内容

### 主题系统演示

- **主题切换**: 动态切换主题色
- **圆角调整**: 调整组件圆角大小
- **字体大小**: 调整字体大小
- **间距控制**: 调整组件间距

### 工具函数演示

- **防抖功能**: 输入框防抖演示
- **节流功能**: 按钮节流演示
- **格式化**: 日期和数字格式化
- **验证功能**: 表单验证演示

## 🔧 开发指南

### 添加新演示

1. 在 `src/components/` 下创建新组件
2. 在 `App.vue` 中添加演示内容
3. 更新路由配置（如果需要）
4. 添加相应的样式

### 组件演示结构

```vue
<template>
  <div class="demo-section">
    <h2>组件名称演示</h2>
    <div class="demo-content">
      <!-- 演示内容 -->
    </div>
  </div>
</template>

<script setup>
// 演示逻辑
</script>

<style scoped>
/* 演示样式 */
</style>
```

### 主题定制演示

```vue
<template>
  <div class="theme-demo">
    <h3>主题定制</h3>
    <div class="theme-controls">
      <label>主色调:</label>
      <input v-model="theme.primaryColor" type="color" />

      <label>圆角:</label>
      <input v-model="theme.borderRadius" type="range" min="0" max="20" />
    </div>
  </div>
</template>
```

## 📱 响应式设计

### 断点设置

- **移动端**: < 768px
- **平板端**: 768px - 1024px
- **桌面端**: > 1024px

### 响应式演示

```css
.demo-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .demo-container {
    grid-template-columns: 1fr;
  }
}
```

## 🧪 测试功能

### 交互测试

- 点击测试
- 输入测试
- 选择测试
- 滚动测试

### 性能测试

- 渲染性能
- 内存使用
- 响应时间

### 兼容性测试

- 浏览器兼容性
- 设备兼容性
- 分辨率适配

## 🔄 开发工作流

### 1. 开发新功能

```bash
# 启动开发服务器
pnpm dev

# 在浏览器中测试
# 修改代码，热重载自动更新
```

### 2. 添加新组件演示

1. 开发组件功能
2. 在 demo 中添加演示
3. 测试各种使用场景
4. 优化用户体验

### 3. 测试和调试

```bash
# 运行测试
pnpm test

# 代码检查
pnpm run lint

# 构建检查
pnpm run build
```

## 📚 最佳实践

### 演示设计

- 保持演示简洁明了
- 提供多种使用场景
- 添加交互说明
- 展示最佳实践

### 代码组织

- 按功能分组演示
- 使用清晰的命名
- 添加必要的注释
- 保持代码整洁

### 用户体验

- 提供清晰的操作指引
- 添加加载状态提示
- 处理错误情况
- 优化响应速度

## 🐛 调试技巧

### 开发工具

- Vue DevTools
- 浏览器开发者工具
- 网络面板
- 性能面板

### 常见问题

- 组件不显示：检查导入路径
- 样式问题：检查 CSS 作用域
- 功能异常：检查 props 传递
- 性能问题：检查渲染逻辑

## 📚 相关文档

- [项目结构说明](../../PROJECT_STRUCTURE.md)
- [组件库使用指南](../../README.md)
- [Button 组件文档](../components/button/README.md)
- [Select 组件文档](../components/select/README.md)
