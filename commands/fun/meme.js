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
const got = require('got');

module.exports = {
    name: "meme",
    aliases: ["meemee", "maymay"],
    usage: "meme",
    cooldown: 1,
    description: "Laugh at deez funney mems",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {

        const user = message.mentions.users.first() || message.author
        const embed = new Discord.MessageEmbed();
        got('https://www.reddit.com/r/memes/random/.json')
            .then(response => {
                const [list] = JSON.parse(response.body);
                const [post] = list.data.children;

                const permalink = post.data.permalink;
                const memeUrl = `https://reddit.com${permalink}`;
                const memeImage = post.data.url;
                const memeTitle = post.data.title;
                const memeUpvotes = post.data.ups;
                const memeNumComments = post.data.num_comments;

                embed.setTitle(`${memeTitle}`);
                embed.setURL(`${memeUrl}`);
                embed.setColor('RANDOM');
                embed.setImage(memeImage);
                embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments} | requested by ${user.username}`, message.author.displayAvatarURL({ dynamic: true }));

                message.channel.send(embed);
            })
            .catch(console.error).message.channel.send(`Something went wrong.`)



    }

}