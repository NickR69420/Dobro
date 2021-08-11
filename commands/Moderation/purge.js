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
  name: "purge",
  aliases: ["clear", "remove"],
  usage: "purge <number of msgs>",
  description: "Clear messages in a channel.",
  permsneeded: "MANAGE_MESSAGES",
  run: async (bot, message, args) => {

    if(!args[0]) return message.channel.send('Please specify a number of messages to delete ranging from 1 - 99')
    if(isNaN(args[0])) return message.channel.send('Numbers are only allowed')
    if(parseInt(args[0]) > 99) return message.channel.send('The max amount of messages that I can delete is 1 - 99')
    await message.channel.bulkDelete(parseInt(args[0]) + 1)
        .catch(err => console.log(err))
    message.channel.send('Deleted ' + args[0]  + " messages.").then(m => m.delete({ timeout: 2500 }));

    console.log(`${message.author.tag} Requested to delete ` + args[0] + ` messages in ${message.guild.name}`)
     //logging action in console cuz why not!
  }
}