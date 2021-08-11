const Discord = require('discord.js');
const config = require("../../configuration/conf.json").bot;

module.exports = {
    name: "invite",
    aliases: ["inv", "i"],
    usage: "invite",
    cooldown: 2,
    description: "Displays the bot's Invite",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {

        const invite = new Discord.MessageEmbed()

            .setTitle('Dobro | Invite Link')
            .setDescription(`
        You can add me **[here](https://discord.com/api/oauth2/authorize?client_id=849622587713650709&permissions=8&scope=bot)**!`)
            .setColor('BLUE')
            .setThumbnail(config.logo)
            .setFooter(config.text, config.logo)

        message.channel.send(invite)
    }
}