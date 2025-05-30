export async function getPexelsImage(query: string): Promise<string | null> {
  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey) {
    console.error("PEXELS_API_KEY is not defined in environment variables.");
    // It's better to throw an error or return a more specific error response
    // if the API key is crucial for the application's core functionality.
    // For now, returning null as per the original snippet's implied behavior.
    return null; 
  }

  const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
    headers: {
      Authorization: apiKey,
    },
  });

  if (!res.ok) {
    console.error("Pexels API error:", await res.text());
    return null;
  }

  try {
    const data = await res.json();
    const photo = data.photos?.[0];
    return photo?.src?.large || null;
  } catch (error) {
    console.error("Error parsing Pexels API response:", error);
    return null;
  }
}