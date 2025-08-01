import { defineComponent as r, reactive as a, provide as i, inject as d } from "vue";
const e = Symbol("DaodaThemeConfig"), m = r({
  name: "DaodaConfigProvider",
  props: {
    /**
     * 主题配置对象
     */
    theme: {
      type: Object,
      default: () => ({})
    }
  },
  setup(o, { slots: t }) {
    const n = a(o.theme);
    return i(e, n), () => t.default?.();
  }
});
function p() {
  return d(e, {});
}
export {
  e as DAODA_CONFIG_KEY,
  m as DaodaConfigProvider,
  p as useDaodaConfig
};
