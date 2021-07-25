const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas')

module.exports = {
  name: "amogus",
  aliases: ["sus", "impasta"],
  usage: "amogus [@user]",
  cooldown: 5,
  description: "sus111111!!!!1111111!!!1!1!",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {

    const member = message.mentions.members.first() || message.member;
    const sussy = bot.emojis.cache.find(emoji => emoji.name === "amogus");
    const loadingmsg = await message.reply(`${sussy} **A M O G U S**`)
    const canvas = Canvas.createCanvas(1250, 900);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('https://i.imgur.com/3BizMhk.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
  
    ctx.drawImage(avatar, 338, 75, 308, 258);
    const attachment = new MessageAttachment(canvas.toBuffer(), `amogus${member.user.username}.jpg`);
    await loadingmsg.delete();
    message.reply({ files: [attachment], allowedMentions: { repliedUser: false } });

  }

}