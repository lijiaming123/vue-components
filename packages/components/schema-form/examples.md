# SchemaForm 使用示例

## 📝 基础示例

### 用户注册表单

```vue
<template>
  <div class="demo-container">
    <h2>用户注册表单</h2>
    <SchemaForm
      :schema="registerSchema"
      v-model="registerData"
      @submit="handleRegister"
    />

    <div class="form-data">
      <h3>表单数据：</h3>
      <pre>{{ JSON.stringify(registerData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SchemaForm from "../src/SchemaForm.vue";

const registerData = ref({});

const registerSchema = {
  title: "用户注册",
  layout: "grid",
  grid: {
    cols: 2,
    gutter: 20,
  },
  fields: [
    {
      name: "username",
      label: "用户名",
      type: "input",
      required: true,
      placeholder: "请输入用户名",
      span: 12,
      rules: [{ min: 3, max: 20, message: "用户名长度为3-20位" }],
    },
    {
      name: "email",
      label: "邮箱",
      type: "input",
      required: true,
      placeholder: "请输入邮箱",
      span: 12,
      rules: [{ type: "email", message: "请输入正确的邮箱地址" }],
    },
    {
      name: "password",
      label: "密码",
      type: "input",
      required: true,
      placeholder: "请输入密码",
      span: 12,
      props: {
        type: "password",
        showPassword: true,
      },
      rules: [{ min: 6, max: 20, message: "密码长度为6-20位" }],
    },
    {
      name: "confirmPassword",
      label: "确认密码",
      type: "input",
      required: true,
      placeholder: "请再次输入密码",
      span: 12,
      props: {
        type: "password",
        showPassword: true,
      },
      rules: [
        {
          validator: (rule, value, callback) => {
            if (value !== registerData.value.password) {
              callback(new Error("两次输入密码不一致"));
            } else {
              callback();
            }
          },
          trigger: "blur",
        },
      ],
    },
    {
      name: "age",
      label: "年龄",
      type: "number",
      span: 6,
      props: {
        min: 1,
        max: 120,
      },
    },
    {
      name: "gender",
      label: "性别",
      type: "radio",
      span: 6,
      defaultValue: "male",
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
      ],
    },
    {
      name: "hobbies",
      label: "兴趣爱好",
      type: "checkbox",
      span: 24,
      options: [
        { label: "读书", value: "reading" },
        { label: "运动", value: "sports" },
        { label: "音乐", value: "music" },
        { label: "旅行", value: "travel" },
      ],
    },
    {
      name: "birthday",
      label: "生日",
      type: "date",
      span: 12,
      placeholder: "请选择生日",
    },
    {
      name: "country",
      label: "国家",
      type: "country-select",
      span: 12,
      placeholder: "请选择国家",
    },
    {
      name: "bio",
      label: "个人简介",
      type: "textarea",
      span: 24,
      placeholder: "请输入个人简介",
      props: {
        rows: 4,
        maxlength: 200,
        showWordLimit: true,
      },
    },
  ],
};

const handleRegister = (data) => {
  console.log("注册数据:", data);
  alert("注册成功！");
};
</script>

<style scoped>
.demo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-data {
  margin-top: 30px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.form-data pre {
  background: white;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
```

## 🔗 联动示例

### 地址联动表单

