type Request = { user?: string; body?: any };
type Handler = (req: Request, next: () => void) => void;

const logger: Handler = (req, next) => {
  console.log("Logging request:", req);
  return next();
};

const auth: Handler = (req, next) => {
  if (!req.user) {
    console.log("Unauthorized request");
    return;
  }
  console.log("Authenticated user:", req.user);
  return next();
};

const validate: Handler = (req, next) => {
  if (!req.body?.data) {
    console.log("Invalid request body");
    return;
  }
  console.log("Validated payload");
  return next();
};

const business: Handler = (req) => {
  console.log("Processing business logic with data:", req.body.data);
};

const chainHandlers = (...handlers: Handler[]) => {
  return (req: Request) => {
    let index = -1;
    const next = () => {
      index++;
      if (index < handlers.length) {
        handlers[index]!(req, next);
      }
    };
    next();
  };
};

const pipeline = chainHandlers(logger, auth, validate, business);

pipeline({
  user: "Alice",
  body: { data: "Order123" },
});
