const Discord = require('discord.js');
const fetch = require('node-fetch').default;

module.exports = {
  name: "gay",
  aliases: ["gae"],
  usage: "gay [@user]",
  cooldown: 10,
  description: "Make someone gay",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    const member = message.mentions.members.first() || message.member || message.guild.members.cache.get(args[0]);
    const buffer = await (await fetch('https://api.monkedev.com/canvas/gay?imgUrl=' + encodeURIComponent(member.user.displayAvatarURL({ size: 1024, format: 'jpg' })))).buffer();
    const attachment = new Discord.MessageAttachment(buffer, `${member.user.username}gay.png`);

    message.reply({ files: [attachment], allowedMentions: { repliedUser: false } });
  }
}