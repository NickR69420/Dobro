const Discord = require('discord.js')

module.exports = {
    name: "avatar",
    usage: "{prefix}avatar",
    description: "displays user's avatar",
    permsneeded: "SEND_MESSAGES",
    run: async(bot, message, args) => {

        let user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({dynamic: true})

        const embed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s Avatar`)
        .setImage(avatar)
        .setColor('RANDOM')

        message.channel.send(embed);
       
    }
}