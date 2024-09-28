import axios from 'axios';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import {mediafiredl} from '@bochilteam/scraper';

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply(`𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝙑𝘼𝙇𝙄𝘿𝙊 𝘿𝙀 𝙈𝙀𝘿𝙄𝘼𝙁𝙄𝙍𝙀.\n\n𝙀𝙉𝙏𝙀𝙍 𝘼 𝙑𝘼𝙇𝙄𝘿 𝙈𝙀𝘿𝙄𝘼𝙁𝙄𝙍𝙀 𝙇𝙄𝙉𝙆`)
try {  
await m.react('⌛')
let res = await mediafiredl(args[0])
//let { name, size, date, mime, link } = res
let caption = `╔═.✵.══════════╗
┃ ✫彡 *Enigma-Bot ミ⁠●⁠﹏⁠☉⁠ミ*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ ✫彡𝙉𝙊𝙈𝘽𝙍𝙀 | 𝙉𝘼𝙈𝙀
┃ ${res.filename}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ ✫彡 𝙋𝙀𝙎𝙊 |  𝙎𝙄𝙕𝙀
┃ ${res.filesizeH}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ ✫彡 𝙏𝙄𝙋𝙊 | 𝙏𝙔𝙋𝙀
┃ ${res.ext}
╚══════════.✵.═╝`.trim()

await m.reply(caption)
if (res.filesizeH.includes('GB') && parseInt(res.filesizeH.replace('GB', '')) > 1.8) return await m.sendMessage(m.chat, {text: 'El archivo no debe pesar mas de 2 GB'}, {quoted: m})
await conn.sendFile(m.chat, res.url, res.filename, '', m, null, {mimetype: res.ext, asDocument: true});
await m.react('✅')
} catch (e) {
await m.react('❌')
}}
handler.help = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(mediafire|mediafiredl|dlmediafire)$/i

export default handler


