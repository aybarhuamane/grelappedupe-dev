export const safeJsonParse = async <T>(
  response: Response
): Promise<T | null> => {
  try {
    const text = await response.text();
    if (!text) {
      console.warn("Empty response body");
      return null;
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Error parsing JSON", error);
    return null;
  }
};

export const fetchAndParse = async <T>(
  fetchFunction: () => Promise<Response>
): Promise<T | null> => {
  try {
    const res = await fetchFunction();
    if (res.ok) {
      return await safeJsonParse<T>(res);
    } else {
      console.log(res.status, res.statusText, res.url);
      return null;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
