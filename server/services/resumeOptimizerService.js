import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const optimizeResume = async (resumeText, targetRole) => {
  const prompt = `
You are an expert ATS Resume Writer.

Rewrite the following resume to maximize ATS score for the role:

${targetRole}

Return ONLY valid JSON.

{
  "summary": "...",
  "skills": ["Node.js", "Express.js"],
  "keywords": ["Docker", "Redis"],
  "projects": [
    {
      "title": "...",
      "description": "..."
    }
  ],
  "tips": ["Tip 1", "Tip 2"]
}

Rules:

1. Improve Professional Summary.

2. Rewrite project descriptions using strong action verbs.

3. Suggest ATS keywords.

4. Improve Skills section.

5. Keep everything truthful.

Resume:

${resumeText}
`;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let response;

for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    break;
  } catch (error) {
    if (error.status === 503 && attempt < 3) {
      console.log(`Gemini busy. Retrying (${attempt}/3)...`);
      await delay(2000);
      continue;
    }

    throw error;
  }
}

  let text = response.text;

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.log(text);

    throw new Error("Gemini returned invalid JSON");
  }
};
