const socket = io();


setTimeout(() => {
    console.log("client connected ====> " + socket.id);
}, 1000)

$('#send-btn').click(()=>{
   socket.emit('send-msg',{
       msg:$('#inp').val()
   })

   $('#inp').val("");

})


$('#chat').hide();
$('#login-btn').click(()=>{
    socket.emit('login',{
        name:$('#login-inp').val()
    })
    $('#login').hide();
    $('#chat').show();

})

socket.on('received-msg',(data)=>{
    $('#list').append(`<li>${data.name}:=>${data.msg}</li>`)
})