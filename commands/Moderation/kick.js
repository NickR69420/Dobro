// This file is part of Dobro
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
const {
    MessageEmbed
} = require('discord.js');
const em = require("../../configuration/embed.json");
const config = require("../../configuration/conf.json").bot;

module.exports = {
    name: "kick",
    aliases: ["k", "getlost"],
    usage: "kick <@user>",
    description: "Kicks a provided user.",
    permsneeded: "KICK_MEMBERS",
    run: async (bot, message, args) => {
        message.delete();

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const Reason = args.slice(1).join(" ") || "No Reason Provided"; // Kick 
        const success = bot.emojis.cache.find(emoji => emoji.name === "success");

        // Error Embed
        const ErrorEmbed = new MessageEmbed()
            .setTitle(":x: Error Occured!")
            .setDescription("Failed to kick the user.")
            .setColor("RED")

        // Kicked Embed(DM)        
        const kickembed = new MessageEmbed()
            .setDescription(`You were **kicked** from ${message.guild.name} | **${Reason}**`)
            .setColor("RED")
            .setAuthor(`${message.guild.name}`, message.guild.iconURL({
                dynamic: true
            }))
            .setTimestamp()

        // No user provided
          const invalidargs = new MessageEmbed()
            .setDescription(`**Usage:** **${config.prefix}kick @user <reason>**`)
            .setColor(em.error)

        if (!user) return message.reply(invalidargs).then(m => m.delete({
            timeout: 3000
        }))

        if (!message.guild.member(user).kickable) return message.reply(ErrorEmbed);



        user.send(kickembed).catch(e => console.log("Cannot send message to this user."))
            .then(() => {
                user.ban({
                    reason: `${Reason}`
                }).then(mem => {
                    // Kicked Embed (Global)
                    const kickedembed = new MessageEmbed()
                        .setDescription(`${success}  <@!${mem.user.id}> has been **kicked** | **${Reason}**`)
                        .setColor(em.success)

                        .setTimestamp()

                    message.channel.send(kickedembed);

                    bot.modlogs({
                        Member: user,
                        Action: 'Kicked',
                        Color: "RED",
                        Reason: Reason
                    }, message)
                });
            });
    },
};