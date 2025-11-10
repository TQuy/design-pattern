class CharacterStyle {
  constructor(public font: string, public size: number, public color: string) { }
}

// Flyweight Factory — manages shared styles
class CharacterStyleFactory {
  private styles = new Map<string, CharacterStyle>();

  getStyle(font: string, size: number, color: string): CharacterStyle {
    const key = `${font}-${size}-${color}`;
    if (!this.styles.has(key)) {
      this.styles.set(key, new CharacterStyle(font, size, color));
    }
    return this.styles.get(key)!;
  }
}

// Context object with unique state
class Character {
  constructor(public char: string, public x: number, public y: number, public style: CharacterStyle) { }
}

// Usage
const styleFactory = new CharacterStyleFactory();

const text = [
  new Character("H", 0, 0, styleFactory.getStyle("Arial", 12, "black")),
  new Character("i", 10, 0, styleFactory.getStyle("Arial", 12, "black")),
];

console.log(text);