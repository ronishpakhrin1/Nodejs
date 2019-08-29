var http = require('http'),
	express = require('express'),
	app = express(),
	server = http.createServer(app);
	path = require('path'),
    aws = require('aws-sdk');
    app.set('views',path.join(__dirname,'views'));
    app.set('view engine','pug');
                    aws.config.update({
                        accessKeyId: 'AKIAV5I5KX55VKFLCLNE', 
                        secretAccessKey: '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', 
                        region: 'ap-south-1'
                    });
                    var ec2 = new aws.EC2();
                    var params = {
                        DryRun: false
                    };
                    ec2.describeInstances(params,function(err,data){
                        if(err){
                            console.log("Error",err.stack);
                        }
                        else{
                        	for(var i=0,iLength=data.Reservations.length;i<iLength;i++){
                            	var reservation = data.Reservations[i];
                            	for(var j=0,jLength=reservation.Instances.length;j<jLength;++j){
                                	var instance = reservation.Instances[j];            
                            		app.get('/',function(req,res){
                            			res.render('instance',{
                            				instanceId: instance.InstanceId;
                            				status: instance.Status.Name;
                            			})
                            		});
                            	}
                        	}
                        }
                    });

server.listen('3030');
console.log('Listening on port 3030');