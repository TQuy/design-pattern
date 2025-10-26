type Fetcher = (userId: string) => Promise<string>;

const apiFetcher: Fetcher = async (id) => {
  console.log(`Fetching ${id}`);
  return `Data for ${id}`;
};

const withLogging = <T extends (...args: any[]) => any>(fn: T): T => {
  // It returns a new function (T) with the exact same signature
  return (async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    console.log(`[LOG] Start`);

    // The call to the original function is awaited to handle Promises
    const result = await fn(...args);

    console.log(`[LOG] Done`);
    return result;
  }) as T; // Use 'as T' to satisfy TypeScript that the returned function has the same signature
};

const fetcherWithLogging = withLogging(apiFetcher);

// Usage
fetcherWithLogging("user123").then((data) => console.log(data));
