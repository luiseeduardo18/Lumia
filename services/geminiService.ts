
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Fast summarization
export const summarizeContent = async (content: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Please provide a concise and professional summary of the following content: \n\n${content}`,
    config: {
      temperature: 0.2,
      topP: 0.8,
    }
  });
  return response.text;
};

// Complex reasoning/chat
export const chatWithContext = async (query: string, history: any[] = []) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [...history, { role: 'user', parts: [{ text: query }] }],
    config: {
      systemInstruction: "You are Lumia, a premium AI assistant. Be professional, direct, and highly intelligent.",
    }
  });
  return response.text;
};

// Search grounding with Google Search
export const performDeepSearch = async (query: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      tools: [{ googleSearch: {} }],
    }
  });
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

// Specialized People Search Agent (B2B)
export const searchPeopleB2B = async (query: string) => {
  const ai = getAI();
  const systemInstruction = `
    You are the Lumia People Search Agent (B2B). 
    Your mission is to find professional information about individuals based on names, roles, or companies.
    Provide:
    1. Professional Profile summary.
    2. LinkedIn links or public portfolios if found.
    3. Current company and career trajectory.
    4. Key achievements if available.
    ALWAYS use Google Search to provide up-to-date information.
    Be accurate and note that some information might be missing or private.
  `;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: query,
    config: {
      systemInstruction,
      tools: [{ googleSearch: {} }],
    }
  });
  
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

// Low-latency quick responses
export const fastInteraction = async (prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite-latest',
    contents: prompt,
  });
  return response.text;
};
