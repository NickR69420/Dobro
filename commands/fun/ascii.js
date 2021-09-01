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
const figlet = require('figlet');

module.exports = {
    name: "ascii",
    aliases: ["art", "textart"],
    usage: "ascii [text]",
    cooldown: 2,
    description: "Converts text to ascii!",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {
        try {

            text = args.join(' ')
            
            if (!text) return message.reply("Please provide text to convert!")

        figlet.text(
            text,
            //args.join(' '),
            {
                font: 'Doom',
            },
            async (err, data) => {
                message.channel.send(`\`\`\`${data}\`\`\``);
            })
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