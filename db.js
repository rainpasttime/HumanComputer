var mongoose = require('mongoose');

//数据库地址
DB_URL = 'mongodb://localhost:27017/finalHomework';

mongoose.connect(DB_URL);
console.log('connect success DB');

mongoose.connection.on('disconnected',function(){
    console.log('connect wrong DB');
});

module.exports = mongoose;
