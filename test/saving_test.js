const assert = require('assert');
const MarioChar = require('../models/mariochar');

// Describe tests
describe('Savings records', function(){

    //Tests
    it('Saves a record to the database', function(done){
        var char = new MarioChar({
            name: 'Mario'
        });
    
        char.save().then(function(){
            assert(char.isNew === false);
            done();
        });


    });

});