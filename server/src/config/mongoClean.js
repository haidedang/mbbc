let MongoClient = require('mongodb').MongoClient;
let config = require('./config')
let url = config.mongoURL;
console.log(url);

// Clean Initial User Setup 
function init(){ 
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        try {
            let dbName = db.db(config.dbName)
            dbName.listCollections({ name: 'users' }).next(function (err, collinfo) {
                if (collinfo) {
                    console.log('exists')
                    dbName.dropCollection("users", function (err, delOK) {
                        if (err) throw err;
                        if (delOK) console.log("Collection deleted");
                        db.close()
                    });
                } else {
                    console.log('keep Rocking')
                    db.close()
                }
            })
        }
        catch (e) {
            console.log('Clean database')
            db.close()
        }
    });
}


setTimeout(() => {
    init(); 
}, config.delay)