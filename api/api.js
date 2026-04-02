import { GoogleGenAI } from "@google/genai";

//npm install @google/generative-ai
const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_API_KEY });

// Pega Perfil Aleatorio de usuario
export async function getRandomUser() {
  const response = await fetch("https://randomuser.me");
  const data = await response.json();
  return data.results[0];
}

// Envia e recebe a resposta da IA
export async function sendToGeminiIA(prompt) {
  let response = null;
  try {
    response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      //model: "gemini-3-flash-preview",
      systemInstruction:
        "Responda de forma extremamente resumida e direta. " +
        "NÃO utilize formatação Markdown (como asteriscos, hashtags ou negrito). " +
        "Retorne apenas texto puro. " +
        "Seja transparente: caso não saiba de algo, especifique.",
      contents: prompt,
      config: {
        temperature: 0.1,
      },
    });
    const cleanText = response.text.replace(/[*#_~]/g, "");
    console.log(cleanText);
    return cleanText;
  } catch (ex) {
    return "Limite de API excedido. Tente novamente mais tarde.";
  }
}
