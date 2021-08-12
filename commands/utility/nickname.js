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

module.exports = {
  name: "nickname",
  aliases: ["nick", "setnick"],
  usage: "nick <@user> <nickname>",
  cooldown: 120,
  description: "Sets a user's nickname in a server!",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let nickname = args.slice(1).join(" ");
    if (!user) return message.channel.send(`:x: Invalid Args | Usage: \`${prefix}nick <@user> <nickname>\``);
    if (!nickname) return message.channel.send(`:x: Invalid Args | Usage: \`${prefix}nick <@user> <nickname>\``);
    let member = user;

    if (member.nickname === nickname) return message.channel.send(`**${member.displayName}**'s nickname is already **${nickname}**`)
    try {
      await member.setNickname(nickname);
      await message.channel.send(`Successfully set **${user.tag}**'s nickname as **${nickname}**`);
    } catch (err) {
      await message.channel.send(`\`\`\`An error occured trying to set ${user.tag}'s nickname.\nError: ${err.message}\`\`\``)
    }
  }
}
