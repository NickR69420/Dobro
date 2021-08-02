const Discord = require('discord.js');

module.exports = {
  name: "fart",
  aliases: ["stinky"],
  usage: "fart",
  cooldown: 10,
  description: "Wanna Fart? Use this command lol",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
      
    message
    .reply({
        embed: {
            description: 'Uh I think **' + message.author.username + `** doesn't feel good...`,
            color: 'RANDOM',
            timestamp: new Date(),
        },
        allowedMentions: {
            repliedUser: false,
        },
    })
    .then((msg) => {
        setTimeout(() => {
            msg.edit({
                embed: {
                    description: `${message.author.username} are u ok? ur face green bruh 🤢`,
                    color: 'RANDOM',
                    timestamp: new Date(),
                },
            });
        }, 3000);
        setTimeout(() => {
            msg.edit({
                embed: {
                    description: 'dude? why are u vomiting???? 🤮',
                    color: 'RANDOM',
                    timestamp: new Date(),
                },
            });
        }, 6000);
        setTimeout(() => {
            msg.edit({
                embed: {
                    description: 'oh no no NO dont dont do it!!!',
                    color: 'RANDOM',
                    timestamp: new Date(),
                },
            });
        }, 9000);
        setTimeout(() => {
            msg.edit({
                embed: {
                    description: '🤮💨',
                    color: 'RANDOM',
                    timestamp: new Date(),
                },
            });
        }, 12000);
        setTimeout(() => {
            msg.edit({
                embed: {
                    description: '🤮💨💨',
                    color: 'RANDOM',
                    timestamp: new Date(),
                },
            });
        }, 13000);
        setTimeout(() => {
            msg.edit({
                embed: {
                    description: '🤮💨💨💨',
                    color: 'RANDOM',
                    timestamp: new Date(),
                },
            });
        }, 14000);
        setTimeout(() => {
            msg.edit({
                embed: {
                    description: '🤮💨💨💨💨',
                    color: 'RANDOM',
                    timestamp: new Date(),
                },
            });
        }, 15000);
        setTimeout(() => {
            msg.edit({
                embed: {
                    description: '🤮💨💨💨💨💨',
                    color: 'RANDOM',
                    timestamp: new Date(),
                },
            });
        }, 16000);
        setTimeout(() => {
            msg.edit({
                embed: {
                    description: '🤮💨💨💨💨💨💨',
                    color: 'RANDOM',
                    timestamp: new Date(),
                },
            });
        }, 17000);
        setTimeout(() => {
            msg.edit({
                embed: {
                    description: 'the world exploded since ' + `${message.author.username} farted. RIP 👼👼`,
                    color: 'RANDOM',
                    timestamp: new Date(),
                },
            });
        }, 20000);
    });
   }
}
// Credits: DashCruft for this awesome cmd :D