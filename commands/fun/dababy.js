const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
  name: "dababy",
  aliases: ["lesgo", "dababi"],
  usage: "dababy",
  cooldown: 5,
  description: "You know what this is....",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {

	const loading = bot.emojis.cache.find(emoji => emoji.name === "dababy");
	const member = message.mentions.users.first() || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args[0] ? args[0].toLowerCase() : undefined) || message.author;
	const loadingmsg = await message.reply(`${loading}`, { allowedMentions: { repliedUser: false } });
	const canvas = Canvas.createCanvas(867, 892);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('https://cdn.suchavoice.com/wp-content/uploads/sites/388/2017/09/20142830/transparent-image.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	const avatar = await Canvas.loadImage(member.displayAvatarURL({ format: 'jpg', size: 4096 }));
	const daboy = await Canvas.loadImage('https://media.discordapp.net/attachments/819812451520479252/827777061392220210/G3fJ8jBVK0dwAAAAAElFTkSuQmCC.png');
	ctx.drawImage(avatar, 260, 270, 370, 370);
	ctx.drawImage(daboy, 0, 0, canvas.width, canvas.height);
	const attach = new Discord.MessageAttachment(canvas.toBuffer(), `Da${member.username}.jpg`);
	await loadingmsg.delete();
	
    const uwu = { files: [attach], allowedMentions: { repliedUser: false } }
    const embed = new Discord.MessageEmbed()
    .setTitle("LESS GOOOOOOOOOOOOOOOOOO")
    .setColor('BLUE')
    .attachFiles(attach)
    message.channel.send(embed)
    // i really like this command - electrum
   }
}