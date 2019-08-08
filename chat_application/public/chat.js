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
    buttonRoom=document.getElementById('RoomSend');
    list=document.getElementById('list');

    //hide the button
    var $btnSend=$('#send'),
        $btnRoom=$('#RoomSend');

    //promt for username
    var userName = window.prompt('Enter Your Name');
    if(userName === ''){
        window.location.reload();
    }

    document.getElementById('handle').innerHTML=userName;

    //assign username
    socket.emit('username',userName,function(){});
   
//chat room
createRoom.addEventListener('click',function(e){
    let roomName = window.prompt('Enter the room name');
    if(roomName===''){
        window.location.reload();
    }
    socket.emit('create',{room: roomName,handle: userName});
    e.preventDefault();
    $btnRoom.css({"display": "initial"});
    $btnSend.hide();
    $btnRoom.show();
  
});

//leave room
leaveRoom.addEventListener('click',function(e){
    let roomName = window.prompt('Enter the room name');
    if(roomName===''){
        window.location.reload();
    }
    socket.emit('leave',{room:roomName,handle:userName});

    e.preventDefault();
    $btnRoom.hide();
    $btnSend.show();
});

//send the message
button.addEventListener('click',function(){
    socket.emit('chat',{
        message: message.value,
        handle: userName
    });
    message.value="";
});

//send the message to the room
buttonRoom.addEventListener('click',function(){
    socket.emit('roomChat',{
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
    var html='';
    for(var userName in data){
        var isuserNameOnline = data[userName].online;
        if(isuserNameOnline){
            var status='<span class="online"><b>YES</b></span>';
        }
        else{
            var status='<span class="offline"><b>NO</b></span>';
        }
        html+=userName+'(online:'+status+')<br/>';
    }
    list.innerHTML = html ;
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
socket.on('eventJoin',function(data){
    output.innerHTML +='<span class="per"><b>'+'^^'+data+'  :Joined the room' +':</b>'+'<br/>'+'</span>';

});
socket.on('eventLeave',function(data){
    output.innerHTML +='<span class="per"><b>'+'^^'+data+'  :Left the room' +':</b>'+'<br/>'+'</span>';

});