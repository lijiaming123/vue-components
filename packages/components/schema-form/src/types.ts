/**
 * SchemaForm 组件类型定义
 */

import type { FormItemRule } from "element-plus";

// 字段类型枚举
export type FieldType =
  | "input"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "datetime"
  | "time"
  | "number"
  | "switch"
  | "slider"
  | "rate"
  | "upload"
  | "cascader"
  | "tree-select"
  | "country-select";

// 布局类型
export type LayoutType = "grid" | "flex";

// 字段配置接口
export interface FieldConfig {
  /** 字段名称 */
  name: string;
  /** 字段标签 */
  label: string;
  /** 字段类型 */
  type: FieldType;
  /** 是否必填 */
  required?: boolean;
  /** 占位符 */
  placeholder?: string;
  /** 默认值 */
  defaultValue?: any;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 校验规则 */
  rules?: FormItemRule[];
  /** 选项数据（用于select、radio、checkbox等） */
  options?: Array<{
    label: string;
    value: any;
    disabled?: boolean;
  }>;
  /** 联动条件 */
  dependencies?: Array<{
    field: string;
    value: any;
    operator?: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in" | "nin";
  }>;
  /** 自定义属性 */
  props?: Record<string, any>;
  /** 栅格布局配置 */
  span?: number;
  /** 偏移量 */
  offset?: number;
  /** 排序 */
  order?: number;
  /** 是否显示 */
  show?: boolean;
  /** 自定义渲染器 */
  render?: (field: FieldConfig, formData: any) => any;
}

// 表单Schema接口
export interface FormSchema {
  /** 表单标题 */
  title?: string;
  /** 布局类型 */
  layout?: LayoutType;
  /** 栅格配置 */
  grid?: {
    cols?: number;
    gutter?: number;
    justify?: "start" | "end" | "center" | "space-around" | "space-between";
    align?: "top" | "middle" | "bottom";
  };
  /** 字段配置列表 */
  fields: FieldConfig[];
  /** 表单配置 */
  form?: {
    labelWidth?: string;
    labelPosition?: "left" | "right" | "top";
    size?: "large" | "default" | "small";
    disabled?: boolean;
    readonly?: boolean;
  };
}

// 表单数据接口
export interface FormData {
  [key: string]: any;
}

// 表单状态接口
export interface FormState {
  /** 表单数据 */
  data: FormData;
  /** 表单是否有效 */
  valid: boolean;
  /** 错误信息 */
  errors: Record<string, string>;
  /** 加载状态 */
  loading: boolean;
  /** 是否已提交 */
  submitted: boolean;
}

// 事件接口
export interface SchemaFormEvents {
  /** 表单数据变化 */
  "update:modelValue": (value: FormData) => void;
  /** 字段值变化 */
  "field-change": (field: string, value: any, formData: FormData) => void;
  /** 表单提交 */
  submit: (formData: FormData) => void;
  /** 表单重置 */
  reset: () => void;
  /** 表单验证 */
  validate: (valid: boolean, errors: Record<string, string>) => void;
}

// 自定义渲染器接口
export interface CustomRenderer {
  /** 渲染器名称 */
  name: string;
  /** 渲染函数 */
  render: (
    field: FieldConfig,
    formData: FormData,
    updateField: (value: any) => void
  ) => any;
}

// 联动规则接口
export interface LinkageRule {
  /** 触发字段 */
  trigger: string;
  /** 目标字段 */
  target: string;
  /** 条件 */
  condition: {
    operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in" | "nin";
    value: any;
  };
  /** 执行的动作 */
  action: {
    type: "show" | "hide" | "enable" | "disable" | "setValue" | "setOptions";
    value?: any;
  };
}
