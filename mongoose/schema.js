var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

	var UserSchema = new Schema({          
	    phone : { type: String },                 
	    password: {type: String},
	    userType: {type: String},
	    id: {type: String},
	});
	var mergeSchema = new Schema({
		content: { type: String},
		name: {type: String},
		id: {type: String},
	});
	var personalSchema = new Schema({
		name: { type: String},
		password: { type: String},
		userType: {type: String},
		gender: {type: String},
		id: {type: String},
		phone: {type: Number},
		role: {type: String},
		birthday: {type: String},
		photo: {type: String}
	});


module.exports = {
		user: mongoose.model('User',UserSchema),
		merge: mongoose.model('Merge',mergeSchema),
		personal: mongoose.model('personal',personalSchema),
}