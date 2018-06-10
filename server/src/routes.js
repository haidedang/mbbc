const AuthenticationController = require('./controllers/AuthenticationController')
const MetaAuth = require('meta-auth'); 
const metaAuth = new MetaAuth();
const ChatController = require('./controllers/ChatController')
const UserController = require('./controllers/UserController')
const isAuthenticated = require('./isAuthenticated')


module.exports = (app) => {

  //---------AUTH & LOGIN -------------------
  
  app.get('/login/:MetaAddress', metaAuth,
    AuthenticationController.sign)
  app.get('/auth/:MetaMessage/:MetaSignature', metaAuth,
    AuthenticationController.authenticate)
  app.post('/register', AuthenticationController.register)
  app.get('/users/:user', AuthenticationController.profile)

  //-------- CONTACTLIST ---------------------

  app.get('/users/:currentUser/:newContact', UserController.addContact)

  //-------- CHATTING ------------------------ 
  // TODO: Add Authentification for the selected User with unique JWT Token 
  app.get('/users/:userID/:conversationID', ChatController.getConversations)
  app.post('/chat/:recipient', ChatController.sendMessage) 
  app.post('chat/new/:recipient', ChatController.newConversation)
}
