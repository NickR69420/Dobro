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
    name: "invite",
    aliases: ["inv", "i"],
    usage: "invite",
    cooldown: 2,
    description: "Displays the bot's Invite",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {

        const invite = new Discord.MessageEmbed()

            .setTitle('Dobro | Invite Link')
            .setDescription(`
        You can add me **[here](https://discord.com/api/oauth2/authorize?client_id=849622587713650709&permissions=8&scope=bot)**!`)
            .setColor('BLUE')
            .setThumbnail(config.logo)
            .setFooter(config.text, config.logo)

        message.channel.send(invite)
    }
}