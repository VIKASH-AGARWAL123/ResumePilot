import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeJobMatch = async (resumeText, jobDescription) => {
  const prompt = `
You are an expert ATS and Recruitment AI.

Compare the following resume with the job description.

Return ONLY valid JSON.

{
  "matchScore": 0,
  "summary": "",
  "strengths": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:

${resumeText}

====================================================

Job Description:

${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let text = response.text;

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(text);
  } catch (error) {
    console.log("Invalid Gemini Response");
    console.log(text);

    throw new Error("Gemini returned invalid JSON.");
  }
};
