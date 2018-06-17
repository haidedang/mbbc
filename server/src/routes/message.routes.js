const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController')

// Get Messages by ConversationID
router.route('/messages/:conversationId')
  .get(MessageController.getMessagesByConversationId)


module.exports = router; 