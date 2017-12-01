var mongoose = require('./db'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
    imagePath : String,
    message : String,
    ID:String,
    type:String
});

module.exports = mongoose.model('image',ImageSchema);
