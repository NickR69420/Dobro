const { MessageEmbed}= require('discord.js');
const glob = require('glob');

module.exports = {
  name: "reload",
  aliases: ["reloadcmd", "refresh"],
  usage: "reload",
  description: "Reloads all bot commands!",
  permsneeded: "ADMINISTRATOR",
  run: async (bot, message, args) => {
    
    const ownerId = "734331898339524630"  // Electrum
    const ownerId2 = "775265751954096138" // Nickk
    
    if(message.author.id != ownerId && message.author.id != ownerId2) return;
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
             let embed = new MessageEmbed()
             .setColor('#33F304')
             .setTitle(":white_check_mark:  All Commands were reloaded!")  
            message.channel.send(embed)
            console.log(`All Commands were reloaded!`)   
            console.log(`===========================================================`)     
        })
    },
}
  