
var aws = require('aws-sdk');
aws.config.update({
        accessKey:'SOME_KEY',
        secretAccessKey:'SOME_KEY',
        region:'ap-south-1'
});
var ec2 = new aws.EC2();
var params = {
        InstanceIds:['i-0c824cd7f05e11a5a'],
        DryRun: false
};

ec2.monitorInstances(params,function(err,data){
        if(err){
                console.log('Error',err);
        }
        else{
                console.log(data.InstanceMonitorings);
        }
});

