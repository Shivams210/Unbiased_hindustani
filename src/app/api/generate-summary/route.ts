import { NextRequest, NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { youtubeUrl } = await request.json();

    if (!youtubeUrl) {
      return NextResponse.json({ error: 'YouTube URL is required' }, { status: 400 });
    }

    // Extract video ID from YouTube URL
    let videoId = '';
    try {
      if (youtubeUrl.includes('/embed/')) {
        videoId = youtubeUrl.split('/embed/')[1].split('?')[0];
      } else if (youtubeUrl.includes('watch?v=')) {
        const url = new URL(youtubeUrl);
        videoId = url.searchParams.get('v') || '';
      } else if (youtubeUrl.includes('youtu.be/')) {
        videoId = youtubeUrl.split('youtu.be/')[1].split('?')[0];
      }
    } catch (error) {
      return NextResponse.json({ error: 'Invalid YouTube URL format' }, { status: 400 });
    }

    if (!videoId) {
      return NextResponse.json({ error: 'Could not extract video ID from URL' }, { status: 400 });
    }

    // Try to fetch transcript first
    let transcript = '';
    let useMetadataFallback = false;
    let videoMetadata = {
      title: '',
      description: '',
      channelTitle: ''
    };

    try {
      const transcriptData = await YoutubeTranscript.fetchTranscript(videoId);
      transcript = transcriptData.map((item: any) => item.text).join(' ');
      
      if (!transcript || transcript.length < 50) {
        console.log('Transcript too short, using metadata fallback');
        useMetadataFallback = true;
      }
    } catch (error) {
      console.log('Transcript not available, using metadata fallback');
      useMetadataFallback = true;
    }

    // FALLBACK: If transcript not available, fetch video metadata from YouTube oEmbed API
    if (useMetadataFallback) {
      try {
        // Use YouTube oEmbed API (no API key needed!)
        const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
        const metadataResponse = await fetch(oembedUrl);
        
        if (metadataResponse.ok) {
          const metadata = await metadataResponse.json();
          videoMetadata.title = metadata.title || '';
          videoMetadata.channelTitle = metadata.author_name || '';
          
          // Also try to get description from noembed.com (alternative API)
          try {
            const noembedUrl = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`;
            const noembedResponse = await fetch(noembedUrl);
            if (noembedResponse.ok) {
              const noembedData = await noembedResponse.json();
              videoMetadata.description = noembedData.description || '';
            }
          } catch (e) {
            console.log('Could not fetch from noembed');
          }
        }
        
        // If we got at least a title, we can proceed with metadata
        if (!videoMetadata.title) {
          return NextResponse.json({ 
            error: 'Could not fetch video information. Please add points manually.' 
          }, { status: 400 });
        }
        
        console.log('Using video metadata:', videoMetadata);
      } catch (error) {
        console.error('Metadata fetch error:', error);
        return NextResponse.json({ 
          error: 'Could not fetch video information. Please add points manually.' 
        }, { status: 400 });
      }
    }

    // Check for API keys - support both OpenAI and Google AI
    const openaiKey = process.env.OPENAI_API_KEY;
    const googleKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
    
    if (!openaiKey && !googleKey) {
      return NextResponse.json({ 
        error: 'Please set OPENAI_API_KEY, GOOGLE_AI_API_KEY, or GEMINI_API_KEY in your .env.local file. For Google AI: https://makersuite.google.com/app/apikey' 
      }, { status: 500 });
    }

    let prompt = '';
    
    if (useMetadataFallback) {
      // Generate content from video metadata (title, description, channel)
      prompt = `You are a political news analyst for "Unbiased Hindustani" - a platform that provides balanced political news coverage in India.

Based on the following YouTube video information, generate professional news content:

Video Title: ${videoMetadata.title}
Channel: ${videoMetadata.channelTitle}
${videoMetadata.description ? `Description: ${videoMetadata.description}` : ''}

Generate:
1. EXACTLY 5 key summary points about this video topic (each point should be concise, one line, maximum 15 words)
2. A comprehensive "Read More" section with 3-4 detailed paragraphs explaining the topic in depth

Since the transcript is not available, use your knowledge about this topic (based on the title and description) to create informative, neutral, and factual content.

Please respond in the following JSON format:
{
  "summaryPoints": ["Point 1", "Point 2", "Point 3", "Point 4", "Point 5"],
  "fullContent": "Detailed paragraph 1...\\n\\nDetailed paragraph 2...\\n\\nDetailed paragraph 3..."
}

Important: Keep the tone neutral and unbiased. Focus on facts. Each summary point should be a complete statement.`;
    } else {
      // Generate content from transcript
      prompt = `You are a political news analyst for "Unbiased Hindustani" - a platform that provides balanced political news coverage in India.

Based on the following video transcript, generate:
1. EXACTLY 5 key summary points (each point should be concise, one line, maximum 15 words)
2. A comprehensive "Read More" section with 3-4 detailed paragraphs explaining the full context

Video Transcript:
${transcript.substring(0, 5000)}

Please respond in the following JSON format:
{
  "summaryPoints": ["Point 1", "Point 2", "Point 3", "Point 4", "Point 5"],
  "fullContent": "Detailed paragraph 1...\\n\\nDetailed paragraph 2...\\n\\nDetailed paragraph 3..."
}

Important: Keep the tone neutral and unbiased. Focus on facts. Each summary point should be a complete statement.`;
    }

    // Generate content using available AI service
    let text = '';
    
    if (openaiKey) {
      // Use OpenAI (works with GitHub Copilot Pro API key)
      const openai = new OpenAI({ apiKey: openaiKey });
      
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // Fast and cost-effective
        messages: [
          { role: 'system', content: 'You are a helpful assistant that generates political news summaries in JSON format.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      });
      
      text = completion.choices[0].message.content || '';
    } else if (googleKey) {
      // Use Google Gemini AI with v1 API
      const genAI = new GoogleGenerativeAI(googleKey);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        generationConfig: {
          temperature: 0.7,
        }
      });
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      text = response.text();
    }

    // Parse the JSON response
    let parsedResponse;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text;
      parsedResponse = JSON.parse(jsonText);
    } catch (error) {
      console.error('Failed to parse AI response:', text);
      return NextResponse.json({ 
        error: 'Failed to parse AI response. Please try again.' 
      }, { status: 500 });
    }

    // Validate response has required fields
    if (!parsedResponse.summaryPoints || !Array.isArray(parsedResponse.summaryPoints) || parsedResponse.summaryPoints.length !== 5) {
      return NextResponse.json({ 
        error: 'AI response format invalid. Please try again.' 
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      summaryPoints: parsedResponse.summaryPoints,
      fullContent: parsedResponse.fullContent || 'No detailed content available.'
    });

  } catch (error) {
    console.error('Error in generate-summary API:', error);
    return NextResponse.json({ 
      error: 'Internal server error. Please try again.' 
    }, { status: 500 });
  }
}
