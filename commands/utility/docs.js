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
const axios = require('axios');

module.exports = {
  name: "docs",
  aliases: ["djs", "discorddocs"],
  usage: "docs <topic>",
  cooldown: 5,
  description: "Discord.js Documentation",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    const query = args.join(" ");
    if (!query) return message.reply("Please specify a query!");
    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      query
    )}`;

    axios.get(url).then(({ data }) => {
      if (data) {
        message.channel.send({ embed: data });
      }
    });
  },
};