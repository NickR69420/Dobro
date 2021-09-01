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
const fetch = require("node-fetch").default;

module.exports = {
  name: "gay",
  aliases: ["gae"],
  usage: "gay [@user]",
  cooldown: 10,
  description: "Make someone gay",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    try {
      const member =
        message.mentions.members.first() ||
        message.member ||
        message.guild.members.cache.get(args[0]);
      const buffer = await (
        await fetch(
          "https://api.monkedev.com/canvas/gay?imgUrl=" +
            encodeURIComponent(
              member.user.displayAvatarURL({ size: 1024, format: "jpg" })
            )
        )
      ).buffer();
      const attachment = new Discord.MessageAttachment(
        buffer,
        `${member.user.username}gay.png`
      );

      message.reply({
        files: [attachment],
        allowedMentions: { repliedUser: false },
      });
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
