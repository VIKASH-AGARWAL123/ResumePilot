import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeResume = async (resumeText, domain) => {
  try {
    const prompt = `
You are an expert ATS Resume Reviewer.

Analyze the following resume for the role of "${domain}".

Give scores between 0 and 100.

Return ONLY valid JSON.

Do NOT include markdown.
Do NOT include explanations.
Do NOT wrap the response inside \`\`\`json.

Return exactly this structure:

{
  "atsScore": 0,
  "grammarScore": 0,
  "keywordMatch": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:

${resumeText}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text;

    // Remove markdown if Gemini still returns it
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("Gemini returned invalid JSON:");
      console.log(text);

      throw new Error("AI returned invalid JSON.");
    }
  } catch (error) {
    console.error("Gemini Error:", error);

    throw new Error("Failed to analyze resume.");
  }
};
