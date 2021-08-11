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
const Schema = require("../models/WelcomeChannel");
const Canvas = require('discord-canvas');

module.exports = (bot) => {

    bot.on('guildMemberAdd', async(member) => {
        Schema.findOne({ Guild: member.guild.id }, async(err, data) => {
        if(!data) return;
        const user = member.user;
        const image = new Canvas.Welcome()
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
            .setMemberCount(member.guild.memberCount)
            .setGuildName(member.guild.name)
            .setAvatar(user.displayAvatarURL({ format: "png" }))
            .setColor("border", "#154360")
            .setColor("username-box", "#5499C7")
            .setColor("discriminator-box", "#5499C7")
            .setColor("message-box", "#3393FF")
            .setColor("title", "#3498DB")
            .setColor("avatar", "#3393FF")
            .setBackground(
        "https://i.redd.it/6z9rly4ljd8x.png"
        )
        .toAttachment();

    const attachment = new MessageAttachment(
        (await image).toBuffer(),
        "welcome-image.png"
            );

            const channel = member.guild.channels.cache.get(data.Channel);
            channel.send(attachment)
        });
    });
};
