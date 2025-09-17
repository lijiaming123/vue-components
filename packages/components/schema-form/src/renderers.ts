/**
 * 字段渲染器
 */

import { h, ref, computed } from "vue";
import {
  ElInput,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElRadioGroup,
  ElRadio,
  ElCheckboxGroup,
  ElCheckbox,
  ElDatePicker,
  ElSwitch,
  ElSlider,
  ElRate,
  ElUpload,
  ElCascader,
  ElTreeSelect,
} from "element-plus";
import type { FieldConfig, FormData } from "./types";

// 基础输入框渲染器
export const inputRenderer = (
  field: FieldConfig,
  formData: FormData,
  updateField: (value: any) => void
) => {
  return h(ElInput, {
    modelValue: formData[field.name],
    placeholder: field.placeholder,
    disabled: field.disabled,
    readonly: field.readonly,
    clearable: true,
    ...field.props,
    "onUpdate:modelValue": updateField,
  });
};

// 文本域渲染器
export const textareaRenderer = (
  field: FieldConfig,
  formData: FormData,
  updateField: (value: any) => void
) => {
  return h(ElInput, {
    type: "textarea",
    modelValue: formData[field.name],
    placeholder: field.placeholder,
    disabled: field.disabled,
    readonly: field.readonly,
    clearable: true,
    rows: 4,
    ...field.props,
    "onUpdate:modelValue": updateField,
  });
};

// 数字输入框渲染器
export const numberRenderer = (
  field: FieldConfig,
  formData: FormData,
  updateField: (value: any) => void
) => {
  return h(ElInputNumber, {
    modelValue: formData[field.name],
    placeholder: field.placeholder,
    disabled: field.disabled,
    readonly: field.readonly,
    clearable: true,
    style: { width: "100%" },
    ...field.props,
    "onUpdate:modelValue": updateField,
  });
};

// 选择器渲染器
export const selectRenderer = (
  field: FieldConfig,
  formData: FormData,
  updateField: (value: any) => void
) => {
  const options = computed(() => field.options || []);

  return h(
    ElSelect,
    {
      modelValue: formData[field.name],
      placeholder: field.placeholder,
      disabled: field.disabled,
      clearable: true,
      filterable: true,
      style: { width: "100%" },
      ...field.props,
      "onUpdate:modelValue": updateField,
    },
    {
      default: () =>
        options.value.map((option) =>
          h(ElOption, {
            key: option.value,
            label: option.label,
            value: option.value,
            disabled: option.disabled,
          })
        ),
    }
  );
};

// 单选框组渲染器
export const radioRenderer = (
  field: FieldConfig,
  formData: FormData,
  updateField: (value: any) => void
) => {
  const options = computed(() => field.options || []);

  return h(
    ElRadioGroup,
    {
      modelValue: formData[field.name],
      disabled: field.disabled,
      ...field.props,
      "onUpdate:modelValue": updateField,
    },
    {
      default: () =>
        options.value.map((option) =>
          h(
            ElRadio,
            {
              key: option.value,
              label: option.value,
              disabled: option.disabled,
            },
            {
              default: () => option.label,
            }
          )
        ),
    }
  );
};

// 复选框组渲染器
export const checkboxRenderer = (
  field: FieldConfig,
  formData: FormData,
  updateField: (value: any) => void
) => {
  const options = computed(() => field.options || []);

  return h(
    ElCheckboxGroup,
    {
      modelValue: formData[field.name] || [],
      disabled: field.disabled,
      ...field.props,
      "onUpdate:modelValue": updateField,
    },
    {
      default: () =>
        options.value.map((option) =>
          h(
            ElCheckbox,
            {
              key: option.value,
              label: option.value,
              disabled: option.disabled,
            },
            {
              default: () => option.label,
            }
          )
        ),
    }
  );
};

// 日期选择器渲染器
export const dateRenderer = (
  field: FieldConfig,
  formData: FormData,
  updateField: (value: any) => void
) => {
  return h(ElDatePicker, {
    modelValue: formData[field.name],
    type: "date",
    placeholder: field.placeholder,
    disabled: field.disabled,
    readonly: field.readonly,
    clearable: true,
    style: { width: "100%" },
    ...field.props,
    "onUpdate:modelValue": updateField,
  });
};

