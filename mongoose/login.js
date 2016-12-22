var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({          
    name : { type: String },                 
    password: {type: String},
    userType: {type: String}
});

module.exports = mongoose.model('User',UserSchema);