var mongoose = require('./db'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username : String,
    userpsw : String,
    major:String,
    email:String
});

module.exports = mongoose.model('User',UserSchema);
