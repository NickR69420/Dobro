const { MessageAttachment } = require("discord.js");
const Schema = require("../models/WelcomeChannel");
const Canvas = require('discord-canvas');

module.exports = (bot, message) => {

    bot.on('guildMemberAdd', async(member) => {
        Schema.findOne({ Guild: member.guild.id }, async(e, data) => {
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
        "goodbye-image.png"
            );

            const channel = member.guild.channels.cache.get(data.Channel);
            channel.send(attachment)
            console.log(member.guild.memberCount)
        });
    });
};
