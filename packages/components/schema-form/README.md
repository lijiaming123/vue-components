# SchemaForm 组件

## 📦 概述

SchemaForm 是一个基于 JSON Schema 的动态表单生成器，支持通过配置自动渲染表单，具有动态字段、联动规则、自定义渲染器等强大功能。

## 🎯 功能特性

- **JSON Schema 驱动**: 通过 JSON 配置自动生成表单
- **动态字段**: 支持字段的动态显示/隐藏、启用/禁用
- **联动规则**: 字段间的联动逻辑，支持复杂的条件判断
- **多种布局**: 支持栅格布局（grid）和弹性布局（flex）
- **内置校验**: 丰富的校验规则和自定义校验
- **自定义渲染器**: 支持自定义字段渲染逻辑
- **类型安全**: 完整的 TypeScript 类型定义

## 🔧 使用方法

### 安装

```bash
pnpm add daoda-schema-form
```

### 基础使用

```vue
<template>
  <SchemaForm :schema="formSchema" v-model="formData" @submit="handleSubmit" />
</template>

<script setup>
import { ref } from "vue";
import SchemaForm from "daoda-schema-form";

const formData = ref({});

const formSchema = {
  title: "用户信息",
  layout: "grid",
  grid: {
    cols: 2,
    gutter: 16,
  },
  fields: [
    {
      name: "name",
      label: "姓名",
      type: "input",
      required: true,
      placeholder: "请输入姓名",
    },
    {
      name: "email",
      label: "邮箱",
      type: "input",
      required: true,
      rules: [{ type: "email", message: "请输入正确的邮箱地址" }],
    },
    {
      name: "age",
      label: "年龄",
      type: "number",
      props: {
        min: 0,
        max: 120,
      },
    },
    {
      name: "gender",
      label: "性别",
      type: "radio",
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
      ],
    },
  ],
};

const handleSubmit = (data) => {
  console.log("提交数据:", data);
};
</script>
```

## 📋 API 文档

### SchemaForm Props

| 参数             | 类型       | 默认值 | 说明             |
| ---------------- | ---------- | ------ | ---------------- |
| schema           | FormSchema | -      | 表单Schema配置   |
| modelValue       | FormData   | -      | 表单数据         |
| showActions      | boolean    | true   | 是否显示操作按钮 |
| validateOnChange | boolean    | false  | 是否实时校验     |

### FormSchema 配置

```typescript
interface FormSchema {
  title?: string; // 表单标题
  layout?: "grid" | "flex"; // 布局类型
  grid?: {
    // 栅格配置
    cols?: number; // 列数
    gutter?: number; // 间距
    justify?: string; // 水平对齐
    align?: string; // 垂直对齐
  };
  fields: FieldConfig[]; // 字段配置
  form?: {
    // 表单配置
    labelWidth?: string; // 标签宽度
    labelPosition?: string; // 标签位置
    size?: string; // 尺寸
    disabled?: boolean; // 是否禁用
  };
}
```

### FieldConfig 配置

```typescript
interface FieldConfig {
  name: string; // 字段名称
  label: string; // 字段标签
  type: FieldType; // 字段类型
  required?: boolean; // 是否必填
  placeholder?: string; // 占位符
  defaultValue?: any; // 默认值
  disabled?: boolean; // 是否禁用
  readonly?: boolean; // 是否只读
  rules?: FormItemRule[]; // 校验规则
  options?: Array<{
    // 选项数据
    label: string;
    value: any;
    disabled?: boolean;
  }>;
  dependencies?: Array<{
    // 联动条件
    field: string;
    value: any;
    operator?: string;
  }>;
  props?: Record<string, any>; // 自定义属性
  span?: number; // 栅格占位
  offset?: number; // 栅格偏移
  order?: number; // 排序
  show?: boolean; // 是否显示
  render?: Function; // 自定义渲染器
}
```

### 支持的字段类型

- `input` - 输入框
- `textarea` - 文本域
- `select` - 选择器
- `radio` - 单选框组
- `checkbox` - 复选框组
- `date` - 日期选择器
- `datetime` - 日期时间选择器
- `time` - 时间选择器
- `number` - 数字输入框
- `switch` - 开关
- `slider` - 滑块
- `rate` - 评分
- `upload` - 上传
- `cascader` - 级联选择器
- `tree-select` - 树选择器
- `country-select` - 国家选择器

## 🎨 高级用法

### 联动规则

```typescript
const formSchema = {
  fields: [
    {
      name: "country",
      label: "国家",
      type: "country-select",
      options: [
        { label: "中国", value: "CN" },
        { label: "美国", value: "US" },
      ],
    },
    {
      name: "province",
      label: "省份",
      type: "select",
      dependencies: [
        {
          field: "country",
          value: "CN",
          operator: "eq",
        },
      ],
      options: [
        { label: "北京", value: "BJ" },
        { label: "上海", value: "SH" },
      ],
    },
  ],
};
```

### 自定义渲染器

```typescript
const formSchema = {
  fields: [
    {
      name: "custom",
      label: "自定义字段",
      type: "custom",
      render: (field, formData, updateField) => {
        return h(
          "div",
          {
            onClick: () => updateField("custom", "自定义值"),
          },
          "点击设置自定义值"
        );
      },
    },
  ],
};
```

### 栅格布局

```typescript
const formSchema = {
  layout: "grid",
  grid: {
    cols: 3,
    gutter: 20,
  },
  fields: [
    {
      name: "field1",
      label: "字段1",
      type: "input",
      span: 12, // 占2列
    },
    {
      name: "field2",
      label: "字段2",
      type: "input",
      span: 6, // 占1列
    },
  ],
};
```

## 🧪 事件

### 表单事件

- `update:modelValue` - 表单数据变化
- `field-change` - 字段值变化
- `submit` - 表单提交
- `reset` - 表单重置
- `validate` - 表单验证

### 事件示例

```vue
<template>
  <SchemaForm
    :schema="formSchema"
    v-model="formData"
    @field-change="handleFieldChange"
    @submit="handleSubmit"
    @validate="handleValidate"
  />
</template>

<script setup>
const handleFieldChange = (field, value, formData) => {
  console.log("字段变化:", field, value);
};

const handleSubmit = (formData) => {
  console.log("提交数据:", formData);
};

const handleValidate = (valid, errors) => {
  console.log("校验结果:", valid, errors);
};
</script>
```

## 🔄 版本历史

### v1.0.0

- 初始版本
- 基础表单生成功能
- 联动规则支持
- 多种布局支持
- 内置校验规则

## 🛠️ 开发指南

### 添加新字段类型

1. 在 `types.ts` 中添加新的字段类型
2. 在 `renderers.ts` 中添加对应的渲染器
3. 更新文档和示例

### 自定义校验规则

```typescript
import { builtinRules } from "daoda-schema-form";

const customRules = [
  builtinRules.custom((value, formData) => {
    // 自定义校验逻辑
    return value.length >= 6;
  }, "长度不能少于6位"),
];
```

## 📚 相关文档

- [项目结构说明](../../../PROJECT_STRUCTURE.md)
- [组件库使用指南](../../../README.md)
- [Element Plus 文档](https://element-plus.org/)
