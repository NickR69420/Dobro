const Discord = require('discord.js')


module.exports = {
    name: "kick",
    aliases: [],
    usage: "{prefix}kick",
    description: "kicks a provided user",
    permsneeded: "KICK_MEMBERS",
    run: async(bot, message, args) => {
        const {member, mentions } = message
        const tag = `<@${member.id}>`
        const target = mentions.users.first()
        const msg = message
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id) 
            message.channel.send(`${tag} That user has been kicked`)
            targetMember.kick() 
        } else {
            message.channel.send('Failed to kick, no provided user/Invaild args.')
        }
    }
}