const mongoose = require('mongoose'); 
const AutoIncrement = require('mongoose-sequence')(mongoose);
 
var Schema = mongoose.Schema;

const userSchema = new Schema({
    cuid: { type: 'String', required: true },
    userID: { type: 'String', required: true, unique: true },
    address: { type: 'String', required: true },
    storageAddress: {type: 'String'}, 
    contacts: [{type: 'String'}]
});

let User = mongoose.model('User', userSchema);

module.exports = User; 

