// 导出所有组件
export { default as Button } from "../packages/components/button/src/index";
export { default as Select } from "../packages/components/select/src/index";

// 导出配置相关
export {
  DaodaConfigProvider,
  useDaodaConfig,
} from "../packages/config/src/index";

// 导出工具函数
export { throttle, debounce } from "../packages/utils/src/index";

// 导出类型定义
export type { DaodaButtonProps } from "../packages/components/button/src/Button.vue";
export type { DaodaThemeConfig } from "../packages/config/src/DaodaConfigProvider";

// 默认导出
export default {
  Button,
  Select,
  DaodaConfigProvider,
  useDaodaConfig,
  throttle,
  debounce,
};
