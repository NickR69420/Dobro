const Discord = require('discord.js');

module.exports = {
  name: "dm",
  aliases: ["dms", "message"],
  usage: "dm <@user> <message> [-s]",
  cooldown: 30,
  description: "Private message a user",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {

    message.delete();
    let user = message.mentions.users.first() || message.author
    let avatar = user.displayAvatarURL({dynamic: true})

    const str = args.slice(1).join(" ")
    if (!user) return message.reply("Please mention a user!")

    if (!str) return message.reply("Please provide content for your message!")
    if(message.content.includes('-s')) {
        user.send(str.replace("-s", " ")
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