const mongoose = require('mongoose'); 
 
var Schema = mongoose.Schema;

const blogSchema = new Schema({
    userID: { type: 'String' },
    content: { type: 'String' }
}, {timestamps: true});

let Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog; 

