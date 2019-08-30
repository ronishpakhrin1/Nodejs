function startIns(){
                    var params = {
                        InstanceIds: 'i-0349dfb80c7467889',
                        DryRun: true
                    };
                    ec2.startInstances(params, function(err, data){
                        if (err && err.code === 'DryRunOperation'){
                            params.DryRun = false;
                            ec2.startInstances(params, function(err, data) {
                                if (err) {
                                    window.alert("Error", err);
                                } 
                                else if (data) {
                                    window.alert("Success", data.StartingInstances);
                                }
                            });
                        } 
                        else {
                            window.alert("You don't have permission to start instances.");
                        } 
                    });
                
}
function stopIns(){
                    var params = {
                        InstanceIds: 'i-0349dfb80c7467889',
                        DryRun: true
                    };
                    ec2.stopInstances(params, function(err, data){
                        if (err && err.code === 'DryRunOperation'){
                            params.DryRun = false;
                            ec2.stopInstances(params, function(err, data) {
                                if (err) {
                                    window.alert("Error", err);
                                } 
                                else if (data) {
                                    window.alert("Success", data.StoppingInstances);
                                }
                            });
                        } 
                        else {
                            window.alert("You don't have permission to start instances.");
                        } 
                    });
                
}