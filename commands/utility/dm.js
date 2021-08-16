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
  cooldown: 30,
  description: "Private message a user",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {

    message.delete();
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    let avatar = user.user.displayAvatarURL({ dynamic: true })

    const DMSENT = new Discord.MessageEmbed()
      .setTitle(`SUCCESS!`)
      .setDescription(`Message has been sent to ${user.tag}!`)
      .setColor('GREEN')
      .setThumbnail(avatar)

    const str = args.slice(1).join(" ")
    if (!user) return message.reply("Please mention a user!")

    if (!str) return message.reply("Please provide content for your message!")
    if (message.content.includes('-s')) {
      user.send(str.replace("-s", " ")
      ).catch(e => console.log("Error lol"))
    } else {
      user.send(`${message.author.tag}: ${str}`
      ).catch(e => message.reply("You cannot send a message to this user!"))
    }
  }
}