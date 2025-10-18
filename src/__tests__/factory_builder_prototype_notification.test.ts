import { NotificationBuilder } from "~/builder/builder_notification_2";
import { NotificationFactory } from "~/factory/factory_notification";

describe("NotificationBuilder", () => {
  it("should build a notification with the given parameters", () => {
    const base = NotificationFactory.create("WELCOME");
    const notification = new NotificationBuilder(base)
      .to("john@example.com")
      .withMessage("Hey John, glad to have you on board!")
      .withMetadata("userId", 1234)
      .build();

    expect(notification.recipient).toBe("john@example.com");
    expect(notification.message).toBe("Hey John, glad to have you on board!");
    expect(notification.metadata.userId).toBe(1234);
  });
});
