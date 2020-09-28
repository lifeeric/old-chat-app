const express = require('express');
const cors    = require('cors');
const socketio= require('socket.io');
const http    = require('http');
const {addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// APP
const app = express();

// CORS
app.use(cors());

// Server
const server = http.createServer(app);

// socket
const io = socketio(server);

// Socket Connection
io.on('connection', socket => {
    console.log('New connection');

    // Join
    socket.on('join', ({name,room}, callback) => {

        const {error, user } = addUser({id: socket.id, name, room});

        if(error) return callback(error);

        socket.join(user.room);
        // Send Greeting message
        socket.emit('message', {user: 'admin', text: `Wellcome to room ${user.name}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has join room ${user.room }`});

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', {user: user.name, text: message});
        callback();
    });

    // Disconnect
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if( user )
            io.to(user.room).emit('message', {user: 'Admin', text: `${user.name} has left the room!`});
    });
   
});

// Router
app.use('/', (req, res) => {
    return res.send('Working Socket');
});

// PORT
const PORT = process.env.PORT || 5000;
const appListen = app.listen(PORT, console.info(`Server is running on ${PORT}`));
io.listen(appListen);