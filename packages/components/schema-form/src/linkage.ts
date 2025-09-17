/**
 * 联动规则处理器
 */

import type { FieldConfig, FormData, LinkageRule } from "./types";

// 操作符处理器
const operators = {
  eq: (value: any, target: any) => value === target,
  ne: (value: any, target: any) => value !== target,
  gt: (value: any, target: any) => value > target,
  gte: (value: any, target: any) => value >= target,
  lt: (value: any, target: any) => value < target,
  lte: (value: any, target: any) => value <= target,
  in: (value: any, target: any[]) =>
    Array.isArray(target) && target.includes(value),
  nin: (value: any, target: any[]) =>
    Array.isArray(target) && !target.includes(value),
};

// 检查联动条件
export function checkLinkageCondition(
  dependencies: FieldConfig["dependencies"],
  formData: FormData
): boolean {
  if (!dependencies || !Array.isArray(dependencies)) {
    return true;
  }

  return dependencies.every((dep) => {
    const fieldValue = formData[dep.field];
    const operator = dep.operator || "eq";
    const operatorFn = operators[operator];

    if (!operatorFn) {
      console.warn(`Unknown operator: ${operator}`);
      return false;
    }

    return operatorFn(fieldValue, dep.value);
  });
}

// 执行联动动作
export function executeLinkageAction(
  rule: LinkageRule,
  formData: FormData,
  updateFormData: (data: FormData) => void,
  updateFieldConfig: (fieldName: string, config: Partial<FieldConfig>) => void
) {
  const triggerValue = formData[rule.trigger];
  const { operator, value } = rule.condition;
  const operatorFn = operators[operator];

  if (!operatorFn || !operatorFn(triggerValue, value)) {
    return;
  }

  const { type, value: actionValue } = rule.action;
  const fieldName = rule.target;

  switch (type) {
    case "show":
      updateFieldConfig(fieldName, { show: true });
      break;
    case "hide":
      updateFieldConfig(fieldName, { show: false });
      break;
    case "enable":
      updateFieldConfig(fieldName, { disabled: false });
      break;
    case "disable":
      updateFieldConfig(fieldName, { disabled: true });
      break;
    case "setValue":
      updateFormData({ ...formData, [fieldName]: actionValue });
      break;
    case "setOptions":
      updateFieldConfig(fieldName, { options: actionValue });
      break;
    default:
      console.warn(`Unknown action type: ${type}`);
  }
}

// 批量执行联动规则
export function executeLinkageRules(
  rules: LinkageRule[],
  formData: FormData,
  updateFormData: (data: FormData) => void,
  updateFieldConfig: (fieldName: string, config: Partial<FieldConfig>) => void
) {
  rules.forEach((rule) => {
    executeLinkageAction(rule, formData, updateFormData, updateFieldConfig);
  });
}

// 从字段配置中提取联动规则
export function extractLinkageRules(fields: FieldConfig[]): LinkageRule[] {
  const rules: LinkageRule[] = [];

  fields.forEach((field) => {
    if (field.dependencies) {
      field.dependencies.forEach((dep) => {
        rules.push({
          trigger: dep.field,
          target: field.name,
          condition: {
            operator: dep.operator || "eq",
            value: dep.value,
          },
          action: {
            type: "show", // 默认显示/隐藏
          },
        });
      });
    }
  });

  return rules;
}

// 检查字段是否应该显示
export function shouldShowField(
  field: FieldConfig,
  formData: FormData
): boolean {
  if (field.show === false) {
    return false;
  }

  return checkLinkageCondition(field.dependencies, formData);
}

// 检查字段是否应该禁用
export function shouldDisableField(
  field: FieldConfig,
  formData: FormData
): boolean {
  if (field.disabled === true) {
    return true;
  }

  // 可以根据联动规则动态禁用
  return false;
}

// 获取字段的有效配置
export function getEffectiveFieldConfig(
  field: FieldConfig,
  formData: FormData
): FieldConfig {
  return {
    ...field,
    show: shouldShowField(field, formData),
    disabled: shouldDisableField(field, formData),
  };
}

// 过滤可见字段
export function filterVisibleFields(
  fields: FieldConfig[],
  formData: FormData
): FieldConfig[] {
  return fields
    .map((field) => getEffectiveFieldConfig(field, formData))
    .filter((field) => field.show !== false);
}

// 排序字段
export function sortFields(fields: FieldConfig[]): FieldConfig[] {
  return [...fields].sort((a, b) => {
    const orderA = a.order || 0;
    const orderB = b.order || 0;
    return orderA - orderB;
  });
}
