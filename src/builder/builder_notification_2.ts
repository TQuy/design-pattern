import { BaseNotification } from "~/prototype/prototype_notification";

export class NotificationBuilder {
  private notification: BaseNotification;

  constructor(template: BaseNotification) {
    this.notification = template;
  }

  to(recipient: string): this {
    this.notification.recipient = recipient;
    return this;
  }

  withMessage(msg: string): this {
    this.notification.message = msg;
    return this;
  }

  withMetadata(key: string, value: any): this {
    this.notification.metadata[key] = value;
    return this;
  }

  build(): BaseNotification {
    return this.notification;
  }
}
