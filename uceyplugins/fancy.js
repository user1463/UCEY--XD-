const { zokou } = require("../framework/zokou");
const fancy = require("../Toxic/style");

zokou({ nomCom: "fancy", categorie: "Fun", reaction: "〽️" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, prefixe } = commandeOptions;
    const id = arg[0]?.match(/\d+/)?.join('');
    const text = arg.slice(1).join(" ");

    try {
        if (id === undefined || text === undefined) {
            return await repondre(`\nExemple : ${prefixe}fancy 10 𝐔𝐂𝐄𝐘 𝐗𝐃\n` + String.fromCharCode(8206).repeat(4001) + fancy.list('𝐔𝐂𝐄𝐘', fancy));
        }

        const selectedStyle = fancy[parseInt(id) - 1];
        if (selectedStyle) {
            return await repondre(fancy.apply(selectedStyle, text));
        } else {
            return await repondre('_Style introuvable :(_');
        }
    } catch (error) {
        console.error(error);
        return await repondre('_Une erreur s\'est produite :(_');
    }
});
