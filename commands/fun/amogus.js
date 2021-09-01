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
const Canvas = require("canvas");

module.exports = {
  name: "amogus",
  aliases: ["sus", "impasta"],
  usage: "amogus [@user]",
  cooldown: 5,
  description: "sus111111!!!!1111111!!!1!1!",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    try {
      const member = message.mentions.members.first() || message.member;
      const sussy = bot.emojis.cache.find((emoji) => emoji.name === "amogus");
      const loadingmsg = await message.reply(`${sussy} **A M O G U S**`);
      const canvas = Canvas.createCanvas(1250, 900);
      const ctx = canvas.getContext("2d");
      const background = await Canvas.loadImage(
        "https://i.imgur.com/3BizMhk.jpg"
      );
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      const avatar = await Canvas.loadImage(
        member.user.displayAvatarURL({ format: "jpg" })
      );

      ctx.drawImage(avatar, 338, 75, 308, 258);
      const attachment = new MessageAttachment(
        canvas.toBuffer(),
        `amogus${member.user.username}.jpg`
      );
      await loadingmsg.delete();
      message.reply({
        files: [attachment],
        allowedMentions: { repliedUser: false },
      });
    } catch (e) {
      bot.error(
        {
          Error: e.stack,
        },
        message
      ),
        console.log(e.stack);
    }
  },
};
