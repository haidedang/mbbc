const Conversation = require('../models/Conversation'),
    Message = require('../models/Message'),
    User = require('../models/User');

const server = require('../server');

/**
 * 
 *  ------- NEEDS TO BE TESTED AND EVENTUALLY MODIFIED ------
 * 
 */

exports.getConversations = function (req, res, next) {
    // Only return one message from each conversation to display as snippet
    Conversation.find({ participants: req.user._id })
        .select('_id')
        .exec((err, conversations) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }

            // Set up empty array to hold conversations + most recent message
            const fullConversations = [];
            conversations.forEach((conversation) => {
                Message.find({ conversationId: conversation._id })
                    .sort('-createdAt')
                    .limit(1)
                    .populate({
                        path: 'author',
                        select: 'profile.firstName profile.lastName'
                    })
                    .exec((err, message) => {
                        if (err) {
                            res.send({ error: err });
                            return next(err);
                        }
                        fullConversations.push(message);
                        if (fullConversations.length === conversations.length) {
                            return res.status(200).json({ conversations: fullConversations });
                        }
                    });
            });
        });
};

/**
 * 
 * WORKS 
 */

exports.getConversationsByUserIDs = (req, res) => {
    Conversation.find({ participants: [req.params.userID, req.params.recipient] })
        .exec((err, conversation) => {
            return res.status(200).json({ conversation: conversation })
        })
}

/**
 *  
 * ------- NEEDS TO BE TESTED AND EVENTUALLY MODIFIED ------
 * 
 */
exports.getConversation = function (req, res, next) {
    Message.find({ conversationId: req.params.conversationId })
        .select('createdAt body author')
        .sort('-createdAt')
        .populate({
            path: 'author',
            select: 'profile.firstName profile.lastName'
        })
        .exec((err, messages) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }
            return res.status(200).json({ conversation: messages });
        });
};


/**
 *    TESTED and WORKS 
 * 
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.newConversation = function (req, res, next) {
    const conversation = new Conversation({
        participants: [req.params.userID, req.params.recipient]
    });

    conversation.save((err, newConversation) => {
        if (err) {
            res.send({ error: err });
            return next(err);
        }

        const message = new Message({
            conversationId: newConversation._id,
            body: req.body.content,
            author: req.params.userID
        });

        console.log(message)

        message.save((err, newMessage) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }
            return res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
        });
    });
};

/** TESTED and WORKS 
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.sendReply = function (req, res, next) {
    const reply = new Message({
        conversationId: req.params.conversationId,
        body: req.body.composedMessage,
        author: req.user._id
    });

    reply.save((err, sentReply) => {
        if (err) {
            res.send({ error: err });
            return next(err);
        }

        return res.status(200).json({ message: 'Reply successfully sent!' });
    });
};

/** Tested and Works! 
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.sendMessage = function (req, res, next) {
    console.log(req.body)
    console.log(server.io.sockets.sockets)
    for (var key in server.io.sockets.sockets) {
        console.log(key)
        console.log(server.io.sockets.sockets[key].username)
        if (server.io.sockets.sockets[key].username == undefined)
            return
        if (server.io.sockets.sockets[key].username.username == req.params.recipient)
            server.io.to(key).emit('reply', req.body.message);
    }
    res.send('successful');
}


