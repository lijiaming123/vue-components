import { defineComponent, provide, InjectionKey, reactive } from "vue";

/**
 * Daoda 主题配置接口
 * 可扩展更多全局样式变量
 */
export interface DaodaThemeConfig {
  /** 主题主色 */
  primaryColor?: string;
  /** 圆角 */
  borderRadius?: string;
  /** 字体大小 */
  fontSize?: string;
  // 可扩展更多全局样式变量
}

/**
 * Daoda 主题配置的注入 key
 */
export const DAODA_CONFIG_KEY: InjectionKey<DaodaThemeConfig> =
  Symbol("DaodaThemeConfig");

/**
 * DaodaConfigProvider 组件
 * 用于全局提供主题配置
 */
export const DaodaConfigProvider = defineComponent({
  name: "DaodaConfigProvider",
  props: {
    /**
     * 主题配置对象
     */
    theme: {
      type: Object as () => DaodaThemeConfig,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    // 响应式主题配置
    const theme = reactive(props.theme);
    // 提供主题配置到全局
    provide(DAODA_CONFIG_KEY, theme);
    // 渲染默认插槽
    return () => slots.default?.();
  },
});
