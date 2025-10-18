import { NotificationDirector } from "~/builder/director_notification";

describe("NotificationDirector", () => {
  it("should create and send a WELCOME notification", () => {
    const sent = NotificationDirector.createAndSend(
      "WELCOME",
      "john@example.com",
      {
        userId: 42,
        referralCode: "JOIN123",
      }
    );
    expect(sent.recipient).toBe("john@example.com");
    expect(sent.metadata.userId).toBe(42);
    expect(sent.metadata.referralCode).toBe("JOIN123");
    expect(sent.metadata.timestamp).toBeDefined();
  });
});
