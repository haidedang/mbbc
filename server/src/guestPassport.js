const passport = require('passport')
const User = require('./models/User')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config/config')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    
    try {
      console.log(jwtPayload); 
      const contact = await Contact.findOne(
       {
          userID: jwtPayload.name
        }
      )
      if (!contact) {
        return done(new Error(), false)
      }
      
      return done(null, contact)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

module.exports = null
