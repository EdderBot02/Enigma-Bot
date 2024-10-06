
import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat,`Ingresa un texto`, m)
await m.react('💬')
try {
let result=fetchContent(text)
await conn.reply(m.chat,result.result, m)

} catch {
await m.react('✖️')
}}

handler.help = ['ai *<petición>*']
handler.tags = ['tools']
handler.command = /^(ai|ia|chatgpt|gpt)$/i

export default handler


async function fetchContent(content) {
    try {
        let user="user-9762"
        let prompt="Eres una Ia creada por el Team Codigo Enigma,contestaras cualquier duda en el idioma espanol"
        const response = await axios.post('https://luminai.my.id/', { content:content,user:user,prompt:prompt });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}





