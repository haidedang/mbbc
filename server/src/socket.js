
module.exports = (io) => { 
    io.on('connection', function (socket) {
        socket.emit('online')
        socket.on('anotherMessage', function (data) {
            // db.createNewMessage 
            console.log(data);
        })
    
        socket.on('username', function (username) {
            console.log(username.username)
            socket.username = username;
        })
    
        socket.on('message', function (data) {
            // store Data in the DB 
            console.log(data)
    
        })
    }) 
}