const Discord = require('discord.js');

module.exports = {
    name: "eval",
    aliases:["ev", "run"],
    usage: "eval",
    description: "Dev only command",
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
            const ownerId = "734331898339524630"  // Electrum
            const ownerId2 = "775265751954096138" // Nickk
            const ownerID3 = "724483535775334480" // Flycode given for hosting, and being a chad
            if(message.author.id != ownerId && message.author.id != ownerId2 && message.author.id != ownerID3) return;
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
