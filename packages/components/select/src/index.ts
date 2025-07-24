import { App } from "vue";
import Select from "./Select.vue";

export { Select };

export default {
  install(app: App) {
    app.component("DaodaSelect", Select);
  },
};
