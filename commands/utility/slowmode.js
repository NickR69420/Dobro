const Discord = require('discord.js');

module.exports = {
  name: "slowmode",
  aliases: ["sm", "slowm"],
  usage: "slowmode <number>",
  description: "Set slowmode for a channel",
  permsneeded: "MANAGE_CHANNELS",
  run: async (bot, message, args) => {

    if (message.member.hasPermission("MANAGE_CHANNELS")) {
      let sentence = message.content.split(" ");
      sentence.shift();
      sentence = sentence.join(" ");
      if (sentence != null) {
        message.channel.setRateLimitPerUser(sentence);
      }

      message.reply(`This chat now has a slowmode of ${sentence} seconds!`)
    }
  }
}