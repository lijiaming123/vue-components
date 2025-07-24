<script setup lang="ts">
import { ElButton } from "element-plus";
import type { ButtonProps as ElButtonProps } from "element-plus";
import { defineProps, defineEmits, useSlots, computed, ref } from "vue";

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
/**
 * 点击事件，参数为原生 MouseEvent
 * @event click
 */
const emit = defineEmits<["click", (e: MouseEvent) => void]>();
const slots = useSlots();

const isThrottling = ref(false);

/**
 * 处理点击事件，支持节流
 * @param e 鼠标事件
 */
const handleClick = (e: MouseEvent) => {
  if (props.throttle) {
    if (isThrottling.value) return;
    isThrottling.value = true;
    setTimeout(() => {
      isThrottling.value = false;
    }, props.throttleTime ?? 800);
  }
  emit("click", e);
};

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
  <ElButton v-bind="props" :class="classes" @click="handleClick">
    <slot />
  </ElButton>
</template>

<script lang="ts">
export default {
  name: "DaodaButton",
};
</script>
