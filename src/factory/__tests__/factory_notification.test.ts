import { describe, it, expect } from "vitest";
import { NotificationFactory } from "~/factory/factory_notification";
import type { NotificationType } from "~/factory/factory_notification";

describe("Factory Pattern - Notification Example", () => {
  it("should create a welcome notification", () => {
    const notification = NotificationFactory.create("WELCOME");

    expect(notification.title).toBe("Welcome!");
    expect(notification.message).toBe("Hi there, welcome to our platform!");
    expect(notification.priority).toBe("LOW");
    expect(notification.metadata.category).toBe("onboarding");
  });

  it("should create a password reset notification", () => {
    const notification = NotificationFactory.create("PASSWORD_RESET");

    expect(notification.title).toBe("Password Reset");
    expect(notification.message).toBe("Click the link below to reset your password.");
    expect(notification.priority).toBe("HIGH");
    expect(notification.metadata.category).toBe("security");
  });

  it("should create a promo notification", () => {
    const notification = NotificationFactory.create("PROMO");

    expect(notification.title).toBe("Special Offer!");
    expect(notification.message).toBe("You have an exclusive discount waiting.");
    expect(notification.priority).toBe("MEDIUM");
    expect(notification.metadata.category).toBe("marketing");
  });

  it("should clone notifications independently", () => {
    const notification1 = NotificationFactory.create("WELCOME");
    const notification2 = NotificationFactory.create("WELCOME");

    // They should have the same content but be different instances
    expect(notification1).not.toBe(notification2);
    expect(notification1.title).toBe(notification2.title);

    // Modifying one shouldn't affect the other
    notification1.recipient = "user1@example.com";
    notification2.recipient = "user2@example.com";

    expect(notification1.recipient).toBe("user1@example.com");
    expect(notification2.recipient).toBe("user2@example.com");
  });

  it("should throw error for unknown notification type", () => {
    expect(() => {
      // @ts-expect-error Testing invalid type
      NotificationFactory.create("INVALID_TYPE");
    }).toThrow("Unknown notification type: INVALID_TYPE");
  });
});