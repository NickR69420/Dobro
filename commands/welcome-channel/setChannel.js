const Schema = require("../../models/WelcomeChannel");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "setChannel",
    hidden: true,
    aliases: ["setchannel", "sc"],
    usage: "setChannel",
    cooldown: 0,
    description: "Sets the channel for your Welcome channel",
    permsneeded: "ADMINISTRATOR",
    run: async (bot, message, args) => {

        const channel = message.mentions.channels.first();
        if (!channel) return message.reply("Please mention a channel!");

        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (data) {
                data.Channel = channel.id;
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id
                }).save();
            }
            const SetChannelEmbed = new MessageEmbed()
                .setAuthor("Welcome Channel Set!", message.guild.iconURL({ dynamic: true }))
                .setDescription(`${channel} has been set as the Welcome Channel.`)
                .setColor("GREEN")
            message.reply(SetChannelEmbed)
        })
    },
};