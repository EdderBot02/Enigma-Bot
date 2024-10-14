const handler = async (m, { conn, command, text, args, usedPrefix }) => {

let dlmenu = `
  ミ★ 𝘌𝘯𝘪𝘨𝘮𝘢-𝘉𝘰𝘵 ★彡

  ✦ ───『 *Menu* 』─── ⚝
  ◈ .animesearch <texto>
  ◈ .animedl <id capitulo>
  ◈ .apk <texto>
  ◈ .bingen <texto>
  ◈ .facebook <url>
  ◈ .gemini <texto>
  ◈ .ia <texto>
  ◈ .infobot
  ◈ .instagram <url>
  ◈ .mediafire <url>
  ◈ .play <texto>
  ◈ .play2 <texto>
  ◈ .spotify <texto|url>
  ◈ .sticker
  ◈ .tiktok <url>
  ◈ .tiktoksearch <texto>
  ◈ .xvideosdl <url>
  ◈ .xnxxdl <url>
  ◈ .xvideosearch <texto>
  ◈ .xnxxsearch <texto>
  ◈ .xnxxsearch <texto>
  ◈ .ytsearch <texto>
    ╰──────────⳹`




//https://i.gifer.com/84OP.mp4
await conn.sendMessage(
    m.chat,
    { video: { url: "https://i.gifer.com/Vaiv.mp4" }, caption: dlmenu,
    contextInfo: {
      mentionedJid: [m.sender],
      isForwarded: true,
    },
    
    gifPlayback: true, gifAttribution: 0 },
    { quoted: m }
  )


}

handler.command = /^(menu)$/i
export default handler

