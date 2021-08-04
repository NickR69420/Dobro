const Discord = require('discord.js');

module.exports = {
  name: "kill",
  aliases: ["ded", "stab"],
  usage: "kill <@user>",
  cooldown: 10,
  description: "Hate someone? Kill them ez",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {

    let user = message.mentions.users.first();

    if (!user) {
      return message.channel.send(`${message.author} killed himself.`);
    }

    let killmessages = [`${user} fell to their death`, `${user} trips over his own shoe laces and dies.`, `${user} choked to death on a fly when walking his lizard at the pool`, `${user} got impaled by a pencil`, `${user} trips over his own shoe laces and dies`, `${user} dies from dabbing too hard`, `${user} was hit by a car.`];


    message.channel.send(killmessages[Math.floor(Math.random() * killmessages.length)]);

  }
}