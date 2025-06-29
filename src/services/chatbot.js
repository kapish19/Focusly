import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
console.log("API Key being used:", process.env.REACT_APP_OPENAI_API_KEY);
console.log("Key length:", process.env.REACT_APP_OPENAI_API_KEY?.length);

export const getAIResponse = async (message, mode) => {
  try {
    const prompt = mode === 'study' 
      ? `You are a helpful study assistant. Respond to student queries about studying, focus, and productivity. Keep responses under 100 words. Student says: "${message}"`
      : `You are a compassionate mental health supporter. Provide supportive, empathetic responses to wellness concerns. Keep responses under 100 words. Person says: "${message}"`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 150
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
          
        }
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Full error details:", {
      error: error.response?.data,
      status: error.response?.status,
      config: error.config
    });
    throw error;
  }
};