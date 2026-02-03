export interface AIResponse {
  content: string;
}

export const generateEmail = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate email');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("AI Service Error:", error);
    // Fallback if API fails or is not running locally
    return `[System Message]
Unable to connect to the generation service.
If you are running this locally, make sure the Vercel development server is running ('vercel dev').
If this is deployed, check the API logs.

Error details: ${error instanceof Error ? error.message : String(error)}`;
  }
};
