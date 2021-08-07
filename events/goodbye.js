const { MessageAttachment } = require("discord.js");
const Schema = require("../models/GoodbyeChannel");
const Canvas = require('discord-canvas');

module.exports = (bot) => {

    bot.on('guildMemberRemove', async(member) => {
        Schema.findOne({ Guild: member.guild.id }, async(e, data) => {
        if(!data) return;
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
        });
    });
};
