var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-south-1'});
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {
  DryRun: false
};

ec2.describeInstances(params, function(err, data) {
  if (err) {
    console.log("Error", err.stack);
  } else {
    for(var r=0,rlen=data.Reservations.length; r<rlen; r++) {
        var reservation = data.Reservations[r];
        for(var i=0,ilen=reservation.Instances.length; i<ilen; ++i) {
            var instance = reservation.Instances[i];

            var name = '';
            for(var t=0,tlen=instance.Tags.length; t<tlen; ++t) {
                if(instance.Tags[t].Key === 'Name') {
                    name = instance.Tags[t].Value;
                }
            }
          app.get('/',function(req,res){
                res.send(instance.InstanceId+'\t'+instance.PublicIpAddress+'\t'+instance.InstanceType+'\t'+instance.ImageId+'\t'+instance.State.N$
          });
           // console.log('\t'+name+'\t'+instance.InstanceId+'\t'+instance.PublicIpAddress+'\t'+instance.InstanceType+'\t'+instance.ImageId+'\t'+$
        }
    }
  }
});
