const Discord = require('discord.js');
const config = require("../../configuration/conf.json");
const moment = require('moment');

module.exports = {
    name: "userinfo",
    aliases:["user", "uinfo"],
    usage: "userinfo [@user]",
    cooldown: 10,
    description: "user-info",
    permsneeded: "SEND_MESSAGES",
    run: async(bot, message, args) => {

    let logo = config.bot.logo
    const flags = {
        DISCORD_EMPLOYEE: 'Discord Employee',
        DISCORD_PARTNER: 'Discord Partner',
        BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
        BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
        HYPESQUAD_EVENTS: 'HypeSquad Events',
        HOUSE_BRAVERY: 'House of Bravery',
        HOUSE_BRILLIANCE: 'House of Brilliance',
        HOUSE_BALANCE: 'House of Balance',
        EARLY_SUPPORTER: 'Early Supporter',
        TEAM_USER: 'Team User',
        SYSTEM: 'System',
        VERIFIED_BOT: 'Verified Bot',
        VERIFIED_DEVELOPER: 'Verified Bot Developer'
          };
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const userflags = user.user.flags.toArray().length ? user.user.flags.toArray().map(flag => flags[flag]).join('\n') : 'None'

        const online = bot.emojis.cache.find(emoji => emoji.name === "online");
        const dnd = bot.emojis.cache.find(emoji => emoji.name === "dnd");
        const idle = bot.emojis.cache.find(emoji => emoji.name === "idle");
        const offline = bot.emojis.cache.find(emoji => emoji.name === "offline");

        let status;
         switch (user.presence.status) {
            case "online":
                status = `${online} Online`;
                break;
            case "dnd":
                status = `${dnd} DND`;
                break;
            case "idle":
                status = `${idle} Idle`;
                break;
            case "offline":
                status = `${offline} Offline`;
                break;
         }

         const embed = new Discord.MessageEmbed()
         .setAuthor(`Information about: ` + user.user.username + "#" + user.user.discriminator, user.user.displayAvatarURL({ dynamic: true }))
         .setColor(`BLUE`)
         .setThumbnail(user.user.displayAvatarURL({dynamic : 512}))
         .addFields(
             {
                 name: `👤**Username:**`,
                 value: user.user.username + "#" + user.user.discriminator,
             },
             {
                 name: "🆔 `USER ID:`",
                 value: user.user.id,
                 inline: true
             },
             {
                 name: '_ _',
                 value: '_ _'
             },
             {
                 name: "`Current Status:`",
                 value: status,
                 inline: true
             },
             {
                name: "📜 `Custom Status:`",
                value: user.presence.activities[0] ? user.presence.activities[0].state : `User isn't have a custom status!`,
                inline: true
            },
             {
                name: '🔗 Avatar link: ',
                value: `[- PNG](${user.user.displayAvatarURL({format: "png", size: 1024})})\n[- JPG](${user.user.displayAvatarURL({format: "jpg", size: 1024})})\n[- WEBP](${user.user.displayAvatarURL({format: "webp", size: 1024})})\n[- GIF](${user.user.displayAvatarURL({format: "gif", size: 1024})})`,
                inline: false
            },
             {
                 name: '`Creation Date:`',
                 value: user.user.createdAt.toLocaleDateString("en-us"),
                 inline: true
             },
             {
                 name: '`Joined Date:`',
                 value: user.joinedAt.toLocaleDateString("en-us"),
                 inline: true
             },
             {
                name: '`Guild Join Date:`',
                value: `${moment(user.joinedTimestamp).format("DD/MM/YYYY")}`,
                inline: true
             },
             {
                 name: '`User Roles:`',
                 value: user.roles.cache.map(role => role.toString()).join(" ,"),
                 inline: false
             },
             {
                name: '`Permissions`',
                value: `${message.member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`
             }
         )
         .setFooter(config.bot.username, logo)
          message.channel.send(embed)
    }
}   