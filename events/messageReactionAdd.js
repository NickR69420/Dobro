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
// const TicketData = require('../models/TicketData');
	// const prefix = require("../configuration/conf.json").bot.prefix;
	// const cooldown = new Set();
	// const { MessageEmbed, MessageCollector } = require('discord.js');

	// module.exports = async (bot) => {
	// 		bot.on('messageReactionAdd', async(reaction, user) => {

	// 	if (user.bot) return;

	// 	if (reaction.message.partial) await reaction.message.fetch();
	// 	if (reaction.partial) await reaction.fetch();

	// 	if (!reaction.message.guild) return;

	// 	const data = await TicketData.findOne({
	// 		GuildID: reaction.message.guild.id
	// 	});
	// 	if (!data) return;
	// 	if (reaction.message.partial) await reaction.message.fetch();

	// 	if (reaction.emoji.name === '🎟️' && reaction.message.id === data.MessageID) {
	// 		if (cooldown.has(user.id)) {
	// 			reaction.users.remove(user.id);
	// 			return;
	// 		}
	// 		data.TicketNumber += 1;
	// 		await data.save();
	// 		const channel = await reaction.message.guild.channels.create(`ticket-${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`, {
	// 			type: 'text',
	// 			permissionOverwrites: [{
	// 				id: reaction.message.guild.id,
	// 				deny: ['VIEW_CHANNEL'],
	// 			},],
	// 		});
	// 		await channel.createOverwrite(user, {
	// 			VIEW_CHANNEL: true,
	// 			SEND_MESSAGES: true,
	// 			SEND_TTS_MESSAGES: false
	// 		});
	// 		await channel.createOverwrite(data.WhitelistedRole, {
	// 			VIEW_CHANNEL: true,
	// 			SEND_MESSAGES: true,
	// 			SEND_TTS_MESSAGES: false
	// 		});
	// 		reaction.users.remove(user.id);
	// 		const successEmbed = new MessageEmbed()
	// 			.setTitle(`Ticket #${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`)
	// 			.setDescription(`This ticket was created by ${user.toString()}. Please say \`${prefix}close\` when you're finished.`)
	// 			.setColor('BLUE');
	// 		let successMsg = await channel.send(`${user.toString()}`, successEmbed);
	// 		await cooldown.add(user.id);
	// 		await checkIfClose(bot, reaction, user, successMsg, channel);
	// 		setTimeout(function () {
	// 			cooldown.delete(user.id);
	// 		}, 300000);
	// 	}
	// }

	// async function checkIfClose(bot, reaction, user, successMsg, channel) {
	// 	const filter = m => m.content.toLowerCase() === `${prefix}close`
	// 	const collector = new MessageCollector(channel, filter);

	// 	collector.on('collect', async msg => {
	// 		msg.channel.send(`This channel will be deleted in **10** seconds.`);
	// 		await collector.stop();
	// 		setTimeout(function () {
	// 			channel.delete();
	// 					}, 10000);
		
	// 		})
	// 	})
	// }