// 日期时间选择器渲染器
export const datetimeRenderer = (
  field: FieldConfig,
  formData: FormData,
  updateField: (value: any) => void
) => {
  return h(ElDatePicker, {
    modelValue: formData[field.name],
    type: "datetime",
    placeholder: field.placeholder,
    disabled: field.disabled,
    readonly: field.readonly,
    clearable: true,
    style: { width: "100%" },
    ...field.props,
    "onUpdate:modelValue": updateField,
  });
};

// 时间选择器渲染器
export const timeRenderer = (
  field: FieldConfig,
  formData: FormData,
  updateField: (value: any) => void
) => {
  return h(ElDatePicker, {
    modelValue: formData[field.name],
    type: "time",
    placeholder: field.placeholder,
    disabled: field.disabled,
    readonly: field.readonly,
    clearable: true,
    style: { width: "100%" },
    ...field.props,
    "onUpdate:modelValue": updateField,
  });
};

// 开关渲染器
export const switchRenderer = (
  field: FieldConfig,
  formData: FormData,
  updateField: (value: any) => void
) => {
  return h(ElSwitch, {
    modelValue: formData[field.name],
    disabled: field.disabled,
    ...field.props,
    "onUpdate:modelValue": updateField,
  });
};

// 滑块渲染器
export const sliderRenderer = (
  field: FieldConfig,
  formData: FormData,
  updateField: (value: any) => void
) => {
  return h(ElSlider, {
    modelValue: formData[field.name],
    disabled: field.disabled,
    ...field.props,
    "onUpdate:modelValue": updateField,
  });
};

// 评分渲染器
export const rateRenderer = (
  field: FieldConfig,
  formData: FormData,
  updateField: (value: any) => void
) => {
  return h(ElRate, {
    modelValue: formData[field.name],
    disabled: field.disabled,
    ...field.props,
    "onUpdate:modelValue": updateField,
  });
};

// 上传渲染器
export const uploadRenderer = (
  field: FieldConfig,
  formData: FormData,
  updateField: (value: any) => void
) => {
  return h(ElUpload, {
    modelValue: formData[field.name],
    disabled: field.disabled,
    ...field.props,
    "onUpdate:modelValue": updateField,
  });
};

// 级联选择器渲染器
export const cascaderRenderer = (
  field: FieldConfig,
  formData: FormData,
  updateField: (value: any) => void
) => {
  return h(ElCascader, {
    modelValue: formData[field.name],
    placeholder: field.placeholder,
    disabled: field.disabled,
    clearable: true,
    style: { width: "100%" },
    ...field.props,
    "onUpdate:modelValue": updateField,
  });
};

// 树选择器渲染器
export const treeSelectRenderer = (
  field: FieldConfig,
  formData: FormData,
  updateField: (value: any) => void
) => {
  return h(ElTreeSelect, {
    modelValue: formData[field.name],
    placeholder: field.placeholder,
    disabled: field.disabled,
    clearable: true,
    style: { width: "100%" },
    ...field.props,
    "onUpdate:modelValue": updateField,
  });
};

// 国家选择器渲染器
export const countrySelectRenderer = (
  field: FieldConfig,
  formData: FormData,
  updateField: (value: any) => void
) => {
  // 这里可以导入我们之前创建的Select组件
  return h("div", { class: "country-select-placeholder" }, "国家选择器");
};

// 渲染器映射
export const renderers = {
  input: inputRenderer,
  textarea: textareaRenderer,
  select: selectRenderer,
  radio: radioRenderer,
  checkbox: checkboxRenderer,
  date: dateRenderer,
  datetime: datetimeRenderer,
  time: timeRenderer,
  number: numberRenderer,
  switch: switchRenderer,
  slider: sliderRenderer,
  rate: rateRenderer,
  upload: uploadRenderer,
  cascader: cascaderRenderer,
  "tree-select": treeSelectRenderer,
  "country-select": countrySelectRenderer,
};