```vue
<template>
  <div class="demo-container">
    <h2>地址联动表单</h2>
    <SchemaForm
      :schema="addressSchema"
      v-model="addressData"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import SchemaForm from "../src/SchemaForm.vue";

const addressData = ref({});

const addressSchema = {
  title: "收货地址",
  layout: "grid",
  grid: {
    cols: 2,
    gutter: 16,
  },
  fields: [
    {
      name: "country",
      label: "国家",
      type: "select",
      required: true,
      span: 12,
      options: [
        { label: "中国", value: "CN" },
        { label: "美国", value: "US" },
        { label: "日本", value: "JP" },
      ],
    },
    {
      name: "province",
      label: "省份/州",
      type: "select",
      required: true,
      span: 12,
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
        { label: "广东", value: "GD" },
        { label: "浙江", value: "ZJ" },
      ],
    },
    {
      name: "state",
      label: "州",
      type: "select",
      required: true,
      span: 12,
      show: false,
      dependencies: [
        {
          field: "country",
          value: "US",
          operator: "eq",
        },
      ],
      options: [
        { label: "California", value: "CA" },
        { label: "New York", value: "NY" },
        { label: "Texas", value: "TX" },
      ],
    },
    {
      name: "city",
      label: "城市",
      type: "select",
      required: true,
      span: 12,
      dependencies: [
        {
          field: "province",
          value: "BJ",
          operator: "eq",
        },
      ],
      options: [
        { label: "朝阳区", value: "CY" },
        { label: "海淀区", value: "HD" },
        { label: "西城区", value: "XC" },
      ],
    },
    {
      name: "district",
      label: "区县",
      type: "select",
      span: 12,
      dependencies: [
        {
          field: "city",
          value: "CY",
          operator: "eq",
        },
      ],
      options: [
        { label: "三里屯街道", value: "SLT" },
        { label: "建国门外街道", value: "JGW" },
      ],
    },
    {
      name: "street",
      label: "街道地址",
      type: "textarea",
      span: 24,
      required: true,
      placeholder: "请输入详细地址",
      props: {
        rows: 3,
      },
    },
  ],
};

const handleSubmit = (data) => {
  console.log("地址数据:", data);
  alert("地址保存成功！");
};
</script>
```

## 📊 数据收集示例

### 问卷调查表单

```vue
<template>
  <div class="demo-container">
    <h2>产品满意度调查</h2>
    <SchemaForm
      :schema="surveySchema"
      v-model="surveyData"
      @submit="handleSurvey"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import SchemaForm from "../src/SchemaForm.vue";

const surveyData = ref({});

const surveySchema = {
  title: "产品满意度调查",
  fields: [
    {
      name: "productName",
      label: "产品名称",
      type: "input",
      required: true,
      placeholder: "请选择或输入产品名称",
    },
    {
      name: "satisfaction",
      label: "整体满意度",
      type: "rate",
      required: true,
      props: {
        max: 5,
        showText: true,
        texts: ["很不满意", "不满意", "一般", "满意", "很满意"],
      },
    },
    {
      name: "quality",
      label: "产品质量",
      type: "rate",
      required: true,
      props: {
        max: 5,
        showText: true,
      },
    },
    {
      name: "price",
      label: "价格合理性",
      type: "rate",
      required: true,
      props: {
        max: 5,
        showText: true,
      },
    },
    {
      name: "service",
      label: "服务质量",
      type: "rate",
      required: true,
      props: {
        max: 5,
        showText: true,
      },
    },
    {
      name: "recommend",
      label: "推荐意愿",
      type: "radio",
      required: true,
      options: [
        { label: "非常愿意", value: "very_willing" },
        { label: "愿意", value: "willing" },
        { label: "一般", value: "neutral" },
        { label: "不愿意", value: "unwilling" },
        { label: "非常不愿意", value: "very_unwilling" },
      ],
    },
    {
      name: "improvements",
      label: "改进建议",
      type: "checkbox",
      options: [
        { label: "产品质量", value: "quality" },
        { label: "价格优化", value: "price" },
        { label: "服务提升", value: "service" },
        { label: "功能增强", value: "features" },
        { label: "用户体验", value: "ux" },
      ],
    },
    {
      name: "comments",
      label: "其他意见",
      type: "textarea",
      placeholder: "请详细描述您的意见或建议",
      props: {
        rows: 4,
        maxlength: 500,
        showWordLimit: true,
      },
    },
    {
      name: "contact",
      label: "联系方式",
      type: "input",
      placeholder: "如需回复，请留下联系方式（可选）",
    },
  ],
};

const handleSurvey = (data) => {
  console.log("调查数据:", data);
  alert("感谢您的反馈！");
};
</script>
```

