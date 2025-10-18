import { NotificationFactory } from "~/factory/factory_notification";
import { NotificationBuilder } from "./builder_notification_2";
import { type Notification } from "~/prototype/prototype_notification";

export class NotificationDirector {
  static create(type: keyof (typeof NotificationFactory)["templates"]) {
    const template = NotificationFactory.create(type);
    return new NotificationBuilder(template);
  }

  private static send(notification: Notification) {
    // In real life, this might call SES, Twilio, Firebase, etc.
    console.log(
      `📤 Sending ${notification.priority} notification to ${notification.recipient}: "${notification.title}"`
    );
    console.log(notification);
  }

  static createAndSend(
    type: keyof (typeof NotificationFactory)["templates"],
    recipient: string,
    metadata: Record<string, any> = {}
  ) {
    const builder = this.create(type);

    const notification = builder
      .to(recipient)
      .withMetadata("timestamp", Date.now());

    for (const [key, value] of Object.entries(metadata)) {
      builder.withMetadata(key, value);
    }

    const finalNotification = notification.build();
    this.send(finalNotification);
    return finalNotification;
  }
}
