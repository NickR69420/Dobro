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
const config = require("../../configuration/conf.json").bot;
const privs = [config.token, "token", " token"]

module.exports = {
    name: "leaveserver",
    aliases: ["badbot", "getout"],
    usage: "leave <id>",
    description: "Dev only command",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {
        try {

            const ownerId = "734331898339524630"  // Electrum
            const ownerId2 = "775265751954096138" // Nickk

            if (args.length < 1) return message.reply("You must supply a Guild ID");
            if (message.author.id != ownerId && message.author.id != ownerId2) return;
            bot.guilds.cache.get(args.join(" ")).leave()
                .then(g => console.log(`Left the guild ${g}`)).catch(console.error);
            message.reply(`Left server with ID ${g}`)
        } catch (error) {
            message.channel.send(`${error}`)
        }
    }
}