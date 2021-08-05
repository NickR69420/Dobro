const Schema = require("../../models/WelcomeChannel");
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "checkChannel",
  hidden: true,
  aliases: ["checkchannel", "cc"],
  usage: "checkChannel",
  cooldown: 0,
  description: "Sets the channel for your Welcome channel",
  permsneeded: "ADMINISTRATOR",
  run: async (bot, message, args) => {

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) return message.reply("This guild has no data stored.");

          const channel = bot.channels.cache.get(data.Channel);

          const ChannelInfo = new MessageEmbed()
          .setAuthor("Welcome Channel Info", message.guild.iconURL({ dynamic: true }))
          .setDescription(`Welcome channel is set to ${channel}`)
          .setColor("BLUE")
          message.channel.send(ChannelInfo)
        })
    }
}