const Discord = require('discord.js')

module.exports = {
    name: "ban",
    aliases: ["rekt", "bean"],
    usage: "ban <@user>",
    description: "Bans a provided user",
    permsneeded: "BAN_MEMBERS",
    run: async(bot, message, args) => {
     
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            
            if (!member) message.channel.send("Please mention someone to Ban.")
            
            else 
            {
         let banembed = new Discord.MessageEmbed()
        .setDescription(`You were banned from ${message.guild.name}`)
        .setColor("BLUE")
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .setTimestamp()
    
                member.send(banembed
                    ).catch(e => console.log("Cannot message the user."))
                .then(() => 
                {
                    member.ban().then(mem => 
                    {    
                    try {
        let bannedembed = new Discord.MessageEmbed()
        .setDescription(`${message.author} has banned ${mem.user.tag}.`)
        .setColor("BLUE")
        .setAuthor(`MEMBER BANNED!`, message.guild.iconURL)
        .setTimestamp()

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to do this.")
    else {
   message.channel.send(bannedembed);
   console.log(`===========================================================`)
   console.log(`${mem.user.tag} was banned in ${message.guild.name}`)
   console.log(`===========================================================`)
    }
} catch (e) {
    message.reply(`\`\`\`An error has occured.\`\`\``) 
   
                        } 
                    })
                })
            }
        } 
    }