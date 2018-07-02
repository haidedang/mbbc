const Tweet = require('../models/Tweet');

const server = require('../server');

var counter = 0;



/**
 * Get last 10 tweets from user
 *
 * @param req
 * @param res
 */
exports.getTweets= (req, res) =>{
    Tweet.find()
      .sort('timestamps')
      .limit(10)
      .exec((err, Tweets) => {
        if (err) {
          res.status(500)
            .send(err)
        }
        res.json({ Tweets: Tweets })
      })
  }
  
 
  /**
   * Finds Tweet by userId.
   *
   * @param req
   * @param res
   */
  exports.getTweetByUser= (req, res) =>{
    Tweet.findOne({ userId: req.params.userId })
      .exec((err, Tweet) => {
        if (err) {
          res.status(500)
            .send(err)
        }
        res.json({ Tweet: Tweet })
      })
  }
  
  /**
   * Add Tweet.
   *
   * @param req
   * @param res
   */
  exports.addTweet= (req, res) =>{
    const newTweet = new Tweet(req.body)
    newTweet.save((err, saved) => {
      if (err) {
        res.status(500)
          .send(err)
      }
      res.json({ Tweet: saved })
    })
  }
  
  /**
   * Delete Tweet.
   *
   * @param req
   * @param res
   */
  exports.deleteTweet= (req, res) =>{
    Tweet.findOne({ id: req.params.id })
      .exec((err, Tweet) => {
        if (err) {
          res.status(500)
            .send(err)
        }
  
        Tweet.remove(() => {
          res.status(200)
            .end()
        })
      })
  }

//Saving tweet in MongoDB
exports.sendTweet = function (req, res, next) {
  const tweet = new Tweet({ 
      userID: req.body.userID,
      content: req.body.content
    })
    tweet.save((err, result) => { 
      if (err) {
          res.send({ error: err });
          return next(err);
      }
    return res.status(200).json({ tweet: result });
})

}

// --- New for tweet controller  \\
//Client sends a new tweet to its server

//We need username and ETHERID
//UserID can be stored in req.body.userID
//OR
//UserID can be stored in req.body.content: "You have a new tweet"
//Need also: TweetID
exports.sendNotification = function (req, res, next) {

  //Incrementing server counter
//  counter++;
  console.log(counter);

  //Sending Notification to Client
  for (var key in server.io.sockets.sockets) {
      console.log(key)
      console.log(server.io.sockets.sockets[key].username)
      if (server.io.sockets.sockets[key].username == undefined)
          return
      if (server.io.sockets.sockets[key].username.username == req.params.recipient){
          server.io.to(key).emit('reply', req.body.userId);
      }
          
  }

}

//Set the counter to 0 when the Client fetches the tweets
exports.resetCounter = function (req, res, next) {
  console.log(counter);
  counter = 0;
}