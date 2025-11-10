type Subscriber = (data: any) => void;

const createObservable = () => {
  const subscribers: Subscriber[] = [];

  const subscribe = (fn: Subscriber) => {
    subscribers.push(fn);
    return () => {  // returns an unsubscribe function
      const index = subscribers.indexOf(fn);
      if (index >= 0) subscribers.splice(index, 1);
    };
  };

  const notify = (data: any) => {
    for (const fn of subscribers) {
      fn(data);
    }
  };

  return { subscribe, notify };
};

// Usage
const orderEvents = createObservable();

const unsubscribeEmail = orderEvents.subscribe((data) => {
  console.log(`📧 Emailing customer: ${data}`);
});

orderEvents.subscribe((data) => {
  console.log(`🧾 Logging event: ${data}`);
});

orderEvents.notify("Order #42 confirmed");
unsubscribeEmail();
orderEvents.notify("Order #43 confirmed");
