// export async function fetcher<T = any>(
//   fetchFn: () => Promise<Response>
// ): Promise<T | null> {
//   try {
//     const res = await fetchFn();
//     if (!res.ok) {
//       console.warn("Fetch failed:", res.status, res.statusText, res.url);
//       return null;
//     }

//     const text = await res.text();
//     if (!text) {
//       console.warn("Empty response body:", res.url);
//       return null;
//     }

//     return JSON.parse(text) as T;
//   } catch (error) {
//     console.error("Fetcher error:", error);
//     return null;
//   }
// }

export async function fetcher<T = any>(
  fetchFn: () => Promise<Response>,
  options?: {
    timeoutMs?: number;
    retries?: number;
    retryDelayMs?: number;
  }
): Promise<T | null> {
  const { timeoutMs = 5000, retries = 3, retryDelayMs = 1000 } = options || {};

  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetchFn();

      clearTimeout(timeout);

      if (!res.ok) {
        console.warn(
          `Fetch failed (attempt ${attempt}):`,
          res.status,
          res.statusText,
          res.url
        );
        if (attempt === retries) return null;
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
        continue;
      }

      const text = await res.text();
      if (!text) {
        console.warn("Empty response body:", res.url);
        return null;
      }

      return JSON.parse(text) as T;
    } catch (error) {
      clearTimeout(timeout);
      if (error instanceof Error && error.name === "AbortError") {
        console.warn(`Fetch timeout (attempt ${attempt})`);
      } else {
        console.error(`Fetch error (attempt ${attempt}):`, error);
      }

      if (attempt === retries) return null;
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
    }
  }

  return null;
}
