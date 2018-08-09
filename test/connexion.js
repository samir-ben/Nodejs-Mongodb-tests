const mongoose = require('mongoose');

//ES6 Promises
mongoose.Promise = global.Promise;

// Connect to the db before tests run
before(function(done){
    // Connect to mongodb
    mongoose.connect('mongodb://localhost:27017/testaroo',{ useNewUrlParser: true });
    done();
    mongoose.connection.once('open', function () {
        console.log("Connection has been made");
    }).on("error", function (error) {
        console.log("Connection failure has been detected", error)
    });
});

// Drop collections before each test
beforeEach(function(done){
    mongoose.connection.collections.mariochars.drop(function(){
        done();
    });
});