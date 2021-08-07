const Discord = require('discord.js');
const bot = new Discord.Client({
     disableEveryone: false,
     partials: ['MESSAGE', 'CHANNEL', 'REACTION'] 
    });    
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

//ticket event : messageReactionAdd
//["messageReactionAdd"].forEach(handler =>{
//    require(`./events/${handler}`)(bot);
//});

// Welcome Event
["welcomer.js"].forEach(handler => {
    require(`./events/${handler}`)(bot)
});

// Goodbye Event
["goodbye.js"].forEach(handler => {
    require(`./events/${handler}`)(bot)
});

// Message Edit Event
["messageUpdate"].forEach(handler =>{
    require(`./events/${handler}`)(bot)
});

// Message Delete Event
["messageDelete"].forEach(handler =>{
    require(`./events/${handler}`)(bot)
});

bot.login(config.bot.token)