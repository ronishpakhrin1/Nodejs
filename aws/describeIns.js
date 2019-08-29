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
     //     res.send(instance.InstanceId+'\t'+instance.PublicIpAddress+'\t'+instance.InstanceType+'\t'+instance.ImageId+'\t'+instance.State.N$
            res.writeHead(200,{'Content-Type':'text/html'});
          /*  res.write('<html>');
              res.write('<head></head>');
              res.write('<body>');
                res.write('<table width="100%" border=1>');
                  res.write('<tr>');
                    res.write('<th>');
                    res.write('Instances');
                    res.write('</th>');
                    res.write('<th>');
                    res.write('Status');
                    res.write('</th>');
                    res.write('<th>');
                    res.write('Start/Stop');
                    res.write('</th>');
                  res.write('</tr>');

                  res.write('<tr>');
                    res.write('<td>');
                    res.send(instance.InstanceId);
                    res.write('</td>');
                    res.write('<td>');
                    res.send(instance.State.Name);
                    res.write('</td>');
                    res.write('<td>');
                    res.write('<button>');
                    res.write('start');
                    res.write('</button>');
                    res.write('<button>');
                    res.write('stop');
                    res.write('</button>');
                    res.write('</td>');
                  res.write('</tr>');
                res.write('</table>');
              res.write('</body>');
            res.write('</html>');*/
            res.end('<html><body><table width="100%" border=1><tr><th>Instances</th><th>Status</th><th>Start/Stop</th></tr><tr><td>instance.InstanceId</td><td>instance.State.Name</td><td> <button>start</button> <button>stop</button></td></tr></table></body></html>');
          });
         // console.log('\t'+name+'\t'+instance.InstanceId+'\t'+instance.PublicIpAddress+'\t'+instance.InstanceType+'\t'+instance.ImageId+'\t'+$
      }
    }
  }
});
server.listen('3030');
console.log('listening on port 3030');
