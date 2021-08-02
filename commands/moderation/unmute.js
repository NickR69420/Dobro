const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "unmute",
    aliases: ["unmuted"],
    usage: "unmute <@user>",
    description: "Unmute a provided user",
    permsneeded: "SEND_MESSAGES",
    run : async(bot, message, args) => {

        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        let avatar = user.displayAvatarURL({dynamic: true})

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('Member not found')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        const unmute = new MessageEmbed()
        .setTitle("Member Unmuted!", message.guild.iconURL)
        .setDescription(`<@${Member.id}> was unmuted by ${message.author}.`)
        .setColor('RED')
        .setFooter(`ID: ${Member.id}`, avatar)
        .setTimestamp()

        message.channel.send(unmute)
    }
}
