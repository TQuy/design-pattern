class Document {
  private content = "";

  setContent(text: string) {
    this.content = text;
  }

  getContent() {
    return this.content;
  }

  save() {
    return new Memento(this.content);
  }

  restore(m: Memento) {
    this.content = m.getState();
  }
}

class Memento {
  constructor(private readonly state: string) {}

  getState() {
    return this.state;
  }
}

class History {
  private stack: Memento[] = [];

  push(m: Memento) {
    this.stack.push(m);
  }

  pop() {
    return this.stack.pop();
  }
}

// usage
const doc = new Document();
const history = new History();

doc.setContent("Hello");
history.push(doc.save());

doc.setContent("Hello world");
history.push(doc.save());

doc.setContent("Hello world!");
console.log(doc.getContent()); // Hello world!

doc.restore(history.pop()!);
console.log(doc.getContent()); // Hello world

doc.restore(history.pop()!);
console.log(doc.getContent()); // Hello
