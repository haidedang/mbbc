const express = require('express');
const router = express.Router();
const ConversationController = require('../controllers/ConversationController')

// taking userID for ease of testing , further on using passing User object from Authentication
router.route('/chat/new/:userID/:recipient')
    .post(ConversationController.newConversation) 

router.route('/chat/:userID/:recipient')
    .get(ConversationController.getConversationsByUserIDs)

module.exports = router; 

