const Discord = require('discord.js');

module.exports = {
  name: "say",
  usage: "say < #channel | channel id > [ message ]",
  description: "",
  permsneeded: "",
  run: async (bot, message, args) => {
  
    
    message.delete();
    let channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();
    let msg = args.join(" ");

    if (!channel) return message.channel.send(msg);

    msg = args.join(" ").slice(args[0].length);
    channel.send(msg);
    
  }
}