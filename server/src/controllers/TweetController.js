const Tweet = require('../models/Tweet');
/**
 * Get Tweets.
 *
 * @param req
 * @param res
 */
exports.getTweets= (req, res) =>{
    Tweet.find()
      .exec((err, Tweets) => {
        if (err) {
          res.status(500)
            .send(err)
        }
        res.json({ Tweets: Tweets })
      })
  }
  
  /**
   * Finds Tweet by cuid.
   *
   * @param req
   * @param res
   */
  exports.getTweet= (req, res) =>{
    Tweet.findOne({ id: req.params.id })
      .exec((err, Tweet) => {
        if (err) {
          res.status(500)
            .send(err)
        }
        res.json({ Tweet: Tweet })
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
