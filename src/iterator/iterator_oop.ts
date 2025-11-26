class ArrayIterator {
  private index = 0;

  constructor(private items: any[]) {}

  next() {
    if (this.index < this.items.length) {
      return { value: this.items[this.index++], done: false };
    }
    return { value: undefined, done: true };
  }
}
