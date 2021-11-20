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
const Schema = require("../../models/GoodbyeChannel");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "setgoodbye",
  hidden: true,
  aliases: ["bye", "goodbye"],
  usage: "setgoodbye",
  cooldown: 0,
  description: "Sets the channel for your Goodbye channel",
  permsneeded: "ADMINISTRATOR",
  run: async (bot, message, args) => {
    try {
      const channel = message.mentions.channels.first();
      if (!channel) return message.reply("Please mention a channel!");

      Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (data) {
          data.Channel = channel.id;
          data.save();
        } else {
          new Schema({
            Guild: message.guild.id,
            Channel: channel.id,
          }).save();
        }
        const SetChannelEmbed = new MessageEmbed()
          .setAuthor(
            "Goodbye Channel Set!",
            message.guild.iconURL({ dynamic: true })
          )
          .setDescription(`${channel} has been set as the Goodbye Channel.`)
          .setColor("GREEN");
        message.reply(SetChannelEmbed);
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
