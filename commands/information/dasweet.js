const { MessageEmbed } = require('discord.js');
const server = require("../../configuration/dasweet.json").info;

module.exports = {
  name: "dasweet",
  aliases: ["DaSweet", "Dasweet", "daSweet", "DaSweetSMP"],
  usage: "dasweet",
  cooldown: 10,
  description: "Displays info about DaSweet SMP!",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {

    const DaSweet = new MessageEmbed()
    .setTitle("DaSweet")
    .setImage("https://cdn.discordapp.com/attachments/856819667082674211/871760766750052362/DaSweet.gif")
    .setDescription(`${server.Description}`)
    .setColor("BLUE")
    .addFields(
        {
            name: "IP",
            value: `**Java:** \`${server.Java.ip}\`, \`${server.Java.ip2}\`\n**Bedrock:** ${server.Bedrock.ip}, Port: ${server.Bedrock.port} `
        },
        {
            name: "Version",
            value: "`1.8 - 1.17`",
            inline: true
        },
        {
            name: "Discord",
            value: `[Click me to Join the Discord!](https://discord.gg/ufMFGF9kYv)`
        }
    )

    message.channel.send(DaSweet)
   },
};