const Discord = require('discord.js');
const bot = new Discord.Client({ disableEveryone: false });
const fs = require('fs');

const config = require('./configuration/conf.json');

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

["loader"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

["cloader"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

// events
["message.js"].forEach(handler => {
    require(`./events/${handler}`)(bot);
});


bot.login(config.bot.token)