import axios from 'axios';
let handler = async (m, { command, args, text, usedPrefix}) => {
	if (!text) return m.reply('Ingresa el nombre del anime')
try{
    
	let axi=await axios.get(`https://animeflvapi.vercel.app/search?text=${encodeURIComponent(text)}`)
    let json=axi.data.results
    let cap = `❍⌇─➭ *Anime-Buscador* «•«━┑\n`;
    let index=0
    for (const select of json) {
        console.log(select)
        cap += `\n➠ Busqueda : *(${index+1})*\n➠ Titulo: ${select.title}\n➠ Tipo: ${select.type}\n➠ id: ${select.id}\n\n`
        index++
        if(index>9) break
    }
    m.reply(cap)
    await m.react('✅')
}catch(e)
{
await m.react('❌')
}

}
handler.command = /^(animesearch)$/i;
export default handler
