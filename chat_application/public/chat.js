var socket = io.connect('http://localhost:4040');
var output=document.getElementById('output'),
    message=document.getElementById('message'),
    button=document.getElementById('send'),
    feedback=document.getElementById('feedback'),
    num=document.getElementById('num'),
    list=document.getElementById('list');
var userName = window.prompt('Enter Your Name');
    if(userName === ''){
        window.location.reload();
    }
document.getElementById('handle').innerHTML=userName;
socket.emit('username',userName);
button.addEventListener('click',function(){
    socket.emit('chat',{
        message: message.value,
        handle: userName
    });
    message.value="";
});
message.addEventListener('keypress',function(){
    socket.emit('typing',userName);
});
socket.on('chat',function(data){
    feedback.innerHTML='';
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

socket.on('pchat',function(data){
    feedback.innerHTML='';
    output.innerHTML += '<span class="per"><b>' +data.name +':</b>' + data.message +'<br/>'+ '</span>'
});

socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing..' + '</p></em>';
});
socket.on('print',function(data){
    list.innerHTML = data;
});
socket.on('number',function(data){
    num.innerHTML = data.description;
});