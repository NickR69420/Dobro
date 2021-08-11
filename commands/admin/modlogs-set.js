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
const { MessageEmbed } = require('discord.js');
const Schema = require("../../models/modlogs");

module.exports = {
  name: "modlogs-set",
  aliases: ["mls", "setmodlogs"],
  usage: "modlogs-set <#channel>",
  cooldown: 5,
  description: "Setup ModLogs",
  permsneeded: "ADMINISTRATOR",
  run: async (bot, message, args) => {
      if(!message.member.permissions.has('ADMINISTRATOR')) return;
      const channel = message.mentions.channels.first() || message.channel;

      Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
         if(data) data.delete();
         new Schema({
            Guild: message.guild.id,
            Channel: channel.id,
         }).save();
         const SetChannelEmbed = new MessageEmbed()
         .setAuthor("Mod-Logs Set!", message.guild.iconURL({ dynamic: true })) 
         .setDescription(`${channel} has been set as the Mod-Logs Channel.`)
         .setColor("GREEN")
         message.reply(SetChannelEmbed)
      })
   },
};