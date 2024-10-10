import axios from 'axios';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply(`𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝙑𝘼𝙇𝙄𝘿𝙊 𝘿𝙀 𝙈𝙀𝘿𝙄𝘼𝙁𝙄𝙍𝙀.\n\n𝙀𝙉𝙏𝙀𝙍 𝘼 𝙑𝘼𝙇𝙄𝘿 𝙈𝙀𝘿𝙄𝘼𝙁𝙄𝙍𝙀 𝙇𝙄𝙉𝙆`)
try {  
await m.react('⌛')
let res = await mediafireDl(args[0])
//let { name, size, date, mime, link } = res
let caption = `╔═.✵.══════════╗
┃ ✫彡 *ミ★ 𝘌𝘯𝘪𝘨𝘮𝘢-𝘉𝘰𝘵 ★彡*
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

//let url="https://download2389.mediafire.com/tg8moatxwpfgtAn64kdPUK5dJjnEW0TMdOYY20xulCdj5CqFr8PBNStEqzlzrZMCLCMyaXTX90Z_fdgRU44E8ZKytt8EDoBLGchw9z5V8G1k-jsEbi2vBmLGdD3nRz7VPh7M-BRyCoMSgy-0GSKCXB14E3CQq5PSgv1MeQ8rvThOyJo/fbdf2aydm7mbwoo/Waifu-Hub-15-season-1-modmenus.com.apk"
await m.reply(caption)
if (res.filesizeH.includes('GB') && parseFloat(res.filesizeH.replace('GB', '')) > 1.79) return await m.reply('El archivo no debe pesar mas de 2 GB')
await conn.sendFile(m.chat, res.url, res.filename, '', m, null, {mimetype: res.ext, asDocument: true});
await m.react('✅')
return
} catch (e) {
await m.react('❌')
}
}
handler.help = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(mediafire|mediafiredl|dlmediafire)$/i

export default handler


async function mediafireDl(urldl) {
puppeteer.use(StealthPlugin())
  const browser = await puppeteer.launch({
     args: ["--no-sandbox","--disabled-setupid-sandbox"]
});

  const page = await browser.newPage();
  await page.goto(urldl);
  const html = await page.content();
  await browser.close();
  const $ = cheerio.load(html);
  const url = $('#downloadButton').attr('href');
  const filename = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ', '').replaceAll('\n', '');
  const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text();
  const filesizeH = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ', '');
  let ext = '';
  const rese = await axios.head(url);
  ext = rese.headers['content-type'];
  return {filename, filesizeH, date, ext, url};  
}













/*import axios from 'axios';
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


*/