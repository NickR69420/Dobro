const Discord = require('discord.js');
const config = require("../../configuration/conf.json").bot;

module.exports = {
  name: "pp",
  aliases: ["penis", "dick", "cock"],
  usage: "pp [@user]",
  cooldown: 2,
  description: "How big is your dick?",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    
    let randomPPs = [`8=D`, `8==D`, `8=====D`, `8=======D`, `8===D`, `8=========D`, `8D`]
    let user = message.mentions.users.first() || message.author
    let PPs = [`${randomPPs[Math.floor(Math.random() * randomPPs.length)]}`]

    let ppembed = new Discord.MessageEmbed()

    .setTitle('`PP Size Machine`')
    .addField(`${user.username}'s Dick`, `${PPs}`, false)
    .setFooter(`Requested by ${message.author.username}`, config.logo)

    message.channel.send(ppembed)
  }
}