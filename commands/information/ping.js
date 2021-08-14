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
const {
  MessageEmbed
} = require('discord.js')
const config = require("../../configuration/conf.json").bot;
const em = require("../../configuration/embed.json");

module.exports = {
  name: "ping",
  usage: "ping",
  aliases: ["latency", "pong", "ms"],
  cooldown: 2,
  description: "Returns teh bot's ping!",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    try {
      var date = Date.now()
      message.channel.send({
        embed: new MessageEmbed()
          .setTitle(`🏓 Pinging....`)
          .setColor('RANDOM')
      }).then(msg => {
        msg.delete()
          .then(message.channel.send({
            embed: new MessageEmbed()
              .setAuthor(`Pong 🏓`, config.logo).addField("📶 Latency:", `\`${Math.round(Date.now() - date)}ms\``).addField("🤖 API Latency:", `\`${Math.round(bot.ws.ping)}ms\``).setColor(em.success).setTimestamp()
          }))


      })
    } catch (e) {
      console.log(String(e.stack))
      return message.channel.send(new MessageEmbed()
        .setTitle(`${bot.emotes.error} ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
      );
    }
  }
}