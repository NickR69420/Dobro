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
// along with this program.  If not, see <http://www.gnu.org/licenses/>.const { MessageEmbed } = require("discord.js");

const config = require("../configuration/conf.json").bot; // Embed config
const Discord = require(`discord.js`)

module.exports = (bot) => {

    bot.on(`disconnect`, function () {
        let disconnectError = new Discord.MessageEmbed()
            .setTitle('Error | Lost connection to Discord API')
            .setDescription(`The bot is attempting to automaticly reconnect`)
            .setColor('RED')
            .setFooter(config.text, config.logo)
        bot.channels.cache.get(`${config.ErrorChannel}`).send(disconnectError)
    })

    bot.on(`ready`, function () {
        let errorLogger = new Discord.MessageEmbed()
            .setTitle('Error logged has connected')
            .setDescription(`Anything that goes wrong will be logged to this channel`)
            .setColor('BLUE')
            .setFooter(config.text, config.logo)
        bot.channels.cache.get(`${config.ErrorChannel}`).send(errorLogger)
    })

    bot.on(`shardError`, function () {
        let shardError = new Discord.MessageEmbed()
            .setTitle('Error | ShardError')
            .setDescription(`The error has been logged to console`)
            .setColor('RED')
            .setFooter(config.text, config.logo)
        bot.channels.cache.get(`${config.ErrorChannel}`).send(shardError)
    })


    process.on('unhandledRejection', async error => {
        let url = await hastebin.createPaste(error, {
            raw: true,
            contentType: 'text/javascript',
            content: `${error}`,
            server: 'https://hastebin.com'
        });
        let unhandledRejectionEmbed = new Discord.MessageEmbed()
            .setTitle('Error | unhandledRejection')
            .setDescription(`${url}`)
            .setColor('RED')
            .setFooter(config.text, config.logo)
        bot.channels.cache.get(`${config.ErrorChannel}`).send(unhandledRejectionEmbed)
    });

    // process.on('DiscordAPIError', async error => {
    //     let url = await hastebin.createPaste(error, {
    //         raw: true,
    //         contentType: 'text/javascript',
    //         content: `${error}`,
    //         server: 'https://hastebin.com'
    //     });
    //     let DiscordAPIError = new Discord.MessageEmbed()
    //         .setTitle('Error | DiscordAPIError')
    //         .setDescription(`${url}`)
    //         .setColor('RED')
    //         .setFooter(config.text, config.logo)
    //     bot.channels.cache.get(`${config.ErrorChannel}`).send(DiscordAPIError)
    // });


    process.on('uncaughtException', async error => {
        let url = await hastebin.createPaste(error, {
            raw: true,
            contentType: 'text/javascript',
            content: `${error}`,
            server: 'https://hastebin.com'
        });
        // Untested
        let uncaughtException = new Discord.MessageEmbed()
            .setTitle('Error | uncaughtException')
            .setDescription(`${url}`)
            .setColor('RED')
            .setFooter(config.text, config.logo)
        bot.channels.cache.get(`${config.ErrorChannel}`).send(uncaughtException)
    });
}