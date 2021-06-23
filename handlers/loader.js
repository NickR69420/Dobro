
const Discord = require("discord.js");
const config = require("../configuration/conf.json");

module.exports = (bot) => {

  bot.on("message", async message => {
    const prefix = config.bot.prefix;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    if (command) {
      if (command.permsneeded != "none" && !message.member.hasPermission(`${command.permsneeded}`)) {
        message.delete();
        return message.channel.send("You don't have permission to use this command!").then(message => message.delete(5000));
      }
      command.run(bot, message, args);
    }
  });


    bot.on("ready", () => {
      console.log(`===========================================================`)
      console.log("Bot is online");
      console.log(`${bot.user.tag} is now in ${bot.guilds.cache.size} servers!`)
      console.log(`===========================================================`)
    })


    bot.on("ready", () => {
      function randomStatus() {
        let status = ["the chat", "Netflix & Chill", "The sun go down", "anime", `chilling in ${bot.guilds.cache.size} servers`, "d!help"]
        let rstatus = Math.floor(Math.random() * status.length);
        bot.user.setActivity(status[rstatus], { type: "WATCHING" });
      }; setInterval(randomStatus, 30000)


    }
  );
}