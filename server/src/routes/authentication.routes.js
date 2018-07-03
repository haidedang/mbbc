const AuthenticationController = require('../controllers/AuthenticationController')
const MetaAuth = require('meta-auth');
const metaAuth = new MetaAuth();
const ConversationController = require('../controllers/ConversationController')
const UserController = require('../controllers/UserController')
const isAuthenticated = require('../isAuthenticated')


module.exports = (app) => {

    //---------AUTH & LOGIN -------------------

    app.get('/login/:MetaAddress', metaAuth,
        AuthenticationController.sign)
    app.get('/auth/:MetaMessage/:MetaSignature', metaAuth,
        AuthenticationController.authenticate)
    app.get('/guest/login/:MetaAddress', metaAuth, AuthenticationController.sign)
    app.get('guest/auth/:MetaMessage/:MetaSignature', metaAuth,
        AuthenticationController.authenticateGuest)
    app.post('/register', AuthenticationController.register)
    app.get('/users/:user', AuthenticationController.profile)

    //-------- CONTACTLIST ---------------------

    app.post('/users/:currentUser/:newContact', UserController.addContact)

    // ------ FRIEND REQUEST --------- 

    app.get('/friendRequest/:MetaAddress', metaAuth,
        AuthenticationController.sign)
    // User gets a FriendRequest which he has to answer 
    app.post('/friendRequest/auth/:userID/:recipient/:MetaMessage/:MetaSignature', metaAuth,
        AuthenticationController.friendRequest)
    // User gets the answer back with FriendRequest holding the ConversationID
    app.post('/receiveFriendRequest/auth/:currentUser/:newContact/:MetaMessage/:MetaSignature', metaAuth,
        AuthenticationController.receiveFriendRequest)
    
    //-------- CHATTING ------------------------ 
    // TODO: Add Authentification for the selected User with unique JWT Token 
    app.get('/users/:userID/:conversationID', ConversationController.getConversations)

    app.post('/conversation/:recipient', ConversationController.sendMessage)
/*     app.post('conversation/new/:recipient', ConversationController.newConversation)
 */
}
