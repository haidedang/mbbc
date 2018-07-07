const passport = require('passport')

module.exports = function (req, res, next) {
  
  passport.authenticate('guest', function (err, contact) {
    if (err || !contact) {
      res.status(403).send({
        error: 'you do not have access to this resource'
      })
    } else {
      req.contact = contact
      next()
    }
  })(req, res, next)
}
