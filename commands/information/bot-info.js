const {
    MessageEmbed,
    version: djsversion
} = require('discord.js');
const em = require("../../configuration/embed.json");
const {
    stripIndent
} = require('common-tags');
const PMS = require('pretty-ms');
const moment = require('moment');
const os = require('os');

module.exports = {
    name: 'bot-info',
    aliases: ['binfo', 'botinfo', 'bot', 'stats', 'info'],
    usage: 'bot-info',
    cooldown: 0,
    description: 'Displays information about the bot!',
    permsneeded: 'SEND_MESSAGES',
    run: async (bot, message, args) => {
        try {

            function bytesToSize(bytes) {
                if (bytes === 0) return '0';
                const sizes = ['Bytes', 'KB', 'MB', 'GB']
                const i = Math.floor(Math.log(bytes) / Math.log(1024));
                return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`
            };

            function formatMS(ms, number) {
                if (isNaN(ms)) throw new Error("value is not a number.");
                return PMS(ms, {
                    verbose: true,
                    compact: false,
                    secondsDecimalDigits: 0
                });
            };
            // Thank you DeadBear for helping me with this    

            const cpu = os.cpus()[0];

            const BotStats = stripIndent `
           Username        ::  ${bot.user.tag}
           Created on      ::  ${moment(bot.user.createdAt).format("LL LT")}
           Servers         ::  ${bot.guilds.cache.size}
           Users           ::  ${bot.users.cache.size}
           Channels        ::  ${bot.channels.cache.size}
           Uptime          ::  ${formatMS(bot.uptime)}
           Ping            ::  ${Math.round(bot.ws.ping)}ms
           `;

            const Version = stripIndent `
           Node.js         :: ${process.version}
           Discord.js      :: v${djsversion}
           `;

            const BotInfo = stripIndent `
           Platform        ::  ${process.platform} (${process.arch})
           Model           ::  ${cpu.model}
           Speed           ::  ${cpu.speed / 1000} GHz
           RAM Usage       ::  ${bytesToSize(process.memoryUsage().rss)}
           OS Uptime       ::  ${formatMS(os.uptime() * 1000)}
           `;

            var InfoEmbed = new MessageEmbed()

                .setAuthor(`${bot.user.username}'s Information`, bot.user.displayAvatarURL({
                    dynamic: true
                }))
                .setDescription(`> <@!${bot.user.id}> is a multipurpose Discord Bot developed by \`Nickk#0007\` and \`ELECTRUM#0729\``)
                .setColor(em.default)
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())

                .addField('🔠 Total Commands', `\`\`\`${bot.commands.size}\`\`\``, true)
                .addField('🔤 Total Aliases', `\`\`\`${bot.aliases.size}\`\`\``, true)
                .addField('👥 General', `\`\`\`yml\n${BotStats}\`\`\``)
                .addField('📜 Version & Library', `\`\`\`yml\n${Version}\`\`\``)
                .addField('⚙ System', `\`\`\`yml\n${BotInfo}\`\`\``)

            message.channel.send(InfoEmbed)
        } catch (e) {
            bot.error(
              {
                Error: e.stack,
              },
              message
            ),
              console.log(e.stack);
          }
    }
}