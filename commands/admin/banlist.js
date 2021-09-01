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
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "banlist",
  aliases: ["fetchbans", "bans"],
  usage: "banlist",
  cooldown: 10,
  description: "Displays list of banned members.",
  permsneeded: "BAN_MEMBERS",
  run: async (bot, message, args) => {
    try {
      const fetchBans = message.guild.fetchBans();
      const bannedMembers = (await fetchBans)
        .map((member) => `\`${member.user.tag}\``)
        .join("\n");

      const banlist = new MessaeEmbed()
        .setTitle("Banned Members")
        .setDescription(bannedMembers)
        .setFooter(
          `Requested by ${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor("RED");

      message.channel.send(banlist);
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
