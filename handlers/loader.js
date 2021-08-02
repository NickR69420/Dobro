const Discord = require("discord.js");
const config = require("../configuration/conf.json");
const cooldowns = new Map();

module.exports = (bot) => {

  bot.on("message", async message => {
    const logo = config.bot.logo;
    const prefix = config.bot.prefix;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase()
    if (cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd))

    if(!cooldowns.has(command.name)){
      cooldowns.set(command.name, new Discord.Collection());
  }

  const current_time = Date.now();
  const time_stamps = cooldowns.get(command.name);
  const cooldown_amount = (command.cooldown) * 1000;

  
  if(time_stamps.has(message.author.id)){
      const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

      if(current_time < expiration_time){
          const time_left = (expiration_time - current_time) / 1000;

          const TimeLeftEmbed = new Discord.MessageEmbed()
        .setTitle("Yo chill man!")
        .setDescription(`Please wait ${time_left.toFixed(1)} more seconds before using \`${command.name}\``)
        .setFooter("Dobro", logo)
        .setColor('RED')

          return message.channel.send(TimeLeftEmbed);
      }
  }

  time_stamps.set(message.author.id, current_time);
  
  setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    if (command) {
      if (command.permsneeded != "none" && !message.member.hasPermission(`${command.permsneeded}`)) {
        message.delete();
        return message.channel.send(`You don't have permission to use this command! Missing permission: ${command.permsneeded}`).then(message => message.delete(5000));
      }
      command.run(bot, message, args);
    }
  });


    bot.on("ready", () => {
      console.log(`Loaded all commands!`)
      console.log(`===========================================================`)
      console.log("Bot is online");
      console.log(`${bot.user.tag} is now in ${bot.guilds.cache.size} servers!`)
      console.log (`Bot started in ${process.uptime()} seconds`)
      console.log(`===========================================================`)
    });


    bot.on("ready", () => {
      function randomStatus() {
        let status = ["the chat", "Netflix", "The sun go down", "anime", `${bot.guilds.cache.size} servers`, "d!help", "https://github.com/NickR69420/Dobro"];
        let rstatus = Math.floor(Math.random() * status.length);
        bot.user.setActivity(status[rstatus], { type: "WATCHING" });
      }; setInterval(randomStatus, 10000);


    }
  );
};