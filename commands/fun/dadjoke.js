const Discord = require("discord.js");
const axios = require('axios').default

module.exports = {
    name: "dadjoke",
    aliases: ["daddy"],
    usage: "dadjoke",
    cooldown: 5,
    description: "Wanna hear a dadjoke?",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {
        let options = {
            method: 'GET',
            url: 'https://icanhazdadjoke.com',
            headers: {
                'Accept': `application/json`,
            }
        };

        axios.request(options).then(response => {
            console.log(`Got a dad joke: ${response.data.joke} ID: ${response.data.id}`);
            const id = response.data.id
            const daddy = new Discord.MessageEmbed()
                .setTitle(`A dad joke`)
                .setDescription(`${response.data.joke}`)
                .setColor('BLUE')
                .setFooter(`Requested by ${message.author.username} • ID: ${id}`, message.author.displayAvatarURL({ dynamic: true }))

            message.channel.send(daddy)
        }).catch(error => {
            console.error(error);
            message.channel.send(`The api seems to be down :pensive:`)
        });
    }
}