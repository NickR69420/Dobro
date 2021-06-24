const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "help",
  usage: "{prefix}help",
  description: "Help command",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {

    const embed = new Discord.MessageEmbed()
      .setTitle('Dobro')
      .addField('General', 'Basic commands for the bot', false)
      .addField('`help`', 'Displays this list of commands', false)
      .addField('`ping`', 'Check the ping of the bot', false)
      .addField('`uptime`', `Displays the bot's uptime`, false)
      .addField('`avatar`', `Get a user's avatar!`)
      .setColor('BLUE')
      .setFooter('Prefix is d! | General')
      .setThumbnail('https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/130138713/original/40ac9a0a3816d9fec50cd3a08a2078c95e8abeea/create-a-discord-bot-for-your-discord-server.png')

      const embed2 = new Discord.MessageEmbed()
      .setTitle('')
      .addField('**Fun**', 'Have some fun!', false)
      .addField('`kill`', 'Sick of someone? Easy! Just kill them! ', false)
      .addField('`pp`', `How big is your pp?`, false)
      .addField('`howgay`', 'See how gay you are (100% real)', false)
      .addField('`hack`', 'Totally dangerous and real hack', false)
      .addField('`8ball`', 'Ask the (kinda rude)8ball about your future or facts!', false)
      .addField('`say`', 'Make the bot say something for you! (Admins ONLY)', false)
      .setColor('BLUE')
      .setFooter('Prefix is d! | Fun')
    await message.channel.send(embed);
    await message.channel.send(embed2);

  }
}  