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
const Discord = require('discord.js')

module.exports = {
    name: "deletechannel",
    aliases: ["delete", "nukechat"],
    usage: "deletechannel",
    description: "Deletes the channel.",
    permsneeded: "ADMINISTRATOR",
    run: async(bot, message, args) => {
try {
        message.channel.send(`This chat is going to be deleted in 5 seconds`)
        setTimeout(function(){ 
            message.channel.delete();
        }, 5000);
    } catch (e) {
        bot.error(
          {
            Error: e.stack,
          },
          message
        ),
          console.log(e.stack);
      }
    }
}