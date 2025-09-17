<script setup lang="ts">
import { ElButton } from "element-plus";
import type { ButtonProps as ElButtonProps } from "element-plus";
import { defineProps, defineEmits, computed, watch, ref } from "vue";
import { throttle } from "../../../utils/src/throttle";

/**
 * DaodaButton 组件
 *
 * 封装自 Element Plus 的 ElButton，支持所有原生 props，
 * 并扩展了节流点击、自定义 class 前缀、倒计时等功能。
 *
 * @example
 * <DaodaButton type="primary" throttle :throttleTime="1000">主要按钮</DaodaButton>
 */
export interface DaodaButtonProps extends /* @vue-ignore */ ElButtonProps {
  /**
   * 是否开启点击节流（防止重复点击）
   * @default false
   */
  throttle?: boolean;
  /**
   * 节流间隔（ms），默认 800ms
   * @default 800
   */
  throttleTime?: number;
  /**
   * 自定义 class 前缀
   * @default ""
   */
  prefixCls?: string;
  /**
   * 是否启用倒计时功能
   * @default false
   */
  countdown?: boolean;
  /**
   * 倒计时时长（秒）
   * @default 60
   */
  countdownTime?: number;
  /**
   * 倒计时期间按钮文本（可选，支持 {time} 占位符）
   * @default "{time}秒后可重试"
   */
  countdownText?: string;
}

const props = defineProps<DaodaButtonProps>();
const emit = defineEmits<{
  click: [e: MouseEvent];
  countdownStart?: [];
  countdownEnd?: [];
}>();

// 倒计时相关
const isCounting = ref(false);
const currentTime = ref(props.countdownTime ?? 60);
let timer: number | null = null;

// 缓存 throttle 包装函数，支持动态 throttle/throttleTime
const throttledFn = ref<(e: MouseEvent) => void>();

function baseClick(e: MouseEvent) {
  // 如果启用倒计时，点击后开始倒计时，按钮禁用
  if (props.countdown) {
    if (!isCounting.value) {
      startCountdown();
      emit("click", e);
    }
    // 倒计时期间不触发点击
    return;
  }
  emit("click", e);
}

function updateThrottledFn() {
  if (props.throttle) {
    throttledFn.value = throttle(baseClick, props.throttleTime ?? 800);
  } else {
    throttledFn.value = baseClick;
  }
}

watch(
  () => [
    props.throttle,
    props.throttleTime,
    props.countdown,
    props.countdownTime,
  ],
  () => {
    updateThrottledFn();
    // 如果倒计时时长变了，重置
    if (!isCounting.value) {
      currentTime.value = props.countdownTime ?? 60;
    }
  },
  {
    immediate: true,
  }
);

function startCountdown() {
  isCounting.value = true;
  currentTime.value = props.countdownTime ?? 60;
  emit("countdownStart");
  timer && clearInterval(timer);
  timer = window.setInterval(() => {
    if (currentTime.value > 1) {
      currentTime.value -= 1;
    } else {
      stopCountdown();
    }
  }, 1000);
}

function stopCountdown() {
  isCounting.value = false;
  timer && clearInterval(timer);
  timer = null;
  emit("countdownEnd");
}

import { onBeforeUnmount } from "vue";
onBeforeUnmount(() => {
  timer && clearInterval(timer);
  timer = null;
});

/**
 * 计算 class
 */
const classes = computed(() => [
  props.prefixCls ? `${props.prefixCls}-button` : "",
]);

/**
 * 计算按钮是否禁用
 * 倒计时期间强制禁用
 */
const isDisabled = computed(() => {
  return props.disabled || isCounting.value;
});

/**
 * 计算按钮内容
 * 倒计时期间显示倒计时文本
 */
const buttonContent = computed(() => {
  if (props.countdown && isCounting.value) {
    if (props.countdownText) {
      return props.countdownText.replace("{time}", String(currentTime.value));
    }
    return `${currentTime.value}秒后可重试`;
  }
  return null;
});
</script>

<template>
  <!--
    DaodaButton 组件
    @slot 默认插槽，按钮内容
  -->
  <ElButton
    v-bind="props"
    :class="classes"
    :disabled="isDisabled"
    @click="throttledFn"
  >
    <template v-if="props.countdown && isCounting">
      {{ buttonContent }}
    </template>
    <template v-else>
      <slot />
    </template>
  </ElButton>
</template>

<script lang="ts">
export default {
  name: "DaodaButton",
};
</script>
