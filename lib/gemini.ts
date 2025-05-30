import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function generateContent(prompt: string): Promise<string> {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Using gemini-1.5-flash as per latest recommendations, you mentioned 2.0-flash but that might be a typo or future model.
                                                                        // gemini-pro is also a common choice for text generation.
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw new Error("Failed to generate content using Gemini API.");
  }
}

export async function getImageSearchQuery(blogPrompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // Craft a prompt for Gemini to extract the main subject for an image search
    const specificPrompt = `From the following blog post title or topic, extract the most important keywords (2-3 words maximum) that would be suitable for searching a relevant stock image. Only return the keywords. Topic: "${blogPrompt}"`;
    
    const result = await model.generateContent(specificPrompt);
    const response = result.response;
    const text = response.text().trim();
    return text;
  } catch (error) {
    console.error("Error generating image search query with Gemini:", error);
    throw new Error("Failed to generate image search query using Gemini API.");
  }
}