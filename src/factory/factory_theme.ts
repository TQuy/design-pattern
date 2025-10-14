interface Button {
  render(): void;
}

interface TextField {
  render(): void;
}

interface UIFactory {
  createButton(): Button;
  createTextField(): TextField;
}

class LightButton implements Button {
  render(): void {
    console.log("Rendering Light Button");
  }
}

class DarkButton implements Button {
  render(): void {
    console.log("Rendering Dark Button");
  }
}

class LightTextField implements TextField {
  render(): void {
    console.log("Rendering Light TextField");
  }
}

class DarkTextField implements TextField {
  render(): void {
    console.log("Rendering Dark TextField");
  }
}

export class LightUIFactory implements UIFactory {
  createButton(): Button {
    return new LightButton();
  }
  createTextField(): TextField {
    return new LightTextField();
  }
}

export class DarkUIFactory implements UIFactory {
  createButton(): Button {
    return new DarkButton();
  }
  createTextField(): TextField {
    return new DarkTextField();
  }
}

export class UIApp {
  constructor(private themeFactory: UIFactory) {
    this.themeFactory = themeFactory;
  }

  renderUI() {
    const button = this.themeFactory.createButton();
    button.render();
    const textField = this.themeFactory.createTextField();
    textField.render();
  }
}

const darkApp = new UIApp(new DarkUIFactory());
darkApp.renderUI();

const lightApp = new UIApp(new LightUIFactory());
lightApp.renderUI();
