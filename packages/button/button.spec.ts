import { render, fireEvent } from "@testing-library/vue";
import { vi } from "vitest";
import Button from "./src/index";

describe("Button", () => {
  it("renders label", () => {
    const { getByText } = render(Button, { props: { label: "Click Me" } });
    expect(getByText("Click Me")).toBeTruthy();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    const { getByText } = render(Button, {
      props: { label: "Click", onClick },
    });
    await fireEvent.click(getByText("Click"));
    expect(onClick).toHaveBeenCalled();
  });
});
