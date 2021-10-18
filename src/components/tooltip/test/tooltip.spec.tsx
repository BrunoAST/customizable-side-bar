import { h } from "@stencil/core";
import componentSetup from "../../../utils/component-setup/component-setup";
import { Tooltip } from "../tooltip";

describe("Tooltip component", () => {
  test("Should have tooltip role", async () => {
    const { shadowRoot } = await componentSetup(
      <rh-tooltip />,
      Tooltip
    );
    expect(shadowRoot.querySelector("span").getAttribute("role")).toBe("tooltip");
  });

  test("Should receive a value", async () => {
    const { shadowRoot } = await componentSetup(
      <rh-tooltip value="Hover me" ariaDescribedBy="some-id">Tooltip</rh-tooltip>,
      Tooltip
    );
    expect(shadowRoot.querySelector("span").getAttribute("data-text")).toBe("Hover me");
    expect(shadowRoot.querySelector("span").getAttribute("id")).toBe("some-id");
    expect(document.querySelector("rh-tooltip").textContent).toBe("Tooltip");
  });

  test("Should have position top by default", async () => {
    const { shadowRoot } = await componentSetup(
      <rh-tooltip />,
      Tooltip
    );
    expect(shadowRoot.querySelector("span").classList.contains("top")).toBeTruthy();
  });

  test("Should set position bottom", async () => {
    const { shadowRoot } = await componentSetup(
      <rh-tooltip position="bottom" />,
      Tooltip
    );
    expect(shadowRoot.querySelector("span").classList.contains("bottom")).toBeTruthy();
  });

  test("Should set position left", async () => {
    const { shadowRoot } = await componentSetup(
      <rh-tooltip position="left" />,
      Tooltip
    );
    expect(shadowRoot.querySelector("span").classList.contains("left")).toBeTruthy();
  });

  test("Should set position right", async () => {
    const { shadowRoot } = await componentSetup(
      <rh-tooltip position="right" />,
      Tooltip
    );
    expect(shadowRoot.querySelector("span").classList.contains("right")).toBeTruthy();
  });
});
