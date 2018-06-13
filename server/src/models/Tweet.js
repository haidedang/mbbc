const mongoose = require('mongoose'); 
 
var Schema = mongoose.Schema;

const tweetSchema = new Schema({
    cuid: { type: 'String', required: true },
    userID: { type: 'String' },
    content: { type: 'String' }
}, {timestamps: true});

let Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet; 

