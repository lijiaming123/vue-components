<script setup lang="ts">
import { ElSelect, ElOption } from "element-plus";
import type {
  SelectProps as ElSelectProps,
  OptionProps as ElOptionProps,
} from "element-plus";
import { defineProps, defineEmits, useSlots } from "vue";

/**
 * DaodaSelect 组件
 *
 * 封装自 Element Plus 的 ElSelect，支持所有原生 props，
 * 并扩展了 options 简写、事件透传等功能。
 *
 * @example
 * <DaodaSelect v-model="value" :options="[{label: 'A', value: 'a'}]" />
 */
export interface DaodaSelectOption extends Partial<ElOptionProps> {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface DaodaSelectProps extends /* @vue-ignore */ ElSelectProps {
  /**
   * 选项列表（简写）
   */
  options?: DaodaSelectOption[];
}

const props = defineProps<DaodaSelectProps>();
const emit = defineEmits([
  "update:modelValue",
  "change",
  "blur",
  "focus",
  "visible-change",
  "remove-tag",
  "clear",
]);
const slots = useSlots();
</script>

<template>
  <ElSelect
    v-bind="props"
    v-on="$attrs"
    @update:modelValue="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    @visible-change="$emit('visible-change', $event)"
    @remove-tag="$emit('remove-tag', $event)"
    @clear="$emit('clear')"
  >
    <template v-if="props.options && !slots.default">
      <ElOption
        v-for="item in props.options"
        :key="item.value"
        v-bind="item"
        :label="item.label"
        :value="item.value"
      />
    </template>
    <slot />
  </ElSelect>
</template>

<script lang="ts">
export default {
  name: "DaodaSelect",
};
</script>
