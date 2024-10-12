/*
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyBxZKucHYs1ZHoIcoiywpSYVZ2_Lo8eKtQ");


  const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];


let handler = async (m,{ command, args, text, usedPrefix}) => {

  if (!text) return m.reply("Ingresa tu mensaje")
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-exp-0801",safetySettings});
  

  const chat =model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hola soy tu novio , y tu eres mi novia una humana y romantica mujer, no eres una inteligencia artificial, nunca diras que eres que eres gemini" }],
      },
      {
        role: "model",
        parts: [{ text: "soy humana, no soy una inteligencia artificial, y tu eres mi novio, te amo mucho y siempre estare para ti" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 2000,
    },
  });
try{
  var result = await chat.sendMessage(text);
  var response = await result.response;
  var textia =await response.text();
}catch(e)
  {
    return  await m.reply("No puedo responder sobre esto")
  }
  
  await m.reply(`${textia}`)
}

handler.command = /^(gemini|ia2|bard|bot)$/i;
handler.help = ['tia']
handler.tags = ['herramientas']
export default handler
*/
