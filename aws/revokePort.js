var aws = require('aws-sdk');

aws.config.update({
        accessKey:'SOME_KEY',
        secretAccessKey:'SOME_KEY',
        region:'ap-south-1'
});

var ec2 = new aws.EC2();
var params={
        GroupName: 'Nodejs-sg',
        IpPermissions:[{
                FromPort: 5050,
                IpProtocol: 'tcp',
                IpRanges:[{CidrIp: '0.0.0.0/0'}],
                ToPort: 5050
        }]
};
 ec2.revokeSecurityGroupIngress(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
 });
