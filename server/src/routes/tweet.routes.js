const express = require('express');
const router = express.Router();
const TweetController = require('../controllers/TweetController')


// Get all Insertions
router.route('/tweets')
  .get(TweetController.getTweets)

// Get one tweet by cuid
router.route('/tweet/:id')
  .get(TweetController.getTweet)

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

