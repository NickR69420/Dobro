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
const config = require("../../configuration/conf.json").bot;

module.exports = {
  name: "coinflip",
  aliases: ["flip", "coin", "cf"],
  usage: "coinflip",
  cooldown: 10,
  description: "Flip a coin!",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    const number = Math.floor(Math.random() * 2);

    let result;
    if (number === 1) result = 'Heads'
    else result = 'Tails';

    const flipembed = new MessageEmbed()
      .setTitle('½  Coinflip  ½')
      .addField("Result", `\`${result}\``)
      .setFooter(config.text, config.logo)
      .setColor('RANDOM')

    message.channel.send(flipembed)
  }
}