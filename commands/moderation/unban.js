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
const { MessageEmbed, Message } = require("discord.js");
const em = require("../../configuration/embed.json");

module.exports = {
  name: "unban",
  aliases: ["ub", "revoke", "revokeban"],
  usage: "unban <@user>",
  cooldown: 5,
  description: "Unbans a provided user.",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    if (!args[0])
      return message.channel
        .send("Please enter a user's id to unban!")
        .then((m) => m.delete({ timeout: 5000 }));

    let member;

    try {
      member = await bot.users.fetch(args[0]);
    } catch (e) {
      console.log(e.stack);
      return message.channel
        .send({
          embed: new MessageEmbed().setDescription(
            `${em.erroremoji} Could not find user ${member}`
          ),
        })
        .then((m) => m.delete({ timeout: 15000 }));
    }

    const reason = args[1] ? args.slice(1).join(" ") : "No Reason Provided";

    const embed = new MessageEmbed();

    message.guild
      .fetchBans()
      .then((bans) => {
        const user = bans.find((ban) => ban.user.id === member.id);

        if (user) {
          embed
            .setDescription(`<@${member.id}> has been **unbanned**`)
            .setColor("BLUE")
            .setAuthor(
              `MEMBER UNBANNED!`,
              message.guild.iconURL({ dynamic: true })
            )
            .setTimestamp();

          message.guild.members
            .unban(user.user.id, reason)
            .then(() => message.channel.send(embed));

          bot.modlogs(
            {
              Member: user,
              Action: "Unbanned",
              Color: em.success,
              Reason: reason,
            },
            message
          );
        } else {
          embed
            .setDescription(`${em.erroremoji} **${member.tag}** isn't banned!`)
            .setColor(em.error);
          message.channel.send(embed);
        }
      })
      .catch((e) => {
        console.log(e);
        message.channel.send("An error has occurred!");
      });
  },
};