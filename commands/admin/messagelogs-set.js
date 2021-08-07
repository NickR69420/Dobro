const { MessageEmbed } = require("discord.js");
const channelModel = require("../../models/channelModel");

module.exports = {
  name: "messagelogs-set",
  aliases: ["msgset", "msglogs"],
  usage: "messagelogs-set <#channel>",
  cooldown: 5,
  description: "Sets message logs channel",
  permsneeded: "ADMINISTRATOR",
  run: async (bot, message, args) => {
    const channel = message.mentions.channels.first();

    const data = await channelModel.findOne({ GuildID: message.guild.id });

    if (!data) {
      const data = new channelModel({
        GuildID: message.guild.id,
        ChannelID: channel.id,
      });
      data.save();
      const SetChannelEmbed = new MessageEmbed()
        .setAuthor(
          "Message-Logs Set!",
          message.guild.iconURL({ dynamic: true })
        )
        .setDescription(`${channel} has been set as the Message-Logs Channel.`)
        .setColor("GREEN");
      message.channel.send(SetChannelEmbed);
    } else {
      await channelModel.deleteOne({
        GuildID: message.guild.id,
      });

      const data = new channelModel({
        GuildID: message.guild.id,
        ChannelID: channel.id,
      });
      data.save();
      const ReChannel = new MessageEmbed()
        .setAuthor(
          "Message-Logs Set!",
          message.guild.iconURL({ dynamic: true })
        )
        .setDescription(`${channel} has been saved as the Message-Logs Channel.`)
        .setColor("GREEN");
      message.channel.send(ReChannel);
    }
  },
};
