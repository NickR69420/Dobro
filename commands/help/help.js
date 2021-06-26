const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "help",
  usage: "{prefix}help",
  description: "Help command",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {

    const help1 = new Discord.MessageEmbed()
      .setTitle('Dobro')
      .addField(`**GENERAL - 4**`,'> `avatar`\n> `ping`\n> `uptime`\n> `credits`')
      .addField(`**FUN - 5**`, '> `hack`\n> `howgay`\n> `pp`\n> `kill`\n> `8ball`')
      .setColor('BLUE')
      .setFooter('Prefix is d! | !help <commandname> for more info')
      .setThumbnail(`https://cdn.discordapp.com/avatars/849622587713650709/8a30dd6bb9b374bd21096c40efd03cf7.webp?size=128`)

      const help2 = new Discord.MessageEmbed()
      .setTitle('Dobro')
      .addField(`**GENERAL - 4**`,'> `avatar`\n> `ping`\n> `uptime`\n> `credits`')
      .addField(`**FUN - 5**`, '> `hack`\n> `howgay`\n> `pp`\n> `kill`\n> `8ball`')
      .addField('**Moderation - 4**', '> `ban`\n> `kick`\n> `purge`\n> `deletechannel`')
      .setColor('BLUE')
      .setFooter('Prefix is d! | !help <commandname> for more info')
      .setThumbnail(`https://cdn.discordapp.com/avatars/849622587713650709/8a30dd6bb9b374bd21096c40efd03cf7.webp?size=128`)

      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(help1);
    else {
   message.channel.send(help2);

    }
  }
}  