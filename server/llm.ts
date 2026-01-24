/**
 * LLM Integration for MolDoctor
 * Handles communication with Anthropic Claude API
 */

interface LLMMessage {
  role: "system" | "user" | "assistant";
  content: string | any[];
}

interface LLMOptions {
  messages: LLMMessage[];
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

interface LLMResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
}

/**
 * Invoke LLM (Anthropic Claude) with messages
 */
export async function invokeLLM(options: LLMOptions): Promise<LLMResponse> {
  const {
    messages,
    model = "claude-sonnet-4-20250514",
    maxTokens = 4096,
    temperature = 0.7,
  } = options;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }

  // Convert messages to Anthropic format
  const systemMessages = messages.filter(m => m.role === "system");
  const conversationMessages = messages.filter(m => m.role !== "system");

  const systemPrompt = systemMessages.map(m => 
    typeof m.content === "string" ? m.content : JSON.stringify(m.content)
  ).join("\n\n");

  const anthropicMessages = conversationMessages.map(msg => ({
    role: msg.role === "assistant" ? "assistant" : "user",
    content: msg.content,
  }));

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        temperature,
        system: systemPrompt,
        messages: anthropicMessages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API error:", errorText);
      throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Convert Anthropic response to OpenAI-compatible format
    return {
      choices: [
        {
          message: {
            content: data.content[0]?.text || "",
            role: "assistant",
          },
        },
      ],
    };
  } catch (error) {
    console.error("Error invoking LLM:", error);
    throw error;
  }
}
