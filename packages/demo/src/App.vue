<script setup lang="ts">
import { ref, reactive } from "vue";
import { DaodaConfigProvider } from "@daoda-component/config";
import DaodaButton from "@daoda-component/components/button";
import DaodaSelect from "@daoda-component/components/select";

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

// function handleClick() {
//   console.log("click");
// }
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

      <h2 style="margin-top: 32px">DaodaSelect 测试</h2>
      <DaodaSelect v-model="value" :options="options" style="width: 200px" />
      <div style="margin-top: 12px">当前选中：{{ value }}</div>
    </div>
  </DaodaConfigProvider>
</template>
