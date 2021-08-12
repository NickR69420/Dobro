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
const { MessageEmbed, version: djsversion } = require('discord.js');
const config = require("../../configuration/conf.json").bot;
const { utc } = require("moment");
const os = require("os");
const ms = require("ms");

module.exports = {
  name: "botinfo",
  aliases: ["binfo", "bstats", "bot"],
  usage: "botinfo",
  cooldown: 5,
  description: "Display information about the bot.",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {

    const core = os.cpus()[0];
    const ping = bot.ws.ping;
    const embed = new MessageEmbed()
      .setTitle("Dobro's Info")
      .setThumbnail(bot.user.displayAvatarURL())
      .setDescription(`<@849622587713650709> is a multipurpose bot written by Nickk#0007 and ELECTRUM#0729.`)

      .addFields(
        {
          name: '**General:**',
          value: ["\u200B",
            `**Client:** \`${bot.user.tag}\` \`(${bot.user.id})\`\n`,
            `**Commands:** \`${bot.commands.size}\`\n`,
            `**Servers:** \`${bot.guilds.cache.size.toLocaleString()}\`\n`,
            `**Users:** \`${bot.guilds.cache
              .reduce((a, b) => a + b.memberCount, 0)
              .toLocaleString()}\`\n`,
            `**Channels:** \`${bot.channels.cache.size.toLocaleString()}\`\n`,
            `**Creation Date:** \`${utc(bot.user.createdTimestamp).format(
              "Do MMMM YYYY HH:mm:ss"
            )}\`\n`,
            `**Node.js:** \`${process.version}\`\n`,
            `**Discord.js:** \`v${djsversion}\`\n`,
            "\u200b",
          ]
        },
        {
          name: '**System:**',
          value: "\u200B"
        },
        {
          name: 'Platform',
          value: `\`${process.platform}\``,
          inline: true
        },
        {
          name: 'RAM Usage',
          value: `\`${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
            } MB / ${1 << 31 - Math.clz32(os.totalmem() / 1024 / 1024)
            } MB\``,
          inline: true
        },
        {
          name: `_ _`,
          value: "_ _"

        },
        {
          name: 'Uptime',
          value: `\`${ms(os.uptime() * 1000, { long: true })}\``,
          inline: true
        },
        {
          name: 'Ping',
          value: `\`${ping} ms\``,
          inline: true
        },

        {
          name: 'CPU',
          value: [`\u3000 Cores: \`${os.cpus().length}\``,
          ` Model: \`${core.model}\``,
          ` Speed: \`${core.speed}MHz\``]
        }
      )
      .setColor('BLUE')
      .setFooter(config.text, config.logo)
      .setTimestamp();
    message.channel.send(embed);

  }
}