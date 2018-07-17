const mongoose = require('mongoose'); 
const AutoIncrement = require('mongoose-sequence')(mongoose);
 
var Schema = mongoose.Schema;

const notificationSchema = new Schema({
    userID: { type: 'String'},
    counter: { type: Number} 
});

let Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification; 