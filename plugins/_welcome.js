import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://f4.bcbits.com/img/0011625258_10.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]

  if (chat.bienvenida && m.messageStubType == 27) {
    let bienvenida = `════ ⋆★⋆ ════\n*${botname}* \n「 Bienvenido 」\n  「 @${m.messageStubParameters[0].split`@`[0]} 」\n   ➠  Bienvenido a\n   ➠  ${groupMetadata.subject}\n   ➠  Lee las reglas del grupo\n════ ⋆★⋆ ════`
    
await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img, canal)
  }
  
  if (chat.bienvenida && m.messageStubType == 28) {
    let bye = `════ ⋆★⋆ ════\n*${botname}* \n│「 ADIOS 👋 」\n 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   ➠  Se fue\n   ➠ Jamás te quisimos aquí\n════ ⋆★⋆ ════`
await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal)
  }
  
  if (chat.bienvenida && m.messageStubType == 32) {
    let kick = `════ ⋆★⋆ ════\n*${botname}* \n│「 ADIOS 👋 」\n 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   ➠  Se fue\n   ➠ Jamás te quisimos aquí\n════ ⋆★⋆ ════`
await conn.sendAi(m.chat, botname, textbot, kick, img, img, canal)
}}