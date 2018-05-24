const express = require('express'); 
const path = require('path'); 
const MetaAuth = require('meta-auth'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const metaAuth = new MetaAuth(); 
const {sequelize} = require('./models')
const config = require('./config/config')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

require('./routes')(app)

// app.get('/login', (req, res) => { 
//     console.log("received");
//     res.send({ 
//         message: 'SUCCESS'
//     })
// })

// app.get('/',(req, res)=> { 
//     res.sendFile(path.join(__dirname + '/index.html')); 
// })

// // Login Function 
// app.get('/login/:MetaAddress', metaAuth, (req, res) => {
//     // Request a message from the server
//     if (req.metaAuth && req.metaAuth.challenge) {
//         console.log("success")
//       res.send(req.metaAuth.challenge)
//     }
//   });

// // Meta Mask Authenticat    ion 
// app.get('/auth/:MetaMessage/:MetaSignature', metaAuth, (req,res)=> { 
//     console.log(req.metaAuth.recovered)
//     if(req.metaAuth && req.metaAuth.recovered){ 
//         console.log(req.metaAuth.recovered)
//         res.send(req.metaAuth.recovered); // send jwt Token 
//     } else { 
//         console.log('fail')
//         res.status(400);
//     }
// })

sequelize.sync({force: false})
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })