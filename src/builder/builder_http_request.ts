export type Method = "GET" | "POST" | "PUT" | "DELETE";

export class HttpRequest {
  constructor(
    public url: string,
    public method: Method,
    public headers: Record<string, string>,
    public body?: unknown
  ) {}
}

export class HttpRequestBuilder {
  private url = "";
  private method: Method = "GET";
  private headers: Record<string, string> = {};
  private body?: unknown;

  setUrl(url: string): HttpRequestBuilder {
    this.url = url;
    return this;
  }

  setMethod(method: Method): HttpRequestBuilder {
    this.method = method;
    return this;
  }

  addHeader(key: string, value: string): HttpRequestBuilder {
    this.headers[key] = value;
    return this;
  }

  setBody(body: unknown): HttpRequestBuilder {
    this.body = body;
    return this;
  }

  build(): HttpRequest {
    return new HttpRequest(this.url, this.method, this.headers, this.body);
  }
}
