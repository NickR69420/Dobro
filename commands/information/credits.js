const Discord = require('discord.js');
const config = require("../../configuration/conf.json");

module.exports = {
    name: "credits",
    aliases: ["credit", "devs"],
    usage: "credits",
    cooldown: 2,
    description: "Displays the people who contributed towards the code",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => { 
     let logo = config.bot.logo  

    const user = message.mentions.users.first() || message.author

        const credit = new Discord.MessageEmbed()
        .setTitle('Dobro | Credits')
        .addField('`Creator`', 'Nickk#0007', false)
        .addField('`Developer / Contributor`', `ELECTRUM#0729`)
        .setFooter("Dobro | These awesome ppl made me :O", logo)
        .setColor('RANDOM')
        .setThumbnail(bot.user.displayAvatarURL)

    message.channel.send(credit)
    }
}