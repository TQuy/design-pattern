type Request = Record<string, any>;
type Next = Function;
type Handler = (req: Request, next: Next) => any;

class Chain {
  private handlers: Array<Handler>;
  constructor() {
    this.handlers = [];
  }

  use(handler: Handler): this {
    this.handlers.push(handler);
    return this; // chainable API
  }

  handle(req: Request) {
    let index = -1;
    const dispatch = (i) => {
      if (i <= index) throw new Error("next() called multiple times");
      index = i;

      const handler = this.handlers[i];
      if (!handler) return "No handler handled it.";

      // handler(req, next)
      return handler(req, () => dispatch(i + 1));
    };

    return dispatch(0);
  }
}

// Usage

const chain = new Chain()
  .use((req: Request, next: Next) => {
    console.log("Handler A");
    if (req.type === "A") return "Handled by A";
    return next();
  })
  .use((req: Request, next: Next) => {
    console.log("Handler B");
    if (req.type === "B") return "Handled by B";
    return next();
  })
  .use((_req: Request, _next: Next) => "No handler found");

console.log(chain.handle({ type: "B" }));
