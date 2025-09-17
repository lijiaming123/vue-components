import { App } from "vue";
import SchemaForm from "./SchemaForm.vue";

// 导出组件
export default SchemaForm;

// 导出类型
export type {
  FieldType,
  LayoutType,
  FieldConfig,
  FormSchema,
  FormData,
  FormState,
  SchemaFormEvents,
  CustomRenderer,
  LinkageRule,
} from "./types";

// 导出工具函数
export {
  checkLinkageCondition,
  executeLinkageRules,
  extractLinkageRules,
  shouldShowField,
  shouldDisableField,
  filterVisibleFields,
  sortFields,
} from "./linkage";

export {
  builtinRules,
  generateDefaultRules,
  mergeRules,
  validateField,
  validateForm,
} from "./validator";

export { renderers } from "./renderers";

// 安装函数
export function install(app: App) {
  app.component("SchemaForm", SchemaForm);
}

// 自动安装
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
