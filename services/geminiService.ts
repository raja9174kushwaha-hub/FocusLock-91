
import { GoogleGenAI } from "@google/genai";
import { AppUsage } from "../types";

// Fix: Simplified initialization of GoogleGenAI using the process.env.API_KEY environment variable directly.
export const generateFocusStrategy = async (usage: AppUsage[]): Promise<string> => {
  // Always create a new GoogleGenAI instance right before making an API call to ensure it uses the up-to-date environment key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const usageSummary = usage.map(u => 
      `${u.name} (${u.category}): ${Math.round(u.durationSeconds / 60)} mins`
    ).join(', ');
    
    // Using ai.models.generateContent directly with the specified model and contents string.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze this digital behavior data: ${usageSummary}. 
      Act as a high-performance productivity coach. 
      Identify patterns of distraction and energy drain.
      Provide exactly 3 surgical, actionable focus rules.
      Be direct, authoritative, and do not use markdown or unnecessary fluff.`,
      config: {
        thinkingConfig: { thinkingBudget: 2000 }
      }
    });

    // Fix: Access the .text property directly instead of calling a method.
    const text = response.text;
    if (!text) throw new Error("The Neural Core returned an empty strategy.");
    return text.trim();
  } catch (error: any) {
    console.error("AI Insight Error:", error);
    // Generic error message to comply with the rule of not asking the user for API keys in the UI.
    throw new Error("Neural Core link failed. Verify connectivity.");
  }
};
