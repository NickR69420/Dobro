const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unban",
  aliases: ["ub", "revoke", "revokeban"],
  usage: "unban <@user>",
  cooldown: 5,
  description: "Unbans a provided user.",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {

    if (!args[0]) return message.channel.send('Please enter a user\'s id to unban!').then(m => m.delete({ timeout: 5000 }));

    let member;

    try {
        member = await bot.users.fetch(args[0])
    } catch (e) {
        console.log(e)
        return message.channel.send('Not a valid user!').then(m => m.delete({ timeout: 5000 }));
    }

    const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

    const embed = new MessageEmbed()

    message.guild.fetchBans().then( bans => {

        const user = bans.find(ban => ban.user.id === member.id );

        if (user) {
            embed.setDescription(`<@${member.id}> has been **unbanned**`)
            .setColor("BLUE")
            .setAuthor(`MEMBER UNBANNED!`, message.guild.iconURL({ dynamic: true}))
            .setTimestamp()

            message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed))

            bot.modlogs({
                Member: user,
                Action: 'Unbanned',
                Color: "GREEN",
                Reason: reason
             }, message)
        } else {
            embed.setTitle(`User ${member.tag} isn't banned!`)
                .setColor('RED')
            message.channel.send(embed)
        }

    }).catch(e => {
        console.log(e)
        message.channel.send('An error has occurred!')
    });
  },
};
