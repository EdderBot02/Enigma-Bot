import axios from 'axios';
let handler = async (m, { command, args, text, usedPrefix}) => {
	if (!text) return m.reply('Ingresa el nombre de la aplicación')
try{
    await m.react('⌛')
	let userAgent = `Mozilla/5.0 (X11; U; Linux i686; en-US; rv:0.9.3) Gecko/20010801`
	let axi=await axios.get(`https://apkpure.com/search-page?q=${encodeURIComponent(text)}&begin=`,{headers: { 'User-Agent': userAgent }})
    let rdata=axi.data
    let dataDtApp = rdata.match(/data-dt-app="([^"]+)"/)[1];
    let title = rdata.match(/title="([^"]+)"/)[1];
    let icon= rdata.match(/src="([^"]+)"/)[1];
    await conn.sendMessage(m.chat, {image: {url: icon}, caption: `Espera por favor...\nEnviando: ${title}`}, {quoted: m});
	//await m.reply(`Espera por favor...\nEnviando: ${title}`)


  
	let axi2=await axios({
  method: 'get',
  url: `https://d.apkpure.com/b/APK/${dataDtApp}?version=latest`,
  responseType: 'stream',
  headers: {
    'User-Agent': userAgent
  }
})
    await conn.sendMessage(m.chat, {document: {url: axi2.data.responseUrl}, mimetype: 'application/vnd.android.package-archive', fileName: `${title.replace(/\s/g, "_")}.apk`, caption: null}, {quoted: m})
    await m.react('✅')
}catch(e)
{
await m.react('❌')
}
}
handler.command = /^(apk|apkmod|modapk|apkpure)$/i;
export default handler
