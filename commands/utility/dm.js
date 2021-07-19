const Discord = require('discord.js');
const config = require("../../configuration/conf.json");

module.exports = {
  name: "dm",
  aliases: ["dms", "message"],
  usage: "dm <@user> <message> [-a]",
  cooldown: "",
  description: "Private message a user",
  permsneeded: "MANAGE_MESSAGES",
  run: async (bot, message, args) => {

    message.delete();
    const pfp = message.author.displayAvatarURL({ dynamic: true })


    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user

    const str = args.slice(1).join(" ")
    if(message.content.includes('-a')) {
        user.send(str.replace("-a", " ")
        ).catch(e => console.log("Error lol"))
    } else {
        user.send(`${message.author.tag}: ${str}`)

    }
    const DMSENT = new Discord.MessageEmbed()
    .setTitle(`SUCCESS!`)
    .setDescription(`Message has been sent to ${user.tag}!`)
    .setColor('GREEN')
    .setThumbnail(pfp)

     message.channel.send(DMSENT)
   }
}