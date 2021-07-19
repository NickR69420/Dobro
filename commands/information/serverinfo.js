const Discord = require('discord.js');
const config = require("../../configuration/conf.json");

module.exports = {
    name: "serverinfo",
    aliases:["sinfo", "server"],
    usage: "serverinfo",
    cooldown: 5,
    description: "Displays some info about the server",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {  
        let logo = config.bot.logo

        if (message.author.bot || !message.guild) return message.reply("this command for server only")
        let EMBED = new Discord.MessageEmbed()
        .setTitle('Server Info')
        .addField("`Server name`", `${message.guild.name}`)
        .addField("`Server ID`", `${message.guild.id}`)
        .addField("`Server Owner`", `${message.guild.owner}`)
        .addField("`Members`", `${message.guild.memberCount}`)
        .addField("`Server roles`", `${message.guild.roles.cache.size}`)
       .addField("`Channels`", ` ${message.guild.channels.cache.filter(r => r.type === "text").size} Text
        ${message.guild.channels.cache.filter(r => r.type === "voice").size} Voice`)
        .addField("`Server region`", `${message.guild.region}`) 
        .addField("`Verification Level`", `${message.guild.verificationLevel}`)
       .addField("`Created on`", `${message.guild.createdAt.toLocaleString()}`)
       .addField("`Boosts`", `${message.guild.premiumSubscriptionCount}`)
       .setColor("RANDOM")  
       .setFooter(`Requsted by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
       .setThumbnail(message.guild.iconURL({ dynamic: true }))
        message.channel.send(EMBED)
    }
}  