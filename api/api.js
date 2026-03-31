import { GoogleGenAI } from "@google/genai";

//npm install @google/generative-ai
const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_API_KEY });

// Pega Perfil Aleatorio de usuario
export async function getRandomUser() {
  const response = await fetch("https://randomuser.me");
  const data = await response.json();
  return data.results[0];
}

export async function sendToGeminiIA(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    systemInstruction:
      "Responda de forma extremamente resumida e direta, usando tópicos se necessário. Seja transparente, caso não saiba de algo ou não tem certeza, deixe especificado",
    contents: prompt,
    config: {
      temperature: 0.1,
    },
  });
  console.log(response.text);
  return response.text;
}
