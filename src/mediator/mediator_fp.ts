type PaymentRequest = {
  userId: string;
  amount: number;
  method: "stripe" | "paypal" | "internal";
};

const StripeService = {
  process: (req: PaymentRequest) => {
    console.log(`💳 [Stripe] Processing $${req.amount} for ${req.userId}`);
    return { status: "success", txId: `stripe_${Date.now()}` };
  },
};

const PayPalService = {
  process: (req: PaymentRequest) => {
    console.log(`💰 [PayPal] Processing $${req.amount} for ${req.userId}`);
    return { status: "success", txId: `paypal_${Date.now()}` };
  },
};

const InternalBalanceService = {
  process: (req: PaymentRequest) => {
    console.log(
      `🏦 [Internal] Deducting $${req.amount} from ${req.userId}'s balance`
    );
    return { status: "success", txId: `internal_${Date.now()}` };
  },
};

const NotificationService = {
  send: (userId: string, message: string) => {
    console.log(`📨 Notifying ${userId}: ${message}`);
  },
};

const AuditService = {
  log: (event: string, data: any) => {
    console.log(`📜 [Audit] ${event}:`, data);
  },
};

type Mediator = {
  register: (name: string, component: any) => void;
  send: (from: string, event: string, payload?: any) => any;
};

const createMediator = (): Mediator => {
  const components = new Map();

  const register = (name: string, component: any) => {
    components.set(name, component);
  };

  const send = (from: string, event: string, payload?: any) => {
    switch (event) {
      case "processPayment": {
        const { method, ...req } = payload;
        let result;
        if (method === "stripe") result = components.get("stripe").process(req);
        if (method === "paypal") result = components.get("paypal").process(req);
        if (method === "internal")
          result = components.get("internal").process(req);

        components.get("audit").log("payment", { from, ...result });
        components
          .get("notification")
          .send(req.userId, `Payment successful via ${method}`);
        return result;
      }

      default:
        throw new Error(`Unknown event: ${event}`);
    }
  };

  return { register, send };
};

const mediator = createMediator();

mediator.register("stripe", StripeService);
mediator.register("paypal", PayPalService);
mediator.register("internal", InternalBalanceService);
mediator.register("notification", NotificationService);
mediator.register("audit", AuditService);

const payment1 = {
  userId: "alice",
  amount: 100,
  method: "stripe",
};

const payment2 = {
  userId: "bob",
  amount: 50,
  method: "internal",
};

mediator.send("PaymentAPI", "processPayment", payment1);
mediator.send("PaymentAPI", "processPayment", payment2);
