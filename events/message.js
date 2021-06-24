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
        if (message.content.toLowerCase().startsWith("d!8ball")) {
            let replies = ["Yes","No","Maybe","Not sure","Shut up you rat!","sure, why not","when you grow a braincell, yes","THAT'S A SOLID ****NO****","Nah that sucks tbh"]
            let randomized = replies[Math.floor(Math.random() * replies.length)]
            let sentence = message.content.split(" ");
            sentence.shift();
            sentence = sentence.join(" ");
            if (!sentence) message.reply("WHAT DO YOU WANT TO ASK 8BALL?")
            let embed = new Discord.MessageEmbed()
            .setTitle("8BALL")
            .addField("Your Question", `${sentence}`)
            .addField(`<:8ball:854938074857472040> 8ball`, `${randomized}`)
            .setColor("RANDOM")
            .setFooter(" ")
            message.channel.send(embed)
           }
    });
} 