
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "ping",
    usage: "{prefix}ping",
    description: "Returns teh bot's ping!",
    permsneeded: "SEND_MESSAGES",
    run: async(bot, message, args) => {
        const before = Date.now();
    message.channel.send("⏱").then((msg) => {
        const latency = Date.now() - before;
        const wsLatency = bot.ws.ping;
        const embed = new MessageEmbed()
            .setAuthor("🏓 | PONG!", bot.user.displayAvatarURL())
            .setColor("RANDOM")
            .addFields({
                name: "Latency",
                value: `**\`${latency}\`** ms`,
                inline: true
            }, {
                name: "API Latency",
                value: `**\`${wsLatency}\`** ms`,
                inline: true
            })
        msg.edit(embed);
})  }
}
