const mongoose = require('mongoose'); 
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Contact = require('./Contact');
 
var Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: { type: 'String', required: true, unique: true },
    address: { type: 'String', required: true },
    storageAddress: {type: 'String'}, 
    contacts: [{type: Schema.Types.String, ref:Contact}]
});

let User = mongoose.model('User', userSchema);

module.exports = User; 

