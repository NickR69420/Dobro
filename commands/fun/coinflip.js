const { MessageEmbed} = require('discord.js');
const config = require("../../configuration/conf.json");
const logo = config.bot.logo
const text = config.bot.username

module.exports = {
  name: "coinflip",
  aliases: ["flip", "coin", "cf"],
  usage: "coinflip",
  cooldown: 10,
  description: "Flip a coin!",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    const number = Math.floor(Math.random() * 2);

    let result;
    if (number === 1) result = 'Heads'
    else result = 'Tails';

    const flipembed = new MessageEmbed()
    .setTitle('½  Coinflip  ½')
    .addField("Result", `\`${result}\``)
    .setFooter(text, logo)
    .setColor('RANDOM')

    message.channel.send(flipembed)
   }
}