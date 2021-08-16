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
const { MessageAttachment } = require("discord.js");
const Schema = require("../models/GoodbyeChannel");
const Canvas = require('discord-canvas');

module.exports = (bot) => {

    bot.on('guildMemberRemove', async (member) => {
        Schema.findOne({ Guild: member.guild.id }, async (e, data) => {
            if (!data) return;
            try {
                const user = member.user;
                const image = new Canvas.Goodbye()
                    .setUsername(user.username)
                    .setDiscriminator(user.discriminator)
                    .setMemberCount(member.guild.memberCount)
                    .setGuildName(member.guild.name)
                    .setAvatar(user.displayAvatarURL({ format: "png" }))
                    .setColor("border", "#DC8172")
                    .setColor("username-box", "#F39182")
                    .setColor("discriminator-box", "#F39182")
                    .setColor("message-box", "#F39182")
                    .setColor("title", "#E12727")
                    .setColor("avatar", "#E12727")
                    .setBackground(
                        "https://i.ibb.co/MC8t2sj/Goodbye.jpg"
                    )
                    .toAttachment();

                const attachment = new MessageAttachment(
                    (await image).toBuffer(),
                    "goodbye-image.png"
                );

                const channel = member.guild.channels.cache.get(data.Channel);
                channel.send(attachment)
            } catch (e) {
                console.log(`Error in ${member.guild.name}`, e)
                // bot.channels.cache.get(`${config.ErrorChannel}`).send(`Something went wrong in goodbye.js, the error stack is in console. Guild: ${message.guild.name}`)

            }
        })
    })
}
