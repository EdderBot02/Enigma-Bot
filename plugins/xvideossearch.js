import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, {text, usedPrefix, command}) => {
  if (!text) return m.reply("Ingrese titulo  buscar")
  try {
  await m.react('⌛')
  const json = await xvideosSearch(text);
  console.log(json)
  let cap = `❍⌇─➭ *XVideos-Buscador* «•«━┑\n`;
  let count = 1;
  for (let index = 0; index <= 4; index++) {
  cap += `\n➠ Video : *(${index+1})*\n➠ Titulo: ${json[index].title}\n➠ Link: ${json[index].url}\n➠ Duracion: ${json[index].duration}\n\n`
  }
  m.reply(cap);
  await m.react('✅')
  
  } catch {
      await m.react('❌')
  }
  }
  handler.command = /^(xvidsearch|xvideossearch)$/i;
  export default handler



async function xvideosSearch(url) {
  return new Promise(async (resolve) => {
  await axios.request(`https://www.xvideos.com/?k=${url}&p=${Math.floor(Math.random() * 9) +1}`, {method: "get"}).then(async result => {
  let $ = cheerio.load(result.data, {xmlMod3: false});
  let title = [];
  let duration = [];
  let quality = [];
  let url = [];
  let thumb = [];
  let hasil = [];
  $("div.mozaique > div > div.thumb-under > p.title").each(function(a,b){
  title.push($(this).find("a").attr("title"));
  duration.push($(this).find("span.duration").text());
  url.push("https://www.xvideos.com"+$(this).find("a").attr("href"));
  });
  $("div.mozaique > div > div.thumb-under").each(function(a,b){
  quality.push($(this).find("span.video-hd-mark").text());
  });
  $("div.mozaique > div > div > div.thumb > a").each(function(a,b){
  thumb.push($(this).find("img").attr("data-src"));
  });
  for(let i=0; i < title.length; i++){
  hasil.push({
  title: title[i],
  duration: duration[i],
  quality: quality[i],
  thumb: thumb[i],
  url: url[i]
  });
  }
  resolve(hasil);
  })})};



