const { MessageEmbed, version: djsversion } = require('discord.js');
const version = require("../../package.json").version;
const { utc } = require("moment");
const os = require("os");
const ms = require("ms");
const config = require("../../configuration/conf.json");

module.exports = {
  name: "botinfo",
  aliases: ["binfo", "bstats", "bot"],
  usage: "botinfo",
  cooldown: 5,
  description: "Display information about the bot.",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    const logo = config.bot.logo

    const core = os.cpus()[0];
    const ping = bot.ws.ping;
    const embed = new MessageEmbed()
    .setTitle("Dobro's Info")
      .setThumbnail(bot.user.displayAvatarURL())
      .setDescription(`<@849622587713650709> is a multipurpose bot written by Nickk#0007 and ELECTRUM#0729.`)

      .addFields(
          {
              name: '**General:**',
              value: '\u200B'
          },
          {
              name: `ID`,
              value:`\`${bot.user.id}\``,
              inline: true
          },
          {
            name: `Creation Date`,
            value: `\`${utc(bot.user.createdTimestamp).format("Do MMMM YYYY HH:mm:ss")}\``,
            inline: true
            
        },
          {
            name: `Commands`,
            value:`\`${bot.commands.size}\``,
            inline: true
        },
        {
          name: '\u200B',
          value: "\u200B"
        },
       
        {
            name: `Servers`,
            value:`\`${bot.guilds.cache.size.toLocaleString()}\``,
            inline: true
            
        },
        {
            name: `Users`,
            value:`\`${bot.guilds.cache
                .reduce((a, b) => a + b.memberCount, 0)
                .toLocaleString()}\``,
            inline: true
        },
        {
            name: `Channels`,
            value:`\`${bot.channels.cache.size.toLocaleString()}\``,
            inline: true
        },
        {
            name: '\u200B',
            value: "\u200B"
            
          },
        {
            name: `Node.js`,
            value:`\`${process.version}\``,
            inline: true
        },
        {
            name: `Discord.js`,
            value:`\`v${djsversion}\``,
            inline: true
        },
        
        {
            name: '\u200B',
            value: "\u200B"
            
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
            name: 'RAM Usage',
            value: ` ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
        } MB / ${
            1 << 31 - Math.clz32(os.totalmem() / 1024 / 1024)
        } MB`,
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
      .setFooter(`Dobro`, logo)
      .setTimestamp();
    message.channel.send(embed);
  
   }
}