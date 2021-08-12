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
const { MessageEmbed } = require('discord.js');
const glob = require('glob');

module.exports = {
    name: "reload",
    aliases: ["reloadcmd", "refresh"],
    usage: "reload",
    description: "Reloads all bot commands!",
    permsneeded: "ADMINISTRATOR",
    run: async (bot, message, args) => {

        const ownerId = "734331898339524630"  // Electrum
        const ownerId2 = "775265751954096138" // Nickk

        if (message.author.id != ownerId && message.author.id != ownerId2) return;
        bot.commands.sweep(() => true)
        glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
            if (err) return console.log(err);
            filePaths.forEach((file) => {
                delete require.cache[require.resolve(file)];

                const pull = require(file);

                if (pull.name) {
                    console.log(`Reloaded ➤  ${pull.name}.js`)
                    bot.commands.set(pull.name, pull);

                }

                if (pull.aliases && Array.isArray(pull.aliases)) {
                    pull.aliases.forEach((alias) => {
                        bot.aliases.set(alias, pull.name);
                    })
                }
            })
            let embed = new MessageEmbed()
                .setColor('#33F304')
                .setTitle(":white_check_mark:  All Commands were reloaded!")
            message.channel.send(embed)
            console.log(`All Commands were reloaded!`)
            console.log(`===========================================================`)
        })
    },
}
