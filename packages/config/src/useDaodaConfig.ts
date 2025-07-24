import { inject } from "vue";
import { DAODA_CONFIG_KEY, DaodaThemeConfig } from "./DaodaConfigProvider";

export function useDaodaConfig(): DaodaThemeConfig {
  return inject(DAODA_CONFIG_KEY, {}) as DaodaThemeConfig;
}
