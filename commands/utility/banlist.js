const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "banlist",
  aliases: ["fetchbans", "bans"],
  usage: "banlist",
  cooldown: 10,
  description: "Displays list of banned members.",
  permsneeded: "BAN_MEMBERS",
  run: async (bot, message, args) => {

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