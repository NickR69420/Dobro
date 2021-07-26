const { MessageEmbed} = require('discord.js')
const ms = require('ms')

module.exports = {
    name: "mute",
    aliases: ["tempmute"],
    usage: "mute <@user> [duration]",
    description: "mutes a provided user",
    permsneeded: "KICK_MEMBERS",
    run: async(bot, message, args) => {

      let user = message.mentions.users.first() || message.author
        let avatar = user.displayAvatarURL({dynamic: true})


      if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permissions to use this command')
      const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      const time = args[1]
      if(!Member) return message.channel.send('Must mention a member.\n`Ex: d!mute @dumbass [duration]`')
      if(!time) return message.channel.send('Please specify a time.\n`d!mute @dumbass 1h`')
      const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
      if(!role) {
          try {
              message.channel.send('Muted role is not found, attempting to create muted role.....')

              let muterole = await message.guild.roles.create({
                  data : {
                      name : 'muted',
                      permissions: []
                  }
              });
              message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                  await channel.createOverwrite(muterole, {
                      SEND_MESSAGES: false,
                      ADD_REACTIONS: false
                  })
              });
              message.channel.send('Muted role has sucessfully been created.')
          } catch (error) {
              console.log(error)
          }
      };
      let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
      if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} has already been muted.`)
      await Member.roles.add(role2)

      const muted = new MessageEmbed()
      .setTitle("Member Muted!", message.guild.iconURL)
      .setDescription(`<@${Member.id}> was muted by ${message.author}`)
      .setColor('RED')
      .setFooter(`ID: ${Member.id}`, avatar)
      .setTimestamp()
      message.channel.send(muted)

      setTimeout(async () => {
          await Member.roles.remove(role2)

          const unmuted = new MessageEmbed()
      .setTitle("Member Unmuted!", message.guild.iconURL)
      .setDescription(`${Member.id} is now unmuted!.`)
      .setColor('RED')
      .setFooter(`ID: ${Member.id}`, avatar)
      .setTimestamp()
          message.channel.send(unmuted)
      }, ms(time))
  }
}