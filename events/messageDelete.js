const Discord = require("discord.js");
const channelModel = require("../models/channelModel");
const snipes = new Discord.Collection();

module.exports = (bot) => {
try {
    bot.on('messageDelete', async(message) => {
        const data = await channelModel.findOne({ 
            GuildID: message.guild.id
           });
           let channel = bot.channels.cache.get(data.ChannelID);
        snipes.set(channel, message)
    
        const MessageDeleted = new Discord.MessageEmbed()
        .setAuthor(
          "Message Deleted",
          message.author.displayAvatarURL({ dynamic: true })
        )
        .addFields(
        {
            name: "Author:",
            value: `<@${message.author.id}>`,
            inline: true,
        },
        {
            name: "Channel",
            value: `${message.channel}`,
            inline: true
        },
        {
            name: "Content",
            value: `\`\`\`${message.content}\`\`\``
        }
        )
        .setColor("#E4381D")
        .setTimestamp();
    
       await channel.send(MessageDeleted);
        })
    } catch (e) {
        console.log("Unknown Error")
    }
}