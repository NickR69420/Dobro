const Discord = require('discord.js');
const { exec } = require("child_process");

module.exports = {
    name: 'execute',
    aliases: ['exec'],
    usage: 'exec <command>', 
    cooldown: 0,
    description: 'Execute a cmd', 
    permsneeded: 'SEND_MESSAGES',
    run: async (bot, message, args) => {
try {
        const ownerId = "734331898339524630"; // Electrum
        const ownerId2 = "775265751954096138"; // Nickk
    
        if (message.author.id != ownerId && message.author.id != ownerId2) return;

        const str = args.join(' ');

            if (!str) return message.reply("Please execute a valid command!");

            exec(str, (err, stdout) => {
                if (err) {
                    return message.channel.send(`:x: Error\n\nCommand:\n\`\`\`${str}\`\`\`\nError\n  \`\`\`${err}\`\`\`` );
                }

                if (stdout) {
                    return message.channel.send(stdout, { split: true, code: true }), console.log(stdout);
                }
                // message.channel.send({ content: `${commandresponse}` });    
            })

        } catch (e) {
            console.log(e)
        }
    }
}