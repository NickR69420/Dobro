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
const channelModel = require("../models/channelModel");
const snipes = new Discord.Collection();

module.exports = (bot) => {

        bot.on('messageDelete', async (message) => {
            const data = await channelModel.findOne({
                GuildID: message.guild.id
            });

            try {
            if (message.author.bot) return;
            
            let channel = bot.channels.cache.get(data.ChannelID);
            snipes.set(channel, message)

            const MessageDeleted = new Discord.MessageEmbed()
                .setAuthor(
                    "Message Deleted",
                    message.author.displayAvatarURL({ dynamic: true })
                )
                .addFields(
                    {
                        name: "Author:",
                        value: `<@${message.author.id}>`,
                        inline: true,
                    },
                    {
                        name: "Channel",
                        value: `${message.channel}`,
                        inline: true
                    },
                    {
                        name: "Content",
                        value: `\`\`\`${message.content}\`\`\``
                    }
                )
                .setColor("#E4381D")
                .setTimestamp();

            await channel.send(MessageDeleted
                ).catch(err => console.log("Error | MessageDelete channel isn't setup!"))
            } catch (e) {
            console.log("Error")
         }
        })
}