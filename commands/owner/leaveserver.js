const Discord = require('discord.js');
const config = require("../../configuration/conf.json").bot;
const privs = [config.token, "token", " token"]

module.exports = {
    name: "leaveserver",
    aliases:["badbot", "getout"],
    usage: "leave <id>",
    description: "Dev only command",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {
        try {
            const ownerId = "734331898339524630"  // Electrum
            const ownerId2 = "775265751954096138" // Nickk

            if (args.length  < 1) return message.reply("You must supply a Guild ID");
            if(message.author.id != ownerId && message.author.id != ownerId2) return;
            bot.guilds.cache.get(args.join(" ")).leave()
           .then(g => console.log(`Left the guild ${g}`)) .catch(console.error);
        } catch (error) {
            message.channel.send(`${error}`)
        }
    }
}