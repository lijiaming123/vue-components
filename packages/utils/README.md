# utils/ 包说明

## 📦 概述

`utils/` 包提供通用工具函数和辅助方法，为组件库提供可复用的工具函数。

## 🎯 功能特性

- 防抖和节流函数
- 数据格式化工具
- 验证工具函数
- 类型检查工具
- 字符串处理工具

## 📁 文件结构

```
utils/
├── src/
│   ├── index.ts          # 主入口文件
│   ├── debounce.ts       # 防抖函数
│   ├── throttle.ts       # 节流函数
│   ├── format.ts         # 格式化工具
│   ├── validate.ts       # 验证工具
│   └── types.ts          # 类型定义
├── dist/                 # 构建输出目录
├── package.json          # 包配置
├── vite.config.ts        # 构建配置
├── tsconfig.json         # TypeScript 配置
└── README.md             # 包说明文档
```

## 🔧 使用方法

### 安装

```bash
pnpm add @daoda-component/utils
```

### 基础使用

```typescript
import { debounce, throttle, formatDate } from "@daoda-component/utils";

// 防抖函数
const debouncedFn = debounce(() => {
  console.log("防抖执行");
}, 300);

// 节流函数
const throttledFn = throttle(() => {
  console.log("节流执行");
}, 1000);

// 格式化日期
const formattedDate = formatDate(new Date(), "YYYY-MM-DD");
```

## 📋 API 文档

### 防抖函数

```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): T;
```

**参数**:

- `func` - 要防抖的函数
- `wait` - 延迟时间（毫秒）
- `immediate` - 是否立即执行

**示例**:

```typescript
const search = debounce((query: string) => {
  // 搜索逻辑
}, 300);
```

### 节流函数

```typescript
function throttle<T extends (...args: any[]) => any>(func: T, wait: number): T;
```

**参数**:

- `func` - 要节流的函数
- `wait` - 间隔时间（毫秒）

**示例**:

```typescript
const scroll = throttle(() => {
  // 滚动处理逻辑
}, 100);
```

### 格式化工具

```typescript
// 格式化日期
function formatDate(date: Date, format: string): string;

// 格式化数字
function formatNumber(num: number, precision?: number): string;

// 格式化货币
function formatCurrency(amount: number, currency?: string): string;
```

### 验证工具

```typescript
// 邮箱验证
function isEmail(email: string): boolean;

// 手机号验证
function isPhone(phone: string): boolean;

// URL 验证
function isUrl(url: string): boolean;

// 身份证验证
function isIdCard(idCard: string): boolean;
```

### 类型检查

```typescript
// 检查是否为函数
function isFunction(value: any): value is Function;

// 检查是否为对象
function isObject(value: any): value is object;

// 检查是否为数组
function isArray(value: any): value is any[];

// 检查是否为空
function isEmpty(value: any): boolean;
```

## 🎨 使用示例

### Vue 组件中使用

```vue
<template>
  <div>
    <input v-model="searchQuery" @input="handleSearch" />
    <p>搜索结果: {{ searchResults }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { debounce } from "@daoda-component/utils";

const searchQuery = ref("");
const searchResults = ref([]);

// 防抖搜索
const handleSearch = debounce(async () => {
  if (searchQuery.value) {
    // 执行搜索
    searchResults.value = await searchAPI(searchQuery.value);
  }
}, 300);
</script>
```

### 工具函数组合

```typescript
import { debounce, throttle, formatDate } from "@daoda-component/utils";

// 组合使用
const handleResize = throttle(() => {
  console.log("窗口大小改变");
}, 100);

const handleSearch = debounce((query: string) => {
  console.log("搜索:", query);
}, 300);

// 格式化当前日期
const today = formatDate(new Date(), "YYYY年MM月DD日");
```

## 🧪 测试

### 运行测试

```bash
# 运行所有测试
npm test

# 运行特定测试
npm test -- debounce

# 查看测试覆盖率
npm run test:coverage
```

### 测试示例

```typescript
import { debounce, throttle } from "@daoda-component/utils";

describe("debounce", () => {
  it("should debounce function calls", (done) => {
    let callCount = 0;
    const debounced = debounce(() => {
      callCount++;
    }, 100);

    debounced();
    debounced();
    debounced();

    setTimeout(() => {
      expect(callCount).toBe(1);
      done();
    }, 200);
  });
});
```

## 🔄 版本历史

### v1.0.0

- 初始版本
- 防抖和节流函数
- 基础格式化工具
- 常用验证函数

## 🛠️ 开发指南

### 添加新工具函数

1. 在 `src/` 目录下创建新文件
2. 实现函数并添加类型定义
3. 在 `index.ts` 中导出
4. 编写单元测试
5. 更新文档

### 代码规范

- 使用 TypeScript 编写
- 添加完整的类型定义
- 编写单元测试
- 添加 JSDoc 注释

## 📚 相关文档

- [项目结构说明](../../PROJECT_STRUCTURE.md)
- [组件库使用指南](../../README.md)
