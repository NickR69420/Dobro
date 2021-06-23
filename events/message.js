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
   if(message.content.startsWith(`eval`)){

const notowner = new Discord.MessageEmbed()
.setDescription("Only the bot owner can use this command")
.setColor("RED")
const owners_id = ["734331898339524630", ["775265751954096138"]];
 if (!owners_id.includes(message.author.id))
 return message.channel.send(notowner); const args2 = message.content.split(" ").slice(1);

 const clean = text => {
 if (typeof(text) === "string")
 return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
 else
 return text;
}
 
 try {
 const code = args2.join(" ");
 let evaled = eval(code);
const lmao = message.content.slice("".length).trim().split(/ +/);
lmao.shift().toLowerCase().split(" ")[0]
message.channel.send(lmao.join(" "))
 const { inspect } = require("util");
const output = clean(evaled)

 const eval2 = new Discord.MessageEmbed()
 .addField("Input", `\`\`\`js\n${lmao.join(" ")}\`\`\``)
 .addField("Output", `\`\`\`js\n${output}\`\`\``)
 
 // msg.channel.send(clean(evaled));
 message.channel.send(eval2)
 } catch (err) {
 message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
 
    }
           
    
}

})
}