const mongoose = require('mongoose'); 
 
var Schema = mongoose.Schema;

const tweetSchema = new Schema({
    tweetID: {type: 'String' },
    userID: { type: 'String' },
    content: { type: 'String' }
}, {timestamps: true});

let Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet; 

