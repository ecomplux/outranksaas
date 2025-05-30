import { NextRequest, NextResponse } from 'next/server';
import { generateContent, getImageSearchQuery } from '@/lib/gemini'; // Assuming your tsconfig paths are set up for @/
import { getPexelsImage } from '@/lib/pexels';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const blogContent = await generateContent(prompt);
    let imageUrl: string | null = null;

    try {
      const imageQuery = await getImageSearchQuery(prompt);
      if (imageQuery) {
        imageUrl = await getPexelsImage(imageQuery);
      }
    } catch (imageError) {
      // Log the error but don't let it break the entire blog generation flow
      console.error('Error fetching image for blog post:', imageError);
      // Optionally, you could return a specific error detail for the image part
    }

    return NextResponse.json({ content: blogContent, imageUrl: imageUrl });
  } catch (error) {
    console.error('Error in /api/generate-blog:', error);
    // Check if the error is an instance of Error to safely access its message property
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return NextResponse.json({ error: 'Failed to generate blog content.', details: errorMessage }, { status: 500 });
  }
}