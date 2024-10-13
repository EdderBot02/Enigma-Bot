import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import fetch from 'node-fetch';
import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";

let handler = async (m,{ command, args, text, usedPrefix}) => {


if (!text) return m.reply("Ingresa tu mensaje")
  

try{
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

  const genAI = new GoogleGenerativeAI("AIzaSyBxZKucHYs1ZHoIcoiywpSYVZ2_Lo8eKtQ");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-exp-0801",safetySettings});
  conn.sendPresenceUpdate('composing', m.chat);

  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (!(/image/g.test(mime))) 

{
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

    var result = await chat.sendMessage(text);
    var response = await result.response;
    var textia =await response.text();
}

else{
    let img = await q.download?.()
    console.log(img)


    const buffer = img
    //const buffer = await res.arrayBuffer();

    const formData = new FormData();

    const metadata = { file: { mimeType: "image/jpeg", displayName:generarNombreRandom()} };

    formData.append("metadata", new Blob([JSON.stringify(metadata)], { contentType: "application/json" }));

    formData.append("file", new Blob([buffer], { type: "image/jpeg" }));

    const res2 = await fetch(
      `https://generativelanguage.googleapis.com/upload/v1beta/files?uploadType=multipart&key=AIzaSyBxZKucHYs1ZHoIcoiywpSYVZ2_Lo8eKtQ`,
      { method: "post", body: formData }
    );

    const uploadResponse = await res2.json();
    console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);
    console.log(uploadResponse.file.mimeType)
    const name = uploadResponse.file.name;


    const result = await model.generateContent([
        text,
        {
          fileData: {
            fileUri: uploadResponse.file.uri,
            mimeType: uploadResponse.file.mimeType,
          },
        },
      ]);
    var textia=await result.response.text()
}
  
  

}catch(e)
  {
    return  await m.reply("No puedo responder sobre esto")
  }  
  await m.reply(`${textia}`)
}

handler.command = /^(gemini|ia2|bard|bot)$/i;
handler.tags = ['herramientas']
export default handler


function generarNombreRandom() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nombre = '';
  for (let i = 0; i < 5; i++) {
    nombre += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return nombre;
}
