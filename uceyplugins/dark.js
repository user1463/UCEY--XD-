const { zokou } = require('../framework/zokou');

zokou(
  {
    nomCom: 'dark',
    categorie: 'General',
    reaction: '🗿'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, prefix } = commandeOptions;

    try {
      // Group and Channel links
      const groupLink = 'https://chat.whatsapp.com/G2vuCMg8HlpGb5iiTDrrdA';
      const channelLink = 'https://whatsapp.com/channel/0029VarDt9t30LKL1SoYXy26';

      // Prepare the button message content
      const captionText = `𝐇𝐞𝐫𝐞 𝐚𝐫𝐞 𝐭𝐡𝐞 𝐔𝐂𝐄𝐘 𝐥𝐢𝐧𝐤�{s:\n\n𝐆𝐫𝐨𝐮𝐩: ${groupLink}\n𝐂𝐡𝐚𝐧𝐧𝐞𝐥: ${channelLink}`;

      // Define the button message
      const buttonMessage = {
        buttonsMessage: {
          contentText: captionText,
          footerText: "Powered by 𝐔𝐂𝐄𝐘 𝐓𝐄𝐂𝐇",
          buttons: [
            {
              buttonId: `${prefix}owner`,
              buttonText: { displayText: "🕯️✨ᴏᴡɴᴇʀ✨🕯️" },
              type: 1,
            },
          ],
          headerType: 1,
        },
      };

      // Send the button message
      await zk.sendMessage(dest, buttonMessage, { quoted: ms });

    } catch (error) {
      console.error("Error in clint command:", error.stack);
      repondre(`𝐒𝐨𝐦𝐞𝐭𝐡𝐢𝐧𝐠 𝐰𝐞𝐧𝐭 𝐰𝐫𝐨𝐧𝐠: ${error.message}`);
    }
  }
);