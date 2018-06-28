const User = require('../models/User')
const Conversation = require ('../models/Conversation')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const uuidv4 = require('uuid/v4')
const server = require('../server');
const UserController = require('./UserController')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async profile(req, res) {
        try {
            // This will create an Error if Email already exists. 
            // Creating only possible if Ethereum ID exists. 
            const user = await User.findOne(
                {
                    userID: req.params.user
                }
            )
            const userJson = user.toJSON()
            res.send({
                user: userJson
            })
        } catch (err) {
            res.status(400).send({
                error: 'This email account is already in use.'
            })
        }
    },
    async register(req, res) {
        try {
            // This will create an Error if Email already exists. 
            // Creating only possible if Ethereum ID exists.
            const user = new User(req.body);
            user.save().then((data) => {
                const userJson = user.toJSON();
                res.json({
                    user: userJson,
                    token: jwtSignUser(userJson)
                })
            })
            // const user = await User.create(req.body)
            // const userJson = user.toJSON()
            // res.send({
            //     user: userJson,
            //     token: jwtSignUser(userJson)
            // })
        } catch (err) {
            res.status(400).send({
                error: 'This email account is already in use.'
            })
        }
    },
    async sign(req, res) {
        try {
            if (req.metaAuth && req.metaAuth.challenge) {
                console.log("success")
                res.send(req.metaAuth.challenge)
            }
        } catch (err) {
            res.status(400).send({
                error: 'MetaMask required!'
            })
        }
    },

    async authenticate(req, res) {
        try {
            // If valid Signature proceed login process
            if (req.metaAuth && req.metaAuth.recovered) {
                console.log("Valid Signature")
                console.log(req.metaAuth.recovered);

                const user = await User.findOne(
                    {
                        address: req.metaAuth.recovered
                    }
                )
                // if user not in Database throw error else return the User    
                if (!user) {
                    return res.status(403).send({
                        error: 'The login information was incorrect'
                    })
                }

                const userJson = user.toJSON()

                res.send({
                    user: userJson,
                    token: jwtSignUser(userJson)
                })

                // send jwt Token here 
            } else {
                console.log('fail')
                res.status(400);
            }

        } catch (err) {
            res.status(400).send({
                error: 'invalid address'
            })
        }
    },
    async authenticateGuest(req, res) {
        try {
            // If valid Signature proceed login process
            if (req.metaAuth && req.metaAuth.recovered) {
                console.log("Valid Signature")
                console.log(req.metaAuth.recovered);


                // Find User in BlockChain with ReverseAddress 
                // Given the EthereumAddress of the owner find the URL of the owner 
                // If URL exists send back a auth token, if not deny access 


                /*   const user = await User.findOne(
                       {
                          address: req.metaAuth.recovered
                      }
                  ) */
                // if user not in Database throw error else return the User    
                if (!user) {
                    return res.status(403).send({
                        error: 'The login information was incorrect'
                    })
                }

                const userJson = user.toJSON()

                res.send({
                    user: userJson,
                    token: jwtSignUser(userJson)
                })

                // send jwt Token here 
            } else {
                console.log('fail')
                res.status(400);
            }

        } catch (err) {
            res.status(400).send({
                error: 'invalid address'
            })
        }
    },
    async friendRequest(req, res) {
        try {
            console.log('friend')
            // If valid Signature proceed login process
            if (req.metaAuth && req.metaAuth.recovered) {
                console.log("Valid Signature")
                console.log(req.metaAuth.recovered);

                // Authenticated 
                let friendRequest = {
                    sender: req.params.userID,
                    accept: false,
                    conversationID: uuidv4()
                }

                /* res.send(friendRequest) */
                for (var key in server.io.sockets.sockets) {
                    console.log(key)
                    console.log(server.io.sockets.sockets[key].username)
                    if (server.io.sockets.sockets[key].username == undefined)
                        return
                    if (server.io.sockets.sockets[key].username.username == req.params.recipient) {
                        server.io.to(key).emit('friendRequest', friendRequest);
                    }
                }
            } else {
                console.log('fail')
                res.status(400);
            }

        } catch (err) {
            res.status(400).send({
                error: 'invalid address'
            })
        }
    },
    async receiveFriendRequest(req, res) {
        try {
            // If valid Signature proceed login process
            if (req.metaAuth && req.metaAuth.recovered) {
                console.log("Valid Signature")
                console.log(req.metaAuth.recovered);

                // Authenticated 
                console.log(req.body)
                if (req.body.accept == 'true'){ 

                 /*  let conversation =  await Conversation.findOne({_id:req.body.conversationID})
                  if(!conversation) { } */
                  // TODO: 
                    const conversation = new Conversation({
                        _id: req.body.conversationID,
                        participants: [req.params.currentUser, req.params.newContact]
                    });
                    conversation.save((err, newConversation) => {
                        if (err) {
                            res.send({ error: err });
                            /* return next(err); */
                        }

                        /* res.send(newConversation); */
                    })
                    // add User to Contact List 
                    UserController.addContact(req,res); 
                    // acceptance message to Client 
        
                    
                }
            } else { 
                console.log('fail')
                res.status(400);
            }
        } catch (err) {
            res.status(400).send({
                error: 'invalid address'
            })
        }
    }
}
