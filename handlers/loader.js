const Discord = require("discord.js");
const config = require("../configuration/conf.json");
const cooldowns = new Map();
const prefix = config.bot.prefix;
const databaseconnect = config.bot.MongoDB;
const modlogsSchema = require("../models/modlogs")

module.exports = (bot) => {

  bot.on("message", async message => {
try {
    const logo = config.bot.logo;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase()
    if (cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd))

// Cooldown
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
        return message.delete().then(message => message.channel.send("e")).then(m => m.delete({ timeout: 2500 }));
      }
      command.run(bot, message, args);
        }
      } catch (err) {
     console.log(`Error found, handled successfully`)
     const embed = new Discord.MessageEmbed()
          .setTitle(`:x: Unknown command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("FF0000");
        return message.channel.send(embed);
    }
  });

// MongoDB 
  const mongoose = require('mongoose');
  mongoose.connect(`${databaseconnect}`, {
    useUnifiedTopology : true,
    useNewUrlParser: true,
  }).then(console.log('Connected to MongoDB!'));

// Modlogs
    bot.modlogs = async function({ Member, Action, Color, Reason}, message) {
      const data = await modlogsSchema.findOne({ Guild: message.guild.id });
      if(!data) return;

      const channel = message.guild.channels.cache.get(data.Channel);
        const logsEmbed = new Discord.MessageEmbed()
        .setColor(Color)
        .setAuthor(`Member ${Action}`, config.bot.logo)
        .addField('Member', `<@${Member.user.id}> \n(${Member.user.id})`, true)
        .addField("Moderator", `<@${message.author.id}>`, true)
        .addField(`Reason:`, ` ${Reason || 'No Reason Provided.'}`, true)
        .setThumbnail(Member.user.displayAvatarURL({ dynamic: false }))
        .setTimestamp()

        channel.send(logsEmbed)
    }

// Console stuff
    bot.on("ready", () => {
      console.log(`Loaded all commands!`)
      console.log(`===========================================================`)
      console.log("Bot is online");
      console.log(`${bot.user.tag} is now in ${bot.guilds.cache.size} servers!`)
      console.log (`Bot started in ${process.uptime()} seconds`)
      console.log(`===========================================================`)
    });

// Bot Status    
    bot.on("ready", () => {
      function randomStatus() {
        let status = ["the chat", "Netflix", "The sun go down", "anime", `${bot.guilds.cache.size} servers`, "d!help", "https://github.com/NickR69420/Dobro"];
        let rstatus = Math.floor(Math.random() * status.length);
        bot.user.setActivity(status[rstatus], { type: "WATCHING" });
      }; setInterval(randomStatus, 10000);


    }
  );
};