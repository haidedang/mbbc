const express = require('express');
const cors = require('cors');
const path = require('path');
const MetaAuth = require('meta-auth');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const metaAuth = new MetaAuth();
// const {sequelize} = require('./models')
const config = require('./config/config')

let server = require('http').createServer(app);
let io = require('socket.io')(server);


// MongoDB Connection
mongoose.connect(config.mongoURL, error => {
    if (error) {
        console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
        throw error;
    }
});

mongoose.set('debug', true);

const blog = require('./routes/blog.routes'); 
const conversation = require('./routes/conversation.routes');
const user = require('./routes/user.routes') 
const message = require('./routes/message.routes')

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', blog)
app.use('/api', conversation)
app.use ('/api', user)
app.use('/api', message)


require('./passport');
require('./routes/authentication.routes')(app)

require('./socket')(io)

server.listen(config.port, function () {
    console.log(`Server started on port ${config.port}`)
})

exports.io = io; 