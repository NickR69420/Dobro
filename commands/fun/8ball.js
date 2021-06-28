const Discord = require('discord.js');

module.exports = {
    name: "8ball",
    aliases:["8b", "ball"],
    usage: "{prefix}8ball",
    description: "",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => { 
try{
let replies = ["Yes","No","Maybe","Not sure","Shut up you rat!","sure, why not","when you grow a braincell, yes","THAT'S A SOLID ****NO****","Nah that sucks tbh"]
let randomized = replies[Math.floor(Math.random() * replies.length)]
let sentence = message.content.split(" ");
sentence.shift();
sentence = sentence.join(" ");
if (!sentence) message.reply("WHAT DO YOU WANT TO ASK 8BALL?")
let embed = new Discord.MessageEmbed()
.setTitle("8BALL")
.addField("Your Question", `${sentence}`)
.addField(`:8ball: 8ball`, `${randomized}`)
.setColor("RANDOM")
.setFooter(`Requested by ${message.author.username}`)
message.channel.send(embed)
} catch (e) {
    let {guild} = message;
    console.log(`Someone attempted to use the 8 ball command in ${guild.name} but failed to provide a question, the error has been handled`)
       }
    }
}