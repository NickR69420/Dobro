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
const config = require("../../configuration/conf.json").bot;

module.exports = {
    name: "credits",
    aliases: ["credit", "devs"],
    usage: "credits",
    cooldown: 2,
    description: "Displays the people who contributed towards the code",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {

        const credit = new Discord.MessageEmbed()
            .setTitle('Dobro | Credits')
            .addField('`Creator`', 'Nickk#0007', false) // nick smells bad 
            .addField('`Main Developer`', `ELECTRUM#0729 & Elegy Bot`)
            .addField('`Contributors`', `Reconlx\n DashCruft\n Daysling`)
            .setFooter("Dobro | These awesome ppl made me :O", config.logo)
            .setColor('BLUE')
            .setThumbnail(bot.user.displayAvatarURL)

        message.channel.send(credit)
    }
}