interface Order {
  status: "PENDING" | "PAID" | "SHIPPED" | "CANCELLED" | "COMPLETED";
  id: string;
}

export const PendingState = {
  pay: (order: Order) => {
    return {
      ...order,
      status: "PAID",
    };
  },

  cancel: (order: Order) => {
    return {
      ...order,
      status: "CANCELLED",
    };
  },
};

export const PaidState = {
  ship: (order: Order) => {
    return {
      ...order,
      status: "SHIPPED",
    };
  },
};

export const ShippedState = {
  complete: (order: Order) => {
    return {
      ...order,
      status: "COMPLETED",
    };
  },
};

export const CancelledState = {
  noop: (order: Order) => {
    return order;
  },
};

export const States: Record<string, any> = {
  PENDING: PendingState,
  PAID: PaidState,
  SHIPPED: ShippedState,
  CANCELLED: CancelledState,
};

export const transition = (order: Order, action: string) => {
  const state = States[order.status];

  if (!state) {
    throw new Error("Unknown state: " + order.status);
  }

  const handler = state[action];

  if (!handler) {
    throw new Error(
      `Action "${action}" is not allowed in state "${order.status}"`
    );
  }

  return handler(order);
};

function main() {
  let order: Order = { id: "1", status: "PENDING" };

  order = transition(order, "pay");
  console.log(order.status); // PAID

  order = transition(order, "ship");
  console.log(order.status); // SHIPPED

  order = transition(order, "complete");
  console.log(order.status); // COMPLETED
}

main();
