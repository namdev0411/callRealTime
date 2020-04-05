const express = require('express');
const http = require('http');

const app = express();
const server = http.Server(app);
//socketIo
const io = require('socket.io')(server);

const users = [];//[{id:fdf,soketId:fdfd}]
io.on('connection', (socket)=>{
  console.log('da connect');
  socket.on('loginId',(loginId)=>{
    let user = {
      id: loginId,
      socketId: socket.id
    }
    users.push(user);
    io.sockets.emit('users', users);
  });
  socket.on('disconnect', () => {
    if(users.length>0){
      let index = users.findIndex(user=>user.socketId === socket.id);
      users.splice(index,1);
      io.sockets.emit('disconnect',users);
    }
  });
    console.log(JSON.stringify(users));
});

const port = process.env.PORT || 8888;
app.get('/',(req,res)=>res.json(users));
server.listen(port);
