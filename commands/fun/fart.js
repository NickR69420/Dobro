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