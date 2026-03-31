//npm install dotenv
//npx expo install expo-constant
//npm install @google/generative-ai

import { GoogleGenerativeAI } from "@google/generative-ai";
// 1. Configure a chave aqui (ou use process.env.GEMINI_API_KEY)
const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);

// 2. Pega perfil aleatorio (Corrigido para /api)
export async function getRandomUser() {
  const response = await fetch("https://randomuser.me");
  const data = await response.json();
  return data.results[0];
}

async function enviarParaIA(textoUsuario) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(textoUsuario);
    const response = await result.response;

    return response.text();
  } catch (erro) {
    console.error("Erro na comunicação com a IA:", erro);
    return "Erro ao processar mensagem.";
  }
}

async function exemplo() {
  const usuario = await getRandomUser();
  const pergunta = `O nome do usuário é ${usuario.name.first}. Crie um apelido para ele.`;

  const resposta = await enviarParaIA(pergunta);
  console.log(resposta);
}
