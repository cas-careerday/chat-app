// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: 'GET,PUT,POST,DELETE,OPTIONS'.split(','),
    credentials: true
  }
});
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

let users = [];
let messages = [];

io.on('connection', (socket) => {
  let addedUser = false;

  // when the client emits 'publish message', this listens and executes
  socket.on('publish message', (data) => {
    if (!addedUser) return;
    // we tell the client to execute 'new message'
    const message = {
      username: socket.username,
      text: data
    }
    messages.push(message);
    io.sockets.emit('new message', message);
  });

  // when the client emits 'join', this listens and executes
  socket.on('join', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    users.push(username);
    addedUser = true;
    socket.emit('joined successfully', {
      users: users,
      messages: messages
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      if (users.includes(socket.username)) {
        users.splice(users.indexOf(socket.username), 1);
      }

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
      });
    }
  });
});
