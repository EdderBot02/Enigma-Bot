import axios from 'axios';
import yts from 'yt-search'

let handler = async (m, { command, args, text, usedPrefix}) => {
    if (!args[0]) return m.reply("Ingresa el enlace del vídeo de YouTube")
    try { 
        await m.react('⌛')
        let enlace=`${args[0]}`
        const regexEnlaceYoutube =/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.be)\/(shorts\/|watch\?v=)?([a-zA-Z0-9_-]{11})(\?.*)?$/

       // const regexEnlaceYoutube = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9_-]{11})$/;
        if(!(regexEnlaceYoutube.test(enlace)))
        {
          const results = await search(`${text}`)
          let img = await (await fetch(`${results[0].thumbnail}`)).buffer()
          let txt = '❍⌇─➭ *Youtube-Downloader* «•«━┑\n'
              txt += `	➠  *Titulo* : ${results[0].title}\n`
              txt += `	➠  *Duración* : ${results[0].timestamp}\n`
              txt += `	➠  *Publicado* : ${results[0].ago}\n`
              txt += `	➠  *Autor* : ${results[0].author.name}\n`
              txt += `	➠  *Url* : ${results[0].url}\n\n⋘ 𝑃𝑙𝑒𝑎𝑠𝑒 𝑤𝑎𝑖𝑡... ⋙`
          await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null)
          enlace=results[0].url
        }
        const yt = await ytmp3(enlace)
       // await delay(3 * 1000)
        await conn.sendMessage(m.chat, { audio: { url:yt }, mimetype: 'audio/mpeg'} , { quoted: m })   
        await m.react('✅')
    }
    catch(e) {
        await m.react('❌')
    }
    return true
}

handler.command = /^(play|ytpro|yt(a|mp3)|ytmp3doc)$/i;
export default handler

async function ytmp3(url) {
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
 // await delay(3 * 1000)
  const data2= await axios(`https://backend.svcenter.xyz/api/convert-by-45fc4be8916916ba3b8d61dd6e0d6994`, {
    method: "post",
    data: {v_id:data.vid,ftype:"mp3",fquality:128,token:data.token,timeExpire:data.timeExpires,client:"X2Download.app"},
    headers: {
    'User-Agent': userAgent,
      "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
      accept: "*/*",
          "Origin":"https://x2download.app",
  "Referer":"https://x2download.app/",
        "X-Requested-Key":"de0cfuirtgf67a"
    }
  })
  
  return data2.data.d_url
}

async function search(query, options = {}) {
  let search = await yts.search({ query, hl: "es", gl: "ES", ...options })
  return search.videos
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
