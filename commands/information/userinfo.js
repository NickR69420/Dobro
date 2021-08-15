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
const moment = require('moment');

module.exports = {
    name: 'userinfo',
    aliases: ['user', 'whois', 'info'],
    usage: 'userinfo [@user]',
    cooldown: 15,
    description: 'Displays information about a user.',
    permsneeded: 'SEND_MESSAGES',
    run: async (bot, message, args) => {

        let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const online = bot.emojis.cache.find(emoji => emoji.name === "online");
        const dnd = bot.emojis.cache.find(emoji => emoji.name === "dnd");
        const idle = bot.emojis.cache.find(emoji => emoji.name === "idle");
        const offline = bot.emojis.cache.find(emoji => emoji.name === "offline");

        function trimArray(arr, maxLen = 25) { // Elegy Skid momento
            if (arr.array().length > maxLen) {
                const len = arr.array().length - maxLen;
                arr = arr.array().sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
                arr.map(role => `<@&${role.id}>`)
                arr.push(`${len} more...`);
            }
            return arr.join(", ");
        }
        const badges = {
            HOUSE_BRAVERY: `House of Bravery`,
            HOUSE_BRILLIANCE: `House of Brilliance`,
            HOUSE_BALANCE: `House of Balance`,
        }
        const userFlags = Member.user.flags.toArray();
        const roles = Member.roles;
        const activity = Member.presence.activities[0];
        var userstatus = "Not having an activity";
        if (activity) {
            if (activity.type === "CUSTOM_STATUS") {
                let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a": ""}:${activity.emoji.name}:${activity.emoji.id}>`: activity.emoji.name : ""}`
                userstatus = `${emoji} \`${activity.state || 'Not having an acitivty.'}\``
            } else {
                userstatus = `${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}`
            }
        }
        const permissions = [];

        let status;
        switch (Member.presence.status) {
            case "online":
                status = `${online}`;
                break;
            case "dnd":
                status = `${dnd}`;
                break;
            case "idle":
                status = `${idle}`;
                break;
            case "offline":
                status = `${offline}`;
                break;
        }
        if (Member.hasPermission("KICK_MEMBERS")) {
            permissions.push("Kick Members");
        }

        if (Member.permissions.has("BAN_MEMBERS")) {
            permissions.push("Ban Members");
        }

        if (Member.hasPermission("ADMINISTRATOR")) {
            permissions.push("Administrator");
        }

        if (Member.hasPermission("MANAGE_MESSAGES")) {
            permissions.push("Manage Messages");
        }

        if (Member.hasPermission("MANAGE_CHANNELS")) {
            permissions.push("Manage Channels");
        }

        if (Member.hasPermission("MENTION_EVERYONE")) {
            permissions.push("Mention Everyone");
        }

        if (Member.hasPermission("MANAGE_NICKNAMES")) {
            permissions.push("Manage Nicknames");
        }

        if (Member.hasPermission("MANAGE_ROLES")) {
            permissions.push("Manage Roles");
        }

        if (Member.hasPermission("MANAGE_WEBHOOKS")) {
            permissions.push("Manage Webhooks");
        }

        if (Member.hasPermission("MANAGE_EMOJIS")) {
            permissions.push("Manage Emojis");
        }

        if (permissions.length == 0) {
            permissions.push("No Key Permissions Found");
        }


        const embed = new Discord.MessageEmbed()
            .setColor(Member.displayHexColor)
            .setFooter(config.text, config.logo)

            .setAuthor(`Userinfo`, Member.user.displayAvatarURL({
                dynamic: true
            }))
            .setTitle(`${Member.user.tag}    [${status}]`)
            .setThumbnail(Member.user.displayAvatarURL({
                dynamic: false
            }))

            .addFields(

                {
                    name: `🧍 Display Name`,
                    value: `\`\`\`${Member.displayName}\`\`\``,
                    inline: true,
                }, {
                    name: `🆔 User ID`,
                    value: `\`\`\`${Member.user.id}\`\`\``,
                    inline: true,
                }, {
                    name: `_ _`,
                    value: `_ _`,
                    inline: true
                }, {
                    name: `🤖 Bot?`,
                    value: `\`\`\`${Member.user.bot ? "✔️" : "❌"}\`\`\``,
                    inline: true,
                }, {
                    name: `📛 Profile Badges`,
                    value: `\`\`\`${userFlags.length ? userFlags.map(flag => badges[flag]).join(' ') : 'None'}\`\`\``,
                    inline: true,
                }, {
                    name: "_ _",
                    value: "_ _",
                    inline: true
                }, {
                    name: "📜 Activity",
                    value: userstatus,
                    inline: true
                },

                {
                    name: "——————————————————————————————",
                    value: `_ _`
                },

                {
                    name: `Roles - [${Member.roles.cache.size}]`,
                    value: roles.cache.size < 25 ? roles.cache.array().sort((a, b) => b.rawPosition - a.rawPosition).map(role => role.toString()).join(' ') : roles.cache.size > 25 ? trimArray(roles.cache) : 'None'
                }, {
                    name: `Key Permissions - [${permissions.length}]`,
                    value: `\`\`\`${permissions.join(`,`)}\`\`\``
                }, {
                    name: `📆 Registration Date`,
                    value: `\`\`\`${moment(Member.user.createdAt).format("LL LTS")}\`\`\``
                }, {
                    name: "📅 Guild Join Date",
                    value: `\`\`\`${moment(Member.joinedAt).format("LL LTS")}\`\`\``
                }
            )

        message.channel.send(embed)
    }
} // Format inspired by DisCruft Bot 