const assert = require('chai').assert;
const app = require('../app');

checkStringResult=app.checkString();
checkNumResult=app.checkNum(5,5);

describe('app',function(){
    describe('checkString()',function(){
        it('check if its hello',function(){
            assert.equal(checkStringResult,'hello');
        });
        it('check if its string',function(){
            assert.typeOf(checkStringResult,'String');
        });
    });

    describe('checkSum',function(){
        it('check if the sum is above 5',function(){
            assert.isAbove(checkNumResult,5);
        });
        it('check if its a number',function(){
            assert.typeOf(checkNumResult,'Number');
        });
    })
});