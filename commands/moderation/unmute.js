const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "unmute",
    aliases: ["unmuted"],
    usage: "unmute <@user>",
    description: "Unmutes a provided user.",
    permsneeded: "SEND_MESSAGES",
    run : async(bot, message, args) => {

        const Member = message.mentions.members.first();
        let avatar = Member.user.displayAvatarURL({dynamic: true})

        if(!Member) return message.channel.send('Member not found')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        const unmute = new MessageEmbed()
        .setTitle("Member Unmuted!", message.guild.iconURL)
        .setDescription(`<@${Member.id}> has been **unmuted**`)
        .setColor('#7CFC00')
        .setFooter(`ID: ${Member.id}`, avatar)
        .setTimestamp()

        const unmuted = new MessageEmbed()
        .setTitle(`${message.guild.name}`, message.guild.iconURL)
        .setDescription(
          `You were unmuted in **${message.guild.name}**!`
        )
        .setColor("#7CFC00")
        .setTimestamp();

        let user = message.mentions.users.first();
        message.channel.send(unmute).then(user.send(unmuted))

        bot.modlogs({
            Member: Member,
            Action: "Unmuted",
            Color: "#7CFC00",
            Reason: "",
        }, message)

    }
}
