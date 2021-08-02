const Discord = require('discord.js');
const config = require("../../configuration/conf.json").bot;

module.exports = {
    name: "howgay",
    aliases:["gayrate"],
    usage: "howgay [@user]",
    cooldown: 2,
    description: "how gay r u",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {

        let member = message.mentions.users.first() || message.author
        let gayness = Math.floor(Math.random() * 101);

        const howgayembed = new Discord.MessageEmbed()
        .setTitle(`Gay Machine Calculator`)
        .setDescription(`${member.username} is ` + gayness + "% Gay🌈")
        .setColor("GREEN")
        .setFooter(`Requested by ${message.author.username}`, config.logo)

        message.channel.send(howgayembed);
    }
}