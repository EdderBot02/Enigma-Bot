import path from 'path';
import fetch from 'node-fetch';
import m3u8ToMp4 from 'm3u8-to-mp4';
import cp from 'child_process'
import { promisify } from 'util'
import { error } from 'console';
let exec = promisify(cp.exec).bind(cp)

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    try {
        if (!args[0]) return m.reply(`Ingresa el id y el capitulo del anime Ej:dragon-ball-z 10`);
        if (global.descargando === 1) return m.reply("Por favor espera otra película se esta descargando o enviando")
        const animeId = args[0];
        const episode = args[1] || 1;
        await m.react('⌛')
        const apiUrl = `https://animeflvapi.vercel.app/download/anime/${animeId}/${episode}`;
        const response = await fetch(apiUrl);
        let { servers } = await response.json();
        servers=servers[0]
        const codes = servers.filter(item => item.server !== 'mega').map(item => item.code);
        console.log(codes)
        let fallo=false
        let link=""
        for (const code of codes)
        {
            let o
            try {
                o = await exec(`cd /root/ && node hls.js ${code}`)
            } catch (e) {
                o = e 
                fallo=true
            } finally {
                let { stdout, stderr } = o
                if (stdout.trim()) {
                    fallo=false
                    link=stdout
                }
                if (stderr.trim()) fallo=true
            }
            if(!(fallo)) break
        }
        if (link === "") {
            await m.react('❌')
            console.log("No se encontró el link");
        } else {
            var converter = new m3u8ToMp4();
            global.descargando = 1;
            console.log(`El link es: ${link}`);
            await m.reply("Descargando No envies de nuevo el comando o te baneo")
            await converter.setInputFile(`${link}`)
            await converter.setOutputFile("pelicula.mp4")
            await converter.start();
            await m.reply("Espera un poco mas...")
            await conn.sendFile(m.chat,`pelicula.mp4`,`${text}.mp4`,null,m, null, {asDocument: true})
            global.descargando = 0
            await m.react('✅')
        }
    } catch (error) {
        global.descargando = 0;
        await m.react('❌')
    }
}


handler.command = ['animedl'];
export default handler;