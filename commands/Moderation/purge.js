const Discord = require('discord.js')

module.exports = {
  name: "purge",
  aliases: ["clear", "remove"],
  usage: "purge <number of msgs>",
  description: "purgeee",
  permsneeded: "MANAGE_MESSAGES",
  run: async (bot, message, args) => {

    if(!args[0]) return message.channel.send('Please specify a number of messages to delete ranging from 1 - 99')
    if(isNaN(args[0])) return message.channel.send('Numbers are only allowed')
    if(parseInt(args[0]) > 99) return message.channel.send('The max amount of messages that I can delete is 99')
    await message.channel.bulkDelete(parseInt(args[0]) + 1)
        .catch(err => console.log(err))
    message.channel.send('Deleted ' + args[0]  + " messages.")
    console.log(`${message.author.tag} Requested to delete ` + args[0] + ` messages in ${message.guild.name}`) //logging action in console cuz why not!
    
  },
};