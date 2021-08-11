const { MessageEmbed } = require('discord.js');
const config = require("../../configuration/conf.json").bot;

module.exports = {
    name: "dice",
    aliases: ["roll", "diceroll"],
    usage: "dice",
    cooldown: 5,
    description: "Roll a dice!",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {
        const dice = Math.floor(Math.random() * 6) + 1
            - 1 + 1;

        const diceembed = new MessageEmbed()
            .setAuthor("Dice Rolled!")
            .setColor('RANDOM')
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/attachments/866893960160477214/869122973720801320/d2s.png')
            .setDescription(`You got a \`${dice}\``)
            .setFooter(config.text, config.logo)

        message.reply({ embed: diceembed });

    }
}