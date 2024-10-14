import yts from 'yt-search'

let handler = async (m, { conn, usedPrefix, command, text }) => {
   if (!text) return conn.reply(m.chat, 'Ingresa titulo del video', m )
   await m.react('⌛')
   try {
    let txt = '❍⌇─➭ *TikTok-Buscador* «•«━┑\n'
    let results =await axios.get(`https://deliriusapi-official.vercel.app/search/tiktoksearch?query=${text}`);
    results=results.data.meta

    if (!results || !results.length) return conn.reply(m.chat, `No se encontraron resultados.`, m)
    let img = await (await fetch(`https://cdn.pixabay.com/photo/2022/05/16/03/45/tiktok-7199389_1280.jpg`)).buffer()

    for (let index = 0; index <= 4; index++) {
        txt += `	➠  *Video* : ${index + 1}\n`
        txt += `	➠  *Titulo* : ${results[index].title}\n`
        txt += `	➠  *Duración* : ${results[index].duration} segundos\n`
        txt += `	➠  *Region* : ${results[index].region}\n`
        txt += `	➠  *Autor* : ${results[index].author.username}\n`
        txt += `	➠  *Url* : ${results[index].url}\n\n`
      }
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null)
await m.react('✅')
} catch {
await m.react('✖️')
}
}
handler.help = ['tiktoksearch *<búsqueda>*']
handler.tags = ['search']
handler.command = ['tiktoksearch', 'tts']
export default handler



