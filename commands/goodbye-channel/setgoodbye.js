const Schema = require("../../models/GoodbyeChannel");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "setgoodbye",
  hidden: true,
  aliases: ["bye", "goodbye"],
  usage: "setgoodbye",
  cooldown: 0,
  description: "Sets the channel for your Goodbye channel",
  permsneeded: "ADMINISTRATOR",
  run: async (bot, message, args) => {

        const channel = message.mentions.channels.first();
        if(!channel) return message.reply("Please mention a channel!");

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                data.Channel = channel.id;
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id
                }).save();
            }
            const SetChannelEmbed = new MessageEmbed()
            .setAuthor("Goodbye Channel Set!", message.guild.iconURL({ dynamic: true })) 
            .setDescription(`${channel} has been set as the Goodbye Channel.`)
            .setColor("GREEN")
            message.reply(SetChannelEmbed)
        })
    },
};