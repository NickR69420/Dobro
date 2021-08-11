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
const Schema = require("../../models/WelcomeChannel");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "checkChannel",
  hidden: true,
  aliases: ["checkchannel", "cc"],
  usage: "checkChannel",
  cooldown: 0,
  description: "Sets the channel for your Welcome channel",
  permsneeded: "ADMINISTRATOR",
  run: async (bot, message, args) => {

    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (!data) return message.reply("This guild has no data stored.");

      const channel = bot.channels.cache.get(data.Channel);

      const ChannelInfo = new MessageEmbed()
        .setAuthor("Welcome Channel Info", message.guild.iconURL({ dynamic: true }))
        .setDescription(`Welcome channel is set to ${channel}`)
        .setColor("BLUE")
      message.channel.send(ChannelInfo)
    })
  }
}