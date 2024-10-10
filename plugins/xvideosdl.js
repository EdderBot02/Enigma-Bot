import fetch from 'node-fetch';
import cheerio from 'cheerio';
const handler = async (m, {conn, args,text, command, usedPrefix}) => {
  if (!args[0]) return await m.reply( `𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝙑𝘼𝙇𝙄𝘿𝙊 𝘿𝙀 𝙓𝙑𝙄𝘿𝙀𝙊𝙎`)
  try {
    await m.react('⌛')
    const res = await xvideosdl(text);
    console.log(res)
    //const json = await res.result.files;
    await conn.sendMessage(m.chat, {document: {url: res.result.url}, mimetype: 'video/mp4', fileName: res.result.title}, {quoted: m});
    await m.react('✅')
  } catch {
    m.reply(`𝙉𝙊 𝙁𝙐𝙉𝘾𝙄𝙊𝙉𝙊, 𝙐𝙎𝙀 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝘿𝙀 𝙓𝙑𝙄𝘿𝙀𝙊𝙎, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍`)
    return await m.react('❌')
  }
};
handler.command = /^(xvideosdl|xviddl)$/i
export default handler

async function xvideosdl(url) {
    return new Promise((resolve, reject) => {
    fetch(`${url}`, {method: 'get'})
    .then(res => res.text())
    .then(res => {
    let $ = cheerio.load(res, {xmlMode: false});
    const title = $("meta[property='og:title']").attr("content")
    const keyword = $("meta[name='keywords']").attr("content")
    const views = $("div#video-tabs > div > div > div > div > strong.mobile-hide").text()+" views"
    const vote = $("div.rate-infos > span.rating-total-txt").text()
    const likes = $("span.rating-good-nbr").text()
    const deslikes = $("span.rating-bad-nbr").text()
    const thumb = $("meta[property='og:image']").attr("content")
    const url = $("#html5video > #html5video_base > div > a").attr("href")
    resolve({status: 200, result: {title, url, keyword, views, vote, likes, deslikes, thumb}})
    })})};