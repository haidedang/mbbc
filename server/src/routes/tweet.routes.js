const express = require('express');
const router = express.Router();
const TweetController = require('../controllers/TweetController')

//JUST FOR TESTING
router.route('/tweets/')
  .post(TweetController.sendTweet)

// Getting last 10 tweets from user
router.route('/tweets')
  .get(TweetController.getTweets)

//Sending tweet notification to recipient server
router.route('/tweets/:recipient')
    .post(TweetController.sendNotification)

//---------------
//Deprecated
// Get one tweet by userId
router.route('/tweets/:userId')
  .get(TweetController.getTweetByUser)

// Add a new Tweet
router.route('/tweet')
  .post(TweetController.addTweet)

// Delete a tweets by cuid
router.route('/tweets/:id')
  .delete(TweetController.deleteTweet)


module.exports = router; 

