const assert = require('assert'); 
const Pokemon = require('../app');
describe('Creating Test Models',function(){
    it('Inserts a name',function(done){
        const poke = new Pokemon({name: 'Ronish'});
        poke.save()
            .then(function(){
                assert(!name.isNew);
                done();
            });
    });
});