var socket = io.connect('http://localhost:4040');

var output=document.getElementById('output'),
    handle=document.getElementById('handle'),
    message=document.getElementById('message'),
    button=document.getElementById('send'),
    feedback=document.getElementById('feedback');

button.addEventListener('click',function(){
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
    message.value="";

});
message.addEventListener('keypress',function(){
    socket.emit('typing',handle.value);
});
socket.on('chat',function(data){
    feedback.innerHTML='';
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});
socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing..' + '</p></em>';
});