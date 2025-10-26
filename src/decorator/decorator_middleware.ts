type Middleware<TArgs extends any[], TResult> = (
  next: (...args: TArgs) => TResult
) => (...args: TArgs) => TResult;

const compose = <TArgs extends any[], TResult>(
  ...middlewares: Middleware<TArgs, TResult>[]
) => {
  return (core: (...args: TArgs) => TResult): ((...args: TArgs) => TResult) => {
    return middlewares.reduceRight((next, mw) => mw(next), core);
  };
};

// Core function
const sendNotification = async (userId: string, message: string) => {
  console.log(`📤 Sending to ${userId}: ${message}`);
};

const withLogger: Middleware<[string, string], Promise<void>> =
  (next) => async (userId, message) => {
    console.log(`[Logger] Sending message to ${userId}`);
    await next(userId, message);
    console.log(`[Logger] Done sending to ${userId}`);
  };

const withRetry: Middleware<[string, string], Promise<void>> =
  (next) => async (userId, message) => {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await next(userId, message);
        return;
      } catch (err) {
        console.log(`[Retry] Attempt ${attempt} failed`, err);
        if (attempt === 3) throw err;
      }
    }
  };

const withRateLimit: Middleware<[string, string], Promise<void>> = (next) => {
  const lastSent: Record<string, number> = {};
  return async (userId, message) => {
    const now = Date.now();
    if (lastSent[userId] && now - lastSent[userId] < 3000) {
      console.log(`[RateLimit] Skipping ${userId} (too soon)`);
      return;
    }
    lastSent[userId] = now;
    await next(userId, message);
  };
};

const enhancedSend = compose<[string, string], Promise<void>>(
  withLogger,
  withRetry,
  withRateLimit
)(sendNotification);

await enhancedSend("u123", "Welcome!");
