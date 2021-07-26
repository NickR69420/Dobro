const Discord = require('discord.js');
const figlet = require('figlet');

module.exports = {
    name: "ascii",
    aliases: ["art", "textart"],
    usage: "ascii [text]",
    cooldown: 15,
    description: "Converts text to ascii!",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {

        figlet.text(
            args.join(' '),
            {
                font: 'Doom',
            },
            async (err, data) => {
                message.channel.send(`\`\`\`${data}\`\`\``);
            })
    }
}