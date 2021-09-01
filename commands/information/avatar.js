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

module.exports = {
  name: "avatar",
  aliases: ["av", "pfp"],
  usage: "avatar [@user]",
  cooldown: 5,
  description: "displays user's avatar",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    try {
      let user = message.mentions.users.first() || message.author;
      let avatar = user.displayAvatarURL({ dynamic: true, size: 512 });

      const embed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s Avatar`)
        .setImage(avatar)
        .setColor("RANDOM")
        .setFooter(
          `Requested by ${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        );

      message.channel.send(embed);
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
