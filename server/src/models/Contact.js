const mongoose = require('mongoose'); 
const AutoIncrement = require('mongoose-sequence')(mongoose);
 
var Schema = mongoose.Schema;

const contactSchema = new Schema({
    userID: { type: 'String', required: true},
    name: { type:'String'},  
    storageAddress: {type: 'String'}, 
});

let Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact; 