const moment = require('moment');

module.exports = (bot) => {

    bot.on("ready", async () => {
        console.log(`Loaded all commands!`)
        console.log(`===========================================================`)
        console.log("Bot is online");
        console.log(`${bot.user.tag} is now in ${bot.guilds.cache.size} guilds!`)
        console.log(`Bot started in ${moment.duration(bot.uptime).format("S")} seconds`)
        console.log(`===========================================================`)
    });

    // Bot Status    
    bot.on("ready", async () => {
        function randomStatus() {
            let status = ["the chat", "Netflix", "The sun go down", "anime", `${bot.guilds.cache.size} servers`, "d!help", "https://github.com/NickR69420/Dobro"];
            let rstatus = Math.floor(Math.random() * status.length);
            bot.user.setActivity(status[rstatus], {
                type: "WATCHING"
            });
        };
        setInterval(randomStatus, 10000);
    });
}