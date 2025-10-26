type SenderFunction = (recipient: string, message: string) => Promise<void>;

abstract class Sender {
  abstract handler: SenderFunction;
  send: SenderFunction = (recipient: string, message: string) => {
    return this.handler(recipient, message);
  };

  compose(...fns: ((arg: SenderFunction) => SenderFunction)[]): this {
    this.handler = fns.reduceRight((v, f) => f(v), this.handler);
    return this;
  }
}

class EmailSender extends Sender {
  handler: SenderFunction = async (
    recipient: string,
    message: string
  ): Promise<void> => {
    console.log(`Sending Email to ${recipient}: ${message}`);
  };
}
class SMSSender extends Sender {
  handler: SenderFunction = async (
    recipient: string,
    message: string
  ): Promise<void> => {
    console.log(`Sending SMS to ${recipient}: ${message}`);
  };
}

abstract class UserNotification {
  constructor(private sender: Sender) {
    this.sender = sender;
  }
  abstract send(recipient: string, message: string): Promise<void>;
}

class AlertNotification extends UserNotification {
  constructor(private sender: Sender) {
    super(sender);
  }
  async send(recipient: string, message: string): Promise<void> {
    await this.sender.send(recipient, "[ALERT] Server CPU at 95%");
  }
}

class MarketingNotification extends UserNotification {
  constructor(private sender: Sender) {
    super(sender);
  }
  async send(recipient: string, message: string): Promise<void> {
    await this.sender.send(recipient, "[PROMO] Flash Sale: 50% off!");
  }
}

const withLogging = (sender: SenderFunction): SenderFunction => {
  return async (recipient, message) => {
    console.log(`[LOG] Sending to ${recipient}...`);
    await sender(recipient, message);
  };
};

const withRetry = (sender: SenderFunction, retries = 3): SenderFunction => {
  return async (recipient, message) => {
    let retryCount = retries;
    while (retryCount > 0) {
      try {
        await sender(recipient, message);
        break;
      } catch (error) {
        retryCount--;
      }
    }
  };
};

const withMetrics = (sender: SenderFunction): SenderFunction => {
  return async (recipient, message) => {
    const start = Date.now();
    await sender(recipient, message);
    console.log(`📊 Sent in ${Date.now() - start}ms`);
  };
};

const alertNotification = new AlertNotification(
  new EmailSender().compose(withLogging, withRetry, withMetrics)
);
alertNotification.send("user@example.com", "");
