const Discord = require('discord.js');
const config = require("../../configuration/conf.json").bot;
const privs = [config.token, "token", " token"]

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

            console.log(invites)
        } catch (error) {
            console.log(`${error}`)
        }
    }
}