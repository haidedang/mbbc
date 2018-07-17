

exports.getStorageAddresses = function (req, res, next) {
    User.find({userID:''})
        .exec((err,user) => { 
            if(err) { 
                console.log('error')
            }
            let distinctArray; 
            user.contacts.forEach((contact) => { 
                distinctArray.push(contact.storageAddress); 
            })
            console.log(distinctArray); 
        })
};
