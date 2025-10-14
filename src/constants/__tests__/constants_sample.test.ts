import { MESSAGE } from "~/constants/sample";

describe("Constants", () => {
  it("should have the correct message", () => {
    expect(MESSAGE).toBe("hello world");
  });
});
