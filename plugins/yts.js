import yts from 'yt-search'

let handler = async (m, { conn, usedPrefix, command, text }) => {
   if (!text) return conn.reply(m.chat, 'Ingresa titulo del video', m )
   await m.react('⌛')
   try {
    let txt = '❍⌇─➭ *Youtube-Buscador* «•«━┑\n'
    const results = await search(`${text}`)

    if (!results || !results.length) return conn.reply(m.chat, `No se encontraron resultados.`, m)
    let img = await (await fetch(`${results[0].thumbnail}`)).buffer()

    for (let index = 0; index <= 4; index++) {
        txt += `	➠  *Video* : ${index + 1}\n`
        txt += `	➠  *Titulo* : ${results[index].title}\n`
        txt += `	➠  *Duración* : ${results[index].timestamp}\n`
        txt += `	➠  *Publicado* : ${results[index].ago}\n`
        txt += `	➠  *Autor* : ${results[index].author.name}\n`
        txt += `	➠  *Url* : ${results[index].url}\n\n`
      }


   
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null)
await m.react('✅')

} catch {
await m.react('✖️')
}
}
handler.help = ['ytsearch *<búsqueda>*']
handler.tags = ['search']
handler.command = ['ytsearch', 'yts']
export default handler



async function search(query, options = {}) {
    let search = await yts.search({ query, hl: "es", gl: "ES", ...options })
    return search.videos
  }


