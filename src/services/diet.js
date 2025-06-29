import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
console.log("API Key being used:", process.env.REACT_APP_OPENAI_API_KEY);
console.log("Key length:", process.env.REACT_APP_OPENAI_API_KEY?.length);

export const getDietRecommendation = async (answers) => {
  try {
    const prompt = `Provide a detailed healthy snack and drink recommendation based on:
    - Study time: ${answers.studyTime}
    - Current mood: ${answers.mood}
    - Diet preference: ${answers.diet}
    ${answers.preferences ? `- Preferred ingredients: ${answers.preferences}` : ''}
    ${answers.allergies ? `- Allergies/restrictions: ${answers.allergies}` : ''}
    ${answers.nutrition ? `- Nutritional focus: ${answers.nutrition}` : ''}`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: prompt
        }],
        temperature: 0.7,
        response_format: { type: "json_object" }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    const content = response.data.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error("Full error details:", {
      error: error.response?.data,
      status: error.response?.status,
      config: error.config
    });
    return {
      snack: "Mixed nuts and seeds",
      drink: "Herbal tea",
      ingredients: "Nuts, seeds, tea leaves",
      reason: "A balanced fallback option while we fix the connection"
    };
  }
};