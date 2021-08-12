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
    name: "dice",
    aliases: ["roll", "diceroll"],
    usage: "dice",
    cooldown: 5,
    description: "Roll a dice!",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {
        const dice = Math.floor(Math.random() * 6) + 1
            - 1 + 1;

        const diceembed = new MessageEmbed()
            .setAuthor("Dice Rolled!")
            .setColor('RANDOM')
            .setTimestamp()
            .setThumbnail('https://cdn.discordapp.com/attachments/866893960160477214/869122973720801320/d2s.png')
            .setDescription(`You got a \`${dice}\``)
            .setFooter(config.text, config.logo)

        message.reply({ embed: diceembed });

    }
}