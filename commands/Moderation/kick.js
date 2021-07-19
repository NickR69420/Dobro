const Discord = require('discord.js');;
const config = require("../../configuration/conf.json");

module.exports = {
    name: "kick",
    aliases: ["k", "getlost"],
    usage: "kick <@user>",
    description: "kicks a provided user",
    permsneeded: "KICK_MEMBERS",
    run: async(bot, message, args) => {
        let logo = config.bot.token
        {
            let member = message.mentions.members.first()
            
            if (!member) message.channel.send("Please mention someone to Ban.")
            
            else 
            {
         let banembed = new Discord.MessageEmbed()
        .setDescription(`You were kicked from ${message.guild.name}`)
        .setColor("BLUE")
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .setTimestamp()
       
              
                member.send(banembed)
                .then(() => 
                {
                    member.kick().then(mem => 
                    {
        let bannedembed = new Discord.MessageEmbed()
        .setDescription(`${message.author} has kicked ${mem.user.tag}.`)
        .setColor("BLUE")
        .setAuthor(`MEMBER KICKED!`, message.guild.iconURL)
        .setTimestamp()
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No Perms to do this!!!!");
    else {
   message.channel.send(bannedembed);
    }
                      
                    })
                })
            }
        } 
    }
}