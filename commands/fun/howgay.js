const Discord = require('discord.js');
const config = require("../../configuration/conf.json");

module.exports = {
    name: "howgay",
    aliases:["gayrate"],
    usage: "howgay [@user]",
    cooldown: 2,
    description: "how gay r u",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {

        const logo = config.bot.logo

        let member = message.mentions.users.first() || message.author
        let gayness = Math.floor(Math.random() * 101);

        const howgayembed = new Discord.MessageEmbed()
        .setTitle(`Gay Machine Calculator`)
        .setDescription(`${member.username} is ` + gayness + "% Gay🌈")
        .setColor("GREEN")
        .setFooter(`Requested by ${message.author.username}`, logo)

        message.channel.send(howgayembed);
    }
}