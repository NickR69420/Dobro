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
let hastebin = require(`hastebin`)

module.exports = {
    name: "getservers",
    aliases: ["listservers", "invites"],
    usage: "getservers",
    description: "Dev only command",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {
        try {
            const ownerId = "734331898339524630"  // Electrum
            const ownerId2 = "775265751954096138" // Nickk
            const invites = [];

            if (message.author.id != ownerId && message.author.id != ownerId2) return;
            for (const [guildID, guild] of bot.guilds.cache) {
                let invite = "No invite";

                const fetch = await guild.fetchInvites().catch(() => undefined);

                if (fetch && fetch.size) {
                    invite = fetch.first().url;
                    invites.push({ name: guild.name, invite });
                    continue;
                }

                for (const [channelID, channel] of guild.channels.cache) {
                    if (!invite && channel.createInvite) {
                        const attempt = await channel.createInvite().catch(() => undefined);

                        if (attempt) {
                            invite = attempt.url;
                        }
                    }
                }
                invites.push({ name: guild.name, invite });
            }
            let invitesfinal = "";
            invites.forEach(e => {
                invitesfinal += e.name + " - " + e.invite + "\n";
            });
            let url = await hastebin.createPaste(invitesfinal.trim(), {
                raw: true,
                contentType: 'text/javascript',
                content: `${invites.toString()}`,
                server: 'https://hastebin.com'
            });
            console.log(`User ${message.author.username} requested all servers using the bot. (${url})`)
            message.author.send(`All servers using the bot ${url}`)
            message.reply(`Sent you all the servers`)
        } catch (error) {
            console.log(`${error}`)
        }
    }
}
// thanks daysling for the hastebin code

