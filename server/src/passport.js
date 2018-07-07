const passport = require('passport')
const User = require('./models/User')
const Contact = require('./models/Contact')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const GuestJwtStrategy = require('passport-jwt').Strategy

const config = require('./config/config')

passport.use( 'user',
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    
    try {
      console.log(jwtPayload); 
      const user = await User.findOne(
       {
          userID: jwtPayload.userID
        }
      )
      if (!user) {
        return done(new Error(), false)
      }
      
      return done(null, user)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

passport.use( 'guest',
  new GuestJwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    
    try {
      console.log('jwt arrived', jwtPayload); 
      const contact = await Contact.findOne(
       {
          userID: jwtPayload.name,
          name : jwtPayload.userID
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
