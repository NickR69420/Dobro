const Discord = require("discord.js");

module.exports = (bot) => {
    
    bot.on("message", async message => {
        if (!message.member) return;
        if(message.content === "Dobro") {
            return message.channel.send('Hey there! If want to learn more about me, type `d!help`.');
        }
        if (message.content === `<@!${bot.user.id}>`) {
            return message.channel.send("Hey there! If want to learn more about me, type `d!help`.")
        }
        if(message.content === "Prorok") {
            return message.channel.send("Best.");
        }
        if (message.content === `Electrum`) {
            return message.channel.send(`Likes gay porn confirmed`)
        }
    }); 
} 