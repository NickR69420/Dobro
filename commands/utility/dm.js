// This file is part of Dobro
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
const Discord = require('discord.js');

module.exports = {
  name: "dm",
  aliases: ["dms", "message"],
  usage: "dm <@user> <message> [-s]",
  cooldown: 15,
  description: "Private message a user",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {

    message.delete();

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const str = args.slice(1).join(" ")

    if (!member) return message.reply("Please mention a user!");

    if (!str) return message.reply("Please provide content for your message!");

    let avatar = member.user.displayAvatarURL({ size: 256 })
    const DMSENT = new Discord.MessageEmbed()
      .setDescription(`Message has been sent to ${member.user.tag}!`)
      .setColor('GREEN')
      .setAuthor("Success!", avatar)
      .setFooter(bot.user.username, bot.user.displayAvatarURL())

    try {
    if (message.content.includes('-s')) {
      member.send(str.replace("-s", " ")
      )
    } else {
      member.send(`${message.author.tag}: ${str}`,
      )
    }
  } catch (e) {
    return message.reply(":x: You cannot send a message to this user!")
  }

  message.channel.send(DMSENT)
  }
}