const mongoose = require('mongoose'); 
const AutoIncrement = require('mongoose-sequence')(mongoose);
 
var Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
    userID:{type:'String'}, 
    sender: {type:'String'},
    storageAddress: {type:'String'},
    accept:{type: Boolean} ,
    conversationID: {type:String}
});

let FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

module.exports = FriendRequest; 