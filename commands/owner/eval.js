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
const em = require("../../configuration/embed.json");
const privs = [config.token, "token", " token", "bot.token"];
const hastebin = require("hastebin");
const symbolRegex = /(_\.|\\|\?)/g;

const evalRegex = new RegExp(
  `(${privs.reduce(
    (a, p = "") =>
      `${a}${a ? "|" : ""}${p.replace(
        symbolRegex,
        (capture) => "\\" + capture
      )}`,
    ""
  )})`,
  "g"
);

module.exports = {
  name: "eval",
  aliases: ["ev", "run"],
  usage: "eval",
  description: "Dev only command",
  permsneeded: "SEND_MESSAGES",
  run: async (bot, message, args) => {
    // Cleaning for the eval command
    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }

    // The eval command itself,
    const args1 = message.content.split(" ").slice(1);
    const ownerId = "734331898339524630"; // Electrum
    const ownerId2 = "775265751954096138"; // Nickk

    if (message.author.id != ownerId && message.author.id != ownerId2) return;
    try {
      const code = args1.join(" ");

      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      let input = message.content.split(" ");
      input.shift();
      input = input.join(" ");

      let output = `${clean(evaled).replace(evalRegex, "Lmao no")}`;
      if (output.length > 100) {
        let url = await hastebin.createPaste(output, {
          raw: true,
          contentType: "text/javascript",
          server: "https://hastebin.com",
        });
        output = url;
      }
      const evaledembed = new Discord.MessageEmbed()
        .setAuthor(
          `Evaluation`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .addFields(
          {
            name: ":inbox_tray:  Input",
            value: `\`\`\`js\n${input}\`\`\``,
          },
          {
            name: ":outbox_tray:  Output",
            value: output === "" ? "No output" : "```js\n" + output + "\n```",
          }
        )
        .setFooter(`${config.text} | Success!`, config.logo)
        .setColor(em.success);

      message.channel.send(evaledembed);
    } catch (err) {
      let input = message.content.split(" ");
      input.shift();
      input = input.join(" ");
      const errorembed = new Discord.MessageEmbed()
        .setAuthor(
          `Evaluation`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .addFields(
          {
            name: ":inbox_tray: Input",
            value: `\`\`\`js\n${input}\`\`\``,
          },
          {
            name: ":x:  Error",
            value: `\`\`\`js\n${clean(err)}\n\`\`\``,
          }
        )
        .setFooter(`${config.text} | Error Found`, config.logo)
        .setColor(em.error);

      message.channel.send(errorembed);
    }
  },
};
// Format inspired by itsland0n :)