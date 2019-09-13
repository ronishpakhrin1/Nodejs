var redis = require('redis');
var colors = require('colors');
var client = redis.createClient();

client.on('connect',function(){
    console.log('CONNECTED'.green);
});

client.on('error',function(err){
    console.log('ERROR'.red + err);
});
//STRING

//SET
client.SET('name','ronish',redis.print);

//GET
client.GET('name',function(err,result){
    if(err){
        console.log('ERROR: could not get the value'.red + err);
    }
    console.log('GET-RESULT = '.cyan + result);
});

//HASHES

//HMSET
client.HMSET('Info',{'name':'ronish','age':'25'},redis.print);

//HGET
client.HGET('Info','name',function(err,result){
    if(err){
        console.log('ERROR: could not get the fields'.red + err);
    }
    console.log('HGET-RESULT = '.cyan + result);
});

//HGETALL
client.HGETALL('Info',function(err,result){
    if(err){
        console.log('ERROR: could not print the object'.red + err);
    }
    console.log('HGETALL-RESULT = '.cyan + JSON.stringify(result));
}); 

//HDEL
client.HDEL('Info','name','age',function(err,success){
    if(err){
        console.log('ERROR: could not delete'.red + err);
    }
});
client.quit();