const { MessageEmbed}= require('discord.js');
const glob = require('glob');
const config = require("../../configuration/conf.json");

module.exports = {
  name: "reload",
  aliases: ["reloadbot", "restart"],
  usage: "reload",
  description: "Reloads/Restarts the bot!",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    const logo = config.bot.logo
    const botname = config.bot.username

    if(message.author.id !== "775265751954096138") return;
    bot.commands.sweep(()=> true)
    glob(`${__dirname}/../**/*.js`, async(err, filePaths)=> {
    if(err) return console.log(err);
    filePaths.forEach((file)=> {
        delete require.cache[require.resolve(file)];

        const pull = require(file);

        if(pull.name) {
            console.log(`Reloaded ➤  ${pull.name}.js`)
            bot.commands.set(pull.name, pull);

        }
        
        if(pull.aliases && Array.isArray(pull.aliases)) {
            pull.aliases.forEach((alias) => {
                bot.aliases.set(alias, pull.name); 
                    })
                }
             })    
            message.channel.send("All Commands were reloaded!")
            console.log(`All Commands were reloaded!`)   
            console.log(`===========================================================`)     
        })
    },
}
  