var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-south-1',
                     accessKey: 'SOME_KEY',
                        secretAccessKey:'SOME_KEY'
        });

var ec2 = new AWS.EC2();

var params = {
  DryRun: false
};
ec2.describeSecurityGroups(params, function(err, data) {
   if (err) {
      console.log("Error", err);
   } else {
        for(var i=0,iLength=data.SecurityGroups.length;i<iLength;i++){
                var securitygroup = data.SecurityGroups[i];
                console.log(securitygroup.GroupName);
        }
   }
});
