const assert = require('assert');
const mongoose = require('mongoose');
const Author = require('../models/author');

// Describe tests
describe('Nesting records', function () {
    
    beforeEach(function (done) {
        mongoose.connection.collections.authors.drop(function () {
            done();
        });
    });
    
    // Create tests
    it('Creates an author with sub-document', function(done){
        var victor = new Author({
            name : 'Victor Hugo',
            books: [{title : 'Les Misérables', pages: 566}]        
        });
    
        victor.save().then(function(){
            Author.findOne({name: 'Victor Hugo'}).then(function(result){
                assert(result.books.length === 1);
                done();
            });
        });
    });

    it('Adds a book to an author', function (done) {
        var victor = new Author({
            name: 'Victor Hugo',
            books: [{ title: 'Les Misérables', pages: 566 }]
        });

        victor.save().then(function () {
            Author.findOne({ name: 'Victor Hugo' }).then(function (record) {
                record.books.push({title: 'Le dernier jour d\'un condamné', pages: 129});
                record.save().then(function(){
                    Author.findOne({ name: 'Victor Hugo' }).then(function (result) {
                        assert(result.books.length === 2);
                        done();
                    });
                });
                
                
                
            });
        });
    });


});