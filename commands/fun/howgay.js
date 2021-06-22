const Discord = require('discord.js');

module.exports = {
    name: "howgay",
    aliases:["gay", "gayrate"],
    usage: "{prefix}howgay",
    description: "how gay r u",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {

        let member = message.mentions.users.first() || message.author
        let gayness = Math.floor(Math.random() * 101);

        const howgayembed = new Discord.MessageEmbed()
        .setTitle(`Gay Machine Calculator`)
        .setDescription(`${member.username} is ` + gayness + "% Gay🌈")
        .setColor("GREEN")

        message.channel.send(howgayembed);
    }
}