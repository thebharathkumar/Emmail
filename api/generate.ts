import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = request.body;

  if (!prompt) {
    return response.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.PERPLEXITY_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const res = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar-pro', 
        messages: [
          {
            role: 'system',
            content: 'Be precise and concise.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1024,
      }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error('Perplexity API Error:', errorText);
        throw new Error(`Perplexity API responded with ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    const content = data.choices[0]?.message?.content || '';

    return response.status(200).json({ content });
  } catch (error: any) {
    console.error('Handler Error:', error);
    return response.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
