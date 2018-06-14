const express = require('express');
const router = express.Router();
const ConversationController = require('../controllers/ConversationController')

// taking userID for ease of testing , further on using passing User object from Authentication
router.route('/conversation/new/:userID/:recipient')
    .post(ConversationController.newConversation) 

router.route('/conversation/:userID/:recipient')
    .get(ConversationController.getConversationsByUserIDs)

router.route('/conversation/:recipient')
    .post(ConversationController.sendMessage)

module.exports = router; 

