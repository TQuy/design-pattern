import { describe, it, expect } from "vitest";
import { SQLBuilder } from "~/builder/builder_sql";

describe("Builder Pattern - SQL Query Example", () => {
  it("should build a SQL query using the builder pattern", () => {
    const query = new SQLBuilder("users")
      .select({ id: "user_id", name: "user_name" })
      .where(["age > 18", "status = 'active'"])
      .order("name", "ASC")
      .build();
    expect(query).toBe(
      `
      SELECT user_id AS id, user_name AS name
      FROM users
      WHERE age > 18 AND status = 'active'
      ORDER BY name ASC
    `.trim()
    );
  })
});