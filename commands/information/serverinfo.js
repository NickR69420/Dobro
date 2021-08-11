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
    name: "serverinfo",
    aliases: ["sinfo", "server"],
    usage: "serverinfo",
    cooldown: 5,
    description: "Displays some info about the server",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {

        if (message.author.bot || !message.guild) return message.reply("this command for server only")
        let EMBED = new Discord.MessageEmbed()
            .setTitle('Server Info')
            .addField("`Server name`", `${message.guild.name}`)
            .addField("`Server ID`", `${message.guild.id}`)
            .addField("`Server Owner`", `${message.guild.owner}`)
            .addField("`Members`", `${message.guild.memberCount}`)
            .addField("`Server roles`", `${message.guild.roles.cache.size}`)
            .addField("`Channels`", ` ${message.guild.channels.cache.filter(r => r.type === "text").size} Text
        ${message.guild.channels.cache.filter(r => r.type === "voice").size} Voice`)
            .addField("`Server region`", `${message.guild.region}`)
            .addField("`Verification Level`", `${message.guild.verificationLevel}`)
            .addField("`Created on`", `${message.guild.createdAt.toLocaleString()}`)
            .addField("`Boosts`", `${message.guild.premiumSubscriptionCount}`)
            .setColor("RANDOM")
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
        message.channel.send(EMBED)
    }
}