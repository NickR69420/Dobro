const Discord = require('discord.js');

module.exports = {
  name: "nickname",
  aliases: ["nick", "setnick"],
  usage: "nick <@user> <nickname>",
  cooldown: 120,
  description: "Sets a user's nickname in a server!",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let nickname = args.slice(1).join(" ");
    if (!user) return message.channel.send(`:x: Invalid Args | Usage: \`${prefix}nick <@user> <nickname>\``);
    if (!nickname) return message.channel.send(`:x: Invalid Args | Usage: \`${prefix}nick <@user> <nickname>\``);
    let member = user;

    if (member.nickname === nickname) return message.channel.send(`**${member.displayName}**'s nickname is already **${nickname}**`)
    try {
      await member.setNickname(nickname);
      await message.channel.send(`Successfully set **${user.tag}**'s nickname as **${nickname}**`);
    } catch (err) {
      await message.channel.send(`\`\`\`An error occured trying to set ${user.tag}'s nickname.\nError: ${err.message}\`\`\``)
    }
  }
}
