import { h } from "@stencil/core";
import faker from "faker";
import componentSetup from "../../../utils/component-setup/component-setup";
import { TextArea } from "../text-area";

const textArea = (shadowRoot: ShadowRoot): HTMLTextAreaElement => {
  return shadowRoot.querySelector("textarea");
}

describe("Text area component", () => {
  test("Should receive a name", async () => {
    const name = faker.random.word();
    const { shadowRoot } = await componentSetup(<rh-text-area name={name} />, TextArea);
    expect(textArea(shadowRoot).getAttribute("name")).toBe(name);
  });

  test("Should receive a placeholder", async () => {
    const placeholder = faker.random.word();
    const { shadowRoot } = await componentSetup(<rh-text-area placeholder={placeholder} />, TextArea);
    expect(textArea(shadowRoot).getAttribute("placeholder")).toBe(placeholder);
  });

  test("Should receive an ariaLabel", async () => {
    const ariaLabel = faker.random.word();
    const { shadowRoot } = await componentSetup(<rh-text-area ariaLabel={ariaLabel} />, TextArea);
    expect(textArea(shadowRoot).getAttribute("aria-label")).toBe(ariaLabel);
  });

  test("Should start with 20 cols by default", async () => {
    const { shadowRoot } = await componentSetup(<rh-text-area />, TextArea);
    expect(textArea(shadowRoot).getAttribute("cols")).toBe("20");
  });

  test("Should receive cols", async () => {
    const { shadowRoot } = await componentSetup(<rh-text-area cols={30} />, TextArea);
    expect(textArea(shadowRoot).getAttribute("cols")).toBe("30");
  });

  test("Should start with 3 rows by default", async () => {
    const { shadowRoot } = await componentSetup(<rh-text-area />, TextArea);
    expect(textArea(shadowRoot).getAttribute("rows")).toBe("3");
  });

  test("Should receive rows", async () => {
    const { shadowRoot } = await componentSetup(<rh-text-area rows={10} />, TextArea);
    expect(textArea(shadowRoot).getAttribute("rows")).toBe("10");
  });

  test("Should emit the value", async () => {
    const expectedValue = faker.random.word();
    let value;
    const { shadowRoot } = await componentSetup(
      <rh-text-area onValue={(event: CustomEvent) => value = event.detail} />,
      TextArea
    );
    textArea(shadowRoot).value = expectedValue;
    textArea(shadowRoot).dispatchEvent(new Event("input"));
    expect(value).toBe(expectedValue);
  });

  describe("isRequired", () => {
    test("Should start with isRequired false", async () => {
      const { shadowRoot } = await componentSetup(<rh-text-area />, TextArea);
      expect(textArea(shadowRoot).hasAttribute("required")).toBeFalsy();
      expect(textArea(shadowRoot).hasAttribute("aria-required")).toBeFalsy();
    });

    test("Should set isRequired to true", async () => {
      const { shadowRoot } = await componentSetup(<rh-text-area isRequired label={faker.random.word()} />, TextArea);
      expect(textArea(shadowRoot).hasAttribute("required")).toBeTruthy();
      expect(textArea(shadowRoot).hasAttribute("aria-required")).toBeTruthy();
    });
  });

  describe("isInvalid", () => {
    test("Should start with isInvalid false", async () => {
      const { shadowRoot } = await componentSetup(<rh-text-area />, TextArea);
      expect(textArea(shadowRoot).hasAttribute("aria-invalid")).toBeFalsy();
    });

    test("Should set isInvalid to true", async () => {
      const { shadowRoot } = await componentSetup(<rh-text-area isInvalid />, TextArea);
      expect(textArea(shadowRoot).hasAttribute("aria-invalid")).toBeTruthy();
    });

    test("Should set invalid classes when isInvalid is true", async () => {
      const { shadowRoot } = await componentSetup(<rh-text-area isInvalid />, TextArea);
      expect(textArea(shadowRoot).classList.contains("invalid-input")).toBeTruthy();
    });
  });
});
