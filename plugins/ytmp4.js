import axios from 'axios';
import yts from 'yt-search'
import { savefrom } from '@bochilteam/scraper-savefrom'

let handler = async (m, { command, args, text, usedPrefix}) => {
    if (!args[0]) return m.reply("Ingresa el enlace del vídeo de YouTube")
    try { 
        await m.react('⌛')
        let enlace=`${args[0]}`

        const regexEnlaceYoutube =/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.be)\/(shorts\/|watch\?v=)?([a-zA-Z0-9_-]{11})(\?.*)?$/
        //const regexEnlaceYoutube = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9_-]{11})$/;
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
        const { data}= await axios.get(`https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${enlace}`);
        const yt=data.data.download.url
        sec =data.data.duration
        if(verificarDuracion(sec)) await conn.sendMessage(m.chat, {document: {url:yt}, caption:"ミ★ 𝘌𝘯𝘪𝘨𝘮𝘢-𝘉𝘰𝘵 ★彡", mimetype: 'video/mp4', fileName: fname.replace(/^X2Download\.app-/, '') + `.mp4`}, {quoted: m})
        else await conn.sendFile(m.chat,yt,'yt.mp4',"ミ★ 𝘌𝘯𝘪𝘨𝘮𝘢-𝘉𝘰𝘵 ★彡", m, null)
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
 sec=data.t
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
var sec=""
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))



function convertirADuracionEnSegundos(duracion) {
  const [minutos, segundos] = duracion.split(':').map(Number);
  return (minutos * 60) + segundos;
}


function verificarDuracion(duracion) {
  
  if (duracion > 1500) {
    return true
  } else {
    return false
  }
}








/*
import axios from 'axios';
import yts from 'yt-search'

let handler = async (m, { command, args, text, usedPrefix}) => {
    if (!args[0]) return m.reply("Ingresa el enlace del vídeo de YouTube")
    try { 
        await m.react('⌛')
        let enlace=`${args[0]}`

        const regexEnlaceYoutube =/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.be)\/(shorts\/|watch\?v=)?([a-zA-Z0-9_-]{11})(\?.*)?$/
        //const regexEnlaceYoutube = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([a-zA-Z0-9_-]{11})$/;
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
        const yt = await ytmp4(enlace)
        if(verificarDuracion(sec)) await conn.sendMessage(m.chat, {document: {url:yt}, caption:"ミ★ 𝘌𝘯𝘪𝘨𝘮𝘢-𝘉𝘰𝘵 ★彡", mimetype: 'video/mp4', fileName: fname.replace(/^X2Download\.app-/, '') + `.mp4`}, {quoted: m})
        else await conn.sendFile(m.chat,yt,'yt.mp4',"ミ★ 𝘌𝘯𝘪𝘨𝘮𝘢-𝘉𝘰𝘵 ★彡", m, null)
      //  await delay(3 * 1000)
        
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
 sec=data.t
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
var sec=""
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))



function convertirADuracionEnSegundos(duracion) {
  const [minutos, segundos] = duracion.split(':').map(Number);
  return (minutos * 60) + segundos;
}


function verificarDuracion(duracion) {
  
  if (duracion > 1500) {
    return true
  } else {
    return false
  }
}
*/
