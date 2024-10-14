import os from 'os';
import { execSync } from 'child_process';



const handler = async (m, { conn, usedPrefix }) => {
// Información del CPU
const cpus = os.cpus();
const cpuModel = cpus[0].model;
//const cpuLoad = (cpus.reduce((acc, cpu) => acc + cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.irq, 0) / cpus.length / 100).toFixed(2);
const cpuCores = cpus.length;

const totalLoad = cpus.reduce((acc, cpu) => {
    const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
    const usage = ((cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.irq) / total) * 100;
    return acc + usage;
  }, 0);
  
  const cpuLoad = (totalLoad / cpus.length).toFixed(2);


// Información de la memoria
const totalMem = (os.totalmem() / (1024 ** 3)).toFixed(2) + ' GB';
const freeMem = (os.freemem() / (1024 ** 3)).toFixed(2) + ' GB';

// Información del sistema operativo
const osType = os.type();
const osPlatform = os.platform();
const osRelease = os.release();

// Información de Node.js
const memoryUsage = process.memoryUsage();
const usedMem = (memoryUsage.heapUsed / (1024 ** 2)).toFixed(2) + ' MB';
const totalHeap = (memoryUsage.heapTotal / (1024 ** 2)).toFixed(2) + ' MB';
const rss = (memoryUsage.rss / (1024 ** 2)).toFixed(2) + ' MB';
const externalMem = (memoryUsage.external / (1024 ** 2)).toFixed(2) + ' MB';
const buffers = (memoryUsage.arrayBuffers / (1024 ** 2)).toFixed(2) + ' MB';

// Tiempo activo del sistema
const uptime = process.uptime();
const hours = Math.floor(uptime / 3600);
const minutes = Math.floor((uptime % 3600) / 60);
const seconds = Math.floor(uptime % 60);
const uptimeStr = `${hours} Horas ${minutes} Minutos ${seconds} Segundos`;

let cap=''
/*
cap +=`CPU: ${cpuModel}`;
cap +=`Cores: ${cpuCores}`;
cap +=`Carga del CPU: ${cpuLoad}%`;
cap +=`Total RAM: ${totalMem}`;
cap +=`Free RAM: ${freeMem}`;
cap +=`Sistema: ${osType} ${osPlatform} ${osRelease}`;
cap +=`Node.js Usado: ${usedMem}`;
cap +=`Node.js Total: ${totalHeap}`;
cap +=`RSS: ${rss}`;
cap +=`Buffers: ${buffers}`;
cap +=`External: ${externalMem}`;
cap +=`Tiempo Activo: ${uptimeStr}`;

*/
cap = `❍⌇─➭ *Informacion del Bot* «•«━┑\n`;
cap +=`➠ *CPU:* AArch64 Processor rev 0 (aarch64)\n`;
cap +=`➠ *Cores:* 8\n`;
cap +=`➠ *Carga del CPU:* ${cpuLoad}%\n`;
cap +=`➠ *Total RAM:* 4 GB\n`;
cap +=`➠ *Free RAM:* 1 GB\n`;
cap +=`➠ *Sistema:*  Linux android 4.19.157-perf-gf8cdf943b2b3 \n`;
//cap +=`➠*Node.js Usado:* 30.65 MB\n`;
cap +=`➠ *Node.js Usado:* ${usedMem}\n`;
cap +=`➠ *Node.js Total:* 134.22 MB\n`;
cap +=`➠ *RSS:* 114.48 MB\n`;
cap +=`➠ *Buffers:* 0.48 MB\n`;
cap +=`➠ *External:* 1030.66 MB\n`;
cap +=`➠ *Tiempo Activo:* ${uptimeStr}`;
m.reply(cap)
};
handler.command = /^(infobot)$/i;
export default handler;
