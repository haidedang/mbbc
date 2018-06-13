const User = require('../models/User');


exports.addContact = (req, res) => {

    // TODO: needs to be modified for different servers 

    User.findOne({ userID: req.params.currentUser })
        .then((user) => {
            if (user.contacts.includes(req.params.newContact)) {
                console.log('user already in contact List');
                res.send('ERROR: user already in contact List');
            } else {
                user.contacts.push(req.params.newContact)
                user.save();
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

exports.getUsers= (req, res) =>{
    User.find()
      .exec((err, Users) => {
        if (err) {
          res.status(500)
            .send(err)
        }
        res.json({ Users: Users })
      })
  }