import fetch from 'node-fetch';
const handler = async (m, {text, usedPrefix, command}) => {
if (!text) return m.reply("Ingrese titulo  buscar")
try {
await m.react('⌛')
const res = await xnxxsearch(text);
console.log(res)
const json = res.result;
let cap = `❍⌇─➭ *XNXX-Buscador* «•«━┑\n`;
let count = 1;
for (let index = 0; index <= 4; index++) {
cap += `\n➠ Video : *(${index})*\n➠ Titulo: ${json[index].title}\n➠ Link: ${json[index].link}\n➠ Info: ${json[index].info}\n\n`
}
m.reply(cap);
await m.react('✅')

} catch {
    await m.react('❌')
}
}
handler.command = /^xnxxsearch$/i
export default handler

async function xnxxsearch(query) {
  return new Promise((resolve, reject) => {
    const baseurl = 'https://www.xnxx.com';
    fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'}).then((res) => res.text()).then((res) => {
      const $ = cheerio.load(res, {xmlMode: false});
      const title = [];
      const url = [];
      const desc = [];
      const results = [];
      $('div.mozaique').each(function(a, b) {
        $(b).find('div.thumb').each(function(c, d) {
          url.push(baseurl + $(d).find('a').attr('href').replace('/THUMBNUM/', '/'));
        });
      });
      $('div.mozaique').each(function(a, b) {
        $(b).find('div.thumb-under').each(function(c, d) {
          desc.push($(d).find('p.metadata').text());
          $(d).find('a').each(function(e, f) {
            title.push($(f).attr('title'));
          });
        });
      });
      for (let i = 0; i < title.length; i++) {
        results.push({title: title[i], info: desc[i], link: url[i]});
      }
      resolve({code: 200, status: true, result: results});
    }).catch((err) => reject({code: 503, status: false, result: err}));
  });
}

