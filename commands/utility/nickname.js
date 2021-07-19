const { MessageEmbed } = require('discord.js')
const config = require("../../configuration/conf.json");

module.exports = {
  name: "nickname",
  aliases: ["nick", "setnick"],
  usage: "nick",
  cooldown: 120,
  description: "Sets a user's nickname in a server!",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {

const logo = config.bot.logo

let sentence = message.content.split(" ");
sentence.shift();
sentence = sentence.join(" ");
if (!sentence) return message.reply("What do you want as your nickname?")
message.member.setNickname(sentence
  ).catch(e => console.log("NO PERMS TO CHANGE USER's NICKNAME"))
  try {
    message.channel.reply("No Perms.")
  } catch {}

const embed = new MessageEmbed()
.setTitle(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
.setDescription(`\`Your Nickname is now ${sentence}\``)
.setFooter(`Dobro | Nickname Changed!`, logo)

message.channel.send(embed)
   }
}    