const mongoose = require('mongoose');
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true});
mongoose.connection
        .once('open',function(){
            console.log('connected!');
        })
        .on('error',function(error){
            console.warn('Error: ',error);
        });
beforeEach(function(done){
   mongoose.connection.collections.test.drop(function(){
      done();
        mongoose.connection.dropCollection(function(){
            done();
      })
    });
});