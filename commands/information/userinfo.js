const Discord = require('discord.js');
const config = require("../../configuration/conf.json");

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
            DISCORD_EMPLOYEE: '<:discordstaff:841642427390492722> Discord Employee',
            DISCORD_PARTNER: '<:DISCORD_PARTNER:841642427218788352> Discord Partner',
            BUGHUNTER_LEVEL_1: '<:BUG_HUNTER:841642427198472213> Bug Hunter LV.1',
            BUGHUNTER_LEVEL_2: '<:BUGHUNTER_LV2:841644744589180958> Bug Hunter LV.2',
            HYPESQUAD_EVENTS: '<:HYPESQUAD_EVENT:841642427227439104> HypeSquad Event',
            HOUSE_BRAVERY: '<:HOUSE_BRAVERY:841642426992951307> House Bravery',
            HOUSE_BRILLIANCE: '<:HOUSE_BRILLIANCE:841642427331641354> House Brilliance',
            HOUSE_BALANCE: '<:HOUSE_BALANCE:841642427130314803> House Balance',
            EARLY_SUPPORTER: '<:EARLYNITRO:841642427240808468> Early Supporter',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: '<:VERIFIEDBOT:841644324982358056> Verified BOT',
            EARLY_VERIFIED_DEVELOPER: '<:VERIFIEDBOTDEV:841642427239628840> Early Verified Developer'
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
         .setTitle(`${user.user.username}'s Info`, logo)
         .setColor(`BLUE`)
         .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
         .addFields(
             {
                 name: "👤`Name:`",
                 value: user.user.username,
                 inline: true
             },
             {
                 name: "#️⃣`Tag`",
                 value: `#${user.user.discriminator}`,
                 inline: true
             },
             {
                 name: "🆔 `USER ID:`",
                 value: user.user.id,
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
                 name: '`User Roles:`',
                 value: user.roles.cache.map(role => role.toString()).join(" ,"),
                 inline: false
             }
         )
         .setFooter(`Requested by ${message.author.username}`, logo)
          message.channel.send(embed)
    }
}   