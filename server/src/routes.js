const AuthenticationController = require('./controllers/AuthenticationController')
const MetaAuth = require('meta-auth'); 
const metaAuth = new MetaAuth();
// const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  
  app.get('/login/:MetaAddress', metaAuth,
    AuthenticationController.sign)
  app.get('/auth/:MetaMessage/:MetaSignature', metaAuth,
    AuthenticationController.authenticate)
  app.post('/register', AuthenticationController.register)
  app.get('/users/:user', AuthenticationController.profile)

}
