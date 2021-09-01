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
  name: "kill",
  aliases: ["ded", "stab"],
  usage: "kill <@user>",
  cooldown: 10,
  description: "Hate someone? Kill them ez",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    try {
      let author = message.author.username;
      let user = message.mentions.users.first();

      if (!user) {
        return message.channel.send(`${message.author} killed himself.`);
      }

      let killmessages = [
        `${user} fell to their death`,
        `${user} trips over his own shoe laces and dies.`,
        `${user} choked to death on a fly when walking his lizard at the pool`,
        `${user} got impaled by a pencil`,
        `${user} trips over his own shoe laces and dies`,
        `${user} dies from dabbing too hard`,
        `${user} was hit by a car.`,
        `${user} drank too much orange juice and exploded.`,
        `${user} died lol`,
        `${user} was stabbed by ${author}`,
        `${user} was intimidated by ${author} and killed himself`,
      ];

      message.channel.send(
        killmessages[Math.floor(Math.random() * killmessages.length)]
      );
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
