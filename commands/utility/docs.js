const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "docs",
    aliases: ["djs", "discorddocs"],
    usage: "docs <topic>",
    cooldown: 5,
    description: "Discord.js Documentation",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {
        const query = args.join(" ");
        if (!query) return message.reply("Please specify a query!");
        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
          query
        )}`;
    
        axios.get(url).then(({ data }) => {
          if (data) {
            message.channel.send({ embed: data });
          }
        });
      },
    };