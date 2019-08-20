const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PokemonSchema = new Schema({
    name: {
        type:String,
        required:[true,'Name is required.']},
        type:String
})

const Pokemon = mongoose.model('Pokemon',PokemonSchema);


module.exports={
    Pokemon,
    checkString: function(){
        return 'hello';
    },
    checkNum:function(val1,val2){
        return val1+val2;
    }
}
