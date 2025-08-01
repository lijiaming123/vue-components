<script setup lang="ts">
import { ElButton } from "element-plus";
import type { ButtonProps as ElButtonProps } from "element-plus";
import { defineProps, defineEmits, useSlots, computed, watch, ref } from "vue";
import { throttle } from "../../../utils/src/throttle";

/**
 * DaodaButton 组件
 *
 * 封装自 Element Plus 的 ElButton，支持所有原生 props，
 * 并扩展了节流点击、自定义 class 前缀等功能。
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
}

const props = defineProps<DaodaButtonProps>();
const emit = defineEmits<{
  click: [e: MouseEvent];
}>();
const slots = useSlots();

// 缓存 throttle 包装函数，支持动态 throttle/throttleTime
const throttledFn = ref<(e: MouseEvent) => void>();

function baseClick(e: MouseEvent) {
  emit("click", e);
}

function updateThrottledFn() {
  console.log(props);
  if (props.throttle) {
    throttledFn.value = throttle(baseClick, props.throttleTime ?? 800);
  } else {
    throttledFn.value = baseClick;
  }
}

watch(() => [props.throttle, props.throttleTime], updateThrottledFn, {
  immediate: true,
});

/**
 * 计算 class
 */
const classes = computed(() => [
  props.prefixCls ? `${props.prefixCls}-button` : "",
]);
</script>

<template>
  <!--
    DaodaButton 组件
    @slot 默认插槽，按钮内容
  -->
  <ElButton v-bind="props" :class="classes" @click="throttledFn">
    <slot />
  </ElButton>
</template>

<script lang="ts">
export default {
  name: "DaodaButton",
};
</script>
