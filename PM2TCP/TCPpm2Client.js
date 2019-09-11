var net = require('net');
var colors = require('colors');
var client = null;
var readlinesync = require('readline-sync');
var port = 9000;
var host = 'localhost';
function OpenConnection(){
    client = net.Socket();

    client.connect(port,host,function(){
        console.log('Connection opened successfully'.green);
        return;
    });
    client.on('data',function(str){
       console.log('Details: '.red,JSON.parse(str));
       setTimeout(function(){
            menu();
        },0);
        return;
    });

    client.on('error',function(err){
        client.destroy();
        client = null;
        console.log('ERROR: connection could not be opened: %s'.red,err.message);
        setTimeout(function(){
            menu();
        },0);
        return;
    });
}

function DisconnectProcess(name){
    var data= 'disconnect' + name;
    client.write(data);
    setTimeout(function(){
        menu();
    },0);
    
}

function RestartProcess(name){
    var data= 'restart' + name;
    client.write(data);
    setTimeout(function(){
        menu();
    },0);
}

function menu(){
    var lineread = readlinesync.question('\n\n Enter the options: \n1.List Running Processes \n2.Stop Process \n3.Restart Process \n4.Exit \n\n'.blue);

    switch(lineread){
        case "1":
            OpenConnection();
            break;
        case "2":
            var name = readlinesync.question('Name of the process to stop: '.blue);
            DisconnectProcess(name);
            break;
        case "3":
            var name = readlinesync.question('Name of the process to restart '.blue);
            RestartProcess(name);
            break;
        case "4":
            process.exit(0);
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
