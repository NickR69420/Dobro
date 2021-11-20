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
const { MessageEmbed } = require('discord.js');
const { prefix } = require("../../configuration/conf.json").bot

module.exports = {
  name: "nickname",
  aliases: ["nick", "setnick"],
  usage: "nick <@user> <nickname>",
 //cooldown: 30,
  description: "Sets a user's nickname in a server!",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let nickname = args.slice(1).join(" ");

    const incorrectUsage = new MessageEmbed()
    .setDescription(`:x: Invalid Args | Usage: \`${prefix}nick <@user> <nickname>\``)
    .setColor("RED");

    const error = new MessageEmbed()
    .setColor("RED")
    .setDescription(":x: Cannot change that user's nickname!");

    if (!user) return message.channel.send(incorrectUsage);
    if (!nickname) return message.channel.send(incorrectUsage);

    let member = user;
    if (member.nickname === nickname) return message.channel.send(`**${member.displayName}**'s nickname is already **${nickname}**`)
    try {
      await member.setNickname(nickname);
      await message.channel.send(`Successfully set **${user.tag}**'s nickname as **${nickname}**`);
    } catch (err) {
      await message.channel.send(error)
    }
  }
}
