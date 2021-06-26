const Discord = require('discord.js');

module.exports = {
    name: "credits",
    aliases: ["credit", "devs"],
    usage: "{prefix}credits",
    description: "",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {   

    const user = message.mentions.users.first() || message.author

        const credit = new Discord.MessageEmbed()
        .setTitle('Dobro | Credits')
        .addField('`Creator`', 'Nickk#0007', false)
        .addField('`Devloper / Contributor`', `ELECTRUM#0729`)
        .setFooter("These awesome ppl made me :O")
        .setColor('RANDOM')
        .setThumbnail(bot.user.displayAvatarURL)

    message.channel.send(credit)
    }
}