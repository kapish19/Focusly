import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
console.log("Gemini API Key being used:", GEMINI_API_KEY);
console.log("Key length:", GEMINI_API_KEY?.length);

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const getDietRecommendation = async (answers) => {
  try {
    const prompt = `
You are a certified nutritionist. Based on the following context, recommend a healthy *snack* and *drink* that helps the user during their study session:

- Study time: ${answers.studyTime}
- Current mood: ${answers.mood}
- Diet preference: ${answers.diet}
${answers.preferences ? `- Preferred ingredients: ${answers.preferences}` : ''}
${answers.allergies ? `- Allergies/restrictions: ${answers.allergies}` : ''}
${answers.nutrition ? `- Nutritional focus: ${answers.nutrition}` : ''}

Respond in *pure JSON* format only with keys: snack, drink, ingredients, reason.

Example format:
{
  "snack": "Hummus with carrot sticks",
  "drink": "Lemon mint water",
  "ingredients": "Chickpeas, carrots, lemon, mint leaves, water",
  "reason": "High-protein, light, hydrating, and good for brain focus."
}
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Extract JSON safely
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const jsonString = text.slice(jsonStart, jsonEnd + 1);

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini Diet Recommender Error:", error);

    // Fallback
    return {
      snack: "Trail mix with nuts and dried fruit",
      drink: "Green tea with honey",
      ingredients: "Almonds, walnuts, raisins, green tea, honey",
      reason: "Balanced mix of energy, brain-friendly fats, and calming drink to stay focused."
    };
  }
};
