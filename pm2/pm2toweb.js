var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var path = require('path');
var pm2 = require('pm2');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

var pid,cpu,memory,status,name,instances;
pm2.connect(function(err){
    if(err){
        console.log(err);
            process.exit(2);
    }
/*    pm2.delete('server',function(err,proc){
            if(err){
                    throw err;
            }
    });*/
   /* pm2.start({name:'server',
                script:'server.js'
            
            },function(err,apps){
                        if(err){
                            throw err;
                        }
    });*/
    setInterval(function(){
        pm2.describe('server',function(err,list){
            if(err){
                console.log('ERROR IN THE LIST',err);
            }else{
                for(var i=0,iLength=list.length;i<iLength;i++){
                     pid = list[i].pid;
                     cpu = list[i].monit.cpu;
                     memory = list[i].monit.memory;
                     name = list[i].name;
                     status = list[i].pm2_env.status;
                     instances = list[i].pm2_env.instances;

                     app.get('/',function(req,res){
                        res.render('web_pm2',{
                            processid: pid,
                            cpu: cpu,
                            memory: memory,
                            name: name,
                            status: status,
                            instances: instances
                        });
                    }); 
                    
                }
            }
        });
    },1000);
});
server.listen('6060');
console.log('Listening on port 6060');