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
  name: "say",
  usage: "say < #channel | channel id > [ message ]",
  description: "",
  permsneeded: "",
  run: async (bot, message, args) => {

    const args1 = message.content.split(" ").slice(1);
    const ownerId = "734331898339524630"  // Electrum
    const ownerId2 = "775265751954096138" // Nickk
    const temp = "459342334564237323" //daysling lol

    if (message.author.id != ownerId && message.author.id != ownerId2 && message.author.id != temp) return;
    try {
      message.delete();
      let channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();
      let msg = args.join(" ");

      if (!channel) return message.channel.send(msg);

      msg = args.join(" ").slice(args[0].length);
      channel.send(msg);

    } catch (err) {
      console.log(err)
    }
  }
}