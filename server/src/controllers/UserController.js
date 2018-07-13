const User = require('../models/User');
const Contact = require('../models/Contact')

exports.addToContactList = (user, friend) =>  { 
    if (user.contacts.includes(friend)) { 
        console.log('user already in Contact List'); 
    }
}

exports.getUserById = (req, res) => { 
    User.findOne({userID:req.params.userId})
        .then((user, err) => { 
            if(err) { 
                res.send({err: err})
            } 
            res.send(user)
        })
}

exports.addContact = (req, res) => {

    // TODO: needs to be modified for different servers 

    User.findOne({ userID: req.params.currentUser })
        .then((user) => {
            if (user.contacts.includes(req.params.newContact)) {
                console.log('user already in contact List');
                res.status(400).json({user:user});
            } else if (req.params.newContact == undefined || req.params.newContact == undefined) {
                res.status(400).send('User undefined');
            } else {
                console.log('adding contact')
                console.log(req.body)
                let contact = new Contact({userID:req.body.userID, name:req.body.name, storageAddress:req.body.storageAddress})
                contact.save((err, contact) => { 
                    if(err){
                        console.log(err); 
                    }
                    console.log('Created Contact',contact)
                })
                user.contacts.push(req.params.newContact)
                user.save(((err, user) => {
                return res.json({ user: user });
                }));
            }
        })

    /*  // newContact doesnt really need to be fetched, I just need the UserID
    async function getNewContact(){ 
     const newContact = await User.findOne({userID: req.params.newContact})
     return newContact;
    } */

    /* (async () => {
        Promise.all([getCurrentUser(),getNewContact()]).then(values => { 
            let currentUser= values[0]; 
            let newContact = values[1]; 
            // save new Contact to Users 
           if (currentUser.contacts.includes(newContact.userID)){
               console.log('user already in contact List');
               res.send('ERROR: user already in contact List'); 
           }  else { 
             currentUser.contacts.push(newContact.userID)
             currentUser.save();
           } 
        })
    })() */

}

exports.addUser = (req, res) => {
    const newUser = new User(req.body)
    newUser.save((err, saved) => {
        if (err) {
            res.status(500)
                .send(err)
        }
        res.json({ User: saved })
    })
}

exports.getUsers = (req, res) => {
    User.find()
        .exec((err, Users) => {
            if (err) {
                res.status(500)
                    .send(err)
            }
            res.json({ Users: Users })
        })
}

exports.getContactsByUserId = (req, res) => { 
    Contact.find({userID: req.params.userId})
        .exec((err, Contacts) => { 
            if (err) { 
                res.status(500).send(err)
            }
            res.json({Contacts : Contacts}); 
        })
}