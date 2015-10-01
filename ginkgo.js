#!/usr/bin/env node

/* Copyright (c) 2015 Tillmann Radmer - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential.
* Written by Tillmann Radmer <tillmann.radmer@gmail.com>, September 2015
*/


// include framework and required modules
var express = require('express')
  , app = express()
  , path = require('path')
  , mongoose = require('mongoose');


var Daemons = require('./daemons')
  , Middleware = require('./middleware')
  , Models = require('./models')
  , Logger = require('./methods').Winston.Logger;

var Root = require('./routes');
// var Grid = require('./routes/grid.js');



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Import and Setup Middleware
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// setup compression before all other middleware so that it is used for all routes
app.use(Middleware.Compression);

// load the favicon from the public directory.
app.use(Middleware.Favicon);

// setup http-logger 'morgan' in dev-mode with concise output colored by response status
// and streaming into the main log via Winston
app.use(Middleware.Morgan);

// setup stylus middleware to watch and compiel the 'views' directory
app.use(Middleware.Stylus);

// static route middleware with caching html header
app.use(express.static(path.join(__dirname, 'public'), { maxage: 0 }));

// use jade as the default view engine
app.set('view engine', 'jade');



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Import and Assign Routes (AFTER global middleware was setup)
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.use('/', Root);
// app.use('/g', Grid);



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Error Handling
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// catch 404 and respond with the root page so it can try to load the corresponding URL.
// TODO: [OPT] Search for an article with the name in the URL and send it before rasing the 404 error.
app.use(function(request, response, next) {
	var error = new Error("Not Found");
	error.status = 404;
	next(error);
});

// development error handler: print stack trace
if (app.get('env') === 'development') {
	app.use(function(error, request, response, next) {
		response.status(error.status || 500);

		response.sendFile('static-views/index.html', {root: __dirname + '/'});
	});
}

// production error handler: no stacktraces leaked to user
app.use(function(error, request, response, next) {
	response.status(error.status || 500);

	response.sendFile('static-views/index.html', {root: __dirname + '/'});
});



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// Start the server
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
	Logger.info('Express server listening on port ' + server.address().port);
});