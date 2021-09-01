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
const ms = require("ms");
const config = require("../../configuration/conf.json").bot;
const em = require("../../configuration/embed.json");

module.exports = {
  name: "mute",
  aliases: ["tempmute"],
  usage: "mute <@user> [duration]",
  description: "Mutes a provided user",
  permsneeded: "KICK_MEMBERS",
  run: async (bot, message, args) => {
    try {
      message.delete();

      const Member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      const time = args[1];
      const reason = args.slice(2).join(" ");
      const success = bot.emojis.cache.find(
        (emoji) => emoji.name === "success"
      );

      // Missing Perms Error
      const ErrorEmbed = new MessageEmbed()
        .setTitle(":x: Error Occured!")
        .setDescription("Failed to mute the user. | Missing Perms")
        .setColor(em.error);

      // No Member Provided
      const invalidargs = new MessageEmbed()
        .setTitle("Must mention a member.")
        .setDescription(
          `**Example:** **${config.prefix}mute @user [duration] <reason>**`
        )
        .setColor(em.error);

      // No time Provided
      const notime = new MessageEmbed()
        .setTitle("Please specify a time.")
        .setDescription(`Example: ${config.prefix}mute @user 1h Breaking Rules`)
        .setColor(em.error);

      if (!Member)
        return message.reply(invalidargs).then((m) =>
          m.delete({
            timeout: 3000,
          })
        );

      if (!time) return message.channel.send(notime);

      if (!message.guild.member(Member).bannable)
        return message.reply(ErrorEmbed).then((m) =>
          m.delete({
            timeout: 2500,
          })
        );

      const role = message.guild.roles.cache.find(
        (role) => role.name === "Muted"
      );
      if (!role) {
        try {
          message.channel.send(
            "Muted role is not found, attempting to create muted role....."
          );

          let muterole = await message.guild.roles.create({
            data: {
              name: "Muted",
              permissions: [],
            },
          });
          message.guild.channels.cache
            .filter((c) => c.type === "text")
            .forEach(async (channel, id) => {
              await channel.createOverwrite(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
              });
            });
          message.channel.send(
            "Muted role has sucessfully been created. Please run the command again!"
          );
        } catch (error) {
          message.reply(
            `Something went wrong, please contact a developer!`, console.log(`Something went wrong while running the mute commmand in ${message.guild.name}`)
          );
          console.log(error);
           // Todo, log what guild it happend in, to lazy to do rn
        }
      }

      ////////////////////////// muting part
      const mutedDM = new MessageEmbed()
        .setDescription(
          `You were **muted** in ${message.guild.name} | **${reason}**`
        )
        .setColor("RED")
        .setAuthor(
          `${message.guild.name}`,
          message.guild.iconURL({
            dynamic: true,
          })
        )
        .setTimestamp();

      let mute = message.guild.roles.cache.find((m) => m.name === "Muted");

      if (Member.roles.cache.has(mute.id))
        return message.channel.send(
          `${Member.displayName} has already been muted.`
        );

      Member.roles.add(mute).then((mem) => {
        const muted = new MessageEmbed()
          .setAuthor(
            "Member Muted!",
            Member.user.displayAvatarURL({
              dynamic: true,
            })
          )
          .setDescription(
            `${success}  <@${mem.user.id}> has been **muted** | *${reason}*`
          )
          .setColor(em.success);

        message.channel
          .send(muted)
          .then(
            Member.send(mutedDM).catch((e) => console.log("Muted a member."))
          );

        bot.modlogs(
          {
            Member: Member,
            Action: "Muted",
            Color: "ORANGE",
            Reason: reason,
          },
          message
        );

        setTimeout(async () => {
          await Member.roles.remove(mute);

          const unmuted = new MessageEmbed()
            .setTitle(`${message.guild.name}`, message.guild.iconURL)
            .setDescription(
              `Your mute has expired in **${message.guild.name}**!`
            )
            .setColor("#7CFC00")
            .setTimestamp();
          Member.send(unmuted);
        }, ms(time));
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