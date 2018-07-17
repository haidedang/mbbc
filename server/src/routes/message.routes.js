const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController')

// Get Messages by ConversationID
router.route('/messages/:conversationId')
  .get(MessageController.getMessagesByConversationId)

router.route('/messages')
  .get(MessageController.getMessages)




module.exports = router; 