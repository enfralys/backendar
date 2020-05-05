var dbConfig = require('./db');

var mongoose = require('mongoose');
console.log(    mongoose.connect(dbConfig.url));
module.exports = mongoose.model('User',{
        username: String,
        password: String,
        email: String,

});