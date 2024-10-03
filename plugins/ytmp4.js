import axios from 'axios';
import yts from 'yt-search'

let handler = async (m, { command, args, text, usedPrefix}) => {
    if (!args[0]) return m.reply("Ingresa el enlace del vídeo de YouTube")
    try { 
        await m.react('⌛')
        let enlace=`${args[0]}`
        const regexEnlaceYoutube = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9_-]{11})$/;
        if(!(regexEnlaceYoutube.test(enlace)))
        {
          const results = await search(`${text}`)
          enlace=results[0].url
        }
        const yt = await ytmp4(enlace)
      //  await delay(3 * 1000)
        await conn.sendMessage(m.chat, {document: {url:yt}, caption:"Enigma-Bot ミ⁠●⁠﹏⁠☉⁠ミ", mimetype: 'video/mp4', fileName: fname.replace(/^X2Download\.app-/, '') + `.mp4`}, {quoted: m})
        await m.react('✅');  
    }
    catch(e) {
        await m.react('❌')
        return console.log(e)
    }
    return 1
}

handler.command = /^(play2|ytprovid|ytmp4doc|video|fgmp4|dlmp4|getvid|yt(v|mp4))$/i;
export default handler

async function ytmp4(url) {
        let userAgent = `Mozilla/5.0 (X11; U; Linux i686; en-US; rv:0.9.3) Gecko/20010801`
  const { data } = await axios(`https://x2download.app/api/ajaxSearch`, {
    method: "post",
    data: { q: url, vt: "home" },
    headers: {
      'User-Agent': userAgent,
      "content-type": "application/x-www-form-urlencoded",
      accept: "*/*",
      "x-requested-with": "XMLHttpRequest"
    }
  })
 console.log(data)
//  await delay(3 * 1000)
  const data2= await axios(`https://cv756.ytcdn.app/api/json/convert`, {
    method: "post",
    data: {v_id:data.vid,ftype:"mp4",fquality:"360p",fname:data.fn,token:data.token,timeExpire:data.timeExpires},
    headers: {
    'User-Agent': userAgent,
      "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
          "Origin":"https://x2download.app",
  "Referer":"https://x2download.app/",
        "X-Requested-Key":"de0cfuirtgf67a"
    }
  })
fname=data.fn
console.log(data2.data.result)
return data2.data.result
}

async function search(query, options = {}) {
  let search = await yts.search({ query, hl: "es", gl: "ES", ...options })
  return search.videos
}
var fname=""
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

