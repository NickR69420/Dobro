const Discord = require('discord.js');

module.exports = {
    name: "serverinfo",
    aliases:["sinfo", "server"],
    usage: "{prefix}serverinfo",
    description: "Server info",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {  

        if (message.author.bot || !message.guild) return message.reply("this command for server only")
        let EMBED = new Discord.MessageEmbed()
        .setTitle('Server Info')
        .addField("`Server name`", `${message.guild.name}`)
        .addField("`Server ID`", `${message.guild.id}`)
        .addField("`Server owner`", `${message.guild.owner}`)
        .addField("`Members`", `${message.guild.memberCount}`)
        .addField("`Server roles`", `${message.guild.roles.cache.size}`)
       .addField("`Channels`", ` ${message.guild.channels.cache.filter(r => r.type === "text").size} Text
        ${message.guild.channels.cache.filter(r => r.type === "voice").size} Voice`)
        .addField("`Server region`", `${message.guild.region}`) 
        .addField("`Verification Level`", `${message.guild.verificationLevel}`)
       .addField("`Created on`", `${message.guild.createdAt.toLocaleString()}`)
       .addField("`Boosts`", `${message.guild.premiumSubscriptionCount}`)
       .setColor("RANDOM")  
       .setFooter(`Requsted by ${message.author.username}`)
       
       .setThumbnail(message.guild.iconURL({ dynamic: true }))
        message.channel.send(EMBED)
    }
}  