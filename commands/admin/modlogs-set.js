const { MessageEmbed } = require('discord.js');
const Schema = require("../../models/modlogs");

module.exports = {
  name: "modlogs-set",
  aliases: ["mls", "setmodlogs"],
  usage: "modlogs-set <#channel>",
  cooldown: 5,
  description: "Setup ModLogs",
  permsneeded: "ADMINISTRATOR",
  run: async (bot, message, args) => {
      if(!message.member.permissions.has('ADMINISTRATOR')) return;
      const channel = message.mentions.channels.first() || message.channel;

      Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
         if(data) data.delete();
         new Schema({
            Guild: message.guild.id,
            Channel: channel.id,
         }).save();
         const SetChannelEmbed = new MessageEmbed()
         .setAuthor("Mod-Logs Set!", message.guild.iconURL({ dynamic: true })) 
         .setDescription(`${channel} has been set as the Mod-Logs Channel.`)
         .setColor("GREEN")
         message.reply(SetChannelEmbed)
      })
   },
};