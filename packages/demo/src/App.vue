<script setup lang="ts">
import { ref, reactive } from "vue";
import { DaodaConfigProvider } from "@daoda-component/config";
import DaodaButton from "@daoda-component/components/button";
import DaodaSelect from "@daoda-component/components/select";
import SchemaForm from "@daoda-component/components/schema-form";

const theme = reactive({
  primaryColor: "#1677ff",
  borderRadius: "6px",
  fontSize: "16px",
});

const value = ref("a");
const options = [
  { label: "选项A", value: "a" },
  { label: "选项B", value: "b" },
  { label: "禁用项", value: "c", disabled: true },
];

// SchemaForm 演示数据
const schemaFormData = ref({});

const schemaFormSchema = {
  title: "用户信息表单",
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
      span: 12,
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
      name: "age",
      label: "年龄",
      type: "number",
      span: 6,
      props: {
        min: 0,
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
      name: "country",
      label: "国家",
      type: "country-select",
      span: 12,
      placeholder: "请选择国家",
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
      ],
    },
    {
      name: "bio",
      label: "个人简介",
      type: "textarea",
      span: 24,
      placeholder: "请输入个人简介",
      props: {
        rows: 3,
      },
    },
  ],
};

function toggleTheme() {
  theme.primaryColor = theme.primaryColor === "#1677ff" ? "#ff6600" : "#1677ff";
  theme.borderRadius = theme.borderRadius === "6px" ? "20px" : "6px";
}

function handleClick() {
  console.log("click");
}

function handleSchemaFormSubmit(data: any) {
  console.log("SchemaForm提交数据:", data);
  alert("表单提交成功！");
}

function handleSchemaFormFieldChange(field: string, value: any, formData: any) {
  console.log("字段变化:", field, value);
}
</script>

<template>
  <DaodaConfigProvider :theme="theme">
    <div style="padding: 32px; background: #f5f5f5; min-height: 100vh">
      <h2>DaodaButton 测试</h2>
      <DaodaButton type="primary" @click="toggleTheme"
        >切换主题色/圆角</DaodaButton
      >
      <DaodaButton
        type="success"
        :throttle="true"
        :throttle-time="1200"
        style="margin: 12px; padding: 10px"
        @click="handleClick"
        >节流按钮</DaodaButton
      >
      <DaodaButton type="danger" :disabled="true" style="margin-left: 12px"
        >禁用按钮</DaodaButton
      >
      <DaodaButton
        type="primary"
        style="margin-left: 12px"
        countdown
        :countdown-time="10"
        >倒计时按钮</DaodaButton
      >

      <h2 style="margin-top: 32px">DaodaSelect 测试</h2>
      <DaodaSelect
        v-model="value"
        :country-selector="true"
        :options="options"
        style="width: 200px"
      />

      <div style="margin-top: 12px">当前选中：{{ value }}</div>

      <h2 style="margin-top: 32px">SchemaForm 测试</h2>
      <div
        style="
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        "
      >
        <SchemaForm
          v-model="schemaFormData"
          :schema="schemaFormSchema"
          @submit="handleSchemaFormSubmit"
          @field-change="handleSchemaFormFieldChange"
        />

        <div
          style="
            margin-top: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 4px;
          "
        >
          <h4>表单数据：</h4>
          <pre style="font-size: 12px; color: #666">{{
            JSON.stringify(schemaFormData, null, 2)
          }}</pre>
        </div>
      </div>
    </div>
  </DaodaConfigProvider>
</template>
