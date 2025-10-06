interface Notifier {
  send(message: string): void;
}

type Creator = () => Notifier;

class NotificationFactory {
  private static registry: Record<string, Creator> = {};

  static register(type: string, creator: Creator) {
    this.registry[type] = creator;
  }

  static create(type: string): Notifier {
    const creator = this.registry[type];
    if (!creator) {
      throw new Error(`No notifier registered for type: ${type}`);
    }
    return creator();
  }
}

class EmailNotifier implements Notifier {
  send(message: string): void {
    console.log(`Sending email with message: ${message}`);
  }
}

class SMSNotifier implements Notifier {
  send(message: string): void {
    console.log(`Sending SMS with message: ${message}`);
  }
}

NotificationFactory.register("email", () => new EmailNotifier());
NotificationFactory.register("sms", () => new SMSNotifier());
const EmailNotifierInstance = NotificationFactory.create("email");
EmailNotifierInstance.send("Hello via Email!");

const SMSNotifierInstance = NotificationFactory.create("sms");
SMSNotifierInstance.send("Hello via SMS!");
