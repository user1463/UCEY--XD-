const util = require('util');
const fs = require('fs-extra');
const os = require("os");
const moment = require("moment-timezone");
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const s = require(__dirname + "/../set");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");

    let coms = {};
    let mode = (s.MODE.toLowerCase() === "yes") ? "public" : "private";

    cm.map(async (com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('EAT');
    const timeNow = moment().format('HH:mm:ss');
    const dateNow = moment().format('DD/MM/YYYY');

    const infoMsg = `
╭━━━☢︎︎ *『 UCEY XD 』* ☢︎︎━━━❍
┃❍╭──────────────߷
┃❍│▸ *Date*       : ${dateNow}
┃❍│▸ *Time*       : ${timeNow}
┃❍│▸ *Prefix*     : [ ${s.PREFIXE} ]
┃❍│▸ *Mode*       : ${mode}
┃❍│▸ *Plugins*    : ${cm.length}
┃❍│▸ *Platform*   : ${os.platform()}
┃❍│▸ *Owner*      : ${s.OWNER_NAME}
┃❍│▸ *Developer*  : Ucey Tech
┃❍│▸ *Timezone*   : ${s.TZ}
┃❍╰───────────────߷
╰━━━⟣ Created by Ucey Tech ⟢━━━
${readmore}`;

    let menuMsg = `\n*╭─◇ UCEY XD COMMANDS ◇─╮*`;

    for (const cat in coms) {
        menuMsg += `\n\n*⟫ ${cat.toUpperCase()}*\n`;
        for (const cmd of coms[cat]) {
            menuMsg += `*┊⭔* ${prefixe}${cmd}\n`;
        }
    }

    menuMsg += `\n*╰─◇ Powered by Ucey Tech ◇─╯*`;

    let media = mybotpic();

    try {
        if (media.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, {
                video: { url: media },
                caption: infoMsg + menuMsg,
                footer: "*UCEY XD - Stylish WhatsApp Bot*",
                gifPlayback: true
            }, { quoted: ms });

        } else if (media.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(dest, {
                image: { url: media },
                caption: infoMsg + menuMsg,
                footer: "*UCEY XD by Ucey Tech*"
            }, { quoted: ms });

        } else {
            repondre(infoMsg + menuMsg);
        }

    } catch (e) {
        console.log("🥵 Menu erreur:", e);
        repondre("🥵 Menu erreur: " + e);
    }

});
