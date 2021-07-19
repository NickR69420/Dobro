const Discord = require('discord.js');

module.exports = {
    name: "invite",
    aliases: ["inv", "i"],
    usage: "invite",
    cooldown: 2,
    description: "Displays the bot's Invite",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {

        const logo = 'https://cdn.discordapp.com/avatars/849622587713650709/8a30dd6bb9b374bd21096c40efd03cf7.webp?size=128'

        const invite = new Discord.MessageEmbed()

        
        .setURL('https://discord.com/api/oauth2/authorize?client_id=849622587713650709&permissions=8&scope=bot')
        .setTitle('CLICK ON ME FOR THE INVITE!')
        .setThumbnail(logo)
        .setFooter('Dobro | Invite Link', logo )

          message.channel.send(invite)
    }
}    