# components/ 目录说明

## 🧩 概述

`components/` 目录包含所有 UI 组件的实现，每个组件都是独立的包，可以单独发布和使用。

## 📁 组件列表

### 🔘 button/ - 按钮组件

**功能**: 封装 Element Plus 按钮组件，提供增强功能

- **文件结构**:
  - `src/Button.vue` - 按钮组件主文件
  - `src/index.ts` - 导出文件
  - `button.spec.ts` - 单元测试
- **特性**:
  - 支持所有 Element Plus 按钮属性
  - 内置节流功能
  - 主题定制支持
  - TypeScript 类型支持
- **使用示例**:
  ```vue
  <DaodaButton type="primary" :throttle="true">
    点击我
  </DaodaButton>
  ```

### 📋 select/ - 选择器组件

**功能**: 封装 Element Plus 选择器组件，支持国家选择器功能

- **文件结构**:
  - `src/Select.vue` - 选择器组件主文件
  - `src/countries.ts` - 全球国家和地区数据
  - `src/index.ts` - 导出文件
  - `COUNTRY_SELECTOR.md` - 国家选择器使用文档
- **特性**:
  - 支持所有 Element Plus 选择器属性
  - 国家选择器模式 (`countrySelector`)
  - 全球国家和地区数据
  - 搜索和过滤功能
  - TypeScript 类型支持
- **使用示例**:

  ```vue
  <!-- 普通选择器 -->
  <DaodaSelect v-model="value" :options="options" />

  <!-- 国家选择器 -->
  <DaodaSelect v-model="country" :country-selector="true" />
  ```

## 🔧 开发规范

### 组件开发

1. **命名规范**: 组件名使用 PascalCase，文件名使用 kebab-case
2. **Props 定义**: 使用 TypeScript 接口定义 props
3. **事件定义**: 使用 `defineEmits` 定义事件
4. **文档**: 每个组件都要有详细的使用文档

### 文件结构

```
component-name/
├── src/
│   ├── ComponentName.vue    # 组件主文件
│   ├── types.ts            # 类型定义（可选）
│   ├── utils.ts            # 工具函数（可选）
│   └── index.ts            # 导出文件
├── package.json            # 包配置
├── vite.config.ts          # 构建配置
├── tsconfig.json           # TypeScript 配置
└── README.md               # 组件文档
```

### 测试要求

- 每个组件都要有单元测试
- 测试文件命名: `{component-name}.spec.ts`
- 测试覆盖率要求: > 80%

## 📦 发布流程

1. **开发**: 在 `src/` 目录下开发组件
2. **测试**: 编写单元测试
3. **文档**: 更新 README 和类型定义
4. **构建**: 运行 `npm run build`
5. **发布**: 使用 Lerna 发布包

## 🎯 未来计划

- [ ] 添加更多基础组件（Input、DatePicker 等）
- [ ] 添加复合组件（Form、Table 等）
- [ ] 添加主题定制功能
- [ ] 添加国际化支持
- [ ] 添加无障碍访问支持
