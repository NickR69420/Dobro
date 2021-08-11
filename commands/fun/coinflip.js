const { MessageEmbed } = require('discord.js');
const config = require("../../configuration/conf.json").bot;

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
      .setFooter(config.text, config.logo)
      .setColor('RANDOM')

    message.channel.send(flipembed)
  }
}