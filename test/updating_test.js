const assert = require('assert');
const MarioChar = require('../models/mariochar');

// Describe tests
describe('Updating records', function () {
    var char;

    beforeEach(function (done) {
        char = new MarioChar({
            name: 'Mario',
            weight: 50
        });

        char.save().then(function () {
            done();
        });
    })

    //Tests
    it('Updates one record in the database', function (done) {
        MarioChar.findOneAndUpdate({name: 'Mario'}, {name: 'Luigi'}).then(function(){
            MarioChar.findOne({_id: char._id}).then(function(result){
                assert(result.name === 'Luigi');
                done();
            });
        });
    });

    it('Increments weight by 1', function (done) {
        MarioChar.update({ weight: char.weight }, { $inc: { weight: 1 } }).then(function () { // an other syntax :  MarioChar.update({}, {$inc :{weight: 1}}).then...
            MarioChar.findOne({name: 'Mario'}).then(function(result){
                assert(result.weight === 51);
                done();
            });
        });
    });


});