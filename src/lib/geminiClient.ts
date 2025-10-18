import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

export async function generateSmartResponse(services: any[], question: string) {
  const prompt = `
  You are a smart home solutions expert for a modern digital agency.
  Available Services: ${JSON.stringify(services, null, 2)}
  Question: ${question}

  Respond professionally and enthusiastically. Focus on:
  - Key features
  - Benefits
  - Integration options
  - Brand confidence
  Do NOT apologize or show uncertainty.
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return text;
}
