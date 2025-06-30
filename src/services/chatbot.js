import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
console.log("Gemini API Key being used:", GEMINI_API_KEY);
console.log("Key length:", GEMINI_API_KEY?.length);

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const getAIResponse = async (message, mode) => {
  try {
    const prompt = mode === 'study'
      ? `You are a helpful study assistant. Respond to student queries about studying, focus, and productivity. Keep responses under 100 words. Student says: "${message}"`
      : `You are a compassionate mental health supporter. Provide supportive, empathetic responses to wellness concerns. Keep responses under 100 words. Person says: "${message}"`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text().trim();
  } catch (error) {
    console.error("Full Gemini error details:", error);
    throw error;
  }
};
