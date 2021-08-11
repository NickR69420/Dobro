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

module.exports = {
    name: "unmute",
    aliases: ["unmuted"],
    usage: "unmute <@user>",
    description: "Unmutes a provided user.",
    permsneeded: "SEND_MESSAGES",
    run : async(bot, message, args) => {

        const Member = message.mentions.members.first();
        let avatar = Member.user.displayAvatarURL({dynamic: true})

        if(!Member) return message.channel.send('Member not found')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        const unmute = new MessageEmbed()
        .setTitle("Member Unmuted!", message.guild.iconURL)
        .setDescription(`<@${Member.id}> has been **unmuted**`)
        .setColor('#7CFC00')
        .setFooter(`ID: ${Member.id}`, avatar)
        .setTimestamp()

        const unmuted = new MessageEmbed()
        .setTitle(`${message.guild.name}`, message.guild.iconURL)
        .setDescription(
          `You were unmuted in **${message.guild.name}**!`
        )
        .setColor("#7CFC00")
        .setTimestamp();

        let user = message.mentions.users.first();
        message.channel.send(unmute).then(user.send(unmuted))

        bot.modlogs({
            Member: Member,
            Action: "Unmuted",
            Color: "#7CFC00",
            Reason: "",
        }, message)

    }
}
