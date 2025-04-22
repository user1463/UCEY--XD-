const util = require("util");
const fs = require("fs-extra");
const os = require("os");
const moment = require("moment-timezone");
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const s = require(__dirname + "/../set");

zokou(
  {
    nomCom: "menu",
    categorie: "General",
    reaction: "⚡",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    const { cm } = require(__dirname + "/../framework/zokou");

    let loadingMsg = await zk.sendMessage(
      dest,
      { text: "𝐋𝐨𝐚𝐝𝐢𝐧𝐠....\n▰▱▱▱▱▱▱▱▱▱ 10%" },
      { quoted: ms }
    );

    const updateProgress = async (percent) => {
      const bar = "▰".repeat(percent / 10) + "▱".repeat(10 - percent / 10);
      await zk.sendMessage(
        dest,
        { text: `𝐋𝐨𝐚𝐝𝐢𝐧𝐠...\n${bar} ${percent}%`, edit: loadingMsg.key },
        { quoted: ms }
      );
    };

    for (let percent of [10, 30, 50, 70, 100]) {
      await new Promise((r) => setTimeout(r, 300));
      await updateProgress(percent);
    }

    moment.tz.setDefault("Africa/Nairobi");
    const time = moment().format("HH:mm:ss");
    const mode = s.MODE.toLowerCase() === "yes" ? "private" : "public";

    let coms = {};
    cm.map((c) => {
      if (!coms[c.categorie]) coms[c.categorie] = [];
      coms[c.categorie].push(c.nomCom);
    });

    const info = `
╭─────[ *DARK-MD V²* ]─────╮
│ *Owner:* @254107065646
│ *Mode:* ${mode}
│ *Time:* ${time} (EAT)
│ *RAM:* ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
╰──────────────────────────╯`;

    let menuText = `
╭──────[ ⚡ 𝐌𝐄𝐍𝐔 ⚡ ]──────╮
│ Use ${prefixe}help <cmd>
│ for command info
│
`;

    const styles = {
      General: "🌟", Group: "👥", Fun: "🎭",
      Mods: "🛡️", Search: "🔍", Logo: "🎨",
      Utilities: "🛠", AI: "🤖",
    };

    for (const cat in coms) {
      const icon = styles[cat] || "✨";
      menuText += `│ ${icon} *${cat.toUpperCase()}*\n`;
      coms[cat].forEach(cmd => {
        menuText += `│   • ${cmd}\n`;
      });
    }

    menuText += `╰────────────────────────╯`;

    const imageOrVideo = mybotpic(); // Get bot banner media
    const mentions = ["254107065646@s.whatsapp.net"];

    await zk.sendMessage(
      dest,
      { text: "𝐌𝐄𝐍𝐔 𝐑𝐄𝐀𝐃𝐘 ✅\n▰▰▰▰▰▰▰▰▰▰ 100%", edit: loadingMsg.key },
      { quoted: ms }
    );

    await new Promise((r) => setTimeout(r, 500));

    if (imageOrVideo.match(/\.(mp4|gif)$/i)) {
      await zk.sendMessage(
        dest,
        {
          video: { url: imageOrVideo },
          caption: info + "\n" + menuText,
          gifPlayback: true,
          mentions,
        },
        { quoted: ms }
      );
    } else if (imageOrVideo.match(/\.(jpg|jpeg|png)$/i)) {
      await zk.sendMessage(
        dest,
        {
          image: { url: imageOrVideo },
          caption: info + "\n" + menuText,
          mentions,
        },
        { quoted: ms }
      );
    } else {
      await zk.sendMessage(
        dest,
        { text: info + "\n" + menuText, mentions },
        { quoted: ms }
      );
    }

    // Voice note
    const voiceDir = __dirname + "/../voices/";
    if (!fs.existsSync(voiceDir)) return;

    const voices = fs.readdirSync(voiceDir).filter(f => f.endsWith(".mp3"));
    if (voices.length === 0) return;

    const voice = voiceDir + voices[Math.floor(Math.random() * voices.length)];
    if (fs.existsSync(voice)) {
      await zk.sendMessage(
        dest,
        {
          audio: { url: voice },
          mimetype: "audio/mpeg",
          ptt: true,
        },
        { quoted: ms }
      );
    }
  }
);