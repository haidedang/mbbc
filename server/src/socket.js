const Message = require('./models/Message')
const Blog = require('./models/Blog')

module.exports = (io) => { 
    io.on('connection', function (socket) {
        socket.emit('online')
        socket.on('anotherMessage', function (data) {
            // db.createNewMessage 
            console.log(data);
        })
    
        socket.on('username', function (username) {
            console.log('UserSocket connected with Server:', username.username)
            socket.username = username;
        })
    
        socket.on('message', function (data) {
            // store Data in the DB 
            
            console.log(data)
            const message = new Message({ 
                conversationId: data.conversationId,
                body: data.body, 
                author: data.author
            })
            message.save((err, result) => { 
                if (err) {
                    console.log({ error: err });
                    return 
                }
                console.log(result)
            })
        })

        socket.on('blog', function (data) {
            
            // store Blog in the DB
            console.log(data)
            const blog = new Blog({
                userID: data.user, 
                content: data.content
            })
            blog.save((err, result) => { 
                if (err) {
                    console.log({ error: err });
                    return 
                }
                console.log(result)
            })
        })
    }) 
}