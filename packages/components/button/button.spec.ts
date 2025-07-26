// 引入 Vue 组件测试库中的渲染函数和触发事件工具
import { render, fireEvent } from "@testing-library/vue";
// 引入 Vitest 的 mock 函数工具（类似 Jest 的 jest.fn）
import { vi } from "vitest";
// 引入要测试的组件（路径为相对路径）
import Button from "./src/index";

// 使用 Vitest 的 describe 创建一个测试套件，命名为 "Button"
describe("Button", () => {
  // 第一个测试：验证按钮是否正确渲染出 label 文本
  it("renders label", () => {
    // 使用 render 渲染 Button 组件，并传入 props（label 属性）
    const { getByText } = render(Button, { props: { label: "Click Me" } });

    // 断言：页面中能找到文本 "Click Me"，说明渲染成功
    expect(getByText("Click Me")).toBeTruthy();
  });

  // 第二个测试：验证点击按钮时是否调用了传入的 onClick 方法
  it("calls onClick when clicked", async () => {
    // 使用 Vitest 的 vi.fn() 创建一个模拟函数，用于监听是否被调用
    const onClick = vi.fn();

    // 渲染 Button 组件并传入 label 和 onClick 事件处理器
    const { getByText } = render(Button, {
      props: { label: "Click", onClick },
    });

    // 模拟用户点击包含文字 "Click" 的按钮
    await fireEvent.click(getByText("Click"));

    // 断言：onClick 模拟函数是否被调用过，表示事件绑定生效
    expect(onClick).toHaveBeenCalled();
  });
});
