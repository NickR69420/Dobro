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
const Discord = require('discord.js');
const config = require("../../configuration/conf.json").bot;

module.exports = {
  name: "uptime",
  aliases: ["online", "onlinetime"],
  usage: "uptime",
  cooldown: 2,
  description: "Checks the bot's uptime",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    var uptime = process.uptime();
    const date = new Date(uptime * 1000)
    const days = date.getUTCDate() - 1,
      hours = date.getUTCHours(),
      minutes = date.getUTCMinutes(),
      seconds = date.getUTCSeconds(),
      milliseconds = date.getUTCMilliseconds();

    let segments = [];

    if (days > 0) segments.push(days + ' day' + ((days == 1) ? '' : 's'));
    if (hours > 0) segments.push(hours + ' hour' + ((hours == 1) ? '' : 's'));
    if (minutes > 0) segments.push(minutes + ' minute' + ((minutes == 1) ? '' : 's'));
    if (seconds > 0) segments.push(seconds + ' second' + ((seconds == 1) ? '' : 's'));
    if (milliseconds > 0) segments.push(milliseconds + ' millisecond' + ((seconds == 1) ? '' : 's'));
    const dataString = segments.join(', ');

    const embed = new Discord.MessageEmbed()

      .setTitle("Dobro's Uptime!")
      .setDescription(`The bot has been up for \`${dataString}\``)
      .setColor("BLUE")
      .setFooter(config.text, config.logo)

    message.channel.send(embed)



    //debug
    //console.log("Uptime raw:", uptime)
    // message.channel.send('debug raw: ' + uptime);
    // message.channel.send('debug math: ' + dataString)
    //console.log(dataString);
  }
}