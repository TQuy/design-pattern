import { NotificationBuilder } from "../builder_notification";

describe("NotificationBuilder", () => {
  it("should build a notification with default values", () => {
    const notif = new NotificationBuilder("user123", "Server down!")
      .withTitle("🚨 Alert")
      .withPriority("HIGH")
      .addAttachment("server.log")
      .addTag("ops")
      .build();
    expect(notif).toEqual({
      recipient: "user123",
      message: "Server down!",
      title: "🚨 Alert",
      priority: "HIGH",
      attachments: ["server.log"],
      tags: ["ops"]
    });
  });
});