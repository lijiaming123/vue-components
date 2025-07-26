import { defineComponent, provide, InjectionKey, reactive } from "vue";

export interface DaodaThemeConfig {
  primaryColor?: string;
  borderRadius?: string;
  fontSize?: string;
  // 可扩展更多全局样式变量
}

export const DAODA_CONFIG_KEY: InjectionKey<DaodaThemeConfig> =
  Symbol("DaodaThemeConfig");

export const DaodaConfigProvider = defineComponent({
  name: "DaodaConfigProvider",
  props: {
    theme: {
      type: Object as () => DaodaThemeConfig,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    const theme = reactive(props.theme);
    provide(DAODA_CONFIG_KEY, theme);
    return () => slots.default?.();
  },
});