## 🎨 自定义渲染器示例

### 自定义字段渲染

```vue
<template>
  <div class="demo-container">
    <h2>自定义渲染器示例</h2>
    <SchemaForm
      :schema="customSchema"
      v-model="customData"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import { ElButton, ElTag } from "element-plus";
import SchemaForm from "../src/SchemaForm.vue";

const customData = ref({});

const customSchema = {
  title: "自定义字段示例",
  fields: [
    {
      name: "name",
      label: "姓名",
      type: "input",
      required: true,
    },
    {
      name: "tags",
      label: "标签",
      type: "custom",
      render: (field, formData, updateField) => {
        const tags = formData[field.name] || [];

        return h("div", [
          h("div", { style: "margin-bottom: 10px;" }, [
            ...tags.map((tag, index) =>
              h(
                ElTag,
                {
                  key: index,
                  closable: true,
                  onClose: () => {
                    const newTags = tags.filter((_, i) => i !== index);
                    updateField(field.name, newTags);
                  },
                },
                { default: () => tag }
              )
            ),
          ]),
          h(
            ElButton,
            {
              size: "small",
              onClick: () => {
                const newTag = `标签${tags.length + 1}`;
                updateField(field.name, [...tags, newTag]);
              },
            },
            { default: () => "添加标签" }
          ),
        ]);
      },
    },
    {
      name: "color",
      label: "主题色",
      type: "custom",
      render: (field, formData, updateField) => {
        const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7"];

        return h(
          "div",
          { style: "display: flex; gap: 10px;" },
          colors.map((color) =>
            h("div", {
              style: {
                width: "40px",
                height: "40px",
                backgroundColor: color,
                borderRadius: "50%",
                cursor: "pointer",
                border:
                  formData[field.name] === color
                    ? "3px solid #333"
                    : "1px solid #ddd",
              },
              onClick: () => updateField(field.name, color),
            })
          )
        );
      },
    },
  ],
};

const handleSubmit = (data) => {
  console.log("自定义表单数据:", data);
};
</script>
```

## 📱 响应式布局示例

### 自适应表单

```vue
<template>
  <div class="demo-container">
    <h2>响应式布局表单</h2>
    <SchemaForm
      :schema="responsiveSchema"
      v-model="responsiveData"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import SchemaForm from "../src/SchemaForm.vue";

const responsiveData = ref({});

const responsiveSchema = {
  title: "响应式表单",
  layout: "grid",
  grid: {
    cols: 4,
    gutter: 16,
  },
  fields: [
    {
      name: "name",
      label: "姓名",
      type: "input",
      required: true,
      span: 12, // 中等屏幕占2列，小屏幕自动换行
    },
    {
      name: "email",
      label: "邮箱",
      type: "input",
      required: true,
      span: 12,
    },
    {
      name: "phone",
      label: "电话",
      type: "input",
      span: 24, // 占满一行
    },
    {
      name: "address",
      label: "地址",
      type: "textarea",
      span: 24,
      props: {
        rows: 3,
      },
    },
    {
      name: "age",
      label: "年龄",
      type: "number",
      span: 6, // 占1列
    },
    {
      name: "gender",
      label: "性别",
      type: "radio",
      span: 6,
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
      ],
    },
    {
      name: "hobbies",
      label: "爱好",
      type: "checkbox",
      span: 12,
      options: [
        { label: "读书", value: "reading" },
        { label: "运动", value: "sports" },
        { label: "音乐", value: "music" },
      ],
    },
  ],
};

const handleSubmit = (data) => {
  console.log("响应式表单数据:", data);
};
</script>

<style scoped>
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .demo-container {
    padding: 10px;
  }
}
</style>
```

这些示例展示了 SchemaForm 组件的各种使用场景，包括基础表单、联动规则、自定义渲染器和响应式布局等功能。
