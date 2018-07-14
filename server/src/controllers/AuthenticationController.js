const User = require("../models/User");
const Conversation = require("../models/Conversation");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const uuidv4 = require("uuid/v4");
const server = require("../server");
const UserController = require("./UserController");
const Contact = require("../models/Contact");
const FriendRequest = require('../models/FriendRequest'); 

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}

module.exports = {
  async profile(req, res) {
    try {
      // This will create an Error if Email already exists.
      // Creating only possible if Ethereum ID exists.
      const user = await User.findOne({
        userID: req.params.user
      });
      const userJson = user.toJSON();
      res.send({
        user: userJson
      });
    } catch (err) {
      res.status(400).send({
        error: "This email account is already in use."
      });
    }
  },
  async register(req, res) {
    try {
      // This will create an Error if Email already exists.
      // Creating only possible if Ethereum ID exists.
      const user = new User(req.body);
      user.save().then(data => {
        const userJson = user.toJSON();
        res.json({
          user: userJson,
          token: jwtSignUser(userJson)
        });
      });
      // const user = await User.create(req.body)
      // const userJson = user.toJSON()
      // res.send({
      //     user: userJson,
      //     token: jwtSignUser(userJson)
      // })
    } catch (err) {
      res.status(400).send({
        error: "This email account is already in use."
      });
    }
  },
  async sign(req, res) {
    try {
      if (req.metaAuth && req.metaAuth.challenge) {
        console.log("success");
        res.send(req.metaAuth.challenge);
      }
    } catch (err) {
      res.status(400).send({
        error: "MetaMask required!"
      });
    }
  },

  async authenticate(req, res) {
    try {
      // If valid Signature proceed login process
      if (req.metaAuth && req.metaAuth.recovered) {
        console.log("Valid Signature");
        console.log(req.metaAuth.recovered);

        const user = await User.findOne({
          address: req.metaAuth.recovered
        });
        // if user not in Database throw error else return the User
        if (!user) {
          return res.status(403).send({
            error: "The login information was incorrect"
          });
        }

        const userJson = user.toJSON();

        res.send({
          user: userJson,
          token: jwtSignUser(userJson)
        });

        // send jwt Token here
      } else {
        console.log("fail");
        res.status(400);
      }
    } catch (err) {
      res.status(400).send({
        error: "invalid address"
      });
    }
  },
  async authenticateGuest(req, res) {
    try {
      // If valid Signature proceed login process
      if (req.metaAuth && req.metaAuth.recovered) {
        console.log("Valid Signature");
        console.log(req.metaAuth.recovered);

        /*   const user = await User.findOne(
                       {
                          address: req.metaAuth.recovered
                      }
                  ) */
        // if user not in Database throw error else return the User

        const GuestUser = await Contact.findOne({
          userID: req.params.userID
        });

        console.log(GuestUser);

        if (!GuestUser) {
          return res.status(403).send({
            error: "you are not in The Contact List of your friend."
          });
        }

        const GuestUserJson = req.body;

        res.send({
          user: GuestUserJson,
          token: jwtSignUser(GuestUserJson)
        });

        // send jwt Token here
      } else {
        console.log("fail");
        res.status(400);
      }
    } catch (err) {
      res.status(400).send({
        error: "invalid address"
      });
    }
  },
  async friendRequest(req, res) {
    try {
      console.log("friend");
      // If valid Signature proceed login process
      if (req.metaAuth && req.metaAuth.recovered) {
        console.log("Valid Signature");
        console.log(req.metaAuth.recovered);

        // Authenticated   //sender : Person who sended the friendRequest
        // create new FriendRequest and save to DB

        let friendRequest = {
          userID: req.params.recipient,
          sender: req.params.userID,
          storageAddress: req.body.storageAddress,
          accept: false,
          conversationID: uuidv4()
        };

        const fRequest = await FriendRequest.findOne({sender:friendRequest.sender});
        if (!fRequest) {
            
          const friend = new FriendRequest(friendRequest);
          friend.save().then(data => {
            console.log(data)
          });

          //console.log("available Sockets", server.io.sockets.sockets);
          /* res.send(friendRequest) */
          for (var key in server.io.sockets.sockets) {
            /*  console.log(key)
                    console.log(server.io.sockets.sockets[key].username) */
            if (server.io.sockets.sockets[key].username == undefined) return;
            if (
              server.io.sockets.sockets[key].username.username ==
              req.params.recipient
            ) {
             // console.log("Socket is at position: ", key);
             /*  console.log(
                "Found Socket with searched UserID",
                server.io.sockets.sockets[key].username
              ); */
              server.io.to(key).emit("friendRequest", friendRequest);
            }
          }
        } else { 
            res.json({message: 'You already sent a FriendRequest!'});
        }
      } else {
        console.log("fail");
        res.status(400);
      }
    } catch (err) {
      res.status(400).send({
        error: "invalid address"
      });
    }
  },
  async receiveFriendRequest(req, res) {
    try {
      // If valid Signature proceed login process
      if (req.metaAuth && req.metaAuth.recovered) {
        console.log("Valid Signature");
        console.log(req.metaAuth.recovered);

        // Authenticated
        console.log("Req body", req.body);
        if (req.body.accept == "true") {
            /* let friendRequest = await FriendRequest.find({conversationID: req.body.conversationID}); 
            friendRequest.accept = true; 
            friendRequest.save().then((friend) => { 
              console.log(friend);
            }) */
          /*  let conversation =  await Conversation.findOne({_id:req.body.conversationID})
                  if(!conversation) { } */
          // TODO:
          console.log('request parameter:' , req.params)
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
          });
          // add User to Contact List
          UserController.addContact(req, res);
          // acceptance message to Client
        }
      } else {
        console.log("fail");
        res.status(400);
      }
    } catch (err) {
      res.status(400).send({
        error: "invalid address"
      });
    }
  }
};
