const Discord = require('discord.js');

module.exports = {
  name: "pp",
  aliases: ["penis", "dick", "cock"],
  usage: "{prefix}pp [ @user ]",
  description: "",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {

    let randomPPs = [`8=D`, `8==D`, `8=====D`, `8=======D`, `8===D`, `8=========D`, `8D`]
    let user = message.mentions.users.first() || message.author
    let PPs = [`${randomPPs[Math.floor(Math.random() * randomPPs.length)]}`]

    let ppembed = new Discord.MessageEmbed()

    .setTitle('`PP Size Machine`')
    .addField(`${user.username}'s Dick`, `${PPs}`, false)

    message.channel.send(ppembed)
    
  }
}