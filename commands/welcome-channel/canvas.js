const { MessageAttachment } = require('discord.js');
const Canvas = require('discord-canvas');

module.exports = {
  name: "canvas",
  run: async (bot, message, args) => {

    const image = new Canvas.Goodbye()
      .setUsername("xixi52")
      .setDiscriminator("0001")
      .setMemberCount("140")
      .setGuildName("Server DEV")
      .setAvatar(message.author.displayAvatarURL({ format: "png" }))
      .setColor("border", "#8015EA")
      .setColor("username-box", "#8015EA")
      .setColor("discriminator-box", "#8015EA")
      .setColor("message-box", "#8015EA")
      .setColor("title", "#8015EA")
      .setColor("avatar", "#8015EA")
      .setBackground(
        "https://i.pinimg.com/originals/fd/8f/8d/fd8f8da060afe72035e078e5fe661452.png"
      )
      .toAttachment();

    const attachment = new MessageAttachment(
      (await image).toBuffer(),
      "goodbye-image.png"
    );

    message.channel.send(attachment);
  },
};