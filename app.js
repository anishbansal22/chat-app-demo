const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();

const server = http.Server(app);
const io = socketio(server);
const path = require('path');


app.use('/', express.static(path.join(__dirname, 'static')));

 const mapping = {};
io.on('connection', (socket) => {
    console.log(socket.id+' ==> Connected');
    // socket.emit('successfull', {
    //     msg: 'hello from socket server'
    // } /* … */ );
    socket.on('login',(data)=>{
        mapping[socket.id] = data.name;
        //console.log(data.name);
    })
    socket.on('send-msg', (data) => {
        console.log(data.msg);
        io.emit('received-msg',{
            name:mapping[socket.id],
            msg:data.msg
        })
        
    })
});











server.listen(process.env.PORT || 4444, () => {
    console.log('running at port 4444');
})