const Discord = require('discord.js');

module.exports = {
    name: "kick",
    aliases: ["k", "getlost"],
    usage: "kick <@user>",
    description: "kicks a provided user",
    permsneeded: "KICK_MEMBERS",
    run: async(bot, message, args) => {
        {
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            
            if (!member) message.channel.send("Please mention someone to Ban.")
            
            else 
            {
         let kickembed = new Discord.MessageEmbed()
        .setDescription(`You were kicked from ${message.guild.name}`)
        .setColor("BLUE")
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .setTimestamp()
       
              
                member.send(kickembed)
                .then(() => 
                {
                    member.kick().then(mem => 
                   { 
                    try {
        let kickedembed = new Discord.MessageEmbed()
        .setDescription(`${message.author} has kicked ${mem.user.tag}.`)
        .setColor("BLUE")
        .setAuthor(`MEMBER KICKED!`, message.guild.iconURL)
        .setTimestamp()
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No Perms to do this!!!!");
    else {
   message.channel.send(kickedembed);
    }
} catch (e) {
    message.reply(`\`\`\`An error has occured.\`\`\``)

                        }                       
                    })
                })
            }
        } 
    }
}