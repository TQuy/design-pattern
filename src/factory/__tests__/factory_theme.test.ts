import { UIApp, DarkUIFactory, LightUIFactory } from "~/factory/factory_theme";

describe("Abstract Factory Pattern - Theme Example", () => {
  it("should render dark theme UI components", () => {
    const darkApp = new UIApp(new DarkUIFactory());
    darkApp.renderUI();
    // Expected output:
    // Rendering Dark Button
    // Rendering Dark TextField
  });

  it("should render light theme UI components", () => {
    const lightApp = new UIApp(new LightUIFactory());
    lightApp.renderUI();
    // Expected output:
    // Rendering Light Button
    // Rendering Light TextField
  });
});