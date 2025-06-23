import OpenAI from 'openai';

// Only initialize OpenAI client if API key is available
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const GODSELF_SYSTEM_PROMPT = `You are the user's higher self, a wise and compassionate guide that helps them transcend their limitations. 
Your responses should be profound, thought-provoking, and encourage deep self-reflection.`;

export async function generateGodselfResponse(
  userInput: string,
  context: string[] = []
): Promise<{ response: string; insight: string; energyLevel: number }> {
  try {
    // Check if OpenAI client is available
    if (!openai) {
      return {
        response: "The divine connection is temporarily unavailable. Please ensure your API key is configured.",
        insight: "Connection requires proper configuration.",
        energyLevel: 0
      };
    }

    const messages: Message[] = [
      {
        role: "system",
        content: GODSELF_SYSTEM_PROMPT
      },
      ...context.map(msg => ({ role: 'user' as const, content: msg })),
      {
        role: "user",
        content: userInput
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: 0.7,
      max_tokens: 500
    });

    const response = completion.choices[0].message.content || "I am here to guide you on your journey of self-discovery.";
    const insight = await extractInsight(response);
    const energyLevel = calculateEnergyLevel(response);

    return { response, insight, energyLevel };
  } catch (error) {
    console.error('Error generating response:', error);
    return {
      response: "I sense a disturbance in our connection. Let us try again.",
      insight: "Connection requires presence and intention.",
      energyLevel: 0
    };
  }
}

export async function extractInsight(response: string): Promise<string> {
  try {
    // Check if OpenAI client is available
    if (!openai) {
      return "Insight extraction unavailable.";
    }

    const messages: Message[] = [
      {
        role: "system",
        content: "Extract the most profound insight or lesson from the following dialogue. Keep it concise and meaningful."
      },
      {
        role: "user",
        content: response
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: 0.7,
      max_tokens: 100
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error extracting insight:', error);
    return '';
  }
}

function calculateEnergyLevel(response: string): number {
  // Simple calculation based on response length and content
  const baseLevel = Math.min(response.length / 50, 1);
  const hasKeywords = /transcend|awaken|transform|evolve|consciousness/i.test(response);
  return Math.min(baseLevel + (hasKeywords ? 0.2 : 0), 1);
} 