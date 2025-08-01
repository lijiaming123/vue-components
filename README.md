# Daoda Component - Vue3 企业级组件库

基于 Vue3 + TypeScript 的企业级组件库，提供高质量、可定制的 UI 组件。

## ✨ 特性

- 🚀 基于 Vue3 + TypeScript 开发
- 🎨 支持主题定制和全局配置
- 📦 按需加载，支持 Tree Shaking
- 🔧 完整的 TypeScript 类型支持
- 🧪 完善的单元测试
- 📖 详细的文档和示例

## 📦 安装

```bash
# 使用 npm
npm install daoda-component-core

# 使用 yarn
yarn add daoda-component-core

# 使用 pnpm
pnpm add daoda-component-core
```

## 🔧 依赖要求

- Vue >= 3.0.0
- Element Plus >= 2.0.0

## 🚀 快速开始

### 完整引入

```typescript
import { createApp } from "vue";
import { Button, Select, DaodaConfigProvider } from "daoda-component-core";

const app = createApp(App);

app.component("DaodaButton", Button);
app.component("DaodaSelect", Select);

app.mount("#app");
```

### 按需引入

```typescript
import { Button } from "daoda-component-core";
import { Select } from "daoda-component-core";
import { DaodaConfigProvider } from "daoda-component-core";
import { throttle } from "daoda-component-core";
```

## 🎨 组件使用

### Button 按钮组件

```vue
<template>
  <DaodaConfigProvider :theme="theme">
    <Button type="primary" @click="handleClick">主要按钮</Button>
    <Button
      type="success"
      :throttle="true"
      :throttle-time="1000"
      @click="handleThrottleClick"
    >
      节流按钮
    </Button>
  </DaodaConfigProvider>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Button, DaodaConfigProvider } from "daoda-component-core";

const theme = reactive({
  primaryColor: "#1677ff",
  borderRadius: "6px",
  fontSize: "16px",
});

const handleClick = () => {
  console.log("按钮被点击");
};

const handleThrottleClick = () => {
  console.log("节流按钮被点击");
};
</script>
```

### Select 选择器组件

```vue
<template>
  <DaodaSelect
    v-model="value"
    :options="options"
    placeholder="请选择"
    style="width: 200px;"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Select } from "daoda-component-core";

const value = ref("a");
const options = [
  { label: "选项A", value: "a" },
  { label: "选项B", value: "b" },
  { label: "禁用项", value: "c", disabled: true },
];
</script>
```

### 全局主题配置

```vue
<template>
  <DaodaConfigProvider :theme="theme">
    <div>
      <!-- 你的应用内容 -->
    </div>
  </DaodaConfigProvider>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { DaodaConfigProvider } from "daoda-component-core";

const theme = reactive({
  primaryColor: "#1677ff",
  borderRadius: "6px",
  fontSize: "16px",
});
</script>
```

## 🛠️ 工具函数

### throttle 节流函数

```typescript
import { throttle } from "daoda-component-core";

const throttledFn = throttle(() => {
  console.log("节流函数执行");
}, 1000);

// 在事件中使用
element.addEventListener("scroll", throttledFn);
```

### debounce 防抖函数

```typescript
import { debounce } from "daoda-component-core";

const debouncedFn = debounce(() => {
  console.log("防抖函数执行");
}, 300);

// 在输入框中使用
input.addEventListener("input", debouncedFn);
```

## 📚 API 文档

### Button Props

| 参数         | 说明             | 类型                                                        | 默认值  |
| ------------ | ---------------- | ----------------------------------------------------------- | ------- |
| type         | 按钮类型         | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | -       |
| throttle     | 是否启用节流     | `boolean`                                                   | `false` |
| throttleTime | 节流时间（毫秒） | `number`                                                    | `800`   |
| prefixCls    | 自定义类名前缀   | `string`                                                    | -       |

### Select Props

| 参数        | 说明     | 类型                                                                  | 默认值 |
| ----------- | -------- | --------------------------------------------------------------------- | ------ |
| v-model     | 绑定值   | `string \| number`                                                    | -      |
| options     | 选项数组 | `Array<{label: string, value: string \| number, disabled?: boolean}>` | `[]`   |
| placeholder | 占位符   | `string`                                                              | -      |

### DaodaConfigProvider Props

| 参数  | 说明     | 类型               | 默认值 |
| ----- | -------- | ------------------ | ------ |
| theme | 主题配置 | `DaodaThemeConfig` | -      |

## 🧪 开发

```bash
# 克隆项目
git clone https://github.com/lijiaming123/vue-components.git
cd daoda-component

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建
pnpm build

# 运行测试
pnpm test

# 代码检查
pnpm lint
```

## 📦 发布

### 发布到 npm

```bash
# 构建所有包
pnpm build

# 发布主包
npm publish

# 或者使用发布脚本
chmod +x scripts/publish.sh
./scripts/publish.sh
```

### 发布独立包

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

详细发布指南请参考 [PUBLISH_GUIDE.md](./PUBLISH_GUIDE.md)

## 📖 示例项目

查看 `examples/usage-demo` 目录下的完整使用示例：

```bash
cd examples/usage-demo
pnpm install
pnpm dev
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## �� 许可证

MIT License
