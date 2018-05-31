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

var server = require('http').createServer(app);  
var io = require('socket.io')(server);
const clientIo = require('socket.io-client')

// MongoDB Connection
mongoose.connect(config.mongoURL, error => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

mongoose.set('debug', true);

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

require('./passport'); 

require('./routes')(app)


io.on('connection', function(socket){
  socket.emit('')
  socket.on('anothermessage', function(data){
    // db.createNewMessage 
    console.log(data);
  })

  socket.on('message', function(data){ 
    // store Data in the DB 
    ClientSocket.emit('anotherMessage');
  })
})

server.listen(config.port, function(){
  console.log(`Server started on port ${config.port}`)
})

// sequelize.sync({force: false})
//   .then(() => {
//     server.listen(8082)
//     console.log(`Server started on port ${config.port}`)
//   })