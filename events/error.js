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
        let uncaughtException = new Discord.MessageEmbed()
            .setTitle('Error | uncaughtException')
            .setDescription(`${url}`)
            .setColor('RED')
            .setFooter(config.text, config.logo)
        bot.channels.cache.get(`${config.ErrorChannel}`).send(uncaughtException)
    });
}