//connecting to the server
var socket = io.connect('http://localhost:4040');

//dom manipulation
var output=document.getElementById('output'),
    message=document.getElementById('message'),
    button=document.getElementById('send'),
    feedback=document.getElementById('feedback'),
    num=document.getElementById('num'),
    createRoom=document.getElementById('create_room'),
    leaveRoom=document.getElementById('leave_room'),
    list=document.getElementById('list');

    //promt for username
    var userName = window.prompt('Enter Your Name');
    if(userName === ''){
        window.location.reload();
    }

    document.getElementById('handle').innerHTML=userName;
    socket.emit('username',userName);
   
//chat room
createRoom.addEventListener('click',function(){
    let roomName = window.prompt('Enter the room name');
    if(roomName===''){
        window.location.reload();
    }
    socket.emit('create',roomName);
});

//leave room
leaveRoom.addEventListener('click',function(){
    let roomName = window.prompt('Enter the room name');
    if(roomName===''){
        window.location.reload();
    }
    socket.emit('leave',{room:roomName,handle:userName});
});

//send the message
button.addEventListener('click',function(){
    socket.emit('chat',{
        message: message.value,
        handle: userName
    });
    message.value="";
});

//typing thing
message.addEventListener('keypress',function(){
    socket.emit('typing',userName);
});

//receiving from the server
socket.on('chat',function(data){
    feedback.innerHTML='';
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

socket.on('pchat',function(data){
    feedback.innerHTML='';
    output.innerHTML += '<span class="per"><b>'+'>>'+data.name +':</b>' + data.message +'<br/>'+ '</span>';
});

socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing..' + '</p></em>';
});
socket.on('print',function(data){
    list.innerHTML = data ;
});
socket.on('number',function(data){
    num.innerHTML = data.description;
});
socket.on('feed',function(data){
    feedback.innerHTML='';
    output.innerHTML +='<span class="feed">'+'--'+data + '  joined'+'</br>'+'</span>';
});
socket.on('feed1',function(data){
    feedback.innerHTML='';
    output.innerHTML+='<span class="feed">'+'--'+data+ '  left'+'</br>'+'</span>';
});
socket.on('event',function(data){
    output.innerHTML+='<span class="per"><b>'+'^^'+data.handle+' :'+data.message +'</b>'+'<br/>'+'</span>';
});
socket.on('eventLeave',function(data){
    output.innerHTML +='<span class="per"><b>'+'^^'+data+'  :left the room' +':</b>'+'<br/>'+'</span>';

});