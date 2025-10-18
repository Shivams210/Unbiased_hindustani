import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // This will be replaced with actual API call to your Python backend
    const response = await fetch('http://localhost:8000/api/news');
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'YouTube URL is required' },
        { status: 400 }
      );
    }

    // This will be replaced with actual API call to your Python backend
    const response = await fetch('http://localhost:8000/api/news/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process news' },
      { status: 500 }
    );
  }
}