export interface PaymentProvider {
  pay(amount: number, currency: string): Promise<void>;
  refund(transactionId: string): Promise<void>;
}

export class StripeSDK {
  async charge(cents: number, currency: string) {
    console.log(`[Stripe] Charging ${cents / 100} ${currency}`);
  }
  async refundPayment(id: string) {
    console.log(`[Stripe] Refunding ${id}`)

  }
}

export class PayPalSDK {
  async makePayment(details: { total: number; currency: string }) {
    console.log(`[PayPal] Paying ${details.total} ${details.currency}`);
  }
  async refundTransaction(id: string) {
    console.log(`[PayPal] Refunding ${id}`);
  }
}

export class StripeAdapter implements PaymentProvider {
  constructor(private stripe: StripeSDK) { }

  async pay(amount: number, currency: string): Promise<void> {
    await this.stripe.charge(amount * 100, currency);
  }

  async refund(transactionId: string) {
    await this.stripe.refundPayment(transactionId);
  }
}

export class PayPalAdapter implements PaymentProvider {
  constructor(private paypal: PayPalSDK) { }

  async pay(amount: number, currency: string): Promise<void> {
    await this.paypal.makePayment({ total: amount, currency });
  }

  async refund(transactionId: string) {
    await this.paypal.refundTransaction(transactionId);
  }
}

async function processOrder(provider: PaymentProvider) {
  await provider.pay(49.99, 'USD');
  await provider.refund('txn_1234');
}

const stripeProvider = new StripeAdapter(new StripeSDK());
const paypalProvider = new PayPalAdapter(new PayPalSDK());

processOrder(stripeProvider);
processOrder(paypalProvider);
