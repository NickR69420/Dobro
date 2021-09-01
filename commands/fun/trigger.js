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
const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
  name: "trigger",
  aliases: ["triggered"],
  usage: "trigger <@user>",
  cooldown: 5,
  description: "This can trigger anyone.",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    try {
      const user =
        message.mentions.users.first() ||
        bot.users.cache.get(args[0]) ||
        message.author;
      const triggered = await canvacord.Canvas.trigger(
        user.displayAvatarURL({ format: "png", dynamic: false })
      );
      const attachment = new MessageAttachment(triggered, "triggered.gif");

      return message.channel.send(attachment);
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
