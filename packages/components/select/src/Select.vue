<script setup lang="ts">
import { ElSelect, ElOption } from "element-plus";
import type { SelectProps as ElSelectProps } from "element-plus";
import { defineProps, defineEmits, useSlots, computed } from "vue";
import { countries } from "./countries";

/**
 * DaodaSelect 组件
 *
 * 封装自 Element Plus 的 ElSelect，支持所有原生 props，
 * 并扩展了 options 简写、事件透传等功能。
 *
 * @example
 * <DaodaSelect v-model="value" :options="[{label: 'A', value: 'a'}]" />
 */
export interface DaodaSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface DaodaSelectProps extends /* @vue-ignore */ ElSelectProps {
  /**
   * 选项列表（简写）
   */
  options?: DaodaSelectOption[];
  /**
   * 是否启用国家选择器模式
   * 当为true时，自动使用全球国家和地区数据作为选项
   */
  countrySelector?: boolean;
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

// 计算最终的选项列表
const finalOptions = computed(() => {
  if (props.countrySelector) {
    return countries.map((country) => ({
      label: country.label,
      value: country.value,
      disabled: false,
    }));
  }
  return props.options || [];
});
</script>

<template>
  <ElSelect
    v-bind="props"
    :filterable="true"
    v-on="$attrs"
    @update:model-value="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    @visible-change="$emit('visible-change', $event)"
    @remove-tag="$emit('remove-tag', $event)"
    @clear="$emit('clear')"
  >
    <template v-if="finalOptions.length > 0 && !slots.default">
      <ElOption
        v-for="item in finalOptions"
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
