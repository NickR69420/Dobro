const Discord = require('discord.js');

module.exports = {
  name: "dm",
  aliases: ["dms", "message"],
  usage: "dm <@user> <message> [-a]",
  cooldown: 30,
  description: "Private message a user",
  permsneeded: "MANAGE_MESSAGES",
  run: async (bot, message, args) => {

    message.delete();
    let user = message.mentions.users.first() || message.author
    let avatar = user.displayAvatarURL({dynamic: true})

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
    .setThumbnail(avatar)

     message.channel.send(DMSENT)
   }
}