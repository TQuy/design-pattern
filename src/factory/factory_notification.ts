import { BaseNotification } from "~/prototype/prototype_notification";

export type NotificationType = 'WELCOME' | 'PASSWORD_RESET' | 'PROMO';

export class NotificationFactory {
  private static templates: Record<NotificationType, BaseNotification> = {
    WELCOME: new BaseNotification(
      '',
      'Welcome!',
      'Hi there, welcome to our platform!',
      'LOW',
      { category: 'onboarding' }
    ),
    PASSWORD_RESET: new BaseNotification(
      '',
      'Password Reset',
      'Click the link below to reset your password.',
      'HIGH',
      { category: 'security' }
    ),
    PROMO: new BaseNotification(
      "",
      "Special Offer!",
      "You have an exclusive discount waiting.",
      "MEDIUM",
      { category: "marketing" }
    ),
  };

  static create(type: NotificationType): BaseNotification {
    const template = this.templates[type];
    if (!template) {
      throw new Error(`Unknown notification type: ${type}`);
    }
    return template.clone();
  }
}