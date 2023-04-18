const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const users = {};

const PORT = 4000 || process.env.PORT;

io.on("connection", (socket) => {
  socket.on('new-user-joined', name => {
    users[socket.id] = name; 
    if(users[socket.id])
    {
      socket.broadcast.emit('user-joined', name);
    }
  })

  socket.on('send', message => {
    socket.broadcast.emit('recieve', {message: message, name: users[socket.id]});
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('left', {name: users[socket.id]});
    delete users[socket.id];
  })
});

server.listen(PORT, () => {
  console.log('Server is working......');
})





