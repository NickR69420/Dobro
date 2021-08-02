const Discord = require('discord.js');
const config = require("../../configuration/conf.json").bot;

module.exports = {
    name: "credits",
    aliases: ["credit", "devs"],
    usage: "credits",
    cooldown: 2,
    description: "Displays the people who contributed towards the code",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => { 

        const credit = new Discord.MessageEmbed()
        .setTitle('Dobro | Credits')
        .addField('`Creator`', 'Nickk#0007', false)
        .addField('`Main Developer / Contributor`', `ELECTRUM#0729 & Elegy Bot`)
        .addField('`Contributors`', `Reconlx\n DashCruft`)
        .setFooter("Dobro | These awesome ppl made me :O", config.logo)
        .setColor('BLUE')
        .setThumbnail(bot.user.displayAvatarURL)

    message.channel.send(credit)
    }
}