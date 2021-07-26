const { MessageAttachment } = require('discord.js');
const canvacord = require('canvacord');

module.exports = {
  name: "trigger",
  aliases: ["triggered"],
  usage: "trigger <@user>",
  cooldown: 5,
  description: "This can trigger anyone.",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    const user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
	const triggered = await canvacord.Canvas.trigger(user.displayAvatarURL({ format: 'png', dynamic: false }));
	const attachment = new MessageAttachment(triggered, 'triggered.gif');

    return message.channel.send(attachment);
   }
}