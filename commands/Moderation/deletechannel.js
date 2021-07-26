const Discord = require('discord.js')

module.exports = {
    name: "deletechannel",
    aliases: ["delete", "nukechat"],
    usage: "deletechannel",
    description: "Deletes the channel.",
    permsneeded: "ADMINISTRATOR",
    run: async(bot, message, args) => {
        
        message.channel.send(`This chat is going to be deleted in 5 seconds`)
        setTimeout(function(){ 
            message.channel.delete();
        }, 5000);
    }
}
