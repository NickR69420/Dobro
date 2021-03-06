// This file is part of Dobro
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

const Discord = require('discord.js');
// const Updater = require('./updater.js');
const bot = new Discord.Client({
    disableEveryone: false,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const config = require('./configuration/conf.json');
const embedconfig = require("./configuration/embed.json");

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


// Updater.start();

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

//  Goodbye Event
["goodbye.js"].forEach(handler => {
    require(`./events/${handler}`)(bot)
});

// Message Edit Event
["messageUpdate.js"].forEach(handler => {
    require(`./events/${handler}`)(bot)
});

// Message Delete Event
["messageDelete.js"].forEach(handler => {
    require(`./events/${handler}`)(bot)
});

// Ready Event
["ready.js"].forEach(handler => {
    require(`./events/${handler}`)(bot)
});

// // Error Logging/Handling
// ["error.js"].forEach(handler => {
//     require(`./events/${handler}`)(bot)
// });

bot.login(config.bot.token)