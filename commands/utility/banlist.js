const { MessageEmbed } = require('discord.js');
const config = require("../../configuration/conf.json");

module.exports = {
  name: "banlist",
  aliases: ["fetchbans", "bans"],
  usage: "banlist",
  cooldown: 10,
  description: "Displays list of banned members.",
  permsneeded: "BAN_MEMBERS",
  run: async (bot, message, args) => {
    const logo = config.bot.logo

    const fetchBans = message.guild.fetchBans();
    const bannedMembers = (await fetchBans).map((member) => `\`${member.user.tag}\``)
    .join("\n")

    const banlist = new MessageEmbed()
    .setTitle("Banned Members")
    .setDescription(bannedMembers)
    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
    .setColor('RED')

    message.channel.send(banlist)

   }
}