/**
 * 表单校验器
 */

import type { FormItemRule } from "element-plus";
import type { FieldConfig, FormData } from "./types";

// 内置校验规则
export const builtinRules = {
  required: (message = "此字段为必填项") => ({
    required: true,
    message,
    trigger: "blur",
  }),

  email: (message = "请输入正确的邮箱地址") => ({
    type: "email",
    message,
    trigger: "blur",
  }),

  phone: (message = "请输入正确的手机号码") => ({
    pattern: /^1[3-9]\d{9}$/,
    message,
    trigger: "blur",
  }),

  url: (message = "请输入正确的URL地址") => ({
    type: "url",
    message,
    trigger: "blur",
  }),

  number: (message = "请输入数字") => ({
    type: "number",
    message,
    trigger: "blur",
  }),

  integer: (message = "请输入整数") => ({
    pattern: /^-?\d+$/,
    message,
    trigger: "blur",
  }),

  positive: (message = "请输入正数") => ({
    validator: (rule: any, value: any, callback: any) => {
      if (value === "" || value === null || value === undefined) {
        callback();
        return;
      }
      if (Number(value) <= 0) {
        callback(new Error(message));
      } else {
        callback();
      }
    },
    trigger: "blur",
  }),

  min: (min: number, message?: string) => ({
    min,
    message: message || `最小值为 ${min}`,
    trigger: "blur",
  }),

  max: (max: number, message?: string) => ({
    max,
    message: message || `最大值为 ${max}`,
    trigger: "blur",
  }),

  minLength: (min: number, message?: string) => ({
    min,
    message: message || `最小长度为 ${min}`,
    trigger: "blur",
  }),

  maxLength: (max: number, message?: string) => ({
    max,
    message: message || `最大长度为 ${max}`,
    trigger: "blur",
  }),

  pattern: (pattern: RegExp, message = "格式不正确") => ({
    pattern,
    message,
    trigger: "blur",
  }),

  custom: (
    validator: (value: any, formData: FormData) => boolean | string,
    message?: string
  ) => ({
    validator: (rule: any, value: any, callback: any) => {
      if (value === "" || value === null || value === undefined) {
        callback();
        return;
      }
      const result = validator(value, rule.formData || {});
      if (result === true) {
        callback();
      } else {
        callback(
          new Error(typeof result === "string" ? result : message || "校验失败")
        );
      }
    },
    trigger: "blur",
  }),
};

// 根据字段类型生成默认校验规则
export function generateDefaultRules(field: FieldConfig): FormItemRule[] {
  const rules: FormItemRule[] = [];

  // 必填校验
  if (field.required) {
    rules.push(builtinRules.required());
  }

  // 根据字段类型添加特定校验
  switch (field.type) {
    case "input":
      // 文本输入框可以添加长度限制
      if (field.props?.maxLength) {
        rules.push(builtinRules.maxLength(field.props.maxLength));
      }
      if (field.props?.minLength) {
        rules.push(builtinRules.minLength(field.props.minLength));
      }
      break;

    case "number":
      // 数字输入框
      rules.push(builtinRules.number());
      if (field.props?.min !== undefined) {
        rules.push(builtinRules.min(field.props.min));
      }
      if (field.props?.max !== undefined) {
        rules.push(builtinRules.max(field.props.max));
      }
      break;

    case "select":
    case "radio":
      // 选择类组件必须选择值
      if (field.required) {
        rules.push({
          required: true,
          message: "请选择一项",
          trigger: "change",
        });
      }
      break;

    case "checkbox":
      // 复选框至少选择一个
      if (field.required) {
        rules.push({
          required: true,
          message: "请至少选择一项",
          trigger: "change",
          validator: (rule: any, value: any, callback: any) => {
            if (!value || (Array.isArray(value) && value.length === 0)) {
              callback(new Error("请至少选择一项"));
            } else {
              callback();
            }
          },
        });
      }
      break;

    case "date":
    case "datetime":
    case "time":
      // 日期类组件
      if (field.required) {
        rules.push({
          required: true,
          message: "请选择日期",
          trigger: "change",
        });
      }
      break;

    case "upload":
      // 上传组件
      if (field.required) {
        rules.push({
          required: true,
          message: "请上传文件",
          trigger: "change",
          validator: (rule: any, value: any, callback: any) => {
            if (!value || (Array.isArray(value) && value.length === 0)) {
              callback(new Error("请上传文件"));
            } else {
              callback();
            }
          },
        });
      }
      break;
  }

  return rules;
}

// 合并校验规则
export function mergeRules(
  field: FieldConfig,
  formData: FormData
): FormItemRule[] {
  const defaultRules = generateDefaultRules(field);
  const customRules = field.rules || [];

  return [...defaultRules, ...customRules];
}

// 校验单个字段
export function validateField(
  field: FieldConfig,
  value: any,
  formData: FormData
): Promise<{ valid: boolean; message?: string }> {
  return new Promise((resolve) => {
    const rules = mergeRules(field, formData);

    if (rules.length === 0) {
      resolve({ valid: true });
      return;
    }

    // 模拟Element Plus的校验逻辑
    let valid = true;
    let message = "";

    for (const rule of rules) {
      if (
        rule.required &&
        (value === "" || value === null || value === undefined)
      ) {
        valid = false;
        message = rule.message as string;
        break;
      }

      if (rule.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          valid = false;
          message = rule.message as string;
          break;
        }
      }

      if (rule.type === "url" && value) {
        try {
          new URL(value);
        } catch {
          valid = false;
          message = rule.message as string;
          break;
        }
      }

      if (rule.type === "number" && value) {
        if (isNaN(Number(value))) {
          valid = false;
          message = rule.message as string;
          break;
        }
      }

      if (rule.pattern && value) {
        if (!rule.pattern.test(value)) {
          valid = false;
          message = rule.message as string;
          break;
        }
      }

      if (
        rule.min !== undefined &&
        value !== "" &&
        value !== null &&
        value !== undefined
      ) {
        if (Number(value) < rule.min) {
          valid = false;
          message = rule.message as string;
          break;
        }
      }

      if (
        rule.max !== undefined &&
        value !== "" &&
        value !== null &&
        value !== undefined
      ) {
        if (Number(value) > rule.max) {
          valid = false;
          message = rule.message as string;
          break;
        }
      }

      if (rule.validator) {
        rule.validator(rule, value, (error?: Error) => {
          if (error) {
            valid = false;
            message = error.message;
          }
        });
        if (!valid) break;
      }
    }

    resolve({ valid, message: valid ? undefined : message });
  });
}

// 校验整个表单
export function validateForm(
  fields: FieldConfig[],
  formData: FormData
): Promise<{ valid: boolean; errors: Record<string, string> }> {
  return new Promise(async (resolve) => {
    const errors: Record<string, string> = {};
    let valid = true;

    for (const field of fields) {
      if (field.show === false) continue;

      const result = await validateField(field, formData[field.name], formData);
      if (!result.valid) {
        valid = false;
        errors[field.name] = result.message || "校验失败";
      }
    }

    resolve({ valid, errors });
  });
}

// 获取字段的错误信息
export function getFieldError(
  field: FieldConfig,
  value: any,
  formData: FormData
): string | undefined {
  // 这里可以实现同步校验逻辑
  // 为了简化，这里返回undefined，实际校验由validateField处理
  return undefined;
}
