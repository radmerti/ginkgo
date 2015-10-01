/* Copyright (c) 2015 Tillmann Radmer - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential.
* Written by Tillmann Radmer <tillmann.radmer@gmail.com>, September 2015
*/

var mongoose = require('mongoose')
  , fs = require('fs');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Schema for Articles
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var imageSchema = mongoose.Schema({
	width: { type: Number },
	height: { type: Number },
	topics: { type: [String], index: true },
	title: { type: String },
	description: { type: String },
	color_palette: [{
		counts: { type: Number },
		red: { type: Number },
		green: { type: Number },
		blue: { type: Number },
		hex: { type: String },
		precentage: { type: Number } }],
	articles: { type: [ObjectId] }
});

// TODO: [OPT] uncomment for production use!
// imageSchema.set('autoIndex', false);

var ImageModel = mongoose.model('Image', imageSchema);



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Functions to ADD, GET, SET articles.
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Make the model available
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

module.exports = ImageModel;