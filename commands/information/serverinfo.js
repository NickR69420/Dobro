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
const moment = require("moment");

module.exports = {
  name: "serverinfo",
  aliases: ["sinfo", "serverinformation", "server"],
  usage: "serverinfo",
  cooldown: 5,
  description: "Displays some info about the server",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    try {
      let Member = message.guild.members.cache.get(args[0]) || message.member;

      const region = {
        brazil: "Brazil",
        europe: "Europe",
        "eu-central": "Central Europe",
        singapore: "Singapore",
        "us-central": "U.S. Central",
        sydney: "Sydney",
        "us-east": "U.S. East",
        "us-south": "U.S. South",
        "us-west": "U.S. West",
        "eu-west": "Western Europe",
        "vip-us-east": "VIP U.S. East",
        london: "London",
        amsterdam: "Amsterdam",
        hongkong: "Hong Kong",
        russia: "Russia",
        southafrica: "South Africa",
        india: "India",
      };

      const levels = {
        NONE: "None",
        LOW: "Low",
        MEDIUM: "Medium",
        HIGH: "High",
        VERY_HIGHT: "Very High",
      };

      const roles = message.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map((role) => role.toString())
        .slice(0, -1);
      let rolesdisplay;
      if (roles.length < 25) {
        rolesdisplay = roles.join(" ");
      } else {
        rolesdisplay = `${roles.slice(25).join(" ")} & more..`;
      }

      const nitro = bot.emojis.cache.find(
        (emoji) => emoji.name === "boostnitro"
      );

      const userinfoembed = new MessageEmbed()

        .setAuthor(
          `${message.guild.name}`,
          message.guild.iconURL({ dynamic: true })
        )
        .setThumbnail(message.guild.iconURL({ dynamic: true }))

        .addFields(
          {
            name: ":crown: Owner",
            value: `\`\`\`${message.guild.owner.user.username +
              "#" +
              message.guild.owner.user.discriminator
              }\`\`\``,
            inline: true,
          },
          {
            name: `${nitro} Boosts`,
            value: `\`\`\`${message.guild.premiumSubscriptionCount} (Tier ${message.guild.premiumTier})\`\`\``,
            inline: true,
          },
          {
            name: "_ _",
            value: "_ _",
          },
          {
            name: "🆔 Server ID",
            value: `\`\`\`${message.guild.id}\`\`\``,
            inline: true,
          },
          {
            name: "🌆 Region",
            value: `\`\`\`${region[message.guild.region]}\`\`\``,
            inline: true,
          },
          {
            name: "——————————————————————————————",
            value: `_ _`,
          },
          {
            name: `👥 Member Count - [${message.guild.memberCount}]`,
            value: `\`\`\`${message.guild.members.cache.filter((member) => !member.user.bot)
                .size
              } Humans, ${message.guild.members.cache.filter((member) => member.user.bot)
                .size
              } Bots\`\`\``,
            inline: true,
          },
          {
            name: "🚦 Verification Level",
            value: `\`\`\`${levels[message.guild.verificationLevel]}\`\`\``,
            inline: true,
          },
          {
            name: "_ _",
            value: "_ _",
          },
          {
            name: `📂 Categories`,
            value: `\`\`\`${message.guild.channels.cache.filter(
              (ch) => ch.type === "category"
            ).size
              }\`\`\``,
            inline: true,
          },
          {
            name: `💬 Text Channels`,
            value: `\`\`\`${message.guild.channels.cache.filter((ch) => ch.type === "text")
                .size
              }\`\`\``,
            inline: true,
          },
          {
            name: `🔊 Voice Channels`,
            value: `\`\`\`${message.guild.channels.cache.filter((ch) => ch.type === "voice")
                .size
              }\`\`\``,
            inline: true,
          },
          {
            name: `Server Roles - [${message.guild.roles.cache.size}]`,
            value: rolesdisplay,
          },
          {
            name: "📅  Creation Date",
            value: `\`\`\`${moment(message.guild.createdTimestamp).format(
              "LL LT"
            )} (${moment(message.guild.createdTimestamp).fromNow()})\`\`\``,
            inline: true,
          }
        )
        .setColor(Member.displayHexColor);
      message.reply(userinfoembed);
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
