const { MessageEmbed } = require("discord.js");
const channelModel = require("../models/channelModel");

module.exports = (bot) => {
  try {

  bot.on('messageUpdate', async(oldMessage, newMessage) => {
    const data = await channelModel.findOne({ 
        GuildID: oldMessage.guild.id
       });
  
    let channel = bot.channels.cache.get(data.ChannelID);

  const MessageEdited = new MessageEmbed()
    .setAuthor(
      "Message Edited",
      oldMessage.author.displayAvatarURL({ dynamic: true })
    )
    .addFields(
      {
        name: "Author:",
        value: `<@${oldMessage.author.id}>`,
        inline: true,
      },
      {
        name: "Channel",
        value: `${oldMessage.channel}`,
        inline: true
      },
      {
        name: "Old Message",
        value: `\`\`\`${oldMessage.content}\`\`\``,
      },
      {
        name: "New Message",
        value: `\`\`\`${newMessage.content}\`\`\``,
      }
    )
    .setColor("#E4381D")
    .setTimestamp();


   await channel.send(MessageEdited);

    })
  } catch (e){
    console.log("Unknown Error")
  }
}
  
        

