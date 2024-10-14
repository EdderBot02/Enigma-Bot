import fetch from 'node-fetch';
import cheerio from 'cheerio';
const handler = async (m, {conn, args, command, usedPrefix}) => {
  if (!args[0]) return await m.reply( `𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝙑𝘼𝙇𝙄𝘿𝙊 𝘿𝙀 𝙓𝙉𝙓𝙓`)
  try {
    await m.react('⌛')
    let xnxxLink = '';
    if (args[0].includes('xnxx')) {
      xnxxLink = args[0];
    } else {
        await m.reply(`𝙉𝙊 𝙁𝙐𝙉𝘾𝙄𝙊𝙉𝙊, 𝙐𝙎𝙀 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝘿𝙀 𝙓𝙉𝙓𝙓, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍\n\n`)
        return await m.react('❌')
    }
    const res = await xnxxdl(xnxxLink);
    console.log(res)
    const json = await res.result.files;
    await conn.sendMessage(m.chat, {document: {url: json.high}, mimetype: 'video/mp4', fileName: res.result.title}, {quoted: m});
    await m.react('✅')
  } catch {
    m.reply(`𝙉𝙊 𝙁𝙐𝙉𝘾𝙄𝙊𝙉𝙊, 𝙐𝙎𝙀 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝘿𝙀 𝙓𝙉𝙓𝙓, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍`)
    return await m.react('❌')
  }
};
handler.command = /^(xnxxdl)$/i
export default handler

async function xnxxdl(URL) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, {method: 'get'}).then((res) => res.text()).then((res) => {
      const $ = cheerio.load(res, {xmlMode: false});
      const title = $('meta[property="og:title"]').attr('content');
      const duration = $('meta[property="og:duration"]').attr('content');
      const image = $('meta[property="og:image"]').attr('content');
      const videoType = $('meta[property="og:video:type"]').attr('content');
      const videoWidth = $('meta[property="og:video:width"]').attr('content');
      const videoHeight = $('meta[property="og:video:height"]').attr('content');
      const info = $('span.metadata').text();
      const videoScript = $('#video-player-bg > script:nth-child(6)').html();
      const files = {
        low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
        high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
        HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
        thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
        thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
        thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
        thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1]};
      resolve({status: 200, result: {title, URL, duration, image, videoType, videoWidth, videoHeight, info, files}});
    }).catch((err) => reject({code: 503, status: false, result: err}));
  });
}