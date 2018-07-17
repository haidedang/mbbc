const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const uuidv4 = require('uuid/v4');

// Schema defines how chat messages will be stored in MongoDB
const ConversationSchema = new Schema({
    _id: {type: String, default: uuidv4()},
    participants: [{ type: Schema.Types.String, ref: 'User' }]
});

module.exports = mongoose.model('Conversation', ConversationSchema);
