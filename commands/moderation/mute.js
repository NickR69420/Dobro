const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "mute",
  aliases: ["tempmute"],
  usage: "mute <@user> [duration]",
  description: "Mutes a provided user",
  permsneeded: "KICK_MEMBERS",
  run: async (bot, message, args) => {
    let avatar = message.author.displayAvatarURL({ dynamic: true });

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "You do not have permissions to use this command"
      );
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const time = args[1];
    const reason = args.slice(2).join(" ");
    if (!Member)
      return message.channel.send(
        "Must mention a member.\n`Ex: d!mute @dumbass [duration] <Reason>`"
      );
    if (!time)
      return message.channel.send(
        "Please specify a time.\n`d!mute @dumbass 1h Spam`"
      );
    const role = message.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === "muted"
    );
    if (!role) {
      try {
        message.channel.send(
          "Muted role is not found, attempting to create muted role....."
        );

        let muterole = await message.guild.roles.create({
          data: {
            name: "muted",
            permissions: [],
          },
        });
        message.guild.channels.cache
          .filter((c) => c.type === "text")
          .forEach(async (channel, id) => {
            await channel.createOverwrite(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
            });
          });
        message.channel.send("Muted role has sucessfully been created.");
      } catch (error) {
        console.log(error);
      }
    }

    const mutedDM = new MessageEmbed()
      .setDescription(
        `You were **muted** in ${message.guild.name} | **${reason}**`
      )
      .setColor("RED")
      .setAuthor(
        `${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .setTimestamp();

    let role2 = message.guild.roles.cache.find(
      (r) => r.name.toLowerCase() === "muted"
    );
    if (Member.roles.cache.has(role2.id))
      return message.channel.send(
        `${Member.displayName} has already been muted.`
      );

    Member.send(mutedDM).then(() => {
      Member.roles.add(role2).then((mem) => {
        const muted = new MessageEmbed()
          .setTitle("Member Muted!", message.guild.iconURL)
          .setDescription(
            `<@${mem.user.id}> has been **muted** | **${reason}**`
          )
          .setColor("RED")
          .setFooter(`ID: ${Member.id}`, avatar)
          .setTimestamp();

        if (!message.member.hasPermission("BAN_MEMBERS"))
          return message.channel.send("No Perms to do this!!!!");
        else {
          message.channel.send(muted);

          bot.modlogs({
              Member: Member,
              Action: "Muted",
              Color: "ORANGE",
              Reason: reason,
            },
            message);

          setTimeout(async () => {
            await Member.roles.remove(role2);

            const unmuted = new MessageEmbed()
              .setTitle(`${message.guild.name}`, message.guild.iconURL)
              .setDescription(
                `Your mute has expired in ***${message.guild.name}**!`
              )
              .setColor("#7CFC00")
              .setTimestamp();
            Member.send(unmuted);
          }, ms(time));
        }
      });
    });
  },
};
