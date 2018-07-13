const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')

// For Rapid Testing 

 // Get all Insertions
router.route('/users').get(UserController.getUsers)

/* // Get one user by cuid
router.route('/user/:cuid')
  .get(UserController.getUser) */

// Get one user by userId
router.route('/users/:userId')
  .get(UserController.getUserById)  

// Add a new User
router.route('/user').post(UserController.addUser)

// Get Contacts by UserId
router.route('/user/:userId/contacts')
  .get(UserController.getContactsByUserId) 

  // Get FriendRequests by UserId 

  router.route('/users/:userId/friendRequests')
    .get(UserController.getFriendRequestsByUserId)

/*  // Delete a users by cuid
router.route('/users/:cuid')
  .delete(UserController.deleteUser) */
 
module.exports = router; 
