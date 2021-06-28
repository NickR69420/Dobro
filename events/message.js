const Discord = require("discord.js");

module.exports = (bot) => {
    
    bot.on("message", async message => {
        if (!message.member) return;
        if(message.content === "Jebo") {
            return message.channel.send("Hey there! If want to learn more about me, type d!help.");
        
        }
        if(message.content === "Prorok") {
            return message.channel.send("Best.");
        }
        if (message.content === `Electrum`) {
            return message.channel.send(`has a HUGE fucking penis`)
        }
        if (message.content === `vyan`) {
            let porn = ["https://cdn.discordapp.com/attachments/652566036356399148/670475120745250828/7days-1.gif", "https://tenor.com/view/cope-cope-harder-owned-bussin-cheese-burger-gif-21446979", "Vyan is a retard who no one likes.", "https://cdn.discordapp.com/attachments/855230444676186123/855577911528652821/funke.mp4"]
            let rporn = Math.floor(Math.random() * porn.length);
            message.author.send(porn[rporn])
           }
    });
} 