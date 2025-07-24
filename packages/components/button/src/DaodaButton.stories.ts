import DaodaButton from "./Button.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta: Meta<typeof DaodaButton> = {
  title: "DaodaButton",
  component: DaodaButton,
  argTypes: {
    type: {
      control: "select",
      options: [
        "default",
        "primary",
        "success",
        "warning",
        "danger",
        "info",
        "text",
      ],
    },
    throttle: { control: "boolean" },
    throttleTime: { control: "number" },
    prefixCls: { control: "text" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof DaodaButton>;

export const Basic: Story = {
  args: {
    type: "primary",
    children: "主要按钮",
  },
  render: (args) => ({
    components: { DaodaButton },
    setup: () => ({ args }),
    template: '<DaodaButton v-bind="args">主要按钮</DaodaButton>',
  }),
};

export const Throttle: Story = {
  args: {
    throttle: true,
    throttleTime: 1500,
    type: "success",
  },
  render: (args) => ({
    components: { DaodaButton },
    setup: () => ({ args }),
    template: '<DaodaButton v-bind="args">节流按钮（1.5s）</DaodaButton>',
  }),
};

export const WithPrefixCls: Story = {
  args: {
    prefixCls: "my",
    type: "warning",
  },
  render: (args) => ({
    components: { DaodaButton },
    setup: () => ({ args }),
    template: '<DaodaButton v-bind="args">自定义前缀 class</DaodaButton>',
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    type: "danger",
  },
  render: (args) => ({
    components: { DaodaButton },
    setup: () => ({ args }),
    template: '<DaodaButton v-bind="args">禁用按钮</DaodaButton>',
  }),
};
