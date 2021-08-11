const mongo = require('mongoose');

const TicketDataSchema = new mongo.Schema({
    MessageID: String,
    GuildID: String,
    TicketNumber: Number,
    WhiteListedRole: String
});

const MessageModel = module.exports = mongo.model('TicketData', TicketDataSchema);