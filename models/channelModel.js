const mongo = require('mongoose');

const channelSchema = new mongo.Schema({
    GuildID: String,
    ChannelID: String,
});

const MessageModel = module.exports = mongo.model("channelModel", channelSchema);
