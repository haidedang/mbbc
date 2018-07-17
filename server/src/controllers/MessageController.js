const Message = require('../models/Message');


/** Get Message by Conversation ID 
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getMessagesByConversationId= (req, res) =>{
    Message.find({ conversationId: req.params.conversationId })
      .exec((err, Message) => {
        if (err) {
          res.status(500)
            .send(err)
        }
        res.json({ message: Message })
      })
  }

  exports.getMessages= (req, res) =>{
    Message.find()
      .exec((err, Messages) => {
        if (err) {
          res.status(500)
            .send('this is an error')
        }
        res.json({ Messages: Messages })
      })
  }