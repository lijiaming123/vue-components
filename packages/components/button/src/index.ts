import { defineComponent, h, PropType, computed } from "vue";
import { useDaodaConfig } from "@daoda-component/config";
import { ElButton } from "element-plus";

const DaodaButton = defineComponent({
  name: "DaodaButton",
  props: {
    label: String,
    onClick: Function as PropType<() => void>,
  },
  setup(props, { slots }) {
    const theme = useDaodaConfig();
    const style = computed(() => ({
      background: theme.primaryColor || undefined,
      borderRadius: theme.borderRadius || undefined,
      fontSize: theme.fontSize || undefined,
    }));
    return () =>
      h(
        ElButton,
        {
          style: style.value,
          onClick: props.onClick,
        },
        slots.default ? slots.default() : props.label
      );
  },
});

export default DaodaButton;
export * from "element-plus"; // 如果你想透传类型等
