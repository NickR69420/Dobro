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
    try {
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

    const embed = new Discord.MessageEmbed()
      .setTitle("LESS GOOOOOOOOOOOOOOOOOO")
      .setColor('BLUE')
      .attachFiles(attach)
    message.channel.send(embed)
    
  } catch (e) {
    bot.error(
      {
        Error: e.stack,
      },
      message
    ),
      console.log(e.stack);
  }
    // i really like this command - electrum
  }
}