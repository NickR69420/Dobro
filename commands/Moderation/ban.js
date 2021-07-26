const Discord = require('discord.js')
const config = require("../../configuration/conf.json");

module.exports = {
    name: "ban",
    aliases: ["rekt", "bean"],
    usage: "ban <@user>",
    description: "bans a provided user",
    permsneeded: "BAN_MEMBERS",
    run: async(bot, message, args) => {

        const logo = config.bot.logo
        {
            let member = message.mentions.members.first()
            
            if (!member) message.channel.send("Please mention someone to Ban.")
            
            else 
            {
         let banembed = new Discord.MessageEmbed()
        .setDescription(`You were banned from ${message.guild.name}`)
        .setColor("BLUE")
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .setTimestamp()
       
              
                member.send(banembed
                    ).catch(e => console.log("CANT SEND MSG TO THIS USER!"))
                .then(() => 
                {
                    member.ban().then(mem => 
                    {    
        let bannedembed = new Discord.MessageEmbed()
        .setDescription(`${message.author} has banned ${mem.user.tag}.`)
        .setColor("BLUE")
        .setAuthor(`MEMBER BANNED!`, message.guild.iconURL)
        .setTimestamp()
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No Perms to do this!!!!");
    else {
   message.channel.send(bannedembed);
   console.log(`===========================================================`)
   console.log(`${mem.user.tag} was banned in ${message.guild.name}`)
   console.log(`===========================================================`)
   
    }
                      
                    })
                })
            }
        } 
    }
}
