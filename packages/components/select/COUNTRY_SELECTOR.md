# 国家选择器功能

## 概述

DaodaSelect 组件新增了国家选择器功能，当设置 `countrySelector` 参数为 `true` 时，组件会自动加载全球所有国家和地区的数据作为选项。

## 使用方法

### 基本用法

```vue
<template>
  <DaodaSelect
    v-model="selectedCountry"
    :country-selector="true"
    placeholder="请选择国家或地区"
    filterable
  />
</template>

<script setup>
import { ref } from "vue";
import { DaodaSelect } from "@daoda-component/core";

const selectedCountry = ref("");
</script>
```

### 高级用法

```vue
<template>
  <DaodaSelect
    v-model="selectedCountry"
    :country-selector="true"
    placeholder="请选择国家或地区"
    filterable
    clearable
    style="width: 300px"
    @change="handleCountryChange"
  />
</template>

<script setup>
import { ref } from "vue";
import { DaodaSelect } from "@daoda-component/core";

const selectedCountry = ref("");

const handleCountryChange = (value) => {
  console.log("选中的国家代码:", value);
  // 可以根据国家代码进行后续处理
};
</script>
```

## 参数说明

| 参数            | 类型    | 默认值 | 说明                   |
| --------------- | ------- | ------ | ---------------------- |
| countrySelector | boolean | false  | 是否启用国家选择器模式 |
| filterable      | boolean | false  | 是否可搜索（建议开启） |
| clearable       | boolean | false  | 是否可清空             |
| placeholder     | string  | -      | 占位符文本             |

## 数据格式

国家选择器使用的数据格式如下：

```typescript
interface CountryOption {
  label: string; // 国家/地区名称（中文）
  value: string; // 国家代码（ISO 3166-1 alpha-2）
  code: string; // 国家代码（与value相同）
  region?: string; // 所属地区/大洲
}
```

## 支持的国家和地区

国家选择器包含以下地区的所有国家和地区：

- **亚洲**：中国、日本、韩国、印度、新加坡等
- **欧洲**：德国、法国、英国、意大利、西班牙等
- **北美洲**：美国、加拿大、墨西哥等
- **南美洲**：巴西、阿根廷、智利等
- **非洲**：埃及、南非、尼日利亚等
- **大洋洲**：澳大利亚、新西兰等
- **其他地区**：台湾(中国)、香港(中国)、澳门(中国)等

## 注意事项

1. 当 `countrySelector` 为 `true` 时，`options` 参数将被忽略
2. 建议开启 `filterable` 属性以便用户搜索国家
3. 返回的值是国家代码（如 'CN'、'US' 等），不是国家名称
4. 数据按地区分组，便于用户查找

## 示例

查看 `examples/usage-demo/src/App.vue` 文件中的完整示例。
