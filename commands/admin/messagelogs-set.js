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
const channelModel = require("../../models/channelModel");

module.exports = {
  name: "messagelogs-set",
  aliases: ["msgset", "msglogs"],
  usage: "messagelogs-set <#channel>",
  cooldown: 5,
  description: "Sets message logs channel",
  permsneeded: "ADMINISTRATOR",
  run: async (bot, message, args) => {
    try {
      const channel = message.mentions.channels.first();

      const data = await channelModel.findOne({ GuildID: message.guild.id });

      if (!data) {
        const data = new channelModel({
          GuildID: message.guild.id,
          ChannelID: channel.id,
        });
        data.save();
        const SetChannelEmbed = new MessageEmbed()
          .setAuthor(
            "Message-Logs Set!",
            message.guild.iconURL({ dynamic: true })
          )
          .setDescription(
            `${channel} has been set as the Message-Logs Channel.`
          )
          .setColor("GREEN");
        message.channel.send(SetChannelEmbed);
      } else {
        await channelModel.deleteOne({
          GuildID: message.guild.id,
        });

        const data = new channelModel({
          GuildID: message.guild.id,
          ChannelID: channel.id,
        });
        data.save();
        const ReChannel = new MessageEmbed()
          .setAuthor(
            "Message-Logs Set!",
            message.guild.iconURL({ dynamic: true })
          )
          .setDescription(
            `${channel} has been saved as the Message-Logs Channel.`
          )
          .setColor("GREEN");
        message.channel.send(ReChannel);
      }
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
