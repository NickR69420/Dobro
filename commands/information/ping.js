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
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "ping",
    usage: "ping",
    cooldown: 2,
    description: "Returns teh bot's ping!",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {

        const before = Date.now();
        message.channel.send("Pinging...").then((msg) => {
            const latency = Date.now() - before;
            const wsLatency = bot.ws.ping;
            const embed = new MessageEmbed()
                .setAuthor("🏓 | PONG!", bot.user.displayAvatarURL())
                .setColor("RANDOM")
                .addFields({
                    name: "Latency",
                    value: `**\`${latency}\`** ms`,
                    inline: true
                }, {
                    name: "API Latency",
                    value: `**\`${wsLatency}\`** ms`,
                    inline: true
                })
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            msg.edit(embed);
            console.log(`Latency: ${latency} | API Latency: ${wsLatency} to Server -> ${message.guild.name}`)
            console.log("===========================================================")
            //i wanna know the ping too k ty

        })
    }
}
