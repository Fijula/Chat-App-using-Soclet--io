// node server for socket io connections 

// use cors for connection join error
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

  
const users = {};

//  connect a node server and listen to all sockets

io.on("connection",socket =>{
    // new user joins - let others know through broadcast
    socket.on("new-user-joined",name =>{
        // console.log("new user",name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name)
    })


    // when message is send broadcast to others
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

    // fire disconnect event on leaving(delete is built in)
    socket.on('disconnect',message =>{
        socket.broadcast.emit('leave', users[socket.id])
        delete users[socket.id];
    });
})

