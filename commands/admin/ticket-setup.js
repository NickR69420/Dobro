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
const { MessageEmbed, MessageCollector } = require('discord.js');
const TicketData = require("../../models/TicketData");

module.exports = {
    name: "ticket-setup",
    aliases: ["ts"],
    usage: "ticket-setup",
    cooldown: 5,
    description: "Set up the ticket sytem!",
    permsneeded: "ADMINISTRATOR",
    run: async (bot, message, args) => {
  
        let ticketData = await TicketData.findOne({ GuildID: message.guild.id });
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send('You are missing permissions! You must have the **MANAGE_SERVER** permission.');
        }
        
        if (!ticketData) {
            const firstEmbed = new MessageEmbed()
                .setTitle('Ticket System Setup')
                .setDescription('What do you want the embed description to be?')
                .setColor('BLUE');
            let firstMsg = await message.channel.send(firstEmbed);
    
            const firstFilter = m => m.author.id === message.author.id;
            const firstCollector = new MessageCollector(message.channel, firstFilter, { max: 2 });
    
            let embedDescription;
    
            firstCollector.on('collect', async msg => {
                embedDescription = msg.content;
                const secondEmbed = new MessageEmbed()
                    .setTitle('Ticket System Setup')
                    .setDescription('Where do you want to send the message? Please mention a channel.')
                    .setColor('BLUE');
                msg.channel.send(secondEmbed);
                firstCollector.stop();
    
                const secondFilter = m => m.author.id === message.author.id;
                const secondCollector = new MessageCollector(message.channel, secondFilter, { max: 2 });
    
                secondCollector.on('collect', async msg => {
                    let embedChannel = msg.mentions.channels.first();
                    if (!embedChannel) {
                        msg.channel.send('That is not a valid channel! Please try again.');
                        secondCollector.stop();
                        return;
                    }
    
                    const thirdEmbed = new MessageEmbed()
                        .setTitle('Ticket System Setup')
                        .setDescription('What roles do you want to have access to see tickets? Please provide a role name, mention, or ID.')
                        .setColor('BLUE');
                    msg.channel.send(thirdEmbed);
                    secondCollector.stop();
    
                    const thirdFilter = m => m.author.id === message.author.id;
                    const thirdCollector = new MessageCollector(message.channel, thirdFilter, { max: 2 });
    
                    thirdCollector.on('collect', async message => {
                        let savedRole = message.mentions.roles() || message.guild.roles.cache.get(message.content) || message.guild.roles.cache.find(role => role.name.toLowerCase() === message.content.toLowerCase());
    
                        if (!savedRole) {
                            msg.channel.send('That is not a valid role! Please try again.');
                            thirdCollector.stop();
                            return;
                        }
    
                        const fourthEmbed = new MessageEmbed()
                            .setTitle('Ticket System Setup')
                            .setDescription('The setup is now finished!')
                            .setColor('BLUE');
                        await msg.channel.send(fourthEmbed);
                        thirdCollector.stop();
    
                        await createTicketSystem(ticketData, embedDescription, embedChannel, message, savedRole)
                    });
                });
            });
        } else {
            await TicketData.findOneAndRemove({
                GuildID: message.guild.id
            });
            message.channel.send(`**Successfuly Reset the Ticket System on your Server!**\npls use this command again to re-setup!`);
        }
    }
}

    async function createTicketSystem(ticketData, embedDescription, embedChannel, message, savedRole) {
        const sendEmbed = new MessageEmbed()
            .setTitle('Ticket')
            .setDescription(embedDescription)
            .setColor('BLUE');
    
        let msg = await embedChannel.send(sendEmbed);
        await msg.react('🎟️');
    
        const newData = new TicketData({
            GuildID: message.guild.id,
            MessageID: msg.id,
            TicketNumber: 0,
            WhitelistedRole: savedRole.id
        });
        newData.save();
    }    