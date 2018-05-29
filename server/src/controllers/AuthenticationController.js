const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async profile(req ,res) { 
        try {
            // This will create an Error if Email already exists. 
            // Creating only possible if Ethereum ID exists. 
            const user = await User.findOne({
                where: {
                    userID: req.params.user
                }
            })
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
            const user = await User.create(req.body)
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
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

                const user = await User.findOne({
                    where: {
                        address: req.metaAuth.recovered
                    }
                })
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
    }
}
