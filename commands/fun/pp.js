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
const config = require("../../configuration/conf.json").bot;

module.exports = {
  name: "pp",
  aliases: ["penis", "dick", "cock"],
  usage: "pp [@user]",
  cooldown: 2,
  description: "How big is your dick?",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    try {

    let randomPPs = [`8=D`, `8==D`, `8=====D`, `8=======D`, `8===D`, `8=========D`, `8D`, `8=======D`, `8====D`]
    let user = message.mentions.users.first() || message.author
    let PPs = [`${randomPPs[Math.floor(Math.random() * randomPPs.length)]}`]

    let ppembed = new Discord.MessageEmbed()

      .setTitle('`PP Size Machine`')
      .addField(`${user.username}'s Dick`, `${PPs}`, false)
      .setFooter(`Requested by ${message.author.username}`, config.logo)

    message.channel.send(ppembed)
  } catch (e) {
    bot.error(
      {
        Error: e.stack,
      },
      message
    ),
      console.log(e.stack);
  }
  }
}