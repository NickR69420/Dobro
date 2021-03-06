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
const { MessageEmbed } = require("discord.js");
const channelModel = require("../models/channelModel");

module.exports = (bot) => {
  bot.on("messageUpdate", async (oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;

    const data = await channelModel.findOne({
      GuildID: oldMessage.guild.id,
    });
    
    try {
      let channel = bot.channels.cache.get(data.ChannelID);

      const MessageEdited = new MessageEmbed()
        .setAuthor(
          "Message Edited",
          oldMessage.author.displayAvatarURL({
            dynamic: true,
          })
        )
        .addFields(
          {
            name: "Author:",
            value: `<@${oldMessage.author.id}>`,
            inline: true,
          },
          {
            name: "Channel",
            value: `${oldMessage.channel}`,
            inline: true,
          },
          {
            name: "Old Message",
            value: `\`\`\`${oldMessage.content}\`\`\``,
          },
          {
            name: "New Message",
            value: `\`\`\`${newMessage.content}\`\`\``,
          }
        )
        .setColor("#E4381D")
        .setTimestamp();

      await channel.send(MessageEdited);
    } catch (e) {
      console.log(` `);
    }
  });
};
