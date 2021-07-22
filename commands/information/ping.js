
const { MessageEmbed } = require('discord.js')
const config = require("../../configuration/conf.json");

module.exports = {
    name: "ping",
    usage: "ping",
    cooldown: 2,
    description: "Returns teh bot's ping!",
    permsneeded: "SEND_MESSAGES",
    run: async(bot, message, args) => {
        const logo = config.bot.logo 
        
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
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        msg.edit(embed);
        console.log(`Latency: ${latency} | API Latency: ${wsLatency} to Server -> ${message.guild.name}`) 
        console.log("===========================================================")
        //i wanna know the ping too k ty
})  }
}
