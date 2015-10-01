/* Copyright (c) 2015 Tillmann Radmer - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential.
* Written by Tillmann Radmer <tillmann.radmer@gmail.com>, September 2015
*/

var mongoose = require('mongoose')
  , fs = require('fs')
  , Jade = require('./../methods').Jade;


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// All files need recompilation on startup because untracked changes could've been made
// Then watch the files in that directory for changes
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var GinkgoDB = mongoose.connection;

// wait for connection to open, then compile all jades
GinkgoDB.once('open', function (callback) {
	// On startup, once the database is up, compile every jade file in 'views' to '/static-views/'
	fs.readdir(__dirname + '/../views/', function(error, files) {
		for(i=0; i < files.length; i++) {
			Jade.CompileViews(files[i], __dirname + '/../views/', __dirname + '/../static-views/');
		}
	});

	// Watch the views directory for changes, on change recompile file with respective local);
	fs.watch(__dirname + '/../views/', { persistent: true }, function (event, fileName) {
		console.log("Event " + fileName + " " + event);
		// TODO: [BUG] for one change two events are fired in close succession (on Ubuntu Linux).
		Jade.CompileViews(fileName, __dirname + '/../views/', __dirname + '/../static-views/');
	});

});