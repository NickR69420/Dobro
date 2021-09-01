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
const Discord = require("discord.js");
const config = require("../../configuration/conf.json").bot;

module.exports = {
  name: "howgay",
  aliases: ["gayrate"],
  usage: "howgay [@user]",
  cooldown: 2,
  description: "how gay r u",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    try {
      let member = message.mentions.users.first() || message.author;
      let gayness = Math.floor(Math.random() * 101);

      const howgayembed = new Discord.MessageEmbed()
        .setTitle(`Gay Machine Calculator`)
        .setDescription(`${member.username} is ` + gayness + "% Gay🌈")
        .setColor("RANDOM")
        .setFooter(`Requested by ${message.author.username}`, config.logo);

      message.channel.send(howgayembed);
    } catch (e) {
      bot.error(
        {
          Error: e.stack,
        },
        message
      ),
        console.log(e.stack);
    }
  },
};
