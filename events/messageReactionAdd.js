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