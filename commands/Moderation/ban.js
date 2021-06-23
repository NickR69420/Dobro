const Discord = require('discord.js')


module.exports = {
    name: "ban",
    aliases: ["rekt", "bean"],
    usage: "{prefix}ban",
    description: "Checks the bot uptime",
    permsneeded: "BAN_MEMBERS",
    run: async(bot, message, args) => {
        const {member, mentions } = message
        const tag = `<@${member.id}>`
        const target = mentions.users.first()
        const msg = message
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id) 
            message.channel.send(`${tag} That user has been banned`)
            targetMember.ban() 
        } else {
            message.channel.send('Failed to ban, no provided user/Invaild args.')
        }
    }
}