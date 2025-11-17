type Memento<T> = T;
type DocumentMememto = {
  content: string;
};

class Document {
  private content: string;
  constructor(data?: DocumentMememto) {
    this.content = data?.content || "";
  }
  setContent(text: string) {
    this.content = text;
  }
  getContent() {
    return this.content;
  }
  save(): Memento<DocumentMememto> {
    return {
      content: this.content,
    };
  }
  load(data: DocumentMememto) {
    return new Document(data);
  }
}

type History<T> = T[];

const createHistory = <T>() => {
  return {
    list: [] as History<T>,
    push(m: Memento<T>) {
      this.list.push(m);
    },
    pop(): Memento<T> | undefined {
      return this.list.pop();
    },
  };
};

const document = new Document();
const history = createHistory<DocumentMememto>();
document.setContent("Hello");
history.push(document.save());
document.setContent("Hi");
history.push(document.save());
let loadDocument = new Document(history.pop());
console.log(`Document's content: ${loadDocument.getContent()}`);
loadDocument = new Document(history.pop());
console.log(`Document's content: ${loadDocument.getContent()}`);
