<script setup lang="ts">
import { ElButton } from "element-plus";
import type { ButtonProps as ElButtonProps } from "element-plus";
import { defineProps, defineEmits, useSlots, computed, ref } from "vue";

interface DaodaButtonProps extends /* @vue-ignore */ ElButtonProps {
  /**
   * 是否开启点击节流（防止重复点击）
   */
  throttle?: boolean;
  /**
   * 节流间隔（ms），默认 800ms
   */
  throttleTime?: number;
  /**
   * 自定义 class 前缀
   */
  prefixCls?: string;
}

const props = defineProps<DaodaButtonProps>();
const emit = defineEmits(["click"]);
const slots = useSlots();

const isThrottling = ref(false);

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

const classes = computed(() => [
  props.prefixCls ? `${props.prefixCls}-button` : "",
]);
</script>

<template>
  <ElButton v-bind="props" :class="classes" @click="handleClick">
    <slot />
  </ElButton>
</template>

<script lang="ts">
export default {
  name: "DaodaButton",
};
</script>
