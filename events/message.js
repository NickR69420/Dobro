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
const Discord = require("discord.js");

module.exports = (bot) => {
    
    bot.on("message", async message => {
        if (!message.member) return;
        if(message.content === "Dobro") {
            return message.channel.send('Hey there! If want to learn more about me, type `d!help`.');
        }
        if (message.content === `<@!${bot.user.id}>`) {
            return message.channel.send("Hey there! If want to learn more about me, type `d!help`.")
        }
        if(message.content === "Prorok") {
            return message.channel.send("Best.");
        }
        if (message.content === `Electrum`) {
            return message.channel.send(`Likes gay porn confirmed`)
        }
    }); 
} 