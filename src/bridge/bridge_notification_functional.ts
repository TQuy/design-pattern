console.log("hello");
type Sender = (recipient: string, message: string) => Promise<void>;

const EmailSender: Sender = async function (recipient, message) {
  console.log(`Sending Email to ${recipient}: ${message}`);
};

const SMSSender: Sender = async function (recipient, message) {
  console.log(`Sending SMS to ${recipient}: ${message}`);
};

type UserNotification = (send: Sender, recipient: string) => Promise<void>;

const AlertNotification: UserNotification = async (send, recipient) => {
  await send(recipient, "[ALERT] Server CPU at 95%");
};

const MarketingNotification: UserNotification = async (send, recipient) => {
  await send(recipient, "[PROMO] Flash Sale: 50% off!");
};

const sendNotification = (notification: UserNotification, sender: Sender) => {
  return (recipient: string) => notification(sender, recipient);
};

const withLogging = (sender: Sender): Sender => {
  return async (recipient, message) => {
    console.log(`[LOG] Sending to ${recipient}...`);
  };
};

const withRetry = (sender: Sender, retries = 3): Sender => {
  return async (recipient, message) => {
    for (let i = 0; i < retries; i++) {
      try {
        await sender(recipient, message);
        return;
      } catch (err) {
        console.log(`⚠️ Retry ${i + 1} failed, retrying...`);
        if (i === retries - 1) throw err;
      }
    }
  };
};

const withMetrics = (sender: Sender): Sender => {
  return async (recipient, message) => {
    const start = Date.now();
    await sender(recipient, message);
    console.log(`📊 Sent in ${Date.now() - start}ms`);
  };
};

const compose =
  (...fns: Function[]) =>
  (x: any) =>
    fns.reduceRight((v, f) => f(v), x);

// Build an enhanced EmailSender
const enhancedEmailSender = compose(
  withMetrics,
  withRetry,
  withLogging
)(EmailSender);

// Bridge together
const alertViaEmail = sendNotification(AlertNotification, enhancedEmailSender);
const marketingViaSMS = sendNotification(MarketingNotification, SMSSender);

// Execute
(async () => {
  await alertViaEmail("admin@site.com");
  await marketingViaSMS("+123456789");
})();
