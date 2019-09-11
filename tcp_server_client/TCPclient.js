var net = require('net');
var colors = require('colors');
var readlinesync = require('readline-sync');

var host = 'localhost';
var port = 9000;

var client = null;

function OpenConnection(){
    if(client){
        console.log('Connection is already open'.red);
        setTimeout(function(){
            menu();
        },0);
        return;
    }
    client = net.Socket();

    client.on('error',function(err){
        client.destroy();
        client = null;
        console.log('ERROR: connection could not be opened: %s'.red,err.message);
        setTimeout(function(){
            menu();
        },0);
        return;
    });

    client.on('data',function(data){
        console.log('Received: %s'.cyan,data);
        setTimeout(function(){
            menu();
        },0);
        return;
    });
    client.connect(port,host,function(){
        console.log('Connection opened successfully'.green);
        setTimeout(function(){
            menu();
        },0);
        return;
    });
}

function SendData(data){
    if(!client){
        console.log('Connection is not open or close'.red);
        setTimeout(function(){
            menu();
        },0);
        return;
    }
    client.write(data);
}

function CloseConnection(){
    if(!client){
        console.log('Connection is not open'.red);
        setTimeout(function(){
            menu();
        },0);
        return;
    }
    client.destroy();
    client = null;
    console.log('CLosed Successfully'.yellow);
    setTimeout(function(){
        menu();
    },0);
}

function menu(){
    var lineread = readlinesync.question('\n\nEnter Option :\n1. Open \n2. Send \n3. Close \n4. Quit\n\n'.blue);
    switch(lineread){
        case '1':
           OpenConnection();
            break;
        case '2':
            var data = readlinesync.question('Enter the data: ');
            SendData(data);
            break;
        case '3':
            CloseConnection();
            break;
        case '4':
            return;
            break;
        default:
            console.log('Not a correct option.Try Again'.red);
            setTimeout(function(){
                menu();
            },0,);
            break;
    }
}
setTimeout(function(){
    menu();
},0);