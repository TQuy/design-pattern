import { describe } from "vitest";
import { HttpRequestBuilder } from "../builder_http_request";

describe("builder/http_request", () => {
  it("should build an HTTP request correctly", () => {
    const request = new HttpRequestBuilder()
      .setUrl("https://api.example.com/data")
      .setMethod("POST")
      .addHeader("Content-Type", "application/json")
      .setBody({ key: "value" })
      .build();

    expect(request.url).toBe("https://api.example.com/data");
    expect(request.method).toBe("POST");
    expect(request.headers).toEqual({ "Content-Type": "application/json" });
    expect(request.body).toEqual({ key: "value" });
  });
});
