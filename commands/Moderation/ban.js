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
const config = require("../../configuration/conf.json").bot;
const em = require("../../configuration/embed.json");

module.exports = {
  name: "ban",
  aliases: ["rekt", "bean"],
  usage: "ban <@user> [reason]",
  description: "Bans a provided user.",
  permsneeded: "BAN_MEMBERS",
  run: async (bot, message, args) => {
    try {
      message.delete();

      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      const success = bot.emojis.cache.find(
        (emoji) => emoji.name === "success"
      );
      const BanReason = args.slice(1).join(" ") || "No Reason Provided"; // Ban reason

      // Error Embed
      const ErrorEmbed = new MessageEmbed()
        .setTitle(":x: Error Occured!")
        .setDescription("Failed to ban the user.")
        .setColor(em.error);

      // Banned Embed(DM)
      const banembed = new MessageEmbed()
        .setDescription(
          `You were **banned** from ${message.guild.name} | **${BanReason}**`
        )
        .setColor("RED")
        .setAuthor(
          `${message.guild.name}`,
          message.guild.iconURL({ dynamic: true })
        )
        .setTimestamp();

      // No Member Provided
      const invalidargs = new MessageEmbed()
        .setDescription(`**Usage:** **${config.prefix}ban @user <reason>**`)
        .setColor(em.error);

      if (!user)
        return message
          .reply(invalidargs)
          .then((m) => m.delete({ timeout: 10000 }));

      if (!message.guild.member(user).bannable)
        return message.reply(ErrorEmbed);

      user
        .send(banembed)
        .catch((e) => console.log("Cannot send message to this user."))
        .then(() => {
          user
            .ban({
              reason: `${BanReason}`,
            })
            .then((mem) => {
              const bannedembed = new MessageEmbed()
                .setDescription(
                  `${success}  <@!${mem.user.id}> has been **banned** | *${BanReason}*`
                )
                .setColor(em.success);

              message.channel.send(bannedembed);

              bot.modlogs(
                {
                  Member: user,
                  Action: "Banned",
                  Color: "RED",
                  Reason: BanReason,
                },
                message
              );
            });
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