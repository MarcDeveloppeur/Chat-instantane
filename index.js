const express=require('express');
const http=require('http');
const app=express();
const sequelize=require('sequelize');

const server=http.createServer(app);
const io=require('socket.io')(server);

app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/Pages/index.html');
});


io.on('connection',(socket)=>{
  socket.on('message chat',(mess)=>{
    io.emit('message chat',mess);
  });
  socket.on('sender',(data)=>{
    io.emit('sender',data);
  });
  socket.on('iswriting',()=>{
    io.emit('iswriting');
  });
  socket.on('disconnect',()=>{
    console.log(' un utilisateur déconnecté');
  });
  socket.on('isBluring',()=>{
    io.emit('isBluring');
  });
  console.log('un utilisateur connecté');
});


server.listen(3000,()=>console.log('serveur demarrer à la port 3000'));
