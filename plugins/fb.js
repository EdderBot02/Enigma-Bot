import axios from 'axios';
import yts from 'yt-search'

let handler = async (m, { command, args, text, usedPrefix}) => {
    if (!args[0]) return m.reply("Ingresa el enlace del vídeo de Facebook")
    try { 
        await m.react('⌛')
        let enlace=`${args[0]}`
        const { yt, duration }= await ytmp4(enlace)
        console.log(yt)
        console.log(duration)
        
        if(verificarDuracion(duration)) await conn.sendMessage(m.chat, {document: {url:yt}, caption:"ミ★ 𝘌𝘯𝘪𝘨𝘮𝘢-𝘉𝘰𝘵 ★彡", mimetype: 'video/mp4', fileName: `fb.mp4`}, {quoted: m})
        else await conn.sendFile(m.chat,yt, 'fbdl.mp4',"ミ★ 𝘌𝘯𝘪𝘨𝘮𝘢-𝘉𝘰𝘵 ★彡", m, null)
      //await delay(3 * 1000)
        await m.react('✅');  
        
    }
    catch(e) {
        await m.react('❌')
        return console.log(e)
    }
    return 1
}

handler.command = /^(fb|facebook)$/i;
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
 //console.log(data)
 return {yt:data.links.sd,duration:data.duration}
}



function convertirADuracionEnSegundos(duracion) {
  const [minutos, segundos] = duracion.split(':').map(Number);
  return (minutos * 60) + segundos;
}


function verificarDuracion(duracion) {
  const duracionEnSegundos = convertirADuracionEnSegundos(duracion);
  if (duracionEnSegundos > 180) {
    return true
  } else {
    return false
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

