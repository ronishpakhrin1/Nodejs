const assert = require('chai').assert;
const app = require('../app');
const http = require('http');

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

    describe('checkSum()',function(){
        it('check if the sum is above 5',function(){
            assert.isAbove(checkNumResult,5);
        });
        it('check if its a number',function(){
            assert.typeOf(checkNumResult,'number');
        });
    })

    describe('checkCallback()',function(){
        it('check if callback is working',function(done){
                    http.get('http://www.google.com',function(res){
                        assert.equal(res.statusCode,'200');
                        done();
                    });
                  
        });
    });

    describe('checkPromise',function(){
        it('check if promise is working',function(){
            var promise1=new Promise(function(resolve,reject){
                
                http.get('http://www.google.com',function(res){
                    resolve(res.statusCode);
                });
                

            });
            promise1.then(function(value){
                assert.equal(value,850);
            }).catch(function(error){
                throw new Error(error);
            });
        })
    });
});