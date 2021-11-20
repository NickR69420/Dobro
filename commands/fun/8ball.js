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
const Discord = require("discord.js");
const config = require("../../configuration/conf.json").bot;

module.exports = {
  name: "8ball",
  aliases: ["8b", "ball"],
  usage: "8ball <question>",
  cooldown: 2,
  description: "Ask the (really rude)8ball something!",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    try {
      let replies = [
        "Yes",
        "No",
        "Maybe",
        "Not sure",
        "Shut up you rat!",
        "sure, why not",
        "when you grow a braincell, yes",
        "THAT'S A SOLID ****NO****",
        "Nah that sucks tbh",
      ];
      let randomized = replies[Math.floor(Math.random() * replies.length)];
      let sentence = message.content.split(" ");

      sentence.shift();
      sentence = sentence.join(" ");

      if (!sentence) message.reply("WHAT DO YOU WANT TO ASK 8BALL?");

      let embed = new Discord.MessageEmbed()
        
        .addField("Your Question", `${sentence}`)
        .addField(`:8ball: 8ball`, `${randomized}`)
        .setColor("RANDOM")
        .setFooter(config.text, config.logo);

      message.channel.send(embed);
    } catch (e) {
      let { guild } = message;
      console.log(
        `Someone attempted to use the 8 ball command in ${guild.name} but failed to provide a question, the error has been handled`
      )
    }
  },
};
