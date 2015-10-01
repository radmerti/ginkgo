/* Copyright (c) 2015 Tillmann Radmer - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential.
* Written by Tillmann Radmer <tillmann.radmer@gmail.com>, September 2015
*/

var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;


// salt factor used for password hasing with bcrypt
SALT_WORK_FACTOR = 7;



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Schema for Users
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var userSchema = Schema({
	email: { type: String, required: true, index: { unique: true } },
	password: { type: String },
	salt: { type: String },
	created: { type: Date, default: Date.now},
	lastSeen: { type: Date, default: Date.now },
	firstName: { type: String },
	lastName: { type: String },
	articles: { type: [ObjectId] },
	topics: { type: [String]}
});



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Helper functions for the user schema
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

userSchema.methods.setPassword = function (password, done) {
	var user = this;
	
	// generate salt
	bcrypt.gen_salt(SALT_WORK_FACTOR, function(error, salt) {
		if( error ) return done(error);

		// hash the password along with the salt
		bcrypt.encrypt(password, salt, function(error, hash) {
			if( error ) return done(error);

			user.password = hash;
			user.salt = salt;
			done();
		});
	});
}

userSchema.methods.comparePassword = function(candidatePassword, done) {
	bcrypt.compare(candidatePassword, this.password, function(error, isMatch) {
		if( error ) return done(error);
		done(null, isMatch);
	});
}

// TODO: [OPT] uncomment for production use!
// articleSchema.set('autoIndex', false);

var UserModel = mongoose.model('User', userSchema);



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Make the model available
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



module.exports = UserModel;