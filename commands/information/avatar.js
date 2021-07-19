const Discord = require('discord.js')

module.exports = {
    name: "avatar",
    aliases: ["av", "pfp"],
    usage: "avatar [@user]",
    cooldown: 5,
    description: "displays user's avatar",
    permsneeded: "SEND_MESSAGES",
    run: async(bot, message, args) => {

        let user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({dynamic: true})

        const embed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s Avatar`)
        .setImage(avatar)
        .setColor('RANDOM')
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))

        message.channel.send(embed);
       
    }
}