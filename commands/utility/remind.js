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
const ms = require('ms');
const Discord = require('discord.js');
const config = require("../../configuration/conf.json").bot;

module.exports = {
    name: "remind",
    aliases: ["timer", "remember"],
    usage: "remind <time> <reminder>",
    cooldown: 5,
    description: "Helps remind you something!",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {

        let prefix = config.prefix
        let time = args[0];
        let user = message.author
        let reminder = args.splice(1).join(' ')

        const notime = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`:x: | Invalid usage of the command, use it like this:\n\`${prefix}remind <duration in hours/minutes/seconds> <Reason>\``)

        const wrongtime = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`**Sorry I only do d, m, h, or s.**`)

        const reminderembed = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`**Please tell me what you want to be reminded of**`)

        if (!args[0]) return message.channel.send(notime)
        if (
            !args[0].endsWith("d") &&
            !args[0].endsWith("m") &&
            !args[0].endsWith("h") &&
            !args[0].endsWith("s")
        )

            return message.channel.send(wrongtime)
        if (!reminder) return message.channel.send(reminderembed)

        const remindertime = new Discord.MessageEmbed()
            .setColor('#33F304')
            .setDescription(`:white_check_mark: \**Your reminder will go off in ${time}**`)

        message.channel.send(remindertime)

        const reminderdm = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('**REMINDER**')
            .setDescription(`**It has been ${time}.\nHere is your reminder:** ${reminder}`)

        setTimeout(async function () {
            try {
                message.reply(`**It has been ${time}.\nHere is your reminder:** ${reminder}`)
                await user.send(reminderdm)
            } catch (err) {

            }

        }, ms(time));
    }
}