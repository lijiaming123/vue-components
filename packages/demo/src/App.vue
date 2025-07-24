<script setup lang="ts">
import { ref, reactive } from "vue";
// 假设 monorepo 内部可直接这样引入
import { DaodaConfigProvider } from "@daoda-component/config";
import Button from "@daoda-component/components/button/src/index";
import DaodaSelect from "@daoda-component/components/select/src/Select.vue";

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

function toggleTheme() {
  theme.primaryColor = theme.primaryColor === "#1677ff" ? "#ff6600" : "#1677ff";
  theme.borderRadius = theme.borderRadius === "6px" ? "20px" : "6px";
}
</script>

<template>
  <DaodaConfigProvider :theme="theme">
    <div style="padding: 32px; background: #f5f5f5; min-height: 100vh">
      <h2>DaodaButton 测试</h2>
      <Button type="primary" @click="toggleTheme">切换主题色/圆角</Button>
      <Button
        type="success"
        throttle
        :throttle-time="1200"
        style="margin-left: 12px"
        >节流按钮</Button
      >
      <Button type="danger" :disabled="true" style="margin-left: 12px"
        >禁用按钮</Button
      >

      <h2 style="margin-top: 32px">DaodaSelect 测试</h2>
      <DaodaSelect v-model="value" :options="options" style="width: 200px" />
      <div style="margin-top: 12px">当前选中：{{ value }}</div>
    </div>
  </DaodaConfigProvider>
</template>
