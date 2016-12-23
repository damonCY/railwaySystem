var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

	var UserSchema = new Schema({          
	    name : { type: String },                 
	    password: {type: String},
	    userType: {type: String}
	});
	var mergeSchema = new Schema({
		content: { type: String},
		name: {type: String}
	})


module.exports = {
		user: mongoose.model('User',UserSchema),
		merge: mongoose.model('Merge',mergeSchema),
}