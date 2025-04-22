const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");

    let coms = {};
    let mode = s.MODE.toLowerCase() === "yes" ? "🟢 Public" : "🔒 Private";

    // Group commands by category
    cm.map((com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault(s.TZ || 'Africa/Nairobi');
    const time = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    const header = `
╭━━━『 𝐔𝐂𝐄𝐘 𝐗𝐃 𝐁𝐎𝐓 』━━━╮
┃ 🧑‍💻 *Owner:* ${s.OWNER_NAME}
┃ ⚙️ *Mode:* ${mode}
┃ ⌨️ *Prefix:* ${s.PREFIXE}
┃ 📚 *Commands:* ${cm.length}
┃ 💻 *Platform:* ${os.platform()}
┃ 🕒 *Time:* ${time}
┃ 📅 *Date:* ${date}
┃ 🌐 *Powered by:* Ucey Tech
╰━━━━━━━━━━━━━━━━━━━━━━━╯
${readmore}
╭─『 *COMMAND CATEGORIES* 』─╮`;

    let body = "";

    for (const cat in coms) {
        body += `\n\n▣ *${cat.toUpperCase()}* ▣`;
        for (const cmd of coms[cat]) {
            body += `\n├─ 〉 ${prefixe}${cmd}`;
        }
    }

    const footer = `\n╰─『 © 2025 UCEY XD BOT 』─╯`;

    const caption = header + body + footer;
    const media = mybotpic(); // Should return image or video URL

    try {
        if (media.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, {
                video: { url: media },
                caption,
                gifPlayback: true
            }, { quoted: ms });
        } else if (media.match(/\.(jpg|jpeg|png)$/i)) {
            await zk.sendMessage(dest, {
                image: { url: media },
                caption
            }, { quoted: ms });
        } else {
            repondre(caption);
        }
    } catch (e) {
        console.error("Menu error: " + e);
        repondre("⚠️ Error displaying menu.");
    }
});
