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
const Discord = require("discord.js");
const axios = require("axios").default;

module.exports = {
  name: "dadjoke",
  aliases: ["daddy"],
  usage: "dadjoke",
  cooldown: 2,
  description: "Wanna hear a dadjoke?",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    try {
      let options = {
        method: "GET",
        url: "https://icanhazdadjoke.com",
        headers: {
          Accept: `application/json`,
        },
      };

      axios
        .request(options)
        .then((response) => {
          console.log(
            `Got a dad joke: ${response.data.joke} ID: ${response.data.id}`
          );
          const id = response.data.id;
          const daddy = new Discord.MessageEmbed()
            .setTitle(`A dad joke`)
            .setDescription(`${response.data.joke}`)
            .setColor("BLUE")
            .setFooter(
              `Requested by ${message.author.username} • ID: ${id}`,
              message.author.displayAvatarURL({ dynamic: true })
            );

          message.channel.send(daddy);
        })
        .catch((error) => {
          console.error(error);
          message.channel.send(`The api seems to be down :pensive:`);
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
