export class SQLBuilder {
  private query: string = "";
  private conditions: string[] = [];
  private orderBy: string = "";
  private table: string = "";
  private fields: Record<string, string> = {};
  constructor(
    table: string,
  ) {
    this.table = table;
  }

  select(fields: Record<string, string>): SQLBuilder {
    this.fields = fields;
    return this;
  }

  where(conditions: string[]): SQLBuilder {
    this.conditions = conditions;
    return this;
  }

  order(field: string, direction: "ASC" | "DESC" = "ASC"): SQLBuilder {
    this.orderBy = `ORDER BY ${field} ${direction}`;
    return this;
  }

  build(): string {
    return (
      `
      SELECT ${Object.entries(this.fields)
        .map(([alias, field]) => `${field} AS ${alias}`)
        .join(", ")}
      FROM ${this.table}
      ${this.conditions.length ? `WHERE ${this.conditions.join(" AND ")}` : ""}
      ${this.orderBy}
      `.trim()
    )
  }
}