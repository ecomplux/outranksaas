import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjusted path
import { prisma } from "@/lib/prisma"; // Ensure prisma client is correctly imported
import { encrypt } from '@/lib/crypto'; // Import the encrypt function

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    const { wordpressUrl, username, appPassword, integrationName, publishStatus } = await request.json();

    if (!wordpressUrl || !username || !appPassword || !integrationName) { // Added integrationName as required
      return NextResponse.json({ error: 'Missing required fields: wordpressUrl, username, appPassword, or integrationName' }, { status: 400 });
    }

    // Ensure wordpressUrl is a valid base URL (e.g., ends with a /)
    const WPEndpoint = wordpressUrl.endsWith('/') ? `${wordpressUrl}wp-json/wp/v2/users/me` : `${wordpressUrl}/wp-json/wp/v2/users/me`;

    const credentials = Buffer.from(`${username}:${appPassword}`).toString('base64');

    const response = await fetch(WPEndpoint, {
      method: 'GET', // Using GET for /users/me to verify credentials
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      let errorBody;
      try {
        errorBody = await response.json();
      } catch (e) {
        errorBody = { message: response.statusText };
      }
      console.error('WordPress API Error:', response.status, errorBody);
      return NextResponse.json(
        { 
          error: 'Failed to connect to WordPress. Please check your credentials and URL.',
          details: errorBody,
          wpStatus: response.status 
        }, 
        { status: response.status }
      );
    }

    const data = await response.json();

    // At this point, connection is successful.
    const encryptedAppPassword = encrypt(appPassword);

    try {
      const newIntegration = await prisma.wordPressIntegration.create({
        data: {
          userId,
          name: integrationName,
          wordpressUrl,
          username,
          encryptedAppPassword,
          publishStatus,
        },
      });

      return NextResponse.json({
        message: 'WordPress integration successfully created!',
        integration: {
          id: newIntegration.id,
          name: newIntegration.name,
          wordpressUrl: newIntegration.wordpressUrl,
          username: newIntegration.username,
          publishStatus: newIntegration.publishStatus,
          createdAt: newIntegration.createdAt,
        }
      }, { status: 201 });

    } catch (dbError: any) {
      console.error('Database error saving WordPress integration:', dbError);
      if (dbError.code === 'P2002' && dbError.meta?.target?.includes('userId') && dbError.meta?.target?.includes('name')) {
        return NextResponse.json({ error: 'An integration with this name already exists for your account.' }, { status: 409 }); // Conflict
      }
      return NextResponse.json({ error: 'Failed to save WordPress integration to the database.' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error in WordPress integration API route:', error);
    if (error instanceof Error) {
        return NextResponse.json({ error: 'An unexpected error occurred on the server.', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred on the server.' }, { status: 500 });
  }
}