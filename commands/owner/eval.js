const Discord = require('discord.js')


module.exports = {
    name: "eval",
    aliases:["ev", "run"],
    usage: "{prefix}ev",
    description: "Dev only eval command",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {
           // Cleaning for the eval command 
           function clean(text) {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }


          // The eval command itself, 
            const args1 = message.content.split(" ").slice(1);
            const ownerId = "734331898339524630" 
            const ownerId2 = "425820768144719882"
            if(message.author.id != ownerId && message.author.id != ownerId2) return;
          try {
                const code = args1.join(" ");
                let evaled = eval(code);
           
                if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);
           
                message.channel.send(clean(evaled), {code:"xl"});
              } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
              }
            } 
            
    }
