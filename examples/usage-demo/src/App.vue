<template>
  <div class="app">
    <header class="header">
      <h1>Daoda Component 使用示例</h1>
      <p>展示如何在其他项目中使用 Daoda Component</p>
    </header>

    <main class="main">
      <section class="section">
        <h2>Button 组件示例</h2>
        <div class="demo-row">
          <Button type="primary" @click="handleClick">主要按钮</Button>
          <Button type="success" @click="handleClick">成功按钮</Button>
          <Button type="warning" @click="handleClick">警告按钮</Button>
          <Button type="danger" @click="handleClick">危险按钮</Button>
        </div>

        <div class="demo-row">
          <Button
            type="primary"
            :throttle="true"
            :throttle-time="1000"
            @click="handleThrottleClick"
          >
            节流按钮 (1秒)
          </Button>
          <Button
            type="success"
            :throttle="true"
            :throttle-time="2000"
            @click="handleThrottleClick"
          >
            节流按钮 (2秒)
          </Button>
        </div>
      </section>

      <section class="section">
        <h2>Select 组件示例</h2>
        <div class="demo-row">
          <Select
            v-model="selectValue"
            :options="selectOptions"
            placeholder="请选择一个选项"
            style="width: 200px"
          />
          <span class="selected-value">当前选中: {{ selectValue }}</span>
        </div>
      </section>

      <section class="section">
        <h2>主题切换示例</h2>
        <div class="demo-row">
          <Button @click="toggleTheme">切换主题</Button>
          <div class="theme-info">
            <p>当前主题色: {{ theme.primaryColor }}</p>
            <p>当前圆角: {{ theme.borderRadius }}</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>工具函数示例</h2>
        <div class="demo-row">
          <input
            v-model="searchText"
            placeholder="输入内容测试防抖"
            class="search-input"
          />
          <p>防抖后的值: {{ debouncedValue }}</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import {
  Button,
  Select,
  DaodaConfigProvider,
  debounce,
} from "@daoda-component/core";

// 主题配置
const theme = reactive({
  primaryColor: "#1677ff",
  borderRadius: "6px",
  fontSize: "16px",
});

// Select 相关
const selectValue = ref("a");
const selectOptions = [
  { label: "选项A", value: "a" },
  { label: "选项B", value: "b" },
  { label: "选项C", value: "c" },
  { label: "禁用选项", value: "d", disabled: true },
];

// 防抖示例
const searchText = ref("");
const debouncedValue = ref("");

const debouncedSearch = debounce((value: string) => {
  debouncedValue.value = value;
}, 500);

watch(searchText, (newValue) => {
  debouncedSearch(newValue);
});

// 事件处理
const handleClick = () => {
  console.log("按钮被点击");
  alert("按钮被点击");
};

const handleThrottleClick = () => {
  console.log("节流按钮被点击");
  alert("节流按钮被点击");
};

const toggleTheme = () => {
  theme.primaryColor = theme.primaryColor === "#1677ff" ? "#ff6600" : "#1677ff";
  theme.borderRadius = theme.borderRadius === "6px" ? "20px" : "6px";
};
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5em;
}

.header p {
  margin: 0;
  opacity: 0.9;
}

.section {
  margin-bottom: 40px;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.5em;
}

.demo-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.selected-value {
  color: #666;
  font-size: 14px;
}

.theme-info {
  margin-left: 20px;
}

.theme-info p {
  margin: 4px 0;
  color: #666;
  font-size: 14px;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
}

.search-input:focus {
  outline: none;
  border-color: #1677ff;
  box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.2);
}
</style>
