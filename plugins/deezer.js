import axios from 'axios';
import fs from 'fs';
import * as api from 'd-fi-core';
import JSZip from 'jszip'

let handler = async (m, { conn,text, args, usedPrefix, command }) => {
if (!text) return m.reply( `Ingresa link de canción`)
try{
// Init api with arl from cookie
await api.initDeezerApi("66ec0fe5f4d44f45d55b3d154672cd02a9fc799a29240038536422331eaa6cfbbaccc582d2c2774ae5b213bcb5653dcdfe6f0485bcd3a881acbbd3e721288ddb8a0536dd746e589100b98b33ff4b6212fcb764b53d8e3af2688e06c3f565d69b");

// Verify user
try {
  const user = await api.getUser();
  // Successfully logged in
  console.log('Logged in as ' + user.BLOG_NAME);
} catch (err) {
  // Invalid arl cookie set
  await m.react('✖️')
  console.error(err.message);
  
  return
}
await m.react('⌛')

if (esURL(`${text}`)) {
let link_type=await api.parseInfo(`${text}`)
let linktype=link_type.linktype
console.log("menu")
console.log(linktype)
if (linktype === 'track') {

let trackid=await api.parseInfo(`${text}`)

const trackinfo=trackid
trackid=trackid.tracks[0].SNG_ID

let { SNG_TITLE, ART_NAME, ALB_TITLE }=trackinfo.tracks[0]

let txt =`★━━━━━━━━━━━━━━━━━━━━★
ᴰᵉˢᶜᵃʳᵍᵃⁿᵈᵒ
𝐓í𝐭𝐮𝐥𝐨:${SNG_TITLE}
𝘼𝙧𝙩𝙞𝙨𝙩𝙖:${ART_NAME}
𝐀𝐥𝐛𝐮𝐦:${ALB_TITLE}
★━━━━━━━━━━━━━━━━━━━━★
`

const cover = `https://e-cdns-images.dzcdn.net/images/cover/${trackinfo.tracks[0].ALB_PICTURE}/500x500-000000-80-0-0.jpg`;
await conn.sendMessage(m.chat, {image: {url: cover}, caption: `${txt}`}, {quoted: m});


let trackbuffer=await getAudio(trackid)
console.log("se obtuvo buffer")

console.log("se obtuvo cover")
await conn.sendMessage(m.chat, {document:trackbuffer,mimetype: 'audio/flac', fileName: trackinfo.tracks[0].SNG_TITLE + '.flac',contextInfo: {externalAdReply: {title: "",body: "Enigma-Bot ミ⁠●⁠﹏⁠☉⁠ミ",thumbnailUrl:cover,mediaType: 1,showAdAttribution: true}}}, {quoted: m});  
  console.log(1); 
  return
} else if (linktype === 'album') {
let albumid=await api.parseInfo(`${text}`)
albumid=albumid.linkinfo.ALB_ID
let albumInfo=await api.getAlbumInfo(albumid)
let album=await api.getAlbumTracks(albumid)
let albumTracks=album.data
let zip = new JSZip();
for (let i = 0; i < albumTracks.length; i++) {
//console.log(albumTracks[i].SNG_ID);
//console.log(albumTracks[i].SNG_TITLE);
let randomName=`${albumTracks[i].SNG_TITLE}.flac`
let audioBuffer=getAudio(albumTracks[i].SNG_ID)
zip.file(randomName, audioBuffer);		  
}
zip.generateAsync({type: 'nodebuffer'}).then(function(content) {
      	conn.sendFile(m.chat, content,`${albumInfo.ALB_TITLE}.zip`, null, m);
        })
        
        return
} else {
 m.reply("Url No soportada")
 
 return 
}
} else {
const QUERY = `${text}`;
const response = await api.searchMusic(QUERY, ['TRACK', 'ALBUM', 'ARTIST'], 1);

let sng_id=response.TRACK.data[0].SNG_ID
let { SNG_TITLE, ART_NAME, ALB_TITLE }=response.TRACK.data[0]

let txt =`★━━━━━━━━━━━━━━━━━━━━★
ᴰᵉˢᶜᵃʳᵍᵃⁿᵈᵒ
𝐓í𝐭𝐮𝐥𝐨:${SNG_TITLE}
𝘼𝙧𝙩𝙞𝙨𝙩𝙖:${ART_NAME}
𝐀𝐥𝐛𝐮𝐦:${ALB_TITLE}
★━━━━━━━━━━━━━━━━━━━━★
`

//m.reply(txt)

const cover = `https://e-cdns-images.dzcdn.net/images/cover/${response.TRACK.data[0].ALB_PICTURE}/500x500-000000-80-0-0.jpg`;
await conn.sendMessage(m.chat, {image: {url: cover}, caption: `${txt}`}, {quoted: m});
let trackbuffer=await getAudio(sng_id)
await conn.sendMessage(m.chat, {document:trackbuffer,mimetype: 'audio/flac', fileName: response.TRACK.data[0].SNG_TITLE + '.flac',contextInfo: {externalAdReply: {title: "",body: "Enigma-Bot ミ⁠●⁠﹏⁠☉⁠ミ",thumbnailUrl:cover,mediaType: 1,showAdAttribution: true}}}, {quoted: m});
await m.react('✅')

return
}
}catch(e) {console.log(e)
await m.react('✖️')}
}
handler.command = /^(deezer|flac|spotify|tidal|music)$/i
export default handler

async function getAudio(sng_id) {
const track = await api.getTrackInfo(sng_id)

// Parse download URL for 128kbps
const trackData = await api.getTrackDownloadUrl(track,9);

if (!trackData) m.reply('Selected track+quality are unavailable');

// Download track
const {data} = await axios.get(trackData.trackUrl, {responseType: 'arraybuffer'});

// Decrypt track if needed
const outFile = trackData.isEncrypted ? api.decryptDownload(data, track.SNG_ID) : data;

// Add id3 metadata
const trackWithMetadata = await api.addTrackTags(outFile, track, 500);

return trackWithMetadata
}


function esURL(texto) {
  const expresionRegular = /^(ftp|http|https):\/\/[^ "]+$/;
  return expresionRegular.test(texto);
}