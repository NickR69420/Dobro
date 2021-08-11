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
const server = require("../../configuration/dasweet.json").info;

module.exports = {
    name: "dasweet",
    aliases: ["DaSweet", "Dasweet", "daSweet", "DaSweetSMP"],
    usage: "dasweet",
    cooldown: 10,
    description: "Displays info about DaSweet SMP!",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {

        const DaSweet = new MessageEmbed()
            .setTitle("DaSweet")
            .setImage("https://cdn.discordapp.com/attachments/856819667082674211/871760766750052362/DaSweet.gif")
            .setDescription(`${server.Description}`)
            .setColor("BLUE")
            .addFields(
                {
                    name: "IP",
                    value: `**Java:** \`${server.Java.ip}\`, \`${server.Java.ip2}\`\n**Bedrock:** \`${server.Bedrock.ip}\` | **Port:** \`${server.Bedrock.port}\``
                },
                {
                    name: "Version",
                    value: "`1.8 - 1.17`",
                    inline: true
                },
                {
                    name: "Discord",
                    value: `[Click me to Join the Discord!](https://discord.gg/ufMFGF9kYv)`
                }
            )

        message.channel.send(DaSweet)
    },
